// import 'package:http/http.dart' as http;
// import '../models/app_model.dart';
// import '../models/search_history_model.dart';

// class RankingService {
//   static Map<String, String> getCountryCode(String country) {
//     final countryMap = {
//       'Brasil': 'br',
//       'Estados Unidos': 'us',
//       'Argentina': 'ar',
//       'Chile': 'cl',
//       'Colômbia': 'co',
//       'México': 'mx',
//       'Peru': 'pe',
//       'Portugal': 'pt',
//       'Espanha': 'es',
//       'Uruguai': 'uy',
//       'Venezuela': 've',

//       // América Latina
//       'Bolívia': 'bo',
//       'Costa Rica': 'cr',
//       'Cuba': 'cu',
//       'Equador': 'ec',
//       'El Salvador': 'sv',
//       'Guatemala': 'gt',
//       'Honduras': 'hn',
//       'Nicarágua': 'ni',
//       'Panamá': 'pa',
//       'Paraguai': 'py',
//       'República Dominicana': 'do',

//       // Europa
//       'Alemanha': 'de',
//       'França': 'fr',
//       'Itália': 'it',
//       'Reino Unido': 'gb',
//       'Holanda': 'nl',
//       'Bélgica': 'be',
//       'Suíça': 'ch',
//       'Polônia': 'pl',
//       'Suécia': 'se',
//       'Noruega': 'no',
//       'Dinamarca': 'dk',
//       'Finlândia': 'fi',
//       'Irlanda': 'ie',
//       'Áustria': 'at',
//       'Grécia': 'gr',
//       'Hungria': 'hu',
//       'Tchéquia': 'cz',
//       'Romênia': 'ro',
//       'Ucrânia': 'ua',
//       'Rússia': 'ru',

//       // América do Norte
//       'Canadá': 'ca',

//       // Ásia
//       'Japão': 'jp',
//       'Coreia do Sul': 'kr',
//       'China': 'cn',
//       'Taiwan': 'tw',
//       'Hong Kong': 'hk',
//       'Índia': 'in',
//       'Indonésia': 'id',
//       'Malásia': 'my',
//       'Filipinas': 'ph',
//       'Singapura': 'sg',
//       'Tailândia': 'th',
//       'Vietnã': 'vn',

//       // Oriente Médio
//       'Arábia Saudita': 'sa',
//       'Emirados Árabes Unidos': 'ae',
//       'Israel': 'il',
//       'Turquia': 'tr',
//       'Catar': 'qa',
//       'Kuwait': 'kw',

//       // África
//       'África do Sul': 'za',
//       'Egito': 'eg',
//       'Nigéria': 'ng',
//       'Quênia': 'ke',
//       'Marrocos': 'ma',

//       // Oceania
//       'Austrália': 'au',
//       'Nova Zelândia': 'nz',
//     };
//     return {'code': countryMap[country] ?? 'br', 'country': country};
//   }

//   static Future<List<SearchResult>> checkAppRanking(
//     RegisteredApp app,
//     Function(String) onProgress,
//   ) async {
//     final results = <SearchResult>[];
//     final countryCode = getCountryCode(app.country)['code']!;
//     final targetHref = '/store/apps/details?id=${app.packageName}';

//     for (final searchTerm in app.searchTerms) {
//       onProgress('🔎 "$searchTerm"...');

//       try {
//         final rank = await _searchForApp(
//           searchTerm: searchTerm,
//           countryCode: countryCode,
//           targetHref: targetHref,
//         );

//         results.add(SearchResult(searchTerm: searchTerm, rank: rank));

//         // Wait to avoid throttling (1.5 seconds like in the original script)
//         await Future.delayed(const Duration(milliseconds: 1500));
//       } catch (e) {
//         results.add(SearchResult(searchTerm: searchTerm, rank: 'Error'));
//       }
//     }

//     return results;
//   }

//   static Future<String> _searchForApp({
//     required String searchTerm,
//     required String countryCode,
//     required String targetHref,
//   }) async {
//     final baseUrl = 'https://play.google.com/store/search?q=';
//     final category = '&c=apps&gl=$countryCode';
//     final url = baseUrl + Uri.encodeComponent(searchTerm) + category;

//     try {
//       final response = await http.get(
//         Uri.parse(url),
//         headers: {
//           'accept':
//               'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//           'accept-encoding': 'gzip, deflate, br',
//           'accept-language': 'pt-BR,pt;q=0.9',
//           'cache-control': 'max-age=0',
//           'dnt': '1',
//           'referer': 'https://play.google.com/',
//           'sec-ch-ua':
//               '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
//           'sec-ch-ua-arch': '"x86"',
//           'sec-ch-ua-bitness': '"64"',
//           'sec-ch-ua-form-factors': '"Desktop"',
//           'sec-ch-ua-full-version': '"140.0.7339.208"',
//           'sec-ch-ua-full-version-list':
//               '"Chromium";v="140.0.7339.208", "Not=A?Brand";v="24.0.0.0", "Google Chrome";v="140.0.7339.208"',
//           'sec-ch-ua-mobile': '?0',
//           'sec-ch-ua-model': '""',
//           'sec-ch-ua-platform': '"Windows"',
//           'sec-ch-ua-platform-version': '"19.0.0"',
//           'sec-ch-ua-wow64': '?0',
//           'sec-fetch-dest': 'document',
//           'sec-fetch-mode': 'navigate',
//           'sec-fetch-site': 'same-origin',
//           'sec-fetch-user': '?1',
//           'upgrade-insecure-requests': '1',
//           'user-agent':
//               'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
//         },
//       );

//       if (response.statusCode == 200) {
//         final html = response.body;

//         // Regex to extract app links from search results (same as in app_script.js)
//         final regex = RegExp(
//           r'<a[^>]*class="Si6A0c Gy4nib"[^>]*href="([^"]+)"[^>]*>',
//           caseSensitive: true,
//         );

//         final matches = regex.allMatches(html);
//         final hrefs = matches.map((m) => m.group(1)!).toList();

//         // Find position of the target app
//         for (int i = 0; i < hrefs.length; i++) {
//           if (hrefs[i].contains(targetHref)) {
//             return (i + 1).toString();
//           }
//         }

//         return 'Not found';
//       } else {
//         return 'Error (HTTP ${response.statusCode})';
//       }
//     } catch (e) {
//       return 'Error';
//     }
//   }
// }
