document.getElementById('shorten-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const originalUrl = document.getElementById('original-url').value;

    // Xóa mã QR cũ nếu có
    const qrCodeCanvas = document.getElementById('qr-code');
    qrCodeCanvas.classList.add('hidden');
    const qrCodeContext = qrCodeCanvas.getContext('2d');
    qrCodeContext.clearRect(0, 0, qrCodeCanvas.width, qrCodeCanvas.height);

    const response = await fetch('shorten.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ originalUrl })
    });

    const result = await response.json();
    if (result.success) {
        const shortenedUrl = `https://www.dangvo.io.vn/s/${result.shortUrl}`;
        document.getElementById('shortened-url').textContent = shortenedUrl;
        document.getElementById('shortened-url').href = shortenedUrl;
        document.getElementById('result').classList.remove('hidden');
        document.getElementById('edit-url').classList.remove('hidden');
        document.getElementById('edit-url').value = result.shortUrl;
        Toastify({
            text: result.message || "Link đã được rút gọn thành công!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#28a745",
        }).showToast();
    } else {
        Toastify({
            text: result.message || "Rút gọn link thất bại!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#dc3545",
        }).showToast();
    }
});

document.getElementById('edit-url').addEventListener('keydown', async function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const newShortUrl = e.target.value;
        const originalUrl = document.getElementById('original-url').value;

        const response = await fetch('shorten.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl, customUrl: newShortUrl })
        });

        const result = await response.json();
        if (result.success) {
            const shortenedUrl = `https://www.dangvo.io.vn/s/${result.shortUrl}`;
            document.getElementById('shortened-url').textContent = shortenedUrl;
            document.getElementById('shortened-url').href = shortenedUrl;
            Toastify({
                text: "Link đã được chỉnh sửa thành công!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#28a745",
            }).showToast();
        } else {
            Toastify({
                text: result.message || "Custom URL already in use!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#dc3545",
            }).showToast();
        }
    }
});

document.getElementById('copy-button').addEventListener('click', function () {
    const shortenedUrl = document.getElementById('shortened-url').textContent;
    navigator.clipboard.writeText(shortenedUrl).then(() => {
        Toastify({
            text: "Đã sao chép link rút gọn!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#007bff",
        }).showToast();
    });
});

document.getElementById('run-button').addEventListener('click', function () {
    const shortenedUrl = document.getElementById('shortened-url').href;
    window.open(shortenedUrl, '_blank');
});

document.getElementById('qr-button').addEventListener('click', function () {
    const shortenedUrl = document.getElementById('shortened-url').href;
    const qrCodeCanvas = document.getElementById('qr-code');
    qrCodeCanvas.classList.remove('hidden');
    QRCode.toCanvas(qrCodeCanvas, shortenedUrl, function (error) {
        if (error) console.error(error);
    });
});