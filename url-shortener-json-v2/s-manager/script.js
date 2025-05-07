document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPage();
});

// --- KHAI BÁO BIẾN TOÀN CỤC VÀ HẰNG SỐ ---
let allLinksData = []; 
let currentFilteredLinks = []; 
let currentPage = 1;
const ROWS_PER_PAGE = 10; 
const SHORT_LINK_BASE_URL = 'https://go.dangvo.io.vn/'; // <<<=== THAY THẾ BẰNG DOMAIN CỦA BẠN

// --- KHỞI TẠO TRANG ---
function initializeAdminPage() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', debounce(applySearchFilter, 300));
    }

    const addLinkForm = document.getElementById('add-link-form');
    if (addLinkForm) {
        addLinkForm.addEventListener('submit', handleAddFormSubmit);
    }

    loadInitialLinks();
    injectCustomStyles();
}

// --- TẢI VÀ HIỂN THỊ DỮ LIỆU ---
async function loadInitialLinks() {
    showLoadingState(true);
    try {
        const response = await fetch('../api.php?action=load');
        if (!response.ok) {
            handleApiError(response, "Tải danh sách"); 
            return;
        }
        const data = await response.json(); 
        allLinksData = Array.isArray(data) ? data : [];
        applySearchFilter(); 
    } catch (error) {
        console.error('Lỗi nghiêm trọng khi tải danh sách liên kết:', error);
        Toastify({ text: "Lỗi kết nối hoặc xử lý dữ liệu khi tải danh sách.", duration: 3000, gravity: "top", position: "center", backgroundColor: "#dc3545" }).showToast();
    } finally {
        showLoadingState(false);
    }
}

function applySearchFilter() {
    const searchInput = document.getElementById('search-input');
    const filterText = searchInput ? searchInput.value.toLowerCase().trim() : '';

    if (filterText === '') {
        currentFilteredLinks = [...allLinksData];
    } else {
        currentFilteredLinks = allLinksData.filter(link => {
            const shortCodeMatch = link.shortCode && link.shortCode.toLowerCase().includes(filterText);
            const originalUrlMatch = link.originalUrl && link.originalUrl.toLowerCase().includes(filterText);
            return shortCodeMatch || originalUrlMatch;
        });
    }
    currentPage = 1; 
    updateTableView();
}

function updateTableView() {
    displayLinksForPage();
    setupPaginationControls();
}

