// // File language-switcher.js
// export function initLanguageSwitcher(translations) {
//     const languageBtn = document.getElementById('languageBtn');
//     const languageDropdown = document.getElementById('languageDropdown');
//     const currentLanguage = document.getElementById('currentLanguage');

//     // Kiểm tra các phần tử tồn tại
//     if (!languageBtn || !languageDropdown || !currentLanguage) {
//         console.error('Các phần tử language switcher không tồn tại');
//         return;
//     }

//     // Hàm thay đổi ngôn ngữ
//     const changeLanguage = (lang) => {
//         // Cập nhật UI
//         currentLanguage.textContent = lang.toUpperCase();
        
//         // Cập nhật nội dung trang
//         updatePageContent(lang, translations);
        
//         // Lưu ngôn ngữ vào localStorage
//         localStorage.setItem('preferredLanguage', lang);
//     };

//     // Toggle dropdown
//     languageBtn.addEventListener('click', (e) => {
//         e.stopPropagation();
//         languageDropdown.classList.toggle('show');
//     });

//     // Xử lý chọn ngôn ngữ
//     languageDropdown.addEventListener('click', (e) => {
//         const langItem = e.target.closest('[data-lang]');
//         if (!langItem) return;
        
//         e.preventDefault();
//         const lang = langItem.getAttribute('data-lang');
        
//         languageDropdown.classList.remove('show');
//         changeLanguage(lang);
//     });

//     // Đóng dropdown khi click/scroll
//     document.addEventListener('click', closeDropdown);
//     window.addEventListener('scroll', closeDropdown);

//     function closeDropdown() {
//         languageDropdown.classList.remove('show');
//     }

//     // Khởi tạo ngôn ngữ mặc định
//     const defaultLang = localStorage.getItem('preferredLanguage') || 'en';
//     changeLanguage(defaultLang);
// }

// // Hàm cập nhật nội dung trang
// function updatePageContent(lang, translations) {
//     const elements = document.querySelectorAll('[data-translate]');
    
//     elements.forEach(el => {
//         const key = el.getAttribute('data-translate');
//         const text = getNestedValue(translations[lang], key);
//         if (text) el.textContent = text;
//     });
// }

// // Hàm lấy giá trị từ object theo path (vd: 'nav.tools')
// function getNestedValue(obj, path) {
//     return path.split('.').reduce((o, p) => o?.[p], obj);
// }
// File language-switcher.js (đã chỉnh sửa - thêm log để debug)
export function initLanguageSwitcher(changeLanguageCallback) {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLanguage = document.getElementById('currentLanguage');

    if (!languageBtn || !languageDropdown || !currentLanguage) {
        console.error('Các phần tử language switcher không tồn tại');
        return;
    }

    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
        console.log('Language button clicked, dropdown show:', languageDropdown.classList.contains('show')); // Debug log
    });

    languageDropdown.addEventListener('click', (e) => {
        console.log('Dropdown clicked'); // Thêm log
        const langItem = e.target.closest('[data-lang]');
        if (!langItem) {
            console.log('No data-lang attribute found'); // Thêm log
            return;
        }

        e.preventDefault();
        const lang = langItem.getAttribute('data-lang');
        console.log('Data-lang attribute value:', lang); // Thêm log

        languageDropdown.classList.remove('show');
        currentLanguage.textContent = lang.toUpperCase();
        localStorage.setItem('language', lang);
        if (changeLanguageCallback) {
            changeLanguageCallback(lang);
        }
        console.log('Language selected:', lang); // Debug log
    });

    document.addEventListener('click', closeDropdown);
    window.addEventListener('scroll', closeDropdown);

    function closeDropdown() {
        if (languageDropdown.classList.contains('show')) {
            languageDropdown.classList.remove('show');
            console.log('Dropdown closed'); // Debug log
        }
    }

    const defaultLang = localStorage.getItem('language') || 'en';
    currentLanguage.textContent = defaultLang.toUpperCase();
    if (changeLanguageCallback) {
        changeLanguageCallback(defaultLang);
    }
    console.log('Initial language:', defaultLang); // Debug log
}