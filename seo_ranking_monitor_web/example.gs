/*************************************************
 * MENU (MANUAL ONLY)
 *************************************************/
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Ranking')
    .addItem('Run Batch 0–5', 'runBatch_0_5')
    .addItem('Run Batch 6–10', 'runBatch_6_10')
    .addItem('Run Batch 11–15', 'runBatch_11_15')
    .addToUi();
}

/*************************************************
 * BATCH EXECUTORS (TRIGGERS)
 *************************************************/
function runBatch_0_5() {
  runRankingForTabs([0,1,2,3,4,5]);
}

function runBatch_6_10() {
  runRankingForTabs([6,7,8,9,10]);
}

function runBatch_11_15() {
  runRankingForTabs([11,12,13,14,15]);
}

/*************************************************
 * MAIN BATCH RUNNER
 *************************************************/
function runRankingForTabs(tabIndexes) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();

  tabIndexes.forEach(index => {
    const sheet = sheets[index];
    if (!sheet) return;

    prepareNewRun(sheet);
    insertAppMetadata(sheet);
    checkAppRankingForSheet(sheet);
  });
}

/*************************************************
 * PREPARE NEW RUN
 *
 * Row 1 → header (static)
 * Row 2 → divider (static)
 * Row 3 → date
 * Row 4 → title + rankings
 *************************************************/
function prepareNewRun(sheet) {
  // Insert 2 rows AFTER divider (row 2)
  sheet.insertRowsAfter(2, 2);

  // Row 3 → Date
  sheet.getRange('A3').setValue(new Date());
}

/*************************************************
 * APP METADATA (TITLE + DESCRIPTIONS)
 * Written ONLY to A4
 *************************************************/
function insertAppMetadata(sheet) {
  const appId = sheet.getRange('A1').getValue().toString().trim();
  if (!appId) return;

  const url = `https://play.google.com/store/apps/details?id=${appId}&hl=pt&gl=BR`;

  const res = UrlFetchApp.fetch(url, {
    muteHttpExceptions: true,
    followRedirects: true,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  });

  const html = res.getContentText();

  // App title
  const titleMatch = html.match(/<h1[^>]*>\s*<span[^>]*>(.*?)<\/span>\s*<\/h1>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'Title not found';

  // Short description
  const shortDescMatch = html.match(/<meta itemprop="description" content="([^"]+)"/i);
  const shortDescription = shortDescMatch ? shortDescMatch[1].trim() : 'Short description not found';

  // Long description
  const longDescMatch = html.match(/<div[^>]*data-g-id="description"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i);
  let longDescription = 'Long description not found';
  if (longDescMatch) {
    longDescription = longDescMatch[1]
      .replace(/<br\s*\/?>/gi, '\n')  // convert <br> to newlines
      .replace(/<[^>]+>/g, '')        // strip any remaining HTML tags
      .replace(/\n{2,}/g, '\n\n')    // collapse multiple blank lines
      .trim();
  }

  // Write to cell A4
  const cell = sheet.getRange('A4');
  cell.setValue(title);
  cell.setNote(
    // `📦 Package: ${appId}\n\n` +
    `🟦 Short description:\n${shortDescription}\n\n` +
    `🟩 Long description:\n${longDescription}`
  );
}

/*************************************************
 * RANKING LOGIC
 * Results are written on Row 4
 *************************************************/
function checkAppRankingForSheet(sheet) {
  const appId = sheet.getRange('A1').getValue().toString().trim();
  if (!appId) return;

  const headerRow = 1;
  const startCol = 2;
  const resultsRow = 4; // ← aligns with title

  const lastCol = sheet.getLastColumn();
  if (lastCol < startCol) return;

  const queries = sheet
    .getRange(headerRow, startCol, 1, lastCol - startCol + 1)
    .getValues()[0];

  const baseUrl = 'https://play.google.com/store/search?q=';
  const category = '&c=apps&gl=br';
  const targetHref = `/store/apps/details?id=${appId}`;

  const fetchOptions = {
    method: 'get',
    muteHttpExceptions: true,
    followRedirects: true,
    headers: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'pt-BR,pt;q=0.9',
      'referer': 'https://play.google.com/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/140'
    }
  };

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    if (!query) continue;

    const url = baseUrl + encodeURIComponent(query) + category;

    try {
      const res = UrlFetchApp.fetch(url, fetchOptions);
      const html = res.getContentText();

      const regex = /<a[^>]*class="Si6A0c Gy4nib"[^>]*href="([^"]+)"[^>]*>/g;
      let match;
      const hrefs = [];

      while ((match = regex.exec(html)) !== null) {
        hrefs.push(match[1]);
      }

      let rank = 'NF';
      for (let j = 0; j < hrefs.length; j++) {
        if (hrefs[j].includes(targetHref)) {
          rank = j + 1;
          break;
        }
      }

      sheet.getRange(resultsRow, startCol + i).setValue(rank);
      Utilities.sleep(500);

    } catch (e) {
      sheet.getRange(resultsRow, startCol + i).setValue('Error');
    }
  }
}

/*************************************************
 * TRIGGER CREATOR (RUN ONCE)
 *************************************************/
function createDailyTriggers() {
  ScriptApp.newTrigger('runBatch_0_5')
    .timeBased().everyDays(1).atHour(3).create();

  ScriptApp.newTrigger('runBatch_6_10')
    .timeBased().everyDays(1).atHour(4).create();

  ScriptApp.newTrigger('runBatch_11_15')
    .timeBased().everyDays(1).atHour(5).create();
}
