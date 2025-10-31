<?php
// api.php

require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// QUAN TRỌNG: Thay thế chuỗi này bằng khóa bí mật ngẫu nhiên của bạn
define('JWT_SECRET_KEY', 'ZGFuZ2RlcHRyYWljdXRlcGhvbWFpcXVl'); 
define('JWT_ALGORITHM', 'HS256');

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

$db_path = 'database.json';

function readDB($path) { return file_exists($path) ? json_decode(file_get_contents($path), true) : []; }
function writeDB($path, $data) { file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT)); }

$request_data = json_decode(file_get_contents('php://input'), true);
$action = $request_data['action'] ?? null;
$db = readDB($db_path);

// Hàm xác thực token và trả về username
function getUsernameFromToken() {
    global $db;
    $auth_header = $_SERVER['HTTP_AUTHORIZATION'] ?? null;
    if (!$auth_header || !preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
        http_response_code(401);
        echo json_encode(['message' => 'Token không được cung cấp.']);
        exit;
    }
    try {
        $decoded = JWT::decode($matches[1], new Key(JWT_SECRET_KEY, JWT_ALGORITHM));
        $username = $decoded->data->username;
        if (!isset($db[$username])) {
            http_response_code(404);
            echo json_encode(['message' => 'Người dùng trong token không tồn tại.']);
            exit;
        }
        return $username;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['message' => 'Token không hợp lệ hoặc đã hết hạn.']);
        exit;
    }
}


switch ($action) {
    case 'register':
        $username = $request_data['username'];
        $password = $request_data['password'];
        if (isset($db[$username])) {
            http_response_code(409); exit(json_encode(['message' => 'Tên đăng nhập đã tồn tại.']));
        }
        $db[$username] = [
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'configurations' => new stdClass()
        ];
        writeDB($db_path, $db);
        echo json_encode(['message' => 'Đăng ký thành công!']);
        break;

    case 'login':
        $username = $request_data['username'];
        $password = $request_data['password'];
        if (!isset($db[$username]) || !password_verify($password, $db[$username]['password'])) {
            http_response_code(401); exit(json_encode(['message' => 'Tên đăng nhập hoặc mật khẩu không đúng.']));
        }
        
        // TỰ ĐỘNG DỌN DẸP DỮ LIỆU CŨ: Xóa key 'config' nếu tồn tại
        if (isset($db[$username]['config'])) {
            unset($db[$username]['config']);
            writeDB($db_path, $db);
        }

        $payload = ['iat' => time(), 'exp' => time() + (60 * 60 * 24), 'data' => ['username' => $username]];
        $jwt = JWT::encode($payload, JWT_SECRET_KEY, JWT_ALGORITHM);
        echo json_encode([
            'message' => 'Đăng nhập thành công!',
            'token' => $jwt,
            'configurations' => $db[$username]['configurations'] ?? new stdClass()
        ]);
        break;

    case 'save_config':
        $username = getUsernameFromToken();
        $config_name = $request_data['name'];
        $config_data = $request_data['config'];
        if (empty($config_name)) {
            http_response_code(400); exit(json_encode(['message' => 'Tên cấu hình là bắt buộc.']));
        }
        $db[$username]['configurations'][$config_name] = $config_data;
        writeDB($db_path, $db);
        echo json_encode(['message' => "Đã lưu cấu hình '{$config_name}' thành công!"]);
        break;

    case 'delete_config':
        $username = getUsernameFromToken();
        $config_name = $request_data['name'];
        if (isset($db[$username]['configurations'][$config_name])) {
            unset($db[$username]['configurations'][$config_name]);
            writeDB($db_path, $db);
            echo json_encode(['message' => "Đã xóa cấu hình '{$config_name}'."]);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Không tìm thấy cấu hình để xóa.']);
        }
        break;

    default:
        http_response_code(400);
        echo json_encode(['message' => 'Hành động không hợp lệ.']);
        break;
}