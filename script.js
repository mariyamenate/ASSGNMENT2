/**
 * Core function to create/update a cookie
 */
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    // Path=/ makes it available across the whole site
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/;SameSite=Lax";
}

/**
 * Core function to read a cookie
 */
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

// UI HANDLERS

function saveUserCookie() {
    const nameInput = document.getElementById('userNameInput');
    if (nameInput.value) {
        setCookie("username", nameInput.value, 7); // Save for 7 days
        refreshDisplay();
        nameInput.value = "";
    }
}

function setTheme(theme) {
    setCookie("user_theme", theme, 30); // Save for 30 days
    applyTheme(theme);
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function refreshDisplay() {
    const user = getCookie("username");
    document.getElementById('nameDisplay').innerText = user ? user : "Visitor";
}

function clearAllData() {
    setCookie("username", "", -1);   // Deletes by setting expiry to past
    setCookie("user_theme", "", -1); // Deletes by setting expiry to past
    location.reload();               // Reload to reset the UI
}

// Initializing the page
window.onload = function() {
    refreshDisplay();
    const savedTheme = getCookie("user_theme");
    if (savedTheme) applyTheme(savedTheme);
};