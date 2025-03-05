// Carrega os contadores do localStorage
function loadCounters() {
    ['incidentCounter', 'requestCounter', 'ticketsCounter'].forEach(id => {
        const storedValue = localStorage.getItem(id);
        if (storedValue !== null) {
            document.getElementById(id).textContent = storedValue;
        } else {
            localStorage.setItem(id, 0);
        }
    });
    checkDailyReset();
    loadHistory();
}

// Incrementa o contador
function incrementCounter(counterId) {
    const counter = document.getElementById(counterId);
    let value = parseInt(counter.textContent) || 0;
    value++;
    counter.textContent = value;
    localStorage.setItem(counterId, value);
}

// Reseta o contador
function resetCounter(counterId) {
    document.getElementById(counterId).textContent = '0';
    localStorage.setItem(counterId, 0);
}

// Salva histórico diário antes de resetar
function saveHistory() {
    const date = new Date().toDateString();
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const dailyRecord = {
        date,
        incidents: localStorage.getItem('incidentCounter') || 0,
        requests: localStorage.getItem('requestCounter') || 0,
        tickets: localStorage.getItem('ticketsCounter') || 0
    };
    history.push(dailyRecord);
    localStorage.setItem('history', JSON.stringify(history));
}

// Verifica se precisa resetar diariamente
function checkDailyReset() {
    const lastReset = localStorage.getItem('lastReset');
    const currentDate = new Date().toDateString();
    
    if (!lastReset || lastReset !== currentDate) {
        saveHistory();
        ['incidentCounter', 'requestCounter', 'ticketsCounter'].forEach(id => {
            localStorage.setItem(id, 0);
            document.getElementById(id).textContent = '0';
        });
        localStorage.setItem('lastReset', currentDate);
        loadHistory();
    }
}

// Carrega o histórico
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';
    history.slice(-7).reverse().forEach(record => {
        const entry = document.createElement('div');
        entry.className = 'history-entry';
        entry.innerHTML = `<strong>${record.date}</strong> - Incidentes: ${record.incidents}, Solicitações: ${record.requests}, Tickets: ${record.tickets}`;
        historyContainer.appendChild(entry);
    });
}

// Inicializa os contadores
window.onload = loadCounters;

// Reseta automaticamente à meia-noite
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        checkDailyReset();
    }
}, 1000);
