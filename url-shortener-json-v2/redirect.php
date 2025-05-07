<?php
$requestedShortCode = isset($_GET['code']) ? $_GET['code'] : null;
if (empty($requestedShortCode)) {
    header('HTTP/1.0 400 Bad Request');
    echo 'Shortlink không hợp lệ.';
    exit;
}

$linksFile = 'links.json';
$originalUrlToRedirect = null;
$linkFound = false;

if (file_exists($linksFile)) {
    $fileContent = file_get_contents($linksFile);
    $linksArray = [];
    if (!empty($fileContent)) {
        $decodedContent = json_decode($fileContent, true);
        if (is_array($decodedContent)) {
            $linksArray = $decodedContent;
        }
    }

    foreach ($linksArray as $index => &$link) { // Sử dụng tham chiếu &$link để cập nhật trực tiếp
        if (isset($link['shortCode']) && $link['shortCode'] === $requestedShortCode) {
            if (isset($link['originalUrl'])) {
                $originalUrlToRedirect = $link['originalUrl'];

                // Tăng lượt click
                $link['clicks'] = ($link['clicks'] ?? 0) + 1;
                // $link['updatedAt'] = date('Y-m-d H:i:s'); // Tùy chọn: cập nhật updatedAt khi click

                $linkFound = true;
                // Lưu lại toàn bộ mảng vào file JSON sau khi cập nhật clicks
                file_put_contents($linksFile, json_encode($linksArray, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                break; 
            }
        }
    }
    unset($link); // Hủy tham chiếu sau vòng lặp
}

if ($linkFound && $originalUrlToRedirect) {
    header('Location: ' . $originalUrlToRedirect);
    exit;
} else {
    header('HTTP/1.0 404 Not Found');
    echo 'Shortlink không tồn tại hoặc lỗi dữ liệu.';
    exit;
}
?>