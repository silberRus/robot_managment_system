
// Добавляем обработчик события для кнопки сохранения настроек
document.getElementById('save-settings').addEventListener('click', saveSettings);

// Заглушка для функции получения настроек с сервера
function fetchSettingsFromServer() {
    // В реальной системе здесь будет запрос к серверу
    console.log("Fetching settings from server...");
}

// Функция для обновления списка настроек
function updateSettingsList() {
    const listElement = document.getElementById('settings-list');
    listElement.innerHTML = ''; // Очистка списка

    // Добавление настроек в список (заглушка)
    for (const setting of settings) {
        listElement.innerHTML += `<div><label for="setting-${setting.key}">${setting.name}</label><input type="text" id="setting-${setting.key}" value="${setting.value}" /></div>`;
    }
}

// Функция для сохранения измененных настроек
function saveSettings() {
    // Здесь будет логика сохранения настроек (заглушка)
    console.log("Saving settings...");
}

// Заглушка для функции получения настроек с сервера
function fetchSettingsFromServer() {
    // В реальной системе здесь будет запрос к серверу
    console.log("Fetching settings from server...");
    return {
        retryAttempts: 3,
        pauseBetweenAttempts: 5, // in seconds
        // ... другие настройки
    };
}

function updateSettingsList() {
    const settings = fetchSettingsFromServer();
    const listElement = document.getElementById('settings-list');
    listElement.innerHTML = ''; // Очистка списка

    // Добавление настроек в список
    for (const setting in settings) {
        listElement.innerHTML += `
            <div>
                <span class="setting-label">\${setting}:</span>
                <input type="text" class="setting-input" id="setting-\${setting}" value="\${settings[setting]}" />
            </div>
        `;
    }
}



// Функция для обновления списка настроек на интерфейсе
function updateSettingsList(settings) {
    const listElement = document.getElementById('settings-list');
    listElement.innerHTML = ''; // Очистка списка

    // Добавление настроек в список
    for (const setting in settings) {
        listElement.innerHTML += `<div><span class="setting-label">\${setting}:</span> <input type="text" class="setting-input" id="setting-\${setting}" value="\${settings[setting]}" /></div>`;
    }
}

// Функция для сохранения настроек
function saveSettings() {
    // Здесь будет логика сохранения настроек на сервер (заглушка)
    console.log("Saving settings...");
}

// Добавляем обработчик события для кнопки сохранения настроек
document.getElementById('save-settings').addEventListener('click', saveSettings);

// Инициализация экрана настроек
function initSettingsSection() {
    const settings = fetchSettingsFromServer();
    updateSettingsList(settings);
}

// Инициализация экрана настроек
function initSettingsSection() {
    fetchSettingsFromServer();
    updateSettingsList();
}