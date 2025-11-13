<?php
header('Content-Type: application/json');

// Lấy dữ liệu JSON từ body của request
$json_str = file_get_contents('php://input');
$data = json_decode($json_str, true);

// SỬ DỤNG __DIR__ ĐỂ CÓ ĐƯỜNG DẪN TUYỆT ĐỐI
$filePath = __DIR__ . '/../data/portfolios.json';

// Kiểm tra xem dữ liệu có hợp lệ không
if (json_last_error() === JSON_ERROR_NONE && is_array($data)) {
    // Ghi dữ liệu vào file
    // JSON_PRETTY_PRINT giúp file JSON dễ đọc hơn
    if (file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        echo json_encode(['success' => true, 'message' => 'Dữ liệu đã được lưu.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Không thể ghi dữ liệu vào file.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dữ liệu gửi lên không hợp lệ.']);
}
?>