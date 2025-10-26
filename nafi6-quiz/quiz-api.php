<?php
// Bắt đầu session để lưu trữ đáp án bí mật trên server
session_start();

header('Content-Type: application/json');

// Hàm để tải và gộp tất cả câu hỏi
function loadAllQuestions() {
    $original_questions = json_decode(file_get_contents('data.json'), true);
    $added_questions = [];
    if (file_exists('add-quiz.json')) {
        $added_content = file_get_contents('add-quiz.json');
        if (!empty($added_content)) {
            $added_questions = json_decode($added_content, true);
        }
    }
    return array_merge($original_questions, $added_questions);
}

// Lấy hành động từ request (start hoặc submit)
$action = $_GET['action'] ?? '';

if ($action === 'start') {
    $all_questions = loadAllQuestions();
    shuffle($all_questions);
    
    // Chọn 70 câu hỏi
    $selected_questions = array_slice($all_questions, 0, 70);
    
    // Lưu câu hỏi CÓ ĐÁP ÁN vào session server
    $_SESSION['quiz_questions'] = $selected_questions;
    
    // Tạo mảng câu hỏi KHÔNG CÓ ĐÁP ÁN để gửi cho người dùng
    $questions_for_client = [];
    foreach ($selected_questions as $q) {
        unset($q['correctAnswer']); // Xóa đáp án
        $questions_for_client[] = $q;
    }
    
    echo json_encode($questions_for_client);
    exit();
}

if ($action === 'submit') {
    // Lấy câu trả lời người dùng gửi lên
    $user_answers = json_decode(file_get_contents('php://input'), true);
    
    // Lấy đáp án đúng đã lưu trong session
    $correct_questions = $_SESSION['quiz_questions'] ?? [];
    
    if (empty($correct_questions)) {
        http_response_code(400);
        echo json_encode(['error' => 'Phiên làm việc đã hết hạn. Vui lòng làm lại bài.']);
        exit();
    }
    
    $score = 0;
    
    // Chuyển mảng đáp án đúng thành dạng dễ tra cứu
    $correct_answers_map = [];
    foreach ($correct_questions as $q) {
        $correct_answers_map[$q['id']] = $q['correctAnswer'];
    }
    
    // Chấm điểm
    foreach ($user_answers as $id => $answer) {
        if (isset($correct_answers_map[$id]) && $correct_answers_map[$id] === $answer) {
            $score++;
        }
    }
    
    // Gửi kết quả về (điểm và đáp án đúng để review)
    echo json_encode([
        'score' => $score,
        'total' => count($correct_questions),
        'reviewData' => $correct_questions // Gửi lại toàn bộ data để review
    ]);

    // Xóa session sau khi đã chấm xong
    unset($_SESSION['quiz_questions']);
    exit();
}
?>