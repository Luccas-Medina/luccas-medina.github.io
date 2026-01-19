// ========================================
// STATE MANAGEMENT
// ========================================
const state = {
    currentGame: 'selection',
    rouletteOptions: [
        { text: 'Opção 1', color: '#FF6B6B' },
        { text: 'Opção 2', color: '#4ECDC4' },
        { text: 'Opção 3', color: '#45B7D1' }
    ],
    rouletteTitle: 'Roleta da Sorte',
    isSpinning: false,
    rotationAngle: 0,
    canvas: null,
    ctx: null
};

// Default colors for new options
const DEFAULT_COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80',
    '#EC7063', '#5DADE2', '#F39C12', '#9B59B6', '#1ABC9C'
];

// Preset options for quick start
const PRESET_OPTIONS = [
    {
        icon: '🎬',
        title: 'Filmes Populares',
        description: '8 filmes famosos',
        options: [
            'Star Wars',
            'Titanic',
            'Avatar',
            'Vingadores',
            'Harry Potter',
            'Senhor dos Anéis',
            'Jurassic Park',
            'Matrix'
        ]
    },
    {
        icon: '🍕',
        title: 'O Que Comer?',
        description: '10 opções de comida',
        options: [
            'Pizza',
            'Hambúrguer',
            'Sushi',
            'Macarrão',
            'Churrasco',
            'Comida Mexicana',
            'Comida Chinesa',
            'Salada',
            'Sanduíche',
            'Comida Italiana'
        ]
    },
    {
        icon: '🧹',
        title: 'Tarefas Domésticas',
        description: '8 tarefas comuns',
        options: [
            'Lavar Louça',
            'Varrer Casa',
            'Passar Roupa',
            'Limpar Banheiro',
            'Cozinhar',
            'Lavar Roupa',
            'Tirar Lixo',
            'Aspirar Carpete'
        ]
    },
    {
        icon: '📺',
        title: 'Séries Populares',
        description: '10 séries famosas',
        options: [
            'Breaking Bad',
            'Game of Thrones',
            'Stranger Things',
            'The Office',
            'Friends',
            'La Casa de Papel',
            'The Crown',
            'Black Mirror',
            'Peaky Blinders',
            'Dark'
        ]
    },
    {
        icon: '🎮',
        title: 'Jogos Populares',
        description: '8 jogos famosos',
        options: [
            'Minecraft',
            'Fortnite',
            'League of Legends',
            'GTA V',
            'Among Us',
            'Valorant',
            'Call of Duty',
            'FIFA'
        ]
    },
    {
        icon: '🎵',
        title: 'Gêneros Musicais',
        description: '8 estilos de música',
        options: [
            'Rock',
            'Pop',
            'Hip Hop',
            'Jazz',
            'Eletrônica',
            'Sertanejo',
            'Funk',
            'MPB'
        ]
    },
    {
        icon: '🏃',
        title: 'Atividades Físicas',
        description: '8 exercícios',
        options: [
            'Corrida',
            'Caminhada',
            'Natação',
            'Ciclismo',
            'Yoga',
            'Musculação',
            'Dança',
            'Futebol'
        ]
    },
    {
        icon: '🌍',
        title: 'Destinos de Viagem',
        description: '10 lugares famosos',
        options: [
            'Paris',
            'Nova York',
            'Tóquio',
            'Londres',
            'Rio de Janeiro',
            'Barcelona',
            'Dubai',
            'Roma',
            'Bali',
            'Maldivas'
        ]
    }
];

let colorIndex = 3; // Start after initial 3 colors

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Get canvas and context
    state.canvas = document.getElementById('rouletteCanvas');
    state.ctx = state.canvas.getContext('2d');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize preset carousel
    initializePresets();
    
    // Initial render
    renderOptionsPanel();
    drawRoulette();
}

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
    // Game selection
    document.querySelectorAll('.game-card:not(.disabled)').forEach(card => {
        card.addEventListener('click', () => {
            const game = card.dataset.game;
            if (game === 'roleta') {
                showRouletteGame();
            }
        });
    });
    
    // Back button
    document.getElementById('backToSelection').addEventListener('click', showGameSelection);
    
    // Title input
    document.getElementById('titleInput').addEventListener('input', (e) => {
        state.rouletteTitle = e.target.value || 'Roleta da Sorte';
        document.getElementById('rouletteTitle').textContent = state.rouletteTitle;
    });
    
    // Add option
    document.getElementById('addOptionBtn').addEventListener('click', addOption);
    document.getElementById('optionInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addOption();
        }
    });
    
    // Actions
    document.getElementById('clearAllBtn').addEventListener('click', clearAllOptions);
    document.getElementById('resetDefaultBtn').addEventListener('click', resetToDefault);
    
    // Spin button
    document.getElementById('spinButton').addEventListener('click', spinRoulette);
    
    // Preset carousel navigation
    document.getElementById('prevPreset').addEventListener('click', scrollPresetLeft);
    document.getElementById('nextPreset').addEventListener('click', scrollPresetRight);
}

