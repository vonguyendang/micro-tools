// // File language-switcher.js
export function initLanguageSwitcher(changeLanguageCallback) {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLanguage = document.getElementById('currentLanguage');

    if (!languageBtn || !languageDropdown || !currentLanguage) {
        // console.error('Các phần tử language switcher không tồn tại');
        return;
    }

    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
        // console.log('Language button clicked, dropdown show:', languageDropdown.classList.contains('show')); // Debug log
    });

    languageDropdown.addEventListener('click', (e) => {
        console.log('Dropdown clicked'); // Thêm log
        const langItem = e.target.closest('[data-lang]');
        if (!langItem) {
            // console.log('No data-lang attribute found'); // Thêm log
            return;
        }

        e.preventDefault();
        const lang = langItem.getAttribute('data-lang');
        // console.log('Data-lang attribute value:', lang); // Thêm log

        languageDropdown.classList.remove('show');
        currentLanguage.textContent = lang.toUpperCase();
        localStorage.setItem('language', lang);
        if (changeLanguageCallback) {
            changeLanguageCallback(lang);
        }
        // console.log('Language selected:', lang); // Debug log
    });

    document.addEventListener('click', closeDropdown);
    window.addEventListener('scroll', closeDropdown);

    function closeDropdown() {
        if (languageDropdown.classList.contains('show')) {
            languageDropdown.classList.remove('show');
            // console.log('Dropdown closed'); // Debug log
        }
    }

    const defaultLang = localStorage.getItem('language') || 'en';
    currentLanguage.textContent = defaultLang.toUpperCase();
    if (changeLanguageCallback) {
        changeLanguageCallback(defaultLang);
    }
    // console.log('Initial language:', defaultLang); // Debug log
}