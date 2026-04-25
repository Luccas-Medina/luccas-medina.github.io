// ========================================
// STATE MANAGEMENT
// ========================================
const state = {
    packageName: '',
    location: '',
    searchTerms: [],
    appInfo: null,
    rankings: [],
    currentLanguage: 'pt'
};

// ========================================
// TRANSLATIONS
// ========================================
const translations = {
    pt: {
        'app-title': '📱 ASO Ranking Monitor',
        'app-subtitle': 'Monitore o ranking do seu app na Google Play Store',
        'change-language': 'Alterar Idioma:',
        'form-title': 'Informações do App',
        'label-package': 'Package Name do App *',
        'label-location': 'Localização *',
        'label-search-terms': 'Termos de Busca *',
        'select-country': 'Selecione um país',
        'placeholder-package': 'Ex: com.exemplo.meuapp',
        'placeholder-search': 'Digite um termo e pressione Enter',
        'help-package': 'Digite o identificador único do seu app (package name)',
        'help-search-terms': 'Adicione até 10 termos de busca (pressione Enter ou clique em Adicionar)',
        'promo-text': 'Para registrar e realizar buscas mais rápidas, baixe o App',
        'promo-btn': '📱 Baixar App',
        'btn-add-term': 'Adicionar',
        'btn-search': '🔍 Realizar Buscas',
        'btn-new-search': '🔄 Realizar Nova Busca',
        'terms-counter': 'termos adicionados',
        'loading': 'Processando...',
        'loading-checking': 'Verificando ranking para',
        'results-title': 'Resultados da Busca',
        'table-term': 'Termo de Busca',
        'table-rank': 'Posição no Ranking',
        'rank-not-found': 'Não encontrado',
        'rank-error': 'Erro na busca'
    },
    es: {
        'app-title': '📱 Monitor de Ranking ASO',
        'app-subtitle': 'Monitorea el ranking de tu app en Google Play Store',
        'change-language': 'Cambiar Idioma:',
        'form-title': 'Información de la App',
        'label-package': 'Nombre del Paquete *',
        'label-location': 'Ubicación *',
        'label-search-terms': 'Términos de Búsqueda *',
        'select-country': 'Seleccione un país',
        'placeholder-package': 'Ej: com.ejemplo.miapp',
        'placeholder-search': 'Escriba un término y presione Enter',
        'help-package': 'Ingrese el identificador único de su app (package name)',
        'help-search-terms': 'Agregue hasta 10 términos de búsqueda (presione Enter o haga clic en Agregar)',
        'promo-text': 'Para registrar y realizar búsquedas más rápidas, descargue la App',
        'promo-btn': '📱 Descargar App',
        'btn-add-term': 'Agregar',
        'btn-search': '🔍 Realizar Búsquedas',
        'btn-new-search': '🔄 Nueva Búsqueda',
        'terms-counter': 'términos agregados',
        'loading': 'Procesando...',
        'loading-checking': 'Verificando ranking para',
        'results-title': 'Resultados de Búsqueda',
        'table-term': 'Término de Búsqueda',
        'table-rank': 'Posición en Ranking',
        'rank-not-found': 'No encontrado',
        'rank-error': 'Error en búsqueda'
    },
    en: {
        'app-title': '📱 ASO Ranking Monitor',
        'app-subtitle': 'Monitor your app ranking on Google Play Store',
        'change-language': 'Change Language:',
        'form-title': 'App Information',
        'label-package': 'App Package Name *',
        'label-location': 'Location *',
        'label-search-terms': 'Search Terms *',
        'select-country': 'Select a country',
        'placeholder-package': 'Ex: com.example.myapp',
        'placeholder-search': 'Type a term and press Enter',
        'help-package': 'Enter your app unique identifier (package name)',
        'help-search-terms': 'Add up to 10 search terms (press Enter or click Add)',
        'promo-text': 'To register and perform faster searches, download the App',
        'promo-btn': '📱 Download App',
        'btn-add-term': 'Add',
        'btn-search': '🔍 Search',
        'btn-new-search': '🔄 New Search',
        'terms-counter': 'terms added',
        'loading': 'Processing...',
        'loading-checking': 'Checking ranking for',
        'results-title': 'Search Results',
        'table-term': 'Search Term',
        'table-rank': 'Ranking Position',
        'rank-not-found': 'Not found',
        'rank-error': 'Search error'
    },
    de: {
        'app-title': '📱 ASO Ranking Monitor',
        'app-subtitle': 'Überwachen Sie Ihr App-Ranking im Google Play Store',
        'change-language': 'Sprache ändern:',
        'form-title': 'App-Informationen',
        'label-package': 'App-Paketname *',
        'label-location': 'Standort *',
        'label-search-terms': 'Suchbegriffe *',
        'select-country': 'Land auswählen',
        'placeholder-package': 'Z.B: com.beispiel.meineapp',
        'placeholder-search': 'Begriff eingeben und Enter drücken',
        'help-package': 'Geben Sie die eindeutige Kennung Ihrer App ein (Paketname)',
        'help-search-terms': 'Fügen Sie bis zu 10 Suchbegriffe hinzu (Enter drücken oder auf Hinzufügen klicken)',
        'promo-text': 'Um sich zu registrieren und schnellere Suchen durchzuführen, laden Sie die App herunter',
        'promo-btn': '📱 App herunterladen',
        'btn-add-term': 'Hinzufügen',
        'btn-search': '🔍 Suchen',
        'btn-new-search': '🔄 Neue Suche',
        'terms-counter': 'Begriffe hinzugefügt',
        'loading': 'Verarbeitung...',
        'loading-checking': 'Ranking überprüfen für',
        'results-title': 'Suchergebnisse',
        'table-term': 'Suchbegriff',
        'table-rank': 'Ranking-Position',
        'rank-not-found': 'Nicht gefunden',
        'rank-error': 'Suchfehler'
    },
    fr: {
        'app-title': '📱 Moniteur de Classement ASO',
        'app-subtitle': 'Surveillez le classement de votre application sur Google Play Store',
        'change-language': 'Changer de langue:',
        'form-title': 'Informations sur l\'application',
        'label-package': 'Nom du package *',
        'label-location': 'Emplacement *',
        'label-search-terms': 'Termes de recherche *',
        'select-country': 'Sélectionner un pays',
        'placeholder-package': 'Ex: com.exemple.monapp',
        'placeholder-search': 'Tapez un terme et appuyez sur Entrée',
        'help-package': 'Entrez l\'identifiant unique de votre application (nom du paquet)',
        'help-search-terms': 'Ajoutez jusqu\'à 10 termes de recherche (appuyez sur Entrée ou cliquez sur Ajouter)',
        'promo-text': 'Pour vous inscrire et effectuer des recherches plus rapides, téléchargez l\'App',
        'promo-btn': '📱 Télécharger l\'App',
        'btn-add-term': 'Ajouter',
        'btn-search': '🔍 Rechercher',
        'btn-new-search': '🔄 Nouvelle recherche',
        'terms-counter': 'termes ajoutés',
        'loading': 'Traitement...',
        'loading-checking': 'Vérification du classement pour',
        'results-title': 'Résultats de recherche',
        'table-term': 'Terme de recherche',
        'table-rank': 'Position de classement',
        'rank-not-found': 'Non trouvé',
        'rank-error': 'Erreur de recherche'
    },
    ko: {
        'app-title': '📱 ASO 순위 모니터',
        'app-subtitle': 'Google Play 스토어에서 앱 순위를 모니터링하세요',
        'change-language': '언어 변경:',
        'form-title': '앱 정보',
        'label-package': '앱 패키지 이름 *',
        'label-location': '위치 *',
        'label-search-terms': '검색어 *',
        'select-country': '국가 선택',
        'placeholder-package': '예: com.example.myapp',
        'placeholder-search': '검색어를 입력하고 Enter를 누르세요',
        'help-package': '앱의 고유 식별자를 입력하세요 (패키지 이름)',
        'help-search-terms': '최대 10개의 검색어를 추가하세요 (Enter를 누르거나 추가를 클릭)',
        'promo-text': '등록하고 더 빠른 검색을 수행하려면 앱을 다운로드하세요',
        'promo-btn': '📱 앱 다운로드',
        'btn-add-term': '추가',
        'btn-search': '🔍 검색',
        'btn-new-search': '🔄 새 검색',
        'terms-counter': '개 검색어 추가됨',
        'loading': '처리 중...',
        'loading-checking': '순위 확인 중',
        'results-title': '검색 결과',
        'table-term': '검색어',
        'table-rank': '순위',
        'rank-not-found': '찾을 수 없음',
        'rank-error': '검색 오류'
    },
    el: {
        'app-title': '📱 Παρακολούθηση Κατάταξης ASO',
        'app-subtitle': 'Παρακολουθήστε την κατάταξη της εφαρμογής σας στο Google Play Store',
        'change-language': 'Αλλαγή γλώσσας:',
        'form-title': 'Πληροφορίες Εφαρμογής',
        'label-package': 'Όνομα Πακέτου *',
        'label-location': 'Τοποθεσία *',
        'label-search-terms': 'Όροι Αναζήτησης *',
        'select-country': 'Επιλέξτε χώρα',
        'placeholder-package': 'Π.χ: com.example.myapp',
        'placeholder-search': 'Πληκτρολογήστε όρο και πατήστε Enter',
        'help-package': 'Εισαγάγετε το μοναδικό αναγνωριστικό της εφαρμογής σας (όνομα πακέτου)',
        'help-search-terms': 'Προσθέστε έως 10 όρους αναζήτησης (πατήστε Enter ή κάντε κλικ στο Προσθήκη)',
        'promo-text': 'Για να εγγραφείτε και να κάνετε ταχύτερες αναζητήσεις, κατεβάστε την εφαρμογή',
        'promo-btn': '📱 Λήψη App',
        'btn-add-term': 'Προσθήκη',
        'btn-search': '🔍 Αναζήτηση',
        'btn-new-search': '🔄 Νέα Αναζήτηση',
        'terms-counter': 'όροι προστέθηκαν',
        'loading': 'Επεξεργασία...',
        'loading-checking': 'Έλεγχος κατάταξης για',
        'results-title': 'Αποτελέσματα Αναζήτησης',
        'table-term': 'Όρος Αναζήτησης',
        'table-rank': 'Θέση Κατάταξης',
        'rank-not-found': 'Δεν βρέθηκε',
        'rank-error': 'Σφάλμα αναζήτησης'
    },
    fi: {
        'app-title': '📱 ASO-sijoitusten seuranta',
        'app-subtitle': 'Seuraa sovelluksesi sijoitusta Google Play Storessa',
        'change-language': 'Vaihda kieli:',
        'form-title': 'Sovelluksen tiedot',
        'label-package': 'Sovelluksen pakettitnimi *',
        'label-location': 'Sijainti *',
        'label-search-terms': 'Hakutermit *',
        'select-country': 'Valitse maa',
        'placeholder-package': 'Esim: com.esimerkki.sovellus',
        'placeholder-search': 'Kirjoita termi ja paina Enter',
        'help-package': 'Anna sovelluksesi yksilöllinen tunniste (paketin nimi)',
        'help-search-terms': 'Lisää enintään 10 hakutermiä (paina Enter tai napsauta Lisää)',
        'promo-text': 'Rekisteröityäksesi ja suorittaaksesi nopeampia hakuja, lataa sovellus',
        'promo-btn': '📱 Lataa sovellus',
        'btn-add-term': 'Lisää',
        'btn-search': '🔍 Hae',
        'btn-new-search': '🔄 Uusi haku',
        'terms-counter': 'termiä lisätty',
        'loading': 'Käsitellään...',
        'loading-checking': 'Tarkistetaan sijoitusta haulle',
        'results-title': 'Hakutulokset',
        'table-term': 'Hakutermi',
        'table-rank': 'Sijoitus',
        'rank-not-found': 'Ei löytynyt',
        'rank-error': 'Hakuvirhe'
    },
    pl: {
        'app-title': '📱 Monitor Rankingu ASO',
        'app-subtitle': 'Monitoruj ranking swojej aplikacji w Google Play Store',
        'change-language': 'Zmień język:',
        'form-title': 'Informacje o aplikacji',
        'label-package': 'Nazwa pakietu *',
        'label-location': 'Lokalizacja *',
        'label-search-terms': 'Terminy wyszukiwania *',
        'select-country': 'Wybierz kraj',
        'placeholder-package': 'Np: com.przyklad.mojaaplikacja',
        'placeholder-search': 'Wpisz termin i naciśnij Enter',
        'help-package': 'Wprowadź unikalny identyfikator aplikacji (nazwa pakietu)',
        'help-search-terms': 'Dodaj do 10 terminów wyszukiwania (naciśnij Enter lub kliknij Dodaj)',
        'promo-text': 'Aby zarejestrować się i wykonywać szybsze wyszukiwania, pobierz aplikację',
        'promo-btn': '📱 Pobierz aplikację',
        'btn-add-term': 'Dodaj',
        'btn-search': '🔍 Szukaj',
        'btn-new-search': '🔄 Nowe wyszukiwanie',
        'terms-counter': 'terminów dodanych',
        'loading': 'Przetwarzanie...',
        'loading-checking': 'Sprawdzanie rankingu dla',
        'results-title': 'Wyniki wyszukiwania',
        'table-term': 'Termin wyszukiwania',
        'table-rank': 'Pozycja w rankingu',
        'rank-not-found': 'Nie znaleziono',
        'rank-error': 'Błąd wyszukiwania'
    },
    it: {
        'app-title': '📱 Monitor Ranking ASO',
        'app-subtitle': 'Monitora il posizionamento della tua app su Google Play Store',
        'change-language': 'Cambia lingua:',
        'form-title': 'Informazioni App',
        'label-package': 'Nome pacchetto app *',
        'label-location': 'Posizione *',
        'label-search-terms': 'Termini di ricerca *',
        'select-country': 'Seleziona un paese',
        'placeholder-package': 'Es: com.esempio.miaapp',
        'placeholder-search': 'Digita un termine e premi Invio',
        'help-package': 'Inserisci l\'identificatore univoco della tua app (nome pacchetto)',
        'help-search-terms': 'Aggiungi fino a 10 termini di ricerca (premi Invio o fai clic su Aggiungi)',
        'promo-text': 'Per registrarti ed eseguire ricerche più veloci, scarica l\'App',
        'promo-btn': '📱 Scarica App',
        'btn-add-term': 'Aggiungi',
        'btn-search': '🔍 Cerca',
        'btn-new-search': '🔄 Nuova ricerca',
        'terms-counter': 'termini aggiunti',
        'loading': 'Elaborazione...',
        'loading-checking': 'Verifica posizione per',
        'results-title': 'Risultati della ricerca',
        'table-term': 'Termine di ricerca',
        'table-rank': 'Posizione in classifica',
        'rank-not-found': 'Non trovato',
        'rank-error': 'Errore di ricerca'
    }
};