function displayLinksForPage() {
    const tbody = document.getElementById('links-table-body');
    if (!tbody) {
        console.error("Không tìm thấy tbody với ID 'links-table-body'");
        return;
    }
    tbody.innerHTML = ''; 

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const paginatedLinks = currentFilteredLinks.slice(startIndex, endIndex);
    const colCount = 6; 

    if (paginatedLinks.length === 0) {
        const message = currentFilteredLinks.length === 0 && allLinksData.length > 0 ?
            "Không tìm thấy liên kết nào phù hợp với điều kiện tìm kiếm." :
            "Chưa có liên kết nào được tạo.";
        tbody.innerHTML = `<tr><td colspan="${colCount}" style="text-align:center; padding: 20px;">${message}</td></tr>`;
        return;
    }

    paginatedLinks.forEach(link => {
        const row = document.createElement('tr');
        const fullShortenedUrl = SHORT_LINK_BASE_URL + link.shortCode;
        row.innerHTML = `
            <td data-label="STT" style="text-align:center;">${(currentPage - 1) * ROWS_PER_PAGE + (Array.from(tbody.children).length + 1)}</td>
            <td data-label="ID">${link.id}</td>
            <td data-label="Short URL (Alias)"><a href="${fullShortenedUrl}" target="_blank" title="${fullShortenedUrl}">${link.shortCode || 'N/A'}</a></td>
            <td data-label="Original URL">
                <a href="${link.originalUrl}" target="_blank" title="${link.originalUrl}">
                    ${link.originalUrl && link.originalUrl.length > 50 ? link.originalUrl.substring(0, 50) + '...' : (link.originalUrl || 'N/A')}
                </a>
            </td>
            <td data-label="Số click" style="text-align:center;">${link.clicks ?? 0}</td>
            <td data-label="Ngày tạo">${formatDate(link.createdAt)}</td>
            <td data-label="Ngày sửa">${formatDate(link.updatedAt)}</td>
            <td data-label="Hành động" class="actions-cell">
                <button class="edit-btn" onclick="handleEditLink('${link.id}', '${link.shortCode}', '${link.originalUrl}')" title="Sửa Link"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="handleDeleteLink('${link.id}', '${link.shortCode}')" title="Xóa Link"><i class="fas fa-trash"></i></button>
                <button class="copy-btn" onclick="copyManagerLink('${link.shortCode}')" title="Sao chép Link Rút Gọn"><i class="fas fa-copy"></i></button>
                <button class="qr-code-btn" onclick="showAdminQrCode('${fullShortenedUrl}')" title="Mã QR"><i class="fas fa-qrcode"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// --- PHÂN TRANG ---
function setupPaginationControls() {
    let paginationContainer = document.getElementById('pagination-controls');
    if (!paginationContainer) {
        const managerContainer = document.getElementById('manager-container');
        if (!managerContainer) { console.error("manager-container not found."); return; }
        paginationContainer = document.createElement('div');
        paginationContainer.id = 'pagination-controls';
        paginationContainer.style.textAlign = 'center';
        paginationContainer.style.marginTop = '20px';
        managerContainer.appendChild(paginationContainer);
    }
    paginationContainer.innerHTML = '';

    const pageCount = Math.ceil(currentFilteredLinks.length / ROWS_PER_PAGE);
    if (pageCount <= 1) return;

    paginationContainer.appendChild(createPageButton('&laquo; Trước', 1, pageCount, true));
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(pageCount, currentPage + 2);
    if (currentPage <= 3) endPage = Math.min(pageCount, 5);
    if (currentPage >= pageCount - 2) startPage = Math.max(1, pageCount - 4);

    if (startPage > 1) {
        paginationContainer.appendChild(createPageButton('1', 1, pageCount));
        if (startPage > 2) paginationContainer.appendChild(createPageEllipsis());
    }
    for (let i = startPage; i <= endPage; i++) {
        paginationContainer.appendChild(createPageButton(i, i, pageCount));
    }
    if (endPage < pageCount) {
        if (endPage < pageCount - 1) paginationContainer.appendChild(createPageEllipsis());
        paginationContainer.appendChild(createPageButton(pageCount, pageCount, pageCount));
    }
    paginationContainer.appendChild(createPageButton('Sau &raquo;', pageCount, pageCount, false, true));
}

function createPageButton(text, pageNumber, totalPages, isPrev = false, isNext = false) {
    const button = document.createElement('button');
    button.innerHTML = text;
    button.classList.add('page-btn');
    button.dataset.pageNumber = String(pageNumber);

    if (isPrev) {
        button.disabled = currentPage === 1;
        button.addEventListener('click', () => { if (currentPage > 1) changePage(currentPage - 1); });
    } else if (isNext) {
        button.disabled = currentPage === totalPages;
        button.addEventListener('click', () => { if (currentPage < totalPages) changePage(currentPage + 1); });
    } else {
        if (pageNumber === currentPage) button.classList.add('active');
        button.addEventListener('click', () => changePage(pageNumber));
    }
    return button;
}

function createPageEllipsis() {
    const dots = document.createElement('span');
    dots.textContent = '...';
    dots.style.margin = "0 8px";
    dots.style.color = "#777";
    dots.style.verticalAlign = "middle";
    return dots;
}

function changePage(pageNumber) {
    currentPage = pageNumber;
    updateTableView();
}

// --- XỬ LÝ FORM VÀ HÀNH ĐỘNG CRUD ---
async function handleAddFormSubmit(e) {
    e.preventDefault();
    const addLinkForm = document.getElementById('add-link-form');
    const shortCodeInput = document.getElementById('add-form-short-url');
    const originalUrlInput = document.getElementById('add-form-original-url');
    
    const shortCode = shortCodeInput.value.trim();
    const originalUrl = originalUrlInput.value.trim();

    if (!originalUrl) { Toastify({ text: "Original URL không được để trống!", duration: 3000, gravity: "top", position: "right", backgroundColor: "#ffc107", textColor: "#000" }).showToast(); return; }
    if (!isValidURL(originalUrl)) { Toastify({ text: "Original URL không hợp lệ!", duration: 3000, gravity: "top", position: "right", backgroundColor: "#ffc107", textColor: "#000" }).showToast(); return; }
    if (!shortCode) { Toastify({ text: "Short URL (Alias) không được để trống.", duration: 3000, gravity: "top", position: "right", backgroundColor: "#ffc107", textColor: "#000" }).showToast(); return; }
    if (!/^[a-zA-Z0-9_-]+$/.test(shortCode)) { Toastify({ text: "Short URL (Alias) chỉ nên chứa chữ cái, số, dấu gạch dưới (_) và gạch nối (-).", duration: 4000, gravity: "top", position: "right", backgroundColor: "#ffc107", textColor: "#000" }).showToast(); return; }

    const payload = { shortUrl: shortCode, originalUrl };

    try {
        showButtonLoading(document.getElementById('add-link-submit-button'), true);
        const response = await fetch('../api.php?action=add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await handleApiResponse(response, "Thêm liên kết thành công!", "Thêm thất bại");
        if (result && result.success) {
            if(addLinkForm) addLinkForm.reset();
            loadInitialLinks();
        }
    } catch (error) {
        console.error("Lỗi khi thêm link:", error);
        Toastify({ text: "Lỗi hệ thống khi thêm link.", duration: 3000, gravity: "top", position: "right", backgroundColor: "#dc3545"}).showToast();
    } finally {
        showButtonLoading(document.getElementById('add-link-submit-button'), false);
    }
}

async function handleEditLink(id, currentShortCode, currentOriginalUrl) {
    Swal.fire({
        title: '<i class="fas fa-edit" style="margin-right: 8px; color: #007bff;"></i>Chỉnh sửa Liên kết',
        html: `
            <div class="swal-edit-link-container">
                <input type="hidden" id="swal-link-id" value="${id}">
                <div class="swal-edit-field">
                    <label for="swal-new-short-code">Short URL (Alias) Mới:</label>
                    <input type="text" id="swal-new-short-code" class="swal2-input" value="${currentShortCode}" placeholder="Nhập alias mới (vd: link-moi)" required>
                </div>
                <div class="swal-edit-field">
                    <label for="swal-new-original-url">URL Gốc Mới:</label>
                    <input type="url" id="swal-new-original-url" class="swal2-input" value="${currentOriginalUrl}" placeholder="Dán hoặc nhập URL gốc mới" required>
                </div>
            </div>
        `,
        confirmButtonText: '<i class="fas fa-save" style="margin-right: 5px;"></i>Lưu thay đổi',
        cancelButtonText: '<i class="fas fa-times" style="margin-right: 5px;"></i>Hủy',
        showCancelButton: true,
        focusConfirm: false,
        showLoaderOnConfirm: true,
        customClass: { popup: 'swal-wide-popup' },
        didOpen: () => {
            const inputShortCode = document.getElementById('swal-new-short-code');
            if (inputShortCode) inputShortCode.focus();
        },
        preConfirm: () => {
            const linkId = document.getElementById('swal-link-id').value;
            const newShortCodeElement = document.getElementById('swal-new-short-code');
            const newOriginalUrlElement = document.getElementById('swal-new-original-url');
            const newShortCode = newShortCodeElement.value.trim();
            const newOriginalUrl = newOriginalUrlElement.value.trim();
            let validationError = null;

            if (!newShortCode) { validationError = 'Short URL (Alias) không được để trống.'; newShortCodeElement.classList.add('swal2-inputerror'); }
            else if (!/^[a-zA-Z0-9_-]+$/.test(newShortCode)) { validationError = 'Short URL (Alias) không hợp lệ. Chỉ cho phép chữ, số, "_" và "-".'; newShortCodeElement.classList.add('swal2-inputerror'); }
            else { newShortCodeElement.classList.remove('swal2-inputerror'); }

            if (!newOriginalUrl) { if (!validationError) validationError = 'URL gốc không được để trống.'; newOriginalUrlElement.classList.add('swal2-inputerror'); }
            else if (!isValidURL(newOriginalUrl)) { if (!validationError) validationError = 'URL gốc không hợp lệ.'; newOriginalUrlElement.classList.add('swal2-inputerror'); }
            else { newOriginalUrlElement.classList.remove('swal2-inputerror'); }
            
            if (!validationError && newShortCode === currentShortCode && newOriginalUrl === currentOriginalUrl) { validationError = 'Không có thay đổi nào được thực hiện.'; }

            if (validationError) { Swal.showValidationMessage(validationError); return false; }
            return { id: linkId, newShortCode, newOriginalUrl };
        }
    }).then(async (result) => {
        if (result.isConfirmed && result.value) {
            const { id: linkId, newShortCode, newOriginalUrl } = result.value; // Đổi tên biến id để tránh xung đột
            try {
                const response = await fetch('../api.php?action=edit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: linkId, newShortCode, newOriginalUrl })
                });
                const apiResult = await handleApiResponse(response, "Sửa liên kết thành công!", "Sửa thất bại");
                if (apiResult && apiResult.success) loadInitialLinks();
            } catch (error) {
                console.error("Lỗi khi gọi API sửa link:", error);
                Swal.fire('Lỗi!', 'Không thể kết nối đến máy chủ để sửa link.', 'error');
            }
        }
    });
}

async function handleDeleteLink(linkId, shortCodeForDisplay) { // Nhận linkId và shortCode để hiển thị
    Swal.fire({
        title: 'Bạn chắc chắn?',
        html: `Bạn sẽ không thể hoàn tác hành động xóa link rút gọn: <br/><strong style="color:#d33;">${shortCodeForDisplay}</strong> (ID: ${linkId})`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Vâng, xóa nó!',
        cancelButtonText: 'Hủy',
        showLoaderOnConfirm: true,
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch('../api.php?action=delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: linkId }) // Gửi ID để xóa
                });
                const apiResult = await handleApiResponse(response, "Xóa liên kết thành công!", "Xóa thất bại");
                if (apiResult && apiResult.success) loadInitialLinks();
            } catch (error) {
                console.error("Lỗi khi xóa link:", error);
                 Swal.fire('Lỗi!', 'Không thể kết nối đến máy chủ để xóa link.', 'error');
            }
        }
    });
}

function copyManagerLink(shortCode) {
    const fullShortenedUrl = SHORT_LINK_BASE_URL + shortCode;
    navigator.clipboard.writeText(fullShortenedUrl).then(() => {
        Toastify({ text: `Đã sao chép: ${fullShortenedUrl}`, duration: 2000, gravity: "top", position: "right", backgroundColor: "#007bff" }).showToast();
    }).catch(err => {
        console.error('Không thể sao chép: ', err);
        Toastify({ text: "Lỗi khi sao chép!", duration: 3000, gravity: "top", position: "right", backgroundColor: "#dc3545"}).showToast();
    });
}

function showAdminQrCode(urlToEncode) {
    const qrCanvasContainer = document.createElement('div');
    qrCanvasContainer.style.textAlign = 'center';
    const qrCanvas = document.createElement('canvas');
    qrCanvasContainer.appendChild(qrCanvas);

    QRCode.toCanvas(qrCanvas, urlToEncode, { width: 240, margin: 2 }, function (error) {
        if (error) { console.error(error); Swal.fire('Lỗi!', 'Không thể tạo mã QR.', 'error'); return; }
        Swal.fire({ title: 'Mã QR Code', html: qrCanvasContainer, confirmButtonText: 'Đóng', customClass: { popup: 'qr-popup-custom' } });
    });
}

// --- HÀM TIỆN ÍCH ---
function formatDate(dateString) {
    if (!dateString || dateString === 'N/A' || dateString === '0000-00-00 00:00:00') return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (e) { return dateString; }
}

async function handleApiError(response, actionPrefix = "Hành động") {
    if (response.status === 401) {
        Toastify({ text: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Đang chuyển hướng...", duration: 3000, gravity: "top", position: "center", backgroundColor: "#dc3545", className: "toastify-center" }).showToast();
        setTimeout(() => window.location.href = 'login.php', 2500);
        return;
    }
    let errorMessage = response.statusText || 'Lỗi không xác định từ server';
    try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
    } catch (e) { /* Bỏ qua lỗi parse JSON nếu response không phải JSON */ }
    Toastify({ text: `${actionPrefix} thất bại: ${errorMessage}`, duration: 4000, gravity: "top", position: "right", backgroundColor: "#dc3545" }).showToast();
}

async function handleApiResponse(response, successMessage, failureMessagePrefix) {
    if (!response.ok) {
        await handleApiError(response, failureMessagePrefix);
        return null;
    }
    try {
        const result = await response.json();
        if (result.success) {
            Toastify({ text: successMessage || result.message || "Thành công!", duration: 3000, gravity: "top", position: "right", backgroundColor: "#28a745" }).showToast();
            return result;
        } else {
            Toastify({ text: `${failureMessagePrefix}: ${result.message || 'Đã có lỗi không xác định.'}`, duration: 4000, gravity: "top", position: "right", backgroundColor: "#dc3545" }).showToast();
            return null;
        }
    } catch (error) {
        console.error("Lỗi xử lý API response:", error);
        Toastify({ text: `${failureMessagePrefix}: Lỗi xử lý phản hồi từ server.`, duration: 4000, gravity: "top", position: "right", backgroundColor: "#dc3545" }).showToast();
        return null;
    }
}

function isValidURL(string) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(string);
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

function showLoadingState(isLoading) {
    document.body.style.cursor = isLoading ? 'wait' : 'default';
}

function showButtonLoading(buttonElement, isLoading) {
    if (!buttonElement) return;
    if (isLoading) {
        buttonElement.disabled = true;
        buttonElement.dataset.originalText = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    } else {
        buttonElement.disabled = false;
        if (buttonElement.dataset.originalText) {
            buttonElement.innerHTML = buttonElement.dataset.originalText;
        }
    }
}

function injectCustomStyles() {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        .swal-input-left-align .swal2-input { text-align: left !important; }
        .swal-wide-popup .swal2-popup { width: 500px !important; } /* Cho modal edit rộng hơn */
        .qr-popup-custom .swal2-popup { width: auto !important; max-width: 320px !important; }
        .qr-popup-custom .swal2-html-container { overflow: visible !important; padding-top: 10px !important; }
        .actions-cell button { margin: 2px; }
        .toastify-center { margin-left: auto; margin-right: auto; }
        .swal-edit-link-container { display: flex; flex-direction: column; gap: 18px; text-align: left; padding: 5px 0; }
        .swal-edit-field { display: flex; flex-direction: column; gap: 6px; }
        .swal-edit-field label { margin-bottom: 0; font-weight: 500; color: #454545; font-size: 0.95em; }
        .swal-edit-link-container .swal2-input { width: 100% !important; box-sizing: border-box !important; margin: 0 !important; font-size: 1em !important; }
        .swal-input-readonly { background-color: #e9ecef; color: #495057; cursor: default; border-color: #ced4da; }
        .swal2-validation-message { margin-top: 8px !important; font-size: 0.85em !important; }
    `;
    document.head.appendChild(styleSheet);
}