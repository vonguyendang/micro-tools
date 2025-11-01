<?php
// Bắt đầu session để lưu trữ đáp án bí mật trên server
ini_set('session.gc_maxlifetime', 14400);
session_set_cookie_params(14400);
session_start();

header('Content-Type: application/json');

// --- HÀM BÁO LỖI CHUẨN HÓA ---
function send_error($http_code, $message) {
    http_response_code($http_code);
    echo json_encode(['error' => $message]);
    exit();
}

// Hằng số
const QUESTIONS_PER_DECK = 70;
const DATA_JSON_PATH = 'data.json';
const ADD_QUIZ_JSON_PATH = 'add-quiz.json';

// Hàm để tải và gộp tất cả câu hỏi
function loadAllQuestions() {
    // --- BƯỚC 1: KIỂM TRA VÀ ĐỌC data.json ---
    if (!file_exists(DATA_JSON_PATH) || !is_readable(DATA_JSON_PATH)) {
        send_error(500, 'Lỗi Server: Không thể tìm thấy hoặc không có quyền đọc file data.json. Vui lòng kiểm tra lại file trên host.');
    }
    $original_content = file_get_contents(DATA_JSON_PATH);
    if ($original_content === false) {
        send_error(500, 'Lỗi Server: Đã xảy ra lỗi khi đọc nội dung file data.json.');
    }
    $original_questions = json_decode($original_content, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        send_error(500, 'Lỗi Server: File data.json chứa dữ liệu không hợp lệ. Vui lòng kiểm tra lại cấu trúc JSON.');
    }

    // --- BƯỚC 2: KIỂM TRA VÀ ĐỌC add-quiz.json ---
    $added_questions = [];
    if (file_exists(ADD_QUIZ_JSON_PATH)) {
        if (!is_readable(ADD_QUIZ_JSON_PATH)) {
            send_error(500, 'Lỗi Server: Không có quyền đọc file add-quiz.json. Vui lòng kiểm tra quyền truy cập file trên host.');
        }
        $added_content = file_get_contents(ADD_QUIZ_JSON_PATH);
        if ($added_content === false) {
            send_error(500, 'Lỗi Server: Đã xảy ra lỗi khi đọc nội dung file add-quiz.json.');
        }
        // Cho phép file rỗng, nhưng nếu có nội dung thì phải hợp lệ
        if (!empty(trim($added_content))) {
            $decoded_added = json_decode($added_content, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                 send_error(500, 'Lỗi Server: File add-quiz.json chứa dữ liệu không hợp lệ. Nội dung phải là một mảng JSON (ví dụ: []).');
            }
            if (is_array($decoded_added)) {
                $added_questions = $decoded_added;
            }
        }
    }
    
    return array_merge($original_questions ?: [], $added_questions);
}

// Lấy hành động từ request
$action = $_GET['action'] ?? '';

// ACTION: LIỆT KÊ CÁC ĐỀ THI
if ($action === 'list_decks') {
    $all_questions = loadAllQuestions();
    $total_questions = count($all_questions);
    $total_decks = (int)ceil($total_questions / QUESTIONS_PER_DECK);
    
    echo json_encode(['totalDecks' => $total_decks, 'totalQuestions' => $total_questions]);
    exit();
}

// ACTION: BẮT ĐẦU BÀI THI THEO ĐỀ
if ($action === 'start') {
    $deck_number = isset($_GET['de']) ? (int)$_GET['de'] : 0;

    if ($deck_number <= 0) {
        send_error(400, 'Vui lòng chọn một đề thi hợp lệ.');
    }

    $all_questions = loadAllQuestions();
    
    usort($all_questions, function($a, $b) {
        return ($a['id'] ?? 0) <=> ($b['id'] ?? 0);
    });

    $total_questions = count($all_questions);
    $total_decks = (int)ceil($total_questions / QUESTIONS_PER_DECK);

    if ($deck_number > $total_decks) {
        send_error(400, 'Đề thi không tồn tại.');
    }
    
    $start_index = ($deck_number - 1) * QUESTIONS_PER_DECK;
    $deck_questions = array_slice($all_questions, $start_index, QUESTIONS_PER_DECK);
    
    shuffle($deck_questions);
    
    $_SESSION['quiz_questions'] = $deck_questions;
    
    $questions_for_client = [];
    foreach ($deck_questions as $q) {
        unset($q['correctAnswer']);
        $questions_for_client[] = $q;
    }
    
    echo json_encode($questions_for_client);
    exit();
}

// ACTION: NỘP BÀI
if ($action === 'submit') {
    $user_answers = json_decode(file_get_contents('php://input'), true);
    $correct_questions = $_SESSION['quiz_questions'] ?? [];
    
    if (empty($correct_questions)) {
        send_error(400, 'Phiên làm việc đã hết hạn. Vui lòng làm lại bài.');
    }
    
    $score = 0;
    $correct_answers_map = [];
    foreach ($correct_questions as $q) {
        $correct_answers_map[$q['id']] = $q['correctAnswer'];
    }
    
    foreach ($user_answers as $id => $answer) {
        if (isset($correct_answers_map[$id]) && $correct_answers_map[$id] === $answer) {
            $score++;
        }
    }
    
    echo json_encode([
        'score' => $score,
        'total' => count($correct_questions),
        'reviewData' => $correct_questions
    ]);

    unset($_SESSION['quiz_questions']);
    exit();
}

// Nếu không có action hợp lệ
send_error(404, 'Hành động không hợp lệ.');
?>