const mq = window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme(mode='auto') {
    const isDark = mode === 'dark' || (mode === 'auto' && mq.matches);

    document.body.classList.toggle('theme-dark', isDark);
    document.body.classList.toggle('theme-light', !isDark);
}
(function() {
    const STORAGE_KEY = 'theme'; // values: 'light' | 'dark' | 'auto'
    const saved = localStorage.getItem(STORAGE_KEY) || 'auto';

    function createButtons() {
        // Create the container div
        const buttonContainer = document.createElement('div');
        buttonContainer.style.textAlign = 'right';

        // Create buttons
        const buttons = [
            { text: 'Auto', theme: 'auto' },
            { text: 'Light', theme: 'light' },
            { text: 'Dark', theme: 'dark' }
        ];

        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.textContent = btn.text;
            button.onclick = () => setTheme(btn.theme);
            buttonContainer.appendChild(button);
        });

        // Find the target div
        const targetDiv = document.querySelector('.markdown-preview-sizer.markdown-preview-section');
        targetDiv.insertBefore(buttonContainer, targetDiv.firstChild);
    }
    
    function init() {
        createButtons();
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