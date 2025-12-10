const mq = window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme(mode='auto') {
    const isDark = mode === 'dark' || (mode === 'auto' && mq.matches);

    document.body.classList.toggle('theme-dark', isDark);
    document.body.classList.toggle('theme-light', !isDark);
}
(function() {
    const STORAGE_KEY = 'theme'; // values: 'light' | 'dark' | 'auto'
    const saved = localStorage.getItem(STORAGE_KEY) || 'auto';
    
    function init() {
    applyTheme(saved);

    // Keep in sync with system only if in 'auto'
    function handleChange() {
        if ((localStorage.getItem(STORAGE_KEY) || 'auto') === 'auto') {
        applyTheme('auto');
        }
    }
    mq.addEventListener?.('change', handleChange);
    if (!mq.addEventListener && mq.addListener) {
        mq.addListener?.(handleChange); // older fallback
    }
    }

    document.addEventListener('DOMContentLoaded', init);
    
    // Expose toggles (optional)
    window.setTheme = function(mode, setIcon) {
    if (setIcon) {
        setThemeIcon(mode);
    }
    localStorage.setItem(STORAGE_KEY, mode);
    applyTheme(mode);
    };

})();

function setThemeIcon(theme) {
    let toAdd;
    switch (theme) {
        case 'dark':
            toRemove = ['auto', 'light'];
            break;
        case 'light':
            toAdd = 'fa-adjust';
            toRemove = ['dark', 'auto'];
            break;
        default:
            toRemove = ['light', 'dark'];
            break;
    }
    document.getElementById('theme-switch').classList.add(theme);
    document.getElementById('theme-switch').classList.remove(...toRemove);
}