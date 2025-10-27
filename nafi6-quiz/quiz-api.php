<?php
// Bắt đầu session để lưu trữ đáp án bí mật trên server
session_start();

header('Content-Type: application/json');

// Hằng số
const QUESTIONS_PER_DECK = 70;

// Hàm để tải và gộp tất cả câu hỏi
function loadAllQuestions() {
    $original_questions = json_decode(file_get_contents('data.json'), true) ?: [];
    $added_questions = [];
    if (file_exists('add-quiz.json')) {
        $added_content = file_get_contents('add-quiz.json');
        if (!empty($added_content)) {
            $decoded_added = json_decode($added_content, true);
            if (is_array($decoded_added)) {
                $added_questions = $decoded_added;
            }
        }
    }
    return array_merge($original_questions, $added_questions);
}

// Lấy hành động từ request
$action = $_GET['action'] ?? '';

// --- ACTION MỚI: LIỆT KÊ CÁC ĐỀ THI ---
if ($action === 'list_decks') {
    $all_questions = loadAllQuestions();
    $total_questions = count($all_questions);
    $total_decks = (int)ceil($total_questions / QUESTIONS_PER_DECK);
    
    echo json_encode(['totalDecks' => $total_decks, 'totalQuestions' => $total_questions]);
    exit();
}

// --- ACTION ĐƯỢC CẬP NHẬT: BẮT ĐẦU BÀI THI THEO ĐỀ ---
if ($action === 'start') {
    $deck_number = isset($_GET['de']) ? (int)$_GET['de'] : 0;

    if ($deck_number <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Vui lòng chọn một đề thi hợp lệ.']);
        exit();
    }

    $all_questions = loadAllQuestions();
    
    // Sắp xếp toàn bộ câu hỏi theo ID để đảm bảo các đề luôn cố định
    usort($all_questions, function($a, $b) {
        return $a['id'] <=> $b['id'];
    });

    $total_questions = count($all_questions);
    $total_decks = (int)ceil($total_questions / QUESTIONS_PER_DECK);

    if ($deck_number > $total_decks) {
        http_response_code(400);
        echo json_encode(['error' => 'Đề thi không tồn tại.']);
        exit();
    }
    
    // Cắt ra đúng các câu hỏi cho đề đã chọn
    $start_index = ($deck_number - 1) * QUESTIONS_PER_DECK;
    $deck_questions = array_slice($all_questions, $start_index, QUESTIONS_PER_DECK);
    
    // Xáo trộn thứ tự các câu hỏi trong đề này trước khi gửi đi
    shuffle($deck_questions);
    
    // Lưu câu hỏi CÓ ĐÁP ÁN vào session server
    $_SESSION['quiz_questions'] = $deck_questions;
    
    // Tạo mảng câu hỏi KHÔNG CÓ ĐÁP ÁN để gửi cho người dùng
    $questions_for_client = [];
    foreach ($deck_questions as $q) {
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

// Nếu không có action hợp lệ
http_response_code(404);
echo json_encode(['error' => 'Hành động không hợp lệ.']);
?>