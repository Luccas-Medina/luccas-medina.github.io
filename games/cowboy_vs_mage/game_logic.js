
/* =========================
        🎮 CLASSE BASE
========================= */
class Avatar {
    constructor(x = 0, y = 0, maxX = 9, maxY = 5, sprite = "🙂") {
        this._minX = 0;
        this._minY = 0;
        this._maxX = Math.max(0, maxX);
        this._maxY = Math.max(0, maxY);

        this._x = this._clampAxis(x, this._minX, this._maxX);
        this._y = this._clampAxis(y, this._minY, this._maxY);

        this._coins = 0;
        this._life = 10;
        this._damage = 1;
        this._alive = true;
        this._sprite = sprite;
    }

    _ensureAlive() {
        if (!this._alive) {
            throw new Error("Avatar está morto.");
        }
    }

    _clampAxis(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    _clampPosition() {
        this._x = this._clampAxis(this._x, this._minX, this._maxX);
        this._y = this._clampAxis(this._y, this._minY, this._maxY);
    }

    getX() { return this._x; }
    getY() { return this._y; }
    getCoins() { return this._coins; }
    getLife() { return this._life; }
    getDamage() { return this._damage; }
    getMaxX() { return this._maxX; }
    getMaxY() { return this._maxY; }
    getSprite() { return this._sprite; }

    forward() { this._ensureAlive(); this._y++; this._clampPosition(); }
    back() { this._ensureAlive(); this._y--; this._clampPosition(); }
    right() { this._ensureAlive(); this._x++; this._clampPosition(); }
    left() { this._ensureAlive(); this._x--; this._clampPosition(); }

    addCoin() {
        this._ensureAlive();
        this._coins++;
    }

    attack() {
        this._ensureAlive();
        return this._damage;
    }

    receiveAttack(dmg) {
        this._ensureAlive();

        this._life -= Math.max(0, dmg);
        if (this._life <= 0) {
            this._life = 0;
            this._alive = false;
        }
    }

    isAlive() {
        return this._alive;
    }
}

/* =========================
        🤠 SUBCLASSE COWBOY
========================= */
class Cowboy extends Avatar {
    constructor(x, y, maxX, maxY) {
        super(x, y, maxX, maxY, "🤠");
        this._ammo = 10;
        this._damage = 2;
    }

    getAmmo() {
        return this._ammo;
    }

    addAmmo(amount = 1) {
        this._ensureAlive();
        this._ammo += Math.max(0, amount);
        return this._ammo;
    }

    attack() {
        this._ensureAlive();

        if (this._ammo <= 0) {
            throw new Error("🤠 Sem munição! Use o botão de recarga.");
        }

        this._ammo--;
        return this._damage;
    }
}

/* =========================
        🧙🏽‍♂️ SUBCLASSE MAGO
========================= */
class Mago extends Avatar {
    constructor(x, y, maxX, maxY, onSpellsRestored = () => {}) {
        super(x, y, maxX, maxY, "🧙🏽‍♂️");
        this._maxSpells = 10;
        this._spells = this._maxSpells;
        this._damage = 3;

        this._restoreTimer = null;
        this._onSpellsRestored = onSpellsRestored;
    }

    getSpells() {
        return this._spells;
    }

    isRestoringSpells() {
        return this._restoreTimer !== null;
    }

    _scheduleRestore() {
        if (this._restoreTimer) return;

        this._restoreTimer = setTimeout(() => {
            this._spells = this._maxSpells;
            this._restoreTimer = null;
            this._onSpellsRestored();
        }, 10000);
    }