// ========================================
// CORS PROXY CONFIGURATION
// ========================================
// Since we're fetching from Google Play Store directly, we'll face CORS issues.
// For GitHub Pages, we need to use a CORS proxy service.
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Alternative proxies (uncomment to use):
// const CORS_PROXY = 'https://corsproxy.io/?';
// const CORS_PROXY = 'https://api.codetabs.com/v1/proxy?quest=';

// BEST OPTION: Set up your own CORS proxy for production (see README.md)

// ========================================
// DOM ELEMENTS
// ========================================
const elements = {
    // Form elements
    packageNameInput: document.getElementById('packageName'),
    locationSelect: document.getElementById('location'),
    searchTermInput: document.getElementById('searchTermInput'),
    addTermBtn: document.getElementById('addTermBtn'),
    termsList: document.getElementById('termsList'),
    termsCounter: document.getElementById('termsCounter'),
    searchBtn: document.getElementById('searchBtn'),
    loadingIndicator: document.getElementById('loadingIndicator'),
    loadingStatus: document.getElementById('loadingStatus'),
    errorMessage: document.getElementById('errorMessage'),
    
    // Sections
    formSection: document.getElementById('formSection'),
    resultsSection: document.getElementById('resultsSection'),
    
    // Results elements
    appIcon: document.getElementById('appIcon'),
    appTitle: document.getElementById('appTitle'),
    appDescription: document.getElementById('appDescription'),
    rankingsTable: document.getElementById('rankingsTable'),
    newSearchBtn: document.getElementById('newSearchBtn'),
    mobileFormToggle: document.getElementById('mobileFormToggle')
};