// ========================================
// NAVIGATION
// ========================================
function showGameSelection() {
    document.getElementById('gameSelection').style.display = 'block';
    document.getElementById('rouletteGame').style.display = 'none';
    state.currentGame = 'selection';
}

function showRouletteGame() {
    document.getElementById('gameSelection').style.display = 'none';
    document.getElementById('rouletteGame').style.display = 'block';
    state.currentGame = 'roleta';
    
    // Redraw roulette to ensure it's visible
    setTimeout(() => {
        drawRoulette();
    }, 100);
}

// ========================================
// PRESET OPTIONS CAROUSEL
// ========================================
function initializePresets() {
    const container = document.getElementById('presetContainer');
    
    PRESET_OPTIONS.forEach((preset, index) => {
        const card = document.createElement('div');
        card.className = 'preset-card';
        card.innerHTML = `
            <div class="preset-icon">${preset.icon}</div>
            <h3>${preset.title}</h3>
            <p>${preset.description}</p>
            <span class="preset-badge">${preset.options.length} opções</span>
        `;
        
        card.addEventListener('click', () => loadPreset(index));
        container.appendChild(card);
    });
}

function loadPreset(presetIndex) {
    const preset = PRESET_OPTIONS[presetIndex];
    
    // Reset color index
    colorIndex = 0;
    
    // Create new options array with colors
    state.rouletteOptions = preset.options.map((optionText, index) => ({
        text: optionText,
        color: DEFAULT_COLORS[index % DEFAULT_COLORS.length]
    }));
    
    // Update color index
    colorIndex = preset.options.length;
    
    // Update title
    state.rouletteTitle = preset.title;
    document.getElementById('rouletteTitle').textContent = preset.title;
    document.getElementById('titleInput').value = preset.title;
    
    // Re-render
    renderOptionsPanel();
    drawRoulette();
    
    // Scroll to roulette
    setTimeout(() => {
        document.querySelector('.roulette-container').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}

function scrollPresetLeft() {
    const container = document.getElementById('presetContainer');
    container.scrollBy({ left: -220, behavior: 'smooth' });
}

function scrollPresetRight() {
    const container = document.getElementById('presetContainer');
    container.scrollBy({ left: 220, behavior: 'smooth' });
}

// ========================================
// OPTIONS MANAGEMENT
// ========================================
function addOption() {
    const input = document.getElementById('optionInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    const newOption = {
        text: text,
        color: DEFAULT_COLORS[colorIndex % DEFAULT_COLORS.length]
    };
    
    colorIndex++;
    state.rouletteOptions.push(newOption);
    
    input.value = '';
    renderOptionsPanel();
    drawRoulette();
}

function deleteOption(index) {
    if (state.rouletteOptions.length <= 2) {
        alert('A roleta precisa de pelo menos 2 opções!');
        return;
    }
    
    state.rouletteOptions.splice(index, 1);
    renderOptionsPanel();
    drawRoulette();
}

function updateOptionText(index, newText) {
    if (newText.trim()) {
        state.rouletteOptions[index].text = newText.trim();
        drawRoulette();
    }
}

function updateOptionColor(index, newColor) {
    state.rouletteOptions[index].color = newColor;
    drawRoulette();
}

function clearAllOptions() {
    if (confirm('Tem certeza que deseja limpar todas as opções?')) {
        state.rouletteOptions = [
            { text: 'Opção 1', color: DEFAULT_COLORS[0] }
        ];
        colorIndex = 1;
        renderOptionsPanel();
        drawRoulette();
    }
}

function resetToDefault() {
    state.rouletteOptions = [
        { text: 'Opção 1', color: '#FF6B6B' },
        { text: 'Opção 2', color: '#4ECDC4' },
        { text: 'Opção 3', color: '#45B7D1' }
    ];
    colorIndex = 3;
    document.getElementById('titleInput').value = '';
    state.rouletteTitle = 'Roleta da Sorte';
    document.getElementById('rouletteTitle').textContent = state.rouletteTitle;
    renderOptionsPanel();
    drawRoulette();
}

function renderOptionsPanel() {
    const optionsList = document.getElementById('optionsList');
    const optionsCount = document.getElementById('optionsCount');
    
    optionsCount.textContent = state.rouletteOptions.length;
    
    optionsList.innerHTML = '';
    
    state.rouletteOptions.forEach((option, index) => {
        const optionItem = document.createElement('div');
        optionItem.className = 'option-item';
        
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.className = 'option-color';
        colorPicker.value = option.color;
        colorPicker.addEventListener('change', (e) => {
            updateOptionColor(index, e.target.value);
        });
        
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.className = 'option-text';
        textInput.value = option.text;
        textInput.maxLength = 30;
        textInput.addEventListener('blur', (e) => {
            updateOptionText(index, e.target.value);
        });
        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.target.blur();
            }
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'option-delete';
        deleteBtn.innerHTML = '×';
        deleteBtn.addEventListener('click', () => deleteOption(index));
        
        optionItem.appendChild(colorPicker);
        optionItem.appendChild(textInput);
        optionItem.appendChild(deleteBtn);
        
        optionsList.appendChild(optionItem);
    });
}

// ========================================
// ROULETTE DRAWING (Adapted from Flutter)
// ========================================
function drawRoulette() {
    if (!state.ctx || !state.canvas) return;
    
    const ctx = state.ctx;
    const canvas = state.canvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save context state
    ctx.save();
    
    // Apply rotation
    ctx.translate(centerX, centerY);
    ctx.rotate(state.rotationAngle);
    ctx.translate(-centerX, -centerY);
    
    const numOptions = state.rouletteOptions.length;
    const sweepAngle = (2 * Math.PI) / numOptions;
    
    // Draw outer gold rim (casino style)
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 6, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw inner dark rim for depth
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 12, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw decorative gold details
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 16, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw roulette sections
    for (let i = 0; i < numOptions; i++) {
        const startAngle = i * sweepAngle - Math.PI / 2;
        const endAngle = startAngle + sweepAngle;
        
        // Draw section
        ctx.fillStyle = state.rouletteOptions[i].color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius - 20, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
        
        // Draw border between sections
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius - 20, startAngle, endAngle);
        ctx.closePath();
        ctx.stroke();
        
        // Draw text
        const textAngle = startAngle + sweepAngle / 2;
        const textRadius = (radius - 20) * 0.65;
        const textX = centerX + textRadius * Math.cos(textAngle);
        const textY = centerY + textRadius * Math.sin(textAngle);
        
        ctx.save();
        ctx.translate(textX, textY);
        ctx.rotate(textAngle + Math.PI / 2);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add shadow for better readability
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        ctx.fillText(state.rouletteOptions[i].text, 0, 0);
        
        ctx.restore();
    }
    
    // Draw center circle
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw gold border around center circle
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw star in the center
    drawStar(ctx, centerX, centerY, 18, '#FFD700');
    
    // Restore context state
    ctx.restore();
}

