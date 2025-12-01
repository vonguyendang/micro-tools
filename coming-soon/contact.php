<?php
header('Content-Type: application/json');

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';

if (empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and message are required']);
    exit;
}

$file = 'messages.json';

// Read existing messages
$messages = [];
if (file_exists($file)) {
    $json = file_get_contents($file);
    $messages = json_decode($json, true) ?? [];
}

// Add new message
$newMessage = [
    'id' => round(microtime(true) * 1000),
    'name' => $name,
    'email' => $email,
    'message' => $message,
    'date' => date('c')
];

$messages[] = $newMessage;

// Save back to file
if (file_put_contents($file, json_encode($messages, JSON_PRETTY_PRINT))) {
    echo json_encode(['message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}
