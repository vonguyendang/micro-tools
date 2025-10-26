<?php
// save-quiz-data.php (Cập nhật)

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$original_file_path = 'data.json';
$added_file_path = 'add-quiz.json';

// 1. Nhận dữ liệu JSON từ request POST
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// 2. Kiểm tra dữ liệu đầu vào phải chứa cả 'original' và 'added'
if ($data === null || !isset($data['original']) || !isset($data['added'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dữ liệu gửi lên không hợp lệ.']);
    exit();
}

$original_questions = $data['original'];
$added_questions = $data['added'];

// 3. Bắt đầu ghi file
try {
    // Ghi vào data.json
    $write_original = file_put_contents($original_file_path, json_encode($original_questions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    // Ghi vào add-quiz.json
    $write_added = file_put_contents($added_file_path, json_encode($added_questions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    if ($write_original !== false && $write_added !== false) {
        echo json_encode(['success' => true, 'message' => 'Đã cập nhật thành công data.json và add-quiz.json.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Lỗi server: Không thể ghi dữ liệu vào một hoặc cả hai file.']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Lỗi ngoại lệ: ' . $e->getMessage()]);
}
?>