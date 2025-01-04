<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$originalUrl = $data['originalUrl'];
$customUrl = isset($data['customUrl']) ? $data['customUrl'] : null;

$linksFile = 'links.json';

// Load existing links
if (file_exists($linksFile)) {
    $links = json_decode(file_get_contents($linksFile), true);
} else {
    $links = [];
}

// Check if the original URL has already been shortened
foreach ($links as $shortUrl => $linkData) {
    if ($linkData['originalUrl'] === $originalUrl && !$customUrl) {
        echo json_encode(['success' => true, 'shortUrl' => $shortUrl, 'message' => 'Link đã tồn tại']);
        exit;
    }
}

// Check if the custom short URL is already in use (for editing)
if ($customUrl && isset($links[$customUrl])) {
    echo json_encode(['success' => false, 'message' => 'Custom URL already in use']);
    exit;
}

// Generate or use custom short URL
if ($customUrl) {
    $shortUrl = $customUrl;
    // Remove the old short URL if it exists
    foreach ($links as $key => $linkData) {
        if ($linkData['originalUrl'] === $originalUrl) {
            unset($links[$key]);
            break;
        }
    }
} else {
    $shortUrl = substr(md5(time()), 0, 7);
}

// Save the new shortened link
$links[$shortUrl] = ['originalUrl' => $originalUrl];
file_put_contents($linksFile, json_encode($links));

echo json_encode(['success' => true, 'shortUrl' => $shortUrl]);
?>