    attack() {
        this._ensureAlive();

        if (this._spells <= 0) {
            throw new Error("🧙🏽‍♂️ Feitiços esgotados. Aguarde recarga (10s).");
        }

        this._spells--;
        if (this._spells === 0) {
            this._scheduleRestore();
        }

        return this._damage;
    }
}

/* =========================
        🧠 GAME LOGIC
========================= */
const GRID_COLUMNS = 10;
const GRID_ROWS = 6;
const BULLET_SPEED_MS = 220;
const SPELL_VISIBLE_MS = 3000;

const cowboy = new Cowboy(1, 2, GRID_COLUMNS - 1, GRID_ROWS - 1);
const mage = new Mago(GRID_COLUMNS - 2, 2, GRID_COLUMNS - 1, GRID_ROWS - 1, () => {
    if (gameOver) return;
    setMageStatus("✨ Feitiços do mago restaurados.");
    updateUI();
});

const cowboyPosEl = document.getElementById("cowboyPos");
const cowboyLifeEl = document.getElementById("cowboyLife");
const cowboyAmmoEl = document.getElementById("cowboyAmmo");
const cowboyDamageEl = document.getElementById("cowboyDamage");

const magePosEl = document.getElementById("magePos");
const mageLifeEl = document.getElementById("mageLife");
const mageSpellsEl = document.getElementById("mageSpells");
const mageDamageEl = document.getElementById("mageDamage");

const limitsEl = document.getElementById("limits");
const cowboyStatusEl = document.getElementById("cowboyStatus");
const mageStatusEl = document.getElementById("mageStatus");
const arenaEl = document.getElementById("arena");
const controlButtons = document.querySelectorAll("[data-control]");

let gameOver = false;
let bulletTicker = null;

const bullets = [];
let activeSpells = [];

const movementMessages = {
    forward: "cima",
    back: "baixo",
    left: "esquerda",
    right: "direita"
};

function getStatusSetter(actor) {
    return actor === cowboy ? setCowboyStatus : setMageStatus;
}

function bindControls() {
    document.getElementById("btnCowboyUp").addEventListener("click", () => moveAvatar(cowboy, "forward", "🤠 Cowboy"));
    document.getElementById("btnCowboyDown").addEventListener("click", () => moveAvatar(cowboy, "back", "🤠 Cowboy"));
    document.getElementById("btnCowboyLeft").addEventListener("click", () => moveAvatar(cowboy, "left", "🤠 Cowboy"));
    document.getElementById("btnCowboyRight").addEventListener("click", () => moveAvatar(cowboy, "right", "🤠 Cowboy"));
    document.getElementById("btnCowboyShoot").addEventListener("click", cowboyShoot);
    document.getElementById("btnCowboyAmmo").addEventListener("click", cowboyFindAmmo);

    document.getElementById("btnMageUp").addEventListener("click", () => moveAvatar(mage, "forward", "🧙🏽‍♂️ Mago"));
    document.getElementById("btnMageDown").addEventListener("click", () => moveAvatar(mage, "back", "🧙🏽‍♂️ Mago"));
    document.getElementById("btnMageLeft").addEventListener("click", () => moveAvatar(mage, "left", "🧙🏽‍♂️ Mago"));
    document.getElementById("btnMageRight").addEventListener("click", () => moveAvatar(mage, "right", "🧙🏽‍♂️ Mago"));
    document.getElementById("btnMageCast").addEventListener("click", mageCastSpell);
}

function bindKeyboardControls() {
    document.addEventListener("keydown", event => {
        if (gameOver) return;

        const key = event.key.toLowerCase();
        const code = event.code;
        const keyMap = {
            w: () => moveAvatar(cowboy, "forward", "🤠 Cowboy"),
            s: () => moveAvatar(cowboy, "back", "🤠 Cowboy"),
            a: () => moveAvatar(cowboy, "left", "🤠 Cowboy"),
            d: () => moveAvatar(cowboy, "right", "🤠 Cowboy"),
            r: cowboyFindAmmo,
            arrowup: () => moveAvatar(mage, "forward", "🧙🏽‍♂️ Mago"),
            arrowdown: () => moveAvatar(mage, "back", "🧙🏽‍♂️ Mago"),
            arrowleft: () => moveAvatar(mage, "left", "🧙🏽‍♂️ Mago"),
            arrowright: () => moveAvatar(mage, "right", "🧙🏽‍♂️ Mago")
        };

        if (code === "Space") {
            event.preventDefault();
            cowboyShoot();
            return;
        }

        if (code === "Enter") {
            event.preventDefault();
            mageCastSpell();
            return;
        }

        if (!keyMap[key]) return;

        event.preventDefault();
        keyMap[key]();
    });
}

function isInsideGrid(x, y) {
    return x >= 0 && x <= cowboy.getMaxX() && y >= 0 && y <= cowboy.getMaxY();
}

function buildArena() {
    arenaEl.innerHTML = "";
    arenaEl.style.setProperty("--cols", cowboy.getMaxX() + 1);

    // Eixo Y invertido para cima ficar visualmente acima.
    for (let y = cowboy.getMaxY(); y >= 0; y--) {
        for (let x = 0; x <= cowboy.getMaxX(); x++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.dataset.x = String(x);
            tile.dataset.y = String(y);

            const coord = document.createElement("span");
            coord.className = "tile-coord";
            coord.textContent = `${x},${y}`;

            tile.appendChild(coord);
            arenaEl.appendChild(tile);
        }
    }
}

function tileAt(x, y) {
    return arenaEl.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`);
}

function clearDynamicEntities() {
    arenaEl.querySelectorAll(".entity").forEach(el => el.remove());
    arenaEl.querySelectorAll(".tile.active").forEach(tile => tile.classList.remove("active"));
}

function placeEntity(x, y, symbol, cssClass) {
    if (!isInsideGrid(x, y)) return;
    const tile = tileAt(x, y);
    if (!tile) return;

    const entity = document.createElement("span");
    entity.className = `entity ${cssClass}`;
    entity.textContent = symbol;

    tile.appendChild(entity);

    if (cssClass.includes("avatar")) {
        tile.classList.add("active");
    }
}

function renderArena() {
    clearDynamicEntities();
    clearExpiredSpells();

    activeSpells.forEach(spell => {
        placeEntity(spell.x, spell.y, "💥", "spell");
    });

    placeEntity(cowboy.getX(), cowboy.getY(), cowboy.getSprite(), "avatar cowboy");
    placeEntity(mage.getX(), mage.getY(), mage.getSprite(), "avatar mage");

    bullets.forEach(bullet => {
        placeEntity(bullet.x, bullet.y, "⚫", "bullet");
    });
}

function setPanelStatus(panelEl, message, tone = "info") {
    panelEl.textContent = message;
    panelEl.classList.remove("warn", "dead");

    if (tone === "warn") panelEl.classList.add("warn");
    if (tone === "dead") panelEl.classList.add("dead");
}

function setCowboyStatus(message, tone = "info") {
    setPanelStatus(cowboyStatusEl, message, tone);
}

function setMageStatus(message, tone = "info") {
    setPanelStatus(mageStatusEl, message, tone);
}

function toggleControls(disabled) {
    controlButtons.forEach(btn => {
        btn.disabled = disabled;
    });
}

function updateUI() {
    cowboyPosEl.textContent = `${cowboy.getX()}, ${cowboy.getY()}`;
    cowboyLifeEl.textContent = cowboy.getLife();
    cowboyAmmoEl.textContent = cowboy.getAmmo();
    cowboyDamageEl.textContent = cowboy.getDamage();

    magePosEl.textContent = `${mage.getX()}, ${mage.getY()}`;
    mageLifeEl.textContent = mage.getLife();
    mageSpellsEl.textContent = mage.getSpells();
    mageDamageEl.textContent = mage.getDamage();

    limitsEl.textContent = `Limites: X 0-${cowboy.getMaxX()} | Y 0-${cowboy.getMaxY()}`;

    if (gameOver) {
        toggleControls(true);
    }

    renderArena();
}

function showMobileWarningModal() {
    const existingModal = document.getElementById("mobileWarningModal");
    if (existingModal) {
        existingModal.remove();
    }

    const overlay = document.createElement("div");
    overlay.id = "mobileWarningModal";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "mobileWarningTitle");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "9998";
    overlay.style.display = "grid";
    overlay.style.placeItems = "center";
    overlay.style.padding = "16px";
    overlay.style.background = "rgba(20, 27, 35, 0.55)";
    overlay.style.backdropFilter = "blur(3px)";

    const card = document.createElement("div");
    card.style.width = "min(420px, 100%)";
    card.style.borderRadius = "16px";
    card.style.border = "1px solid rgba(255, 255, 255, 0.84)";
    card.style.background = "rgba(255, 255, 255, 0.94)";
    card.style.boxShadow = "0 16px 36px rgba(0, 0, 0, 0.22)";
    card.style.padding = "18px";
    card.style.textAlign = "center";

    const title = document.createElement("h2");
    title.id = "mobileWarningTitle";
    title.textContent = "💻 Dica de Experiência";
    title.style.margin = "0 0 10px";
    title.style.fontSize = "1.3rem";

    const message = document.createElement("p");
    message.textContent = "Este jogo foi otimizado para dispositivos desktop. Para a melhor experiência, acesse em um computador com teclado e mouse.";
    message.style.margin = "0 0 16px";
    message.style.fontWeight = "600";
    message.style.color = "#1f3550";
    message.style.lineHeight = "1.5";

    const continueButton = document.createElement("button");
    continueButton.type = "button";
    continueButton.textContent = "Entendi, continuar assim";
    continueButton.style.marginRight = "8px";
    continueButton.addEventListener("click", () => {
        overlay.remove();
    });

    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.textContent = "Voltar";
    backButton.style.background = "linear-gradient(180deg, #707070, #505050)";
    backButton.style.boxShadow = "0 7px 14px rgba(60, 60, 60, 0.24)";
    backButton.addEventListener("click", () => {
        window.history.back();
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "8px";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.flexWrap = "wrap";
    buttonContainer.appendChild(continueButton);
    buttonContainer.appendChild(backButton);

    card.append(title, message, buttonContainer);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    continueButton.focus();
}

function showGameOverModal(winnerName) {
    const existingModal = document.getElementById("gameOverModal");
    if (existingModal) {
        existingModal.remove();
    }

    const cowboyWon = winnerName.includes("Cowboy");
    const winnerLabel = cowboyWon ? "🤠 Cowboy venceu a batalha!" : "🧙🏽‍♂️ Mago venceu a batalha!";

    const overlay = document.createElement("div");
    overlay.id = "gameOverModal";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "gameOverTitle");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "9999";
    overlay.style.display = "grid";
    overlay.style.placeItems = "center";
    overlay.style.padding = "16px";
    overlay.style.background = "rgba(20, 27, 35, 0.55)";
    overlay.style.backdropFilter = "blur(3px)";

    const card = document.createElement("div");
    card.style.width = "min(420px, 100%)";
    card.style.borderRadius = "16px";
    card.style.border = "1px solid rgba(255, 255, 255, 0.84)";
    card.style.background = "rgba(255, 255, 255, 0.94)";
    card.style.boxShadow = "0 16px 36px rgba(0, 0, 0, 0.22)";
    card.style.padding = "18px";
    card.style.textAlign = "center";

    const title = document.createElement("h2");
    title.id = "gameOverTitle";
    title.textContent = "Fim da Batalha";
    title.style.margin = "0 0 10px";

    const message = document.createElement("p");
    message.textContent = winnerLabel;
    message.style.margin = "0 0 16px";
    message.style.fontWeight = "700";
    message.style.color = "#1f3550";

    const restartButton = document.createElement("button");
    restartButton.type = "button";
    restartButton.textContent = "Jogar Novamente";
    restartButton.addEventListener("click", () => {
        window.location.reload();
    });

    card.append(title, message, restartButton);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    restartButton.focus();
}

function finishGame(winnerName) {
    if (gameOver) return;
    gameOver = true;

    const cowboyWon = winnerName.includes("Cowboy");
    setCowboyStatus(cowboyWon ? "🏆 Cowboy venceu o duelo!" : "💀 Cowboy foi derrotado.", cowboyWon ? "info" : "dead");
    setMageStatus(cowboyWon ? "💀 Mago foi derrotado." : "🏆 Mago venceu o duelo!", cowboyWon ? "dead" : "info");
    toggleControls(true);

    if (bulletTicker) {
        clearInterval(bulletTicker);
        bulletTicker = null;
    }

    showGameOverModal(winnerName);
}

function applyDamage(attacker, target, damage, hitMessage, winnerNameIfDefeated) {
    if (!target.isAlive()) return;

    target.receiveAttack(damage);

    if (!target.isAlive()) {
        finishGame(winnerNameIfDefeated);
        return;
    }

    getStatusSetter(attacker)(hitMessage, "warn");
    getStatusSetter(target)(`💢 Recebeu ${damage} de dano.`, "warn");
}

function safeAction(action, onErrorStatus = () => {}) {
    if (gameOver) return;

    try {
        action();
    } catch (e) {
        onErrorStatus(e.message, "warn");
    }

    updateUI();
}

function moveAvatar(actor, direction, actorName) {
    const setStatusForActor = getStatusSetter(actor);

    safeAction(() => {
        const beforeX = actor.getX();
        const beforeY = actor.getY();

        actor[direction]();

        const blocked = beforeX === actor.getX() && beforeY === actor.getY();
        if (blocked) {
            setStatusForActor(`🧱 ${actorName} bateu no limite do mapa.`, "warn");
            return;
        }

        setStatusForActor(`${actorName} moveu para ${movementMessages[direction]}.`);
    }, setStatusForActor);
}

function clearExpiredSpells() {
    const now = Date.now();
    activeSpells = activeSpells.filter(spell => spell.expiresAt > now);
}

function advanceBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.x += 1;

        if (bullet.x > cowboy.getMaxX()) {
            bullets.splice(i, 1);
            continue;
        }

        if (mage.isAlive() && bullet.x === mage.getX() && bullet.y === mage.getY()) {
            bullets.splice(i, 1);
            applyDamage(cowboy, mage, bullet.damage, "⚫ Tiro acertou o mago!", "🤠 Cowboy");
        }
    }

    if (bullets.length === 0 && bulletTicker) {
        clearInterval(bulletTicker);
        bulletTicker = null;
    }

    updateUI();
}

function startBulletTicker() {
    if (bulletTicker || gameOver) return;
    bulletTicker = setInterval(advanceBullets, BULLET_SPEED_MS);
}

function cowboyShoot() {
    safeAction(() => {
        const damage = cowboy.attack();

        bullets.push({
            x: cowboy.getX(),
            y: cowboy.getY(),
            damage
        });

        setCowboyStatus("🤠 Disparo lançado para a direita.");

        // Avança imediatamente um passo para o tiro nascer já à frente do cowboy.
        advanceBullets();

        if (bullets.length > 0) {
            startBulletTicker();
        }
    }, setCowboyStatus);
}

function cowboyFindAmmo() {
    safeAction(() => {
        const ammo = cowboy.addAmmo(1);
        setCowboyStatus(`📦 Cowboy encontrou munição. Total: ${ammo}.`);
    }, setCowboyStatus);
}

function mageCastSpell() {
    safeAction(() => {
        const damage = mage.attack();

        const targets = [
            { x: mage.getX() - 1, y: mage.getY() },
            { x: mage.getX() - 1, y: mage.getY() - 1 },
            { x: mage.getX() - 1, y: mage.getY() + 1 }
        ].filter(pos => isInsideGrid(pos.x, pos.y));

        const expiresAt = Date.now() + SPELL_VISIBLE_MS;
        targets.forEach(pos => {
            activeSpells.push({ x: pos.x, y: pos.y, expiresAt });
        });

        const hitCowboy = targets.some(pos => pos.x === cowboy.getX() && pos.y === cowboy.getY());
        if (hitCowboy) {
            applyDamage(mage, cowboy, damage, "💥 Feitiço acertou o cowboy!", "🧙🏽‍♂️ Mago");
        } else {
            setMageStatus("🧙🏽‍♂️ Mago lançou feitiço em área.");
        }

        if (mage.getSpells() === 0) {
            setMageStatus("🪄 Feitiços esgotados. Recarga automática em 10s.", "warn");
        }

        setTimeout(() => {
            clearExpiredSpells();
            updateUI();
        }, SPELL_VISIBLE_MS + 50);
    }, setMageStatus);
}

buildArena();
bindControls();
bindKeyboardControls();
setCowboyStatus("⚔️ Pronto para o duelo.");
setMageStatus("⚔️ Pronto para o duelo.");
updateUI();

// Verificar se é dispositivo móvel/pequena tela e mostrar aviso
if (window.innerWidth < 980) {
    showMobileWarningModal();
}