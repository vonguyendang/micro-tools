<?php
// Thiết lập header để trả về JSON và cho phép CORS (quan trọng khi test local)
header('Content-Type: application/json');
// Tùy chỉnh Access-Control nếu cần thiết cho môi trường sản xuất
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Xử lý request OPTIONS (cần cho CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$file_path = 'add-quiz.json'; 

// 1. Nhận dữ liệu JSON từ request POST
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Kiểm tra tính hợp lệ của dữ liệu
if ($data === null || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ. Vui lòng gửi một mảng JSON.']);
    exit();
}

// 2. Ghi dữ liệu vào file add-quiz.json
try {
    // Ghi đè toàn bộ dữ liệu (mảng chứa tất cả câu hỏi cũ + câu hỏi mới)
    if (file_put_contents($file_path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false) {
        echo json_encode(['success' => true, 'message' => 'Dữ liệu đã được lưu thành công vào ' . $file_path]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Lỗi server: Không thể ghi dữ liệu vào file. Vui lòng kiểm tra quyền ghi (' . $file_path . ').']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Lỗi ngoại lệ: ' . $e->getMessage()]);
}
?>