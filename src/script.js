// Carrega os contadores do localStorage
function loadCounters() {
    ['callsCounter', 'ticketsCounter'].forEach(id => {
        const storedValue = localStorage.getItem(id);
        if (storedValue) {
            document.getElementById(id).textContent = storedValue;
        }
    });
    
    checkDailyReset();
}

// Incrementa o contador
function incrementCounter(counterId) {
    const counter = document.getElementById(counterId);
    let value = parseInt(counter.textContent) || 0;
    counter.textContent = ++value;
    localStorage.setItem(counterId, value);
}

// Reseta o contador
function resetCounter(counterId) {
    const counter = document.getElementById(counterId);
    counter.textContent = '0';
    localStorage.setItem(counterId, 0);
}

// Verifica se precisa resetar diariamente
function checkDailyReset() {
    const lastReset = localStorage.getItem('lastReset');
    const currentDate = new Date().toDateString();
    
    if (!lastReset || lastReset !== currentDate) {
        ['callsCounter', 'ticketsCounter'].forEach(id => {
            localStorage.setItem(id, 0);
            document.getElementById(id).textContent = '0';
        });
        localStorage.setItem('lastReset', currentDate);
    }
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
