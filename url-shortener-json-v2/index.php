<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Rút gọn link nhanh chóng và dễ dàng với dịch vụ của chúng tôi. Chia sẻ link ngắn gọn, dễ nhớ và tiện lợi hơn.">
    <meta name="keywords" content="rút gọn link, dịch vụ rút gọn link, chia sẻ link ngắn, tạo link ngắn">
    <meta name="author" content="DangVo">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="Rút Gọn Link Siêu Tốc">
    <meta property="og:description" content="Rút gọn link nhanh chóng và dễ dàng với dịch vụ của chúng tôi. Chia sẻ link ngắn gọn, dễ nhớ và tiện lợi hơn.">
    <title>Link Rút Gọn Hiện Đại</title>
    <link rel="icon" href="android-chrome-192x192.png" type="image/png">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    </head>
<body>
    <div class="container">
        <h1>Rút Gọn Link Siêu Tốc</h1>
        <form id="shorten-form">
            <input type="url" id="original-url" placeholder="Dán URL dài của bạn vào đây" required>
            <div class="submit-area"> <button type="submit" id="submit-button">
                    Rút Gọn Ngay
                </button>
                <span class="loader hidden" id="form-loader"></span>
            </div>
        </form>

        <div id="result" class="hidden"> <p>Link rút gọn của bạn: <a id="shortened-url" href="#" target="_blank" rel="noopener noreferrer"></a></p>
            
            <input type="text" id="edit-url" placeholder="Tùy chỉnh đuôi link (VD: link-cua-toi)" class="hidden">
            <div class="result-actions">
                <button id="copy-button">
                    Sao chép
                </button>
                <button id="run-button">
                    Mở Link
                </button>
                <button id="qr-button">
                    Tạo mã QR
                </button>
            </div>
            <canvas id="qr-code" class="hidden"></canvas> </div>
    </div>

    <footer>
        <p>&copy; <?php echo date("Y"); ?> - Dịch vụ Rút Gọn Link của DangVo. </p>
        </footer>

    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    <script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
    <script src="script.js"></script>
</body>
</html>