// ========================================
// INITIALIZATION
// ========================================
function init() {
    setupEventListeners();
    setupLanguageSwitcher();
    loadFromLocalStorage();
    updateLanguage(state.currentLanguage);
}

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
    // Add term button
    elements.addTermBtn.addEventListener('click', addSearchTerm);
    
    // Add term on Enter key
    elements.searchTermInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSearchTerm();
        }
    });
    
    // Validate form on input changes
    elements.packageNameInput.addEventListener('input', validateForm);
    elements.locationSelect.addEventListener('change', validateForm);
    
    // Search button
    elements.searchBtn.addEventListener('click', performSearch);
    
    // Mobile form toggle
    elements.mobileFormToggle.addEventListener('click', toggleMobileForm);
}

// ========================================
// LANGUAGE SWITCHER
// ========================================
function setupLanguageSwitcher() {
    const langSelect = document.getElementById('languageSelect');
    
    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        updateLanguage(lang);
    });
}

function updateLanguage(lang) {
    state.currentLanguage = lang;
    
    // Update select value
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = lang;
    }
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update terms counter
    updateTermsCounter();
    
    // Save language preference
    localStorage.setItem('seoRankingMonitor_lang', lang);
}

// ========================================
// SEARCH TERMS MANAGEMENT
// ========================================
function addSearchTerm() {
    const term = elements.searchTermInput.value.trim();
    
    if (!term) {
        showError('Digite um termo de busca válido');
        return;
    }
    
    if (state.searchTerms.length >= 10) {
        showError('Limite máximo de 10 termos atingido');
        return;
    }
    
    if (state.searchTerms.includes(term)) {
        showError('Este termo já foi adicionado');
        return;
    }
    
    state.searchTerms.push(term);
    elements.searchTermInput.value = '';
    renderTermsList();
    validateForm();
    hideError();
}

