<?php
header('Content-Type: application/json; charset=utf-8');

// Lấy dữ liệu JSON từ body của request
$json_str = file_get_contents('php://input');
$data = json_decode($json_str, true);

// Đường dẫn chính xác đến file JSON
$filePath = '../data/notifications.json';

// Kiểm tra xem dữ liệu có hợp lệ không (phải là một mảng)
if (json_last_error() === JSON_ERROR_NONE && is_array($data)) {
    // Ghi dữ liệu vào file
    // JSON_PRETTY_PRINT giúp file JSON dễ đọc hơn
    // JSON_UNESCAPED_UNICODE để hiển thị đúng ký tự tiếng Việt
    if (file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        echo json_encode(['success' => true, 'message' => 'Đã lưu thông báo thành công.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Lỗi: Không thể ghi dữ liệu vào file.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Lỗi: Dữ liệu gửi lên không hợp lệ.']);
}
?>