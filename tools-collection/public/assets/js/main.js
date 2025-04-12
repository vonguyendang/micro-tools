// File main.js (đã chỉnh sửa - thêm console log trong displayTools)
import { tools } from './modules/tools.js';
import { initPagination } from './modules/pagination.js';
import { initLanguageSwitcher } from './modules/language-switcher.js';

// Khởi tạo biến
let currentPage = 1;
const toolsPerPage = 6;
let translations = {}; // Biến lưu trữ bản dịch
let updatePagination; // Khai báo biến updatePagination ở scope ngoài

// Lắng nghe sự kiện nhập liệu vào ô tìm kiếm
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
}

// Hàm xử lý tìm kiếm
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm
    const filteredTools = tools.filter(tool => {
        const currentLang = localStorage.getItem('language') || 'en';
        const titleTranslated = getNestedTranslation(currentLang, tool.title)?.toLowerCase() || tool.title.toLowerCase();
        const descTranslated = getNestedTranslation(currentLang, tool.description)?.toLowerCase() || tool.description.toLowerCase();
        const tagsLower = tool.tags.map(tag => tag.toLowerCase());

        let titleMatch = titleTranslated.includes(searchTerm);
        let descMatch = descTranslated.includes(searchTerm);
        const tagsMatch = tagsLower.includes(searchTerm);

        if (currentLang === 'vi') {
            const searchTermWithoutDiacritics = searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const titleTranslatedWithoutDiacritics = titleTranslated.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const descTranslatedWithoutDiacritics = descTranslated.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            titleMatch = titleMatch || titleTranslatedWithoutDiacritics.includes(searchTermWithoutDiacritics);
            descMatch = descMatch || descTranslatedWithoutDiacritics.includes(searchTermWithoutDiacritics);
        }

        return (
            titleMatch ||
            descMatch ||
            tagsMatch
        );
    });
    displayTools(currentPage, localStorage.getItem('language') || 'en', filteredTools);
    updatePagination(filteredTools); // Cập nhật pagination dựa trên kết quả tìm kiếm
}

// Hàm displayTools đã được chỉnh sửa để nhận tham số tools (nếu có)
function displayTools(page, lang, toolsToDisplay) {
    const toolsGrid = document.querySelector('.tools-grid');
    if (!toolsGrid) return;

    toolsGrid.innerHTML = '';

    const toolsSource = toolsToDisplay || tools; // Sử dụng toolsToDisplay nếu có, ngược lại dùng tools gốc
    const startIndex = (page - 1) * toolsPerPage;
    const endIndex = Math.min(startIndex + toolsPerPage, toolsSource.length);
    const paginatedTools = toolsSource.slice(startIndex, endIndex);

    const currentTranslations = translations[lang]?.tool || {}; // Thêm optional chaining

    paginatedTools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';

        const tagsHTML = tool.tags.map(tag =>
            `<span class="tool-card-tag">${tag}</span>`
        ).join('');

        const toolTitle = getNestedTranslation(lang, tool.title) || tool.title;
        const toolDesc = getNestedTranslation(lang, tool.description) || tool.description;

        toolCard.innerHTML = `
            <a href="${tool.link}" class="tool-card-link" target="_blank">
                <div class="tool-card-image">
                    <img src="${tool.image}" alt="${toolTitle}" loading="lazy">
                </div>
                <div class="tool-card-content">
                    <h3 class="tool-card-title">${toolTitle}</h3>
                    <p class="tool-card-description">${toolDesc}</p>
                    <div class="tool-card-tags">${tagsHTML}</div>
                </div>
            </a>
        `;

        toolsGrid.appendChild(toolCard);
    });

    const totalPages = Math.ceil(toolsSource.length / toolsPerPage);
    const paginationDiv = document.getElementById('pagination');
    if (paginationDiv) {
        paginationDiv.style.display = totalPages > 1 ? 'flex' : 'none';
    }

    if (toolsSource.length > toolsPerPage) {
        updatePagination(toolsSource); // Cập nhật pagination với danh sách đã lọc
    } else {
        // Nếu không có phân trang, có thể ẩn các nút đi
        const paginationDiv = document.getElementById('pagination');
        if (paginationDiv) {
            paginationDiv.style.display = 'none';
        }
    }
}