function removeSearchTerm(term) {
    state.searchTerms = state.searchTerms.filter(t => t !== term);
    renderTermsList();
    validateForm();
}

function renderTermsList() {
    elements.termsList.innerHTML = state.searchTerms.map(term => `
        <div class="term-tag">
            <span>${term}</span>
            <button onclick="removeSearchTerm('${term.replace(/'/g, "\\'")}')">×</button>
        </div>
    `).join('');
    
    updateTermsCounter();
}

function updateTermsCounter() {
    const counterText = translations[state.currentLanguage]['terms-counter'] || 'terms added';
    elements.termsCounter.textContent = `${state.searchTerms.length}/10 ${counterText}`;
}

// ========================================
// FORM VALIDATION
// ========================================
function validateForm() {
    const packageName = elements.packageNameInput.value.trim();
    const location = elements.locationSelect.value;
    const hasTerms = state.searchTerms.length > 0;
    
    const isValid = packageName && location && hasTerms;
    elements.searchBtn.disabled = !isValid;
    
    return isValid;
}

// ========================================
// MAIN SEARCH FUNCTION
// ========================================
async function performSearch() {
    if (!validateForm()) return;
    
    // Save form data to state
    state.packageName = elements.packageNameInput.value.trim();
    state.location = elements.locationSelect.value;
    
    // Save to localStorage for persistence
    saveToLocalStorage();
    
    // Show loading
    showLoading('Buscando informações do app...');
    hideError();
    
    try {
        // Step 1: Fetch app metadata
        await fetchAppMetadata();
        
        // Step 2: Check rankings for each search term
        await checkRankings();
        
        // Step 3: Display results
        displayResults();
        
        hideLoading();
        
    } catch (error) {
        hideLoading();
        showError('Erro ao realizar a busca: ' + error.message);
        console.error('Search error:', error);
    }
}

