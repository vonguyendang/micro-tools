/**
 * tab-admin.js
 * Chứa mã nguồn cho chức năng Tab Quản lý.
 */

// Biến toàn cục để lưu trữ dữ liệu
let globalNotifications = [];
let adminPortfolios = {}; // Biến riêng cho tab admin để tránh xung đột

/**
 * Hiển thị tab con được chọn trong mục Quản lý.
 * @param {string} subTabId - ID của tab con cần hiển thị.
 */
function showAdminSubTab(subTabId) {
    document.querySelectorAll('.admin-sub-container').forEach(c => c.classList.remove('active'));
    document.getElementById(subTabId).classList.add('active');
    
    document.querySelectorAll('#tab-admin .period-tab').forEach(b => b.classList.remove('active'));
    document.querySelector(`#tab-admin .period-tab[onclick="showAdminSubTab('${subTabId}')"]`).classList.add('active');
}

/**
 * Khởi tạo Tab Quản lý.
 */
function initializeAdminTab() {
    const adminPasswordInput = document.getElementById('admin-password');
    if (adminPasswordInput) {
        adminPasswordInput.addEventListener('keyup', (event) => {
            if (event.key === "Enter") {
                loginAdmin();
            }
        });
    }
    checkAdminLoginState();
}

/**
 * Kiểm tra trạng thái đăng nhập của admin từ sessionStorage.
 */
function checkAdminLoginState() {
    if (sessionStorage.getItem('admin_loggedIn') === 'true') {
        document.getElementById('admin-login-view').style.display = 'none';
        document.getElementById('admin-main-view').style.display = 'block';
        showAdminSubTab('admin-notifications'); // Hiển thị tab con đầu tiên
        loadAndRenderNotifications();
        initializeAdminTools();
    } else {
        document.getElementById('admin-login-view').style.display = 'block';
        document.getElementById('admin-main-view').style.display = 'none';
    }
}

/**
 * Xử lý đăng nhập của Admin.
 */
function loginAdmin() {
    if (typeof md5 !== 'function') {
        alert("Lỗi: Hàm md5 không tồn tại.");
        return;
    }
    const password = document.getElementById('admin-password').value.trim();
    if (!password) {
        alert("Vui lòng nhập mật khẩu.");
        return;
    }
    const passHash = md5(password);
    const ADMIN_PASS_HASH = "5f4dcc3b5aa765d61d8327deb882cf99"; 

    if (passHash === ADMIN_PASS_HASH) {
        sessionStorage.setItem('admin_loggedIn', 'true');
        checkAdminLoginState();
    } else {
        alert("Mật khẩu Admin không đúng!");
    }
}

/**
 * Xử lý đăng xuất Admin.
 */
function logoutAdmin() {
    sessionStorage.removeItem('admin_loggedIn');
    document.getElementById('admin-password').value = '';
    checkAdminLoginState();
}

// =================================================================
// QUẢN LÝ THÔNG BÁO
// =================================================================

async function loadAndRenderNotifications() {
    try {
        const response = await fetch('api/notifications.php', { cache: 'no-store' });
        if (!response.ok) throw new Error('Không thể tải danh sách thông báo.');
        
        globalNotifications = await response.json();
        const tableBody = document.getElementById('admin-notifications-table').querySelector('tbody');
        tableBody.innerHTML = '';

        if (!Array.isArray(globalNotifications) || globalNotifications.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" class="placeholder-text">Chưa có thông báo nào.</td></tr>`;
            return;
        }

        const typeLabels = {
            info: 'Thông tin', success: 'Thành công',
            warning: 'Cảnh báo', alert: 'Báo động'
        };

        globalNotifications.forEach((noti, index) => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td class="message-col">${noti.message}</td>
                <td class="type-col">${typeLabels[noti.type] || 'Chung'}</td>
                <td class="status-col">${noti.active ? '<span class="price-up">Hoạt động</span>' : '<span class="price-down">Đã tắt</span>'}</td>
                <td class="actions-col">
                    <button class="edit-btn" onclick="showEditNotificationModal(${index})" title="Sửa"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" onclick="deleteNotification(${index})" title="Xóa"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
        });
    } catch (error) {
        console.error("Lỗi khi tải thông báo:", error);
        alert(error.message);
    }
}

function showAddNotificationModal() {
    const modalTitle = document.getElementById('notification-modal-title');
    // Thêm kiểm tra để đảm bảo code không bị crash
    if (!modalTitle) {
        alert("Lỗi: Không tìm thấy thành phần HTML của modal. Vui lòng kiểm tra lại file index.html.");
        return;
    }
    modalTitle.textContent = 'Thêm Thông báo Mới';
    document.getElementById('notification-message').value = '';
    document.getElementById('notification-type').value = 'info';
    document.getElementById('notification-active').checked = true;
    document.getElementById('edit-notification-index').value = '';
    showModal('notification-modal');
}

