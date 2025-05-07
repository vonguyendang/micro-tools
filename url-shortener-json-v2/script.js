document.addEventListener('DOMContentLoaded', function () {
    const shortenForm = document.getElementById('shorten-form');
    const originalUrlInput = document.getElementById('original-url');
    const resultDiv = document.getElementById('result');
    const shortenedUrlLink = document.getElementById('shortened-url');
    const editUrlInput = document.getElementById('edit-url');
    const copyButton = document.getElementById('copy-button');
    const runButton = document.getElementById('run-button');
    const qrButton = document.getElementById('qr-button');
    const qrCodeCanvas = document.getElementById('qr-code');
    const submitButton = document.getElementById('submit-button'); // Giả sử bạn đã thêm ID này vào nút submit
    const formLoader = document.getElementById('form-loader'); // Giả sử bạn đã thêm span này cho loader

    shortenForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const originalUrl = originalUrlInput.value;

        // Hide previous results and QR code with animation reset
        resultDiv.classList.remove('visible');
        resultDiv.classList.add('hidden');
        qrCodeCanvas.classList.remove('visible');
        qrCodeCanvas.classList.add('hidden');
        const qrCodeContext = qrCodeCanvas.getContext('2d');
        qrCodeContext.clearRect(0, 0, qrCodeCanvas.width, qrCodeCanvas.height);

        // Show loader and disable button
        if (submitButton && formLoader) {
            submitButton.disabled = true;
            formLoader.classList.remove('hidden');
        }

        try {
            const response = await fetch('shorten.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ originalUrl })
            });

            const result = await response.json();

            if (result.success) {
                const shortenedUrl = `https://go.dangvo.io.vn/${result.shortUrl}`; // Thay domain của bạn nếu cần
                shortenedUrlLink.textContent = shortenedUrl;
                shortenedUrlLink.href = shortenedUrl;
                editUrlInput.value = result.shortUrl; // Hiển thị custom alias hiện tại

                resultDiv.classList.remove('hidden');
                editUrlInput.classList.remove('hidden'); // Make sure edit input is visible

                // Trigger animation for result div
                setTimeout(() => {
                    resultDiv.classList.add('visible');
                }, 10);

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
        } catch (error) {
            console.error("Error during fetch:", error);
            Toastify({
                text: "Đã xảy ra lỗi kết nối. Vui lòng thử lại.",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#dc3545",
            }).showToast();
        } finally {
            // Hide loader and enable button
            if (submitButton && formLoader) {
                submitButton.disabled = false;
                formLoader.classList.add('hidden');
            }
        }
    });

    editUrlInput.addEventListener('keydown', async function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newShortUrl = e.target.value.trim();
            const originalUrl = originalUrlInput.value; // Lấy URL gốc từ input chính

            if (!newShortUrl) {
                Toastify({
                    text: "Custom URL không được để trống!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#ffc107",
                    textColor: "#000"
                }).showToast();
                return;
            }

            // (Optional) Add loader for edit operation
            // Ví dụ: editUrlInput.disabled = true; // Thêm spinner nếu muốn

            try {
                const response = await fetch('shorten.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ originalUrl, customUrl: newShortUrl })
                });

                const result = await response.json();
                if (result.success) {
                    const updatedShortenedUrl = `https://go.dangvo.io.vn/${result.shortUrl}`; // Thay domain
                    shortenedUrlLink.textContent = updatedShortenedUrl;
                    shortenedUrlLink.href = updatedShortenedUrl;
                    editUrlInput.value = result.shortUrl; // Cập nhật lại input nếu backend có thể thay đổi nó (ví dụ: sanitize)

                    Toastify({
                        text: "Link đã được chỉnh sửa thành công!",
                        duration: 3000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#28a745",
                    }).showToast();
                } else {
                    Toastify({
                        text: result.message || "Custom URL đã tồn tại hoặc không hợp lệ!",
                        duration: 3000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#dc3545",
                    }).showToast();
                }
            } catch (error) {
                console.error("Error during custom URL update:", error);
                Toastify({
                    text: "Lỗi khi cập nhật custom URL. Vui lòng thử lại.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#dc3545",
                }).showToast();
            } finally {
                // editUrlInput.disabled = false;
            }
        }
    });

    copyButton.addEventListener('click', function () {
        const shortenedUrlText = shortenedUrlLink.textContent;
        navigator.clipboard.writeText(shortenedUrlText).then(() => {
            Toastify({
                text: "Đã sao chép link rút gọn!",
                duration: 2000, // Thời gian ngắn hơn cho copy
                gravity: "top",
                position: "right",
                backgroundColor: "#007bff",
            }).showToast();
        }).catch(err => {
            console.error('Không thể sao chép: ', err);
            Toastify({
                text: "Lỗi khi sao chép!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#dc3545",
            }).showToast();
        });
    });

    runButton.addEventListener('click', function () {
        const shortenedUrlHref = shortenedUrlLink.href;
        if (shortenedUrlHref && shortenedUrlHref !== '#') {
            window.open(shortenedUrlHref, '_blank');
        } else {
            Toastify({
                text: "Không có link để mở!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#ffc107",
                textColor: "#000"
            }).showToast();
        }
    });

    qrButton.addEventListener('click', function () {
        const shortenedUrlHref = shortenedUrlLink.href;
        if (shortenedUrlHref && shortenedUrlHref !== '#') {
            // qrCodeCanvas.classList.remove('hidden'); // Sẽ được xử lý bởi animation class
            QRCode.toCanvas(qrCodeCanvas, shortenedUrlHref, { width: 180, margin: 2 }, function (error) {
                if (error) {
                    console.error(error);
                    Toastify({
                        text: "Lỗi tạo mã QR!",
                        duration: 3000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#dc3545",
                    }).showToast();
                    qrCodeCanvas.classList.add('hidden'); // Ẩn nếu lỗi
                    qrCodeCanvas.classList.remove('visible');
                    return;
                }
                // Trigger animation for QR code
                qrCodeCanvas.classList.remove('hidden');
                setTimeout(() => {
                    qrCodeCanvas.classList.add('visible');
                }, 10);
            });
        } else {
            Toastify({
                text: "Không có link để tạo mã QR!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#ffc107",
                textColor: "#000"
            }).showToast();
        }
    });
});