// ========================================
// FETCH APP METADATA
// ========================================
async function fetchAppMetadata() {
    const url = `https://play.google.com/store/apps/details?id=${state.packageName}&hl=pt&gl=${state.location}`;
    const proxyUrl = CORS_PROXY + encodeURIComponent(url);
    
    try {
        const response = await fetch(proxyUrl, {
            method: 'GET',
            headers: {
                'Accept': 'text/html'
            }
        });
        
        if (!response.ok) {
            throw new Error('Falha ao buscar informações do app');
        }
        
        const html = await response.text();
        
        // Extract app title
        const titleMatch = html.match(/<h1[^>]*>\s*<span[^>]*>(.*?)<\/span>\s*<\/h1>/i);
        const title = titleMatch ? titleMatch[1].trim() : 'Título não encontrado';
        
        // Extract short description
        const shortDescMatch = html.match(/<meta itemprop="description" content="([^"]+)"/i);
        const shortDescription = shortDescMatch ? shortDescMatch[1].trim() : 'Descrição não encontrada';
        
        // Extract app icon from div.class "Mqg6jb Mhrnjf"
        const iconMatch = html.match(/<div[^>]*class="[^"]*Mqg6jb[^"]*"[^>]*>\s*<img[^>]*src="([^"]+)"/i) ||
                         html.match(/<img[^>]*class="[^"]*T75of[^"]*nm4vBd[^"]*"[^>]*src="([^"]+)"/i) ||
                         html.match(/<img[^>]*itemprop="image"[^>]*src="([^"]+)"/i);
        const iconUrl = iconMatch ? iconMatch[1].trim() : 'https://via.placeholder.com/120?text=App';
        
        state.appInfo = {
            title,
            description: shortDescription,
            iconUrl
        };
        
    } catch (error) {
        console.error('Error fetching app metadata:', error);
        throw new Error('Não foi possível obter as informações do app. Verifique se o package name está correto.');
    }
}

