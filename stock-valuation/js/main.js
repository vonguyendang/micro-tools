/**
 * main.js
 * File chính để điều khiển giao diện và khởi tạo ứng dụng.
 */

// Khai báo các biến cho các bảng ở phạm vi toàn cục của file
let registeredTable, approvedTable, generalEventsTable, hoseEventsTable;

/**
 * Hiển thị tab được chọn và ẩn các tab khác.
 * Kích hoạt việc tải dữ liệu cho các tab mới khi chúng được mở lần đầu.
 * @param {string} tabId - ID của container tab cần hiển thị.
 */
function showTab(tabId) {
    // Ẩn tất cả các container
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.display = 'none';
        container.classList.remove('active-container');
    });

    // Bỏ trạng thái 'active' khỏi tất cả các nút tab
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Hiển thị container được chọn
    const selectedContainer = document.getElementById(tabId);
    if (selectedContainer) {
        selectedContainer.style.display = 'block';
        selectedContainer.classList.add('active-container');
    }

    // Đánh dấu nút tab được chọn là 'active'
    const selectedTab = document.querySelector(`.tab[onclick="showTab('${tabId}')"]`);
     if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Tải dữ liệu cho các tab mới khi được truy cập lần đầu tiên
    if (tabId === 'tab3' && !registeredTable) {
        initializeListingTabs();
    } else if (tabId === 'tab4' && !generalEventsTable && !hoseEventsTable) {
        initializeEventsTabs();
    }
}

/**
 * Hàm mới để mở URL của web trong một tab mới.
 * @param {string} url - Đường dẫn đến trang web.
 */
function openWebUrl(url) {
    window.open(url, '_blank');
}


// Lắng nghe sự kiện khi toàn bộ nội dung trang đã được tải xong
document.addEventListener('DOMContentLoaded', () => {
    // Hiển thị tab đầu tiên làm mặc định
    showTab('tab1');
});