function drawStar(ctx, x, y, size, color) {
    const outerRadius = size;
    const innerRadius = size * 0.4;
    const points = 5;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    
    for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI / points) - Math.PI / 2;
        const px = x + radius * Math.cos(angle);
        const py = y + radius * Math.sin(angle);
        
        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    
    ctx.closePath();
    ctx.fill();
    
    // Add border to star
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

// ========================================
// SPIN ANIMATION
// ========================================
function spinRoulette() {
    if (state.isSpinning || state.rouletteOptions.length < 2) return;
    
    state.isSpinning = true;
    const spinButton = document.getElementById('spinButton');
    
    // Update button state
    spinButton.disabled = true;
    spinButton.classList.add('spinning');
    spinButton.querySelector('.spin-text').textContent = 'GIRANDO';
    
    // Calculate spin parameters (similar to Flutter version)
    const extraRotations = 5 + Math.random() * 3; // 5 to 8 full rotations
    const randomPosition = Math.random();
    const targetAngle = extraRotations * 2 * Math.PI + (randomPosition * 2 * Math.PI);
    
    const startAngle = state.rotationAngle;
    const endAngle = startAngle + targetAngle;
    const duration = 4000; // 4 seconds
    const startTime = Date.now();
    
    function animate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic curve
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        state.rotationAngle = startAngle + (targetAngle * easeProgress);
        drawRoulette();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Normalize angle
            state.rotationAngle = state.rotationAngle % (2 * Math.PI);
            
            // Reset button
            state.isSpinning = false;
            spinButton.disabled = false;
            spinButton.classList.remove('spinning');
            spinButton.querySelector('.spin-text').textContent = 'GIRAR';
        }
    }
    
    animate();
}

// ========================================
// CANVAS RESIZE HANDLER
// ========================================
window.addEventListener('resize', () => {
    if (state.currentGame === 'roleta') {
        drawRoulette();
    }
});