// Hàm thay đổi ngôn ngữ
function changeLanguage(lang) {
    if (!translations[lang]) return; // Kiểm tra ngôn ngữ có tồn tại

    localStorage.setItem('language', lang);
    document.getElementById('currentLanguage').textContent = lang.toUpperCase();

    // Cập nhật tất cả phần tử có thuộc tính data-translate
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const text = getNestedTranslation(lang, key);
        if (el.tagName === 'INPUT' && el.type === 'text') {
            el.placeholder = text || el.getAttribute('placeholder'); // Cập nhật placeholder cho input
        } else if (text) {
            el.textContent = text;
        }
    });

    displayTools(currentPage, lang);
}

// Hàm helper để lấy bản dịch theo nested path
function getNestedTranslation(lang, path) {
    console.log(`getNestedTranslation called with lang: ${lang}, path: ${path}`); // Thêm log
    return path.split('.').reduce((obj, key) => obj?.[key], translations[lang]);
}

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load translations
        const [en, vi] = await Promise.all([
            fetch('../locales/en.json').then(r => r.json()),
            fetch('../locales/vi.json').then(r => r.json())
        ]);

        translations = { en, vi };

        // Khởi tạo pagination trước
        ({ updatePagination } = initPagination(tools, toolsPerPage, currentPage, displayTools));

        // Sau khi pagination đã được khởi tạo, chúng ta mới gọi language switcher
        initLanguageSwitcher(changeLanguage);

        // Thiết lập ngôn ngữ mặc định
        const defaultLang = localStorage.getItem('language') || 'en';
        changeLanguage(defaultLang);

        // Xử lý scroll header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (header) {
                header.style.boxShadow = window.scrollY > 50
                    ? '0 4px 20px rgba(0, 0, 0, 0.1)'
                    : '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
        });

        // Xử lý sự kiện click cho các liên kết mạng xã hội
        // Thêm event listener cho các liên kết mạng xã hội ở footer
        const footer = document.querySelector('.footer'); // Hoặc phần tử cha chứa các liên kết
        if (footer) {
        footer.addEventListener('click', (event) => {
            const link = event.target.closest('.social-link'); // Tìm thẻ a gần nhất được click
                if (link) {
                    event.preventDefault(); // Ngăn chặn hành vi mặc định
                    const url = link.getAttribute('data-url'); // Lấy URL từ thuộc tính data-url
                    if (url) {
                        window.open(url, '_blank'); // Mở liên kết
                    }
                }
            });
        }

    } catch (error) {
        console.error('Lỗi khi khởi tạo ứng dụng:', error);
        // Fallback: vẫn hiển thị trang với ngôn ngữ mặc định
        displayTools(currentPage, 'en');
    }
});
// Gọi displayTools lần đầu khi trang tải
displayTools(currentPage, localStorage.getItem('language') || 'en');

function openFacebook(event) {
event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
// Thực hiện hành động khác, ví dụ: mở liên kết trong một cửa sổ mới
window.open('https://www.facebook.com/vodang2702', '_blank');
}

function openGithub(event) {
event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
// Thực hiện hành động khác, ví dụ: mở liên kết trong một cửa sổ mới
window.open('https://github.com/vonguyendang', '_blank');
}
function openTwitter(event) {
event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
// Thực hiện hành động khác, ví dụ: mở liên kết trong một cửa sổ mới
window.open('https://twitter.com/vodang2702', '_blank');
}
function openDev(event) {
event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
// Thực hiện hành động khác, ví dụ: mở liên kết trong một cửa sổ mới
window.open('https://dev.to/vonguyendang', '_blank');
}