// ========================================
// CHECK RANKINGS
// ========================================
async function checkRankings() {
    state.rankings = [];
    const targetHref = `/store/apps/details?id=${state.packageName}`;
    
    for (let i = 0; i < state.searchTerms.length; i++) {
        const term = state.searchTerms[i];
        
        const checkingText = translations[state.currentLanguage]['loading-checking'] || 'Checking ranking for';
        updateLoadingStatus(`${checkingText} "${term}" (${i + 1}/${state.searchTerms.length})...`);
        
        const url = `https://play.google.com/store/search?q=${encodeURIComponent(term)}&c=apps&gl=${state.location}`;
        const proxyUrl = CORS_PROXY + encodeURIComponent(url);
        
        try {
            const response = await fetch(proxyUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'text/html'
                }
            });
            
            const html = await response.text();
            
            // Extract all app links using the same regex as example.gs
            const regex = /<a[^>]*class="Si6A0c Gy4nib"[^>]*href="([^"]+)"[^>]*>/g;
            const hrefs = [];
            let match;
            
            while ((match = regex.exec(html)) !== null) {
                hrefs.push(match[1]);
            }
            
            // Find the ranking position
            let rank = 'NF'; // Not Found
            for (let j = 0; j < hrefs.length; j++) {
                if (hrefs[j].includes(targetHref)) {
                    rank = j + 1;
                    break;
                }
            }
            
            state.rankings.push({
                term,
                rank
            });
            
            // Reduced delay to 300ms for faster results
            await sleep(300);
            
        } catch (error) {
            console.error(`Error checking ranking for "${term}":`, error);
            state.rankings.push({
                term,
                rank: 'Erro'
            });
        }
    }
}

