document.addEventListener('DOMContentLoaded', function() {
    loadLinks();

    document.getElementById('add-link-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const shortUrl = document.getElementById('short-url').value;
        const originalUrl = document.getElementById('original-url').value;
        addLink(shortUrl, originalUrl);
    });
});

async function loadLinks() {
    const response = await fetch('../api.php?action=load');
    const links = await response.json();
    const tbody = document.getElementById('links-table').querySelector('tbody');
    tbody.innerHTML = '';
    links.forEach(link => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${link.shortUrl}</td>
            <td>${link.originalUrl}</td>
            <td>
                <button class="edit-btn" onclick="editLink('${link.shortUrl}')"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deleteLink('${link.shortUrl}')"><i class="fas fa-trash"></i></button>
                <button class="copy-btn" onclick="copyLink('${link.shortUrl}')"><i class="fas fa-copy"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function addLink(shortUrl, originalUrl) {
    const response = await fetch('../api.php?action=add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shortUrl, originalUrl })
    });
    const result = await response.json();
    if (result.success) {
        document.getElementById('add-link-form').reset();
        Toastify({
            text: "Thêm liên kết thành công!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#28a745",
        }).showToast();
        loadLinks();
    } else {
        Toastify({
            text: "Thêm liên kết thất bại!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#dc3545",
        }).showToast();
    }
}

async function editLink(shortUrl) {
    const newOriginalUrl = prompt('Nhập URL gốc mới:');
    if (newOriginalUrl) {
        const response = await fetch('../api.php?action=edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ shortUrl, newOriginalUrl })
        });
        const result = await response.json();
        if (result.success) {
            Toastify({
                text: "Sửa liên kết thành công!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#28a745",
            }).showToast();
            loadLinks();
        } else {
            Toastify({
                text: "Sửa liên kết thất bại!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#dc3545",
            }).showToast();
        }
    }
}

async function deleteLink(shortUrl) {
    if (confirm('Bạn có chắc muốn xóa liên kết này?')) {
        const response = await fetch('../api.php?action=delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ shortUrl })
        });
        const result = await response.json();
        if (result.success) {
            Toastify({
                text: "Xóa liên kết thành công!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#28a745",
            }).showToast();
            loadLinks();
        } else {
            Toastify({
                text: "Xóa liên kết thất bại!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#dc3545",
            }).showToast();
        }
    }
}

function copyLink(shortUrl) {
    const url = `${window.location.origin}/${shortUrl}`;
    navigator.clipboard.writeText(url).then(() => {
        Toastify({
            text: "Đã sao chép liên kết!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#007bff",
        }).showToast();
    });
}