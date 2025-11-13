<?php
header('Content-Type: application/json');

// SỬ DỤNG __DIR__ ĐỂ CÓ ĐƯỜNG DẪN TUYỆT ĐỐI
$filePath = __DIR__ . '/../data/portfolios.json';
$data = [];

if (file_exists($filePath)) {
    $jsonContent = file_get_contents($filePath);
    // Trả về JSON hợp lệ ngay cả khi file trống
    if (!empty($jsonContent)) {
        $data = json_decode($jsonContent, true);
    }
} else {
    // Nếu file không tồn tại, tạo file với một đối tượng JSON rỗng
    file_put_contents($filePath, '{}');
    $data = [];
}

// Đảm bảo luôn trả về một đối tượng JSON
echo json_encode($data ?: new stdClass());
?>