// ========================================
// DISPLAY RESULTS
// ========================================
function displayResults() {
    // Update app info
    elements.appIcon.src = state.appInfo.iconUrl;
    elements.appIcon.alt = state.appInfo.title;
    elements.appTitle.textContent = state.appInfo.title;
    elements.appDescription.textContent = state.appInfo.description;
    
    // Render rankings table (desktop)
    const tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>${translations[state.currentLanguage]['table-term'] || 'Search Term'}</th>
                    <th>${translations[state.currentLanguage]['table-rank'] || 'Ranking Position'}</th>
                </tr>
            </thead>
            <tbody>
                ${state.rankings.map(r => `
                    <tr>
                        <td>${r.term}</td>
                        <td class="rank ${getRankClass(r.rank)}">${formatRank(r.rank)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    // Render rankings mobile layout
    const mobileHTML = `
        <div class="rankings-mobile">
            ${state.rankings.map(r => `
                <div class="ranking-item">
                    <div class="ranking-term">${r.term}</div>
                    <div class="ranking-result ${getRankClass(r.rank)}">${formatRank(r.rank)}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    elements.rankingsTable.innerHTML = tableHTML + mobileHTML;
    
    // Switch to results view - hide form completely on both mobile and desktop
    elements.formSection.style.display = 'none';
    elements.resultsSection.style.display = 'block';
}

// ========================================
// RANKING HELPERS
// ========================================
function getRankClass(rank) {
    if (rank === 'NF' || rank === 'Erro') return 'rank-not-found';
    
    const numRank = parseInt(rank);
    if (numRank >= 1 && numRank <= 5) return 'rank-green';
    if (numRank >= 6 && numRank <= 14) return 'rank-blue';
    if (numRank >= 15 && numRank <= 100) return 'rank-yellow';
    
    return 'rank-not-found';
}

function formatRank(rank) {
    const lang = state.currentLanguage;
    if (rank === 'NF') return translations[lang]['rank-not-found'] || 'Not found';
    if (rank === 'Erro') return translations[lang]['rank-error'] || 'Error';
    return `#${rank}`;
}

// ========================================
// UI HELPERS
// ========================================
function showLoading(message = 'Processando...') {
    elements.loadingIndicator.style.display = 'block';
    elements.loadingStatus.textContent = message;
    elements.searchBtn.disabled = true;
}

function hideLoading() {
    elements.loadingIndicator.style.display = 'none';
    elements.searchBtn.disabled = false;
    validateForm();
}

function updateLoadingStatus(message) {
    elements.loadingStatus.textContent = message;
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.style.display = 'block';
}

function hideError() {
    elements.errorMessage.style.display = 'none';
}

function resetToForm() {
    elements.resultsSection.style.display = 'none';
    elements.formSection.style.display = 'block';
    
    // Optionally clear the form
    // elements.packageNameInput.value = '';
    // elements.locationSelect.value = '';
    // state.searchTerms = [];
    // renderTermsList();
    // validateForm();
}

function toggleMobileForm() {
    // Toggle form visibility (same behavior for mobile and desktop now)
    if (elements.formSection.style.display === 'none') {
        elements.resultsSection.style.display = 'none';
        elements.formSection.style.display = 'block';
    } else {
        elements.formSection.style.display = 'none';
        elements.resultsSection.style.display = 'block';
    }
}

// ========================================
// LOCAL STORAGE
// ========================================
function saveToLocalStorage() {
    const data = {
        packageName: state.packageName,
        location: state.location,
        searchTerms: state.searchTerms
    };
    localStorage.setItem('seoRankingMonitor', JSON.stringify(data));
}

function loadFromLocalStorage() {
    // Load language preference
    const savedLang = localStorage.getItem('seoRankingMonitor_lang');
    if (savedLang) {
        state.currentLanguage = savedLang;
    }
    
    // Load form data
    const data = localStorage.getItem('seoRankingMonitor');
    if (data) {
        try {
            const parsed = JSON.parse(data);
            if (parsed.packageName) elements.packageNameInput.value = parsed.packageName;
            if (parsed.location) elements.locationSelect.value = parsed.location;
            if (parsed.searchTerms && Array.isArray(parsed.searchTerms)) {
                state.searchTerms = parsed.searchTerms;
                renderTermsList();
            }
            validateForm();
        } catch (e) {
            console.error('Error loading from localStorage:', e);
        }
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Make removeSearchTerm globally accessible for onclick handlers
window.removeSearchTerm = removeSearchTerm;

// ========================================
// APPS SHOWCASE
// ========================================
const appsData = [
    {
        name: 'Mensagens Bom Dia',
        packageId: 'com.mensagensbomdia.app',
        color: '#1E9C2E',
        icon: 'icons/mensagens_dia.png'
    },
    {
        name: 'Bíblia Sagrada',
        packageId: 'com.medinabibliasagrada.app',
        color: '#62361E',
        icon: 'icons/biblia.png'
    },
    {
        name: 'Mensagens de Natal',
        packageId: 'com.mensagens_de_natal.app',
        color: '#AF261C',
        icon: 'icons/natal.png'
    },
    {
        name: 'Mensagens Aniversário',
        packageId: 'com.mensagens_aniversario.app',
        color: '#536834',
        icon: 'icons/aniversario.png'
    },
    {
        name: 'Livro de Receitas',
        packageId: 'com.livro_de_receitas.app',
        color: '#C14442',
        icon: 'icons/receitas.png'
    },
    {
        name: 'Roleta da Sorte',
        packageId: 'com.roleta_da_sorte.app',
        color: '#561490',
        icon: 'icons/roleta.png'
    },
    {
        name: 'Frases de Tudo',
        packageId: 'com.mensagens_frases_de_tudo.app',
        color: '#D55AC1',
        icon: 'icons/tudo.png'
    },
    {
        name: 'Gerador de Senhas',
        packageId: 'com.gerador_de_senhas.app',
        color: '#36AB23',
        icon: 'icons/senhas.png'
    },
    {
        name: 'Versos Bíblicos',
        packageId: 'com.versosbiblicos.app',
        color: '#2196F3',
        icon: 'icons/versiculos.png'
    },
    {
        name: 'Frases Motivacionais',
        packageId: 'com.frasesmotivacionais.app',
        color: '#FF5722',
        icon: 'icons/motivacionais.png'
    },
    {
        name: 'Trechos de Músicas',
        packageId: 'com.trechosmusicas.app',
        color: '#FF2C26',
        icon: 'icons/musicas.png'
    },
    {
        name: 'Frases de Animes',
        packageId: 'com.frasesanimes.app',
        color: '#000000',
        icon: 'icons/animes.png'
    },
    {
        name: 'Horóscopo do Dia',
        packageId: 'com.horoscopo.dia.app',
        color: '#510482',
        icon: 'icons/horoscopo.png'
    },
    {
        name: 'Bom dia, Tarde e Noite',
        packageId: 'com.bomdia_boatarde_boanoite.app',
        color: '#003A7C',
        icon: 'icons/dia_tarde_noite.png'
    },
    {
        name: 'Mensagens Boa Tarde',
        packageId: 'com.mensagensboatarde.app',
        color: '#43221F',
        icon: 'icons/tarde.png'
    },
    {
        name: 'Mensagens Boa Noite',
        packageId: 'com.mensagensboanoite.app',
        color: '#120F46',
        icon: 'icons/noite.png'
    },
    {
        name: 'Frases de Games',
        packageId: 'com.frasesdegames.app',
        color: '#607D8B',
        icon: 'icons/games.png'
    },
    {
        name: 'Frases da Semana',
        packageId: 'com.frases_dias_da_semana.app',
        color: '#FA6147',
        icon: 'icons/semana.png'
    }
];

function loadAppsShowcase() {
    const appsGrid = document.getElementById('appsGrid');
    if (!appsGrid) return;

    // Create app cards with local icons
    appsData.forEach(app => {
        const card = document.createElement('a');
        card.className = 'app-card';
        card.href = `https://play.google.com/store/apps/details?id=${app.packageId}&hl=pt&gl=BR`;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        
        // App icon
        const img = document.createElement('img');
        img.className = 'app-card-icon';
        img.src = app.icon;
        img.alt = `${app.name} icon`;
        img.loading = 'lazy';
        
        // App name
        const name = document.createElement('h3');
        name.className = 'app-card-name';
        name.textContent = app.name;
        
        card.appendChild(img);
        card.appendChild(name);
        appsGrid.appendChild(card);
    });
}

// ========================================
// START APPLICATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    init();
    loadAppsShowcase();
});
