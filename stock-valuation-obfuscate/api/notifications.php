<?php
// Cho phép truy cập từ bất kỳ nguồn nào
header("Access-Control-Allow-Origin: *");
// Thiết lập kiểu nội dung trả về là JSON
header('Content-Type: application/json; charset=utf-8');
// Đảm bảo trình duyệt luôn lấy dữ liệu mới nhất
header('Cache-Control: no-cache, must-revalidate');

$json_file_path = '../data/notifications.json'; // <-- ĐÃ THAY ĐỔI ĐƯỜNG DẪN

// Kiểm tra xem file có tồn tại không
if (file_exists($json_file_path)) {
    // Đọc nội dung file và trả về
    $content = file_get_contents($json_file_path);
    echo $content;
} else {
    // Nếu file không tồn tại, trả về một mảng JSON rỗng
    http_response_code(404); // Not Found
    echo json_encode(['error' => 'Không tìm thấy file thông báo.']);
}
?>