function showEditNotificationModal(index) {
    const modalTitle = document.getElementById('notification-modal-title');
    // Thêm kiểm tra để đảm bảo code không bị crash
    if (!modalTitle) {
        alert("Lỗi: Không tìm thấy thành phần HTML của modal. Vui lòng kiểm tra lại file index.html.");
        return;
    }
    const noti = globalNotifications[index];
    modalTitle.textContent = 'Sửa Thông báo';
    document.getElementById('notification-message').value = noti.message;
    document.getElementById('notification-type').value = noti.type || 'info';
    document.getElementById('notification-active').checked = noti.active;
    document.getElementById('edit-notification-index').value = index;
    showModal('notification-modal');
}

async function saveNotification() {
    const message = document.getElementById('notification-message').value.trim();
    const type = document.getElementById('notification-type').value;
    const active = document.getElementById('notification-active').checked;
    const index = document.getElementById('edit-notification-index').value;

    if (!message) {
        alert("Nội dung thông báo không được để trống.");
        return;
    }

    const newNotification = { message, type, active };

    if (index !== '') {
        globalNotifications[parseInt(index)] = newNotification;
    } else {
        globalNotifications.push(newNotification);
    }

    await saveNotificationsToServer();
    loadAndRenderNotifications();
    closeModal('notification-modal');
    displayNotifications();
}

async function deleteNotification(index) {
    if (confirm('Bạn có chắc chắn muốn xóa thông báo này không?')) {
        globalNotifications.splice(index, 1);
        await saveNotificationsToServer();
        loadAndRenderNotifications();
        displayNotifications();
    }
}

async function saveNotificationsToServer() {
    try {
        const response = await fetch('api/save-notifications.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(globalNotifications),
        });
        if (!response.ok) {
             const errData = await response.json();
             throw new Error(errData.message || 'Lỗi không xác định từ server.');
        }
        await response.json();
    } catch (error) {
        console.error('Lỗi lưu thông báo:', error);
        alert('Lỗi lưu dữ liệu: ' + error.message);
    }
}

// =================================================================
// CÔNG CỤ ADMIN 
// =================================================================

/**
 * Khởi tạo các công cụ trong trang Admin, ví dụ: tải danh sách portfolio.
 */
async function initializeAdminTools() {
    try {
        const response = await fetch('api/load-portfolios.php', { cache: "no-store" });
        if (!response.ok) throw new Error('Không thể tải danh sách danh mục.');
        
        adminPortfolios = await response.json();
        const selectElem = document.getElementById('reset-portfolio-select');
        selectElem.innerHTML = ''; // Xóa các lựa chọn cũ

        const portfolioNames = Object.keys(adminPortfolios);
        if (portfolioNames.length > 0) {
            portfolioNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                selectElem.appendChild(option);
            });
        } else {
            selectElem.innerHTML = '<option value="">Không có danh mục nào</option>';
        }
    } catch (error) {
        console.error("Lỗi khi tải danh mục cho công cụ admin:", error);
        alert(error.message);
    }
}

/**
 * Đặt lại mật khẩu cho một danh mục đã chọn.
 */
async function resetPortfolioPassword() {
    const portfolioName = document.getElementById('reset-portfolio-select').value;
    const newPassword = document.getElementById('new-portfolio-pass').value;

    if (!portfolioName) {
        alert("Vui lòng chọn một danh mục.");
        return;
    }
    if (!newPassword) {
        alert("Vui lòng nhập mật khẩu mới.");
        return;
    }

    if (confirm(`Bạn có chắc muốn đặt lại mật khẩu cho danh mục "${portfolioName}" không?`)) {
        if (adminPortfolios[portfolioName]) {
            adminPortfolios[portfolioName].passwordHash = md5(newPassword);
            
            try {
                const response = await fetch('api/save-portfolios.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(adminPortfolios),
                });
                if (!response.ok) throw new Error('Lỗi khi lưu lại danh mục.');
                
                alert(`Đã đặt lại mật khẩu cho danh mục "${portfolioName}" thành công.`);
                document.getElementById('new-portfolio-pass').value = '';

            } catch (error) {
                alert(`Đã xảy ra lỗi: ${error.message}`);
            }
        } else {
            alert("Lỗi: Không tìm thấy danh mục đã chọn.");
        }
    }
}

/**
 * Tạo mã hash MD5 từ một chuỗi nhập vào.
 */
function generateMd5Hash() {
    const inputText = document.getElementById('md5-input-text').value;
    const outputText = document.getElementById('md5-output-text');
    if (inputText) {
        outputText.value = md5(inputText);
    } else {
        outputText.value = '';
    }
}

/**
 * Sao chép kết quả MD5 vào clipboard.
 * @param {HTMLElement} inputElem - Ô input chứa kết quả.
 */
function copyMd5Hash(inputElem) {
    if (!inputElem.value) return;

    // Sao chép vào clipboard
    navigator.clipboard.writeText(inputElem.value).then(() => {
        // Cung cấp phản hồi cho người dùng
        const copyBtn = inputElem.nextElementSibling; // Lấy nút copy
        const originalIcon = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.classList.add('copied');
        
        // Chọn toàn bộ text trong ô input
        inputElem.select();
        
        // Trả lại icon cũ sau 2 giây
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Lỗi khi sao chép: ', err);
        alert('Không thể sao chép. Vui lòng thử lại.');
    });
}