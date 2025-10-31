<?php
// proxy.php

if (!isset($_GET['url']) || empty($_GET['url'])) {
    http_response_code(400);
    die('URL parameter is missing.');
}

$url = $_GET['url'];

// Sử dụng cURL để lấy nội dung trang web
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// Giả mạo user agent để trông giống trình duyệt thật
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Tự động theo các redirect
curl_setopt($ch, CURLOPT_HEADER, false); // Không bao gồm header trong output
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Bỏ qua xác thực SSL (hữu ích cho một số trang)

$content = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code >= 400) {
    http_response_code($http_code);
    die("Failed to fetch content from the URL. Status code: " . $http_code);
}

// === PHẦN QUAN TRỌNG: Vô hiệu hóa Frame-Busting ===

// 1. Đoạn mã JavaScript để tiêm vào
$script_to_inject = <<<JS
<script>
    // Vô hiệu hóa việc tự động chuyển hướng khi rời trang
    window.onbeforeunload = null;

    // Ngăn các kịch bản kiểm tra window.top
    Object.defineProperty(window, 'top', {
        get: function() { return window; }
    });
</script>
JS;

// 2. Sửa các đường dẫn tương đối bằng thẻ <base>
$base_url_tag = '<base href="' . htmlspecialchars($url) . '" target="_blank">';

// 3. Tiêm mã vào ngay sau thẻ <head>
// Sử dụng str_ireplace để không phân biệt chữ hoa/thường
$content = str_ireplace('<head>', '<head>' . $base_url_tag . $script_to_inject, $content);


echo $content;
?>