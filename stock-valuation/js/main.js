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
    } else if (tabId === 'tab-admin') {
        initializeAdminTab();
    }
}

/**
 * Hàm mới để mở URL của web trong một tab mới.
 * @param {string} url - Đường dẫn đến trang web.
 */
function openWebUrl(url) {
    window.open(url, '_blank');
}

/**
 * Hàm mới để mở iframe PTKT ở chế độ toàn màn hình.
 */
function openFullscreenPTKT() {
    const iframe = document.getElementById('ptkt-iframe');
    if (iframe) {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) { /* Safari */
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { /* IE11 */
            iframe.msRequestFullscreen();
        } else {
             alert('Trình duyệt của bạn không hỗ trợ chế độ toàn màn hình.');
        }
    }
}

// =================================================================
// LOGIC KHU VỰC THÔNG BÁO (CẬP NHẬT)
// =================================================================

/**
 * Tìm ngày đáo hạn phái sinh tiếp theo (Thứ 5 tuần thứ 3 của tháng).
 * @returns {Date} Đối tượng Date cho ngày đáo hạn tiếp theo.
 */
function getNextDerivativeExpirationDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let year = today.getFullYear();
    let month = today.getMonth();

    for (let i = 0; i < 24; i++) {
        const firstDayOfMonth = new Date(year, month, 1);
        const dayOfWeek = firstDayOfMonth.getDay();

        const daysUntilFirstThursday = (4 - dayOfWeek + 7) % 7;
        const firstThursday = 1 + daysUntilFirstThursday;

        const thirdThursday = firstThursday + 14;

        const expirationDate = new Date(year, month, thirdThursday);

        if (expirationDate >= today) {
            return expirationDate;
        }

        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
    }
    return null;
}

/**
 * Tạo nội dung HTML cho thông báo đáo hạn phái sinh tự động.
 * @returns {string|null} Chuỗi HTML của thông báo, hoặc null nếu không có.
 */
function generateDerivativeNotification() {
    const expirationDate = getNextDerivativeExpirationDate();
    if (!expirationDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const timeDiff = expirationDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Bỏ qua nếu đã qua ngày đáo hạn
    if (daysRemaining < 0) return null;

    const day = String(expirationDate.getDate()).padStart(2, '0');
    const month = String(expirationDate.getMonth() + 1).padStart(2, '0');
    const year = expirationDate.getFullYear();

    const expirationMonth = expirationDate.getMonth() + 1;
    const isQuarterlyMonth = [3, 6, 9, 12].includes(expirationMonth);
    const icon = isQuarterlyMonth ? '🔥🔥🔥' : '🔥';
    
    let countdownText = "";
    if (daysRemaining > 1) {
        countdownText = `, đếm ngược còn ${daysRemaining} ngày nữa!`;
    } else if (daysRemaining === 1) {
        countdownText = `, đếm ngược còn 1 ngày nữa!`;
    } else if (daysRemaining === 0) {
        countdownText = `, đáo hạn HÔM NAY!`;
    }

    // *** LOGIC MỚI ĐỂ CHỌN LOẠI THÔNG BÁO ***
    let notificationType = 'info'; // Mặc định
    if (daysRemaining <= 3) {
        notificationType = 'alert'; // Dưới 3 ngày: Báo động (Đỏ)
    } else if (daysRemaining <= 7) {
        notificationType = 'warning'; // Dưới 7 ngày: Cảnh báo (Vàng)
    } else if (daysRemaining < 14) {
        notificationType = 'info'; // Dưới 14 ngày: Thông tin (Xanh dương)
    } else { // >= 14 ngày
        notificationType = 'success'; // Trên 14 ngày: Thành công (Xanh lá)
    }
    // *** KẾT THÚC LOGIC MỚI ***

    const message = `Chú ý: Đáo hạn phái sinh vào Thứ Năm, ngày ${day}/${month}/${year}${countdownText}`;
    
    return `<div class="notification-item type-${notificationType}"><span class="notification-icon">${icon}</span><span class="notification-text">${message}</span></div>`;
}


/**
 * Lấy các thông báo tùy chỉnh từ file JSON trên server.
 * @returns {Promise<string>} Một Promise trả về chuỗi HTML chứa các thông báo.
 */
async function fetchCustomNotifications() {
    try {
        const response = await fetch('api/notifications.php', { cache: 'no-store' });
        if (!response.ok) throw new Error(`Lỗi mạng: ${response.statusText}`);
        
        const notifications = await response.json();
        
        if (Array.isArray(notifications)) {
            const icons = {
                info: '📢',
                success: '✅',
                warning: '⚠️',
                alert: '🚨'
            };

            return notifications
                .filter(n => n.active && n.message)
                .map(n => {
                    const type = n.type || 'info';
                    const icon = icons[type] || '📢';
                    return `<div class="notification-item type-${type}"><span class="notification-icon">${icon}</span><span class="notification-text">${n.message}</span></div>`;
                })
                .join('');
        }
        return '';
    } catch (e) {
        console.error("Lỗi khi tải thông báo tùy chỉnh:", e);
        return `<div class="notification-item type-alert"><span class="notification-icon">⚠️</span><span class="notification-text">Không thể tải các thông báo tùy chỉnh.</span></div>`;
    }
}

/**
 * Hiển thị tất cả các thông báo hợp lệ trong khu vực thông báo.
 */
async function displayNotifications() {
    const notificationBar = document.getElementById('notification-bar');
    if (!notificationBar) return;

    const customMsgs = await fetchCustomNotifications();
    const derivativeMsg = generateDerivativeNotification();

    // Hiển thị thông báo tùy chỉnh trước, sau đó đến thông báo phái sinh
    let allMessagesHTML = customMsgs + (derivativeMsg || '');

    if (allMessagesHTML) {
        notificationBar.innerHTML = allMessagesHTML;
        notificationBar.style.display = 'block';
    } else {
        notificationBar.style.display = 'none';
    }
}

// Lắng nghe sự kiện khi toàn bộ nội dung trang đã được tải xong
document.addEventListener('DOMContentLoaded', () => {
    showTab('tab1');
    displayNotifications();
});