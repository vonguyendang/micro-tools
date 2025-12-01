<?php
header('Content-Type: application/json');

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';

if (empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email is required']);
    exit;
}

$file = 'emails.json';

// Read existing emails
$emails = [];
if (file_exists($file)) {
    $json = file_get_contents($file);
    $emails = json_decode($json, true) ?? [];
}

// Check if email already exists
if (in_array($email, $emails)) {
    echo json_encode(['message' => 'Email already subscribed']);
    exit;
}

// Add new email
$emails[] = $email;

// Save back to file
if (file_put_contents($file, json_encode($emails, JSON_PRETTY_PRINT))) {
    echo json_encode(['message' => 'Subscription successful']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}
?>
