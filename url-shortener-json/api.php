<?php
header('Content-Type: application/json');

$action = $_GET['action'];
$linksFile = 'links.json';  // Đường dẫn tới links.json

// Load existing links
if (file_exists($linksFile)) {
    $links = json_decode(file_get_contents($linksFile), true);
} else {
    $links = [];
}

switch ($action) {
    case 'load':
        // Chuyển đổi các liên kết thành mảng đơn giản để dễ dàng hiển thị
        $result = [];
        foreach ($links as $shortUrl => $data) {
            $result[] = ['shortUrl' => $shortUrl, 'originalUrl' => $data['originalUrl']];
        }
        echo json_encode($result);
        break;

    case 'add':
        $data = json_decode(file_get_contents('php://input'), true);
        $shortUrl = $data['shortUrl'];
        $originalUrl = $data['originalUrl'];
        if (!isset($links[$shortUrl])) {
            $links[$shortUrl] = ['originalUrl' => $originalUrl];
            file_put_contents($linksFile, json_encode($links));
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Short URL đã tồn tại']);
        }
        break;

    case 'edit':
        $data = json_decode(file_get_contents('php://input'), true);
        $shortUrl = $data['shortUrl'];
        $newOriginalUrl = $data['newOriginalUrl'];
        if (isset($links[$shortUrl])) {
            $links[$shortUrl]['originalUrl'] = $newOriginalUrl;
            file_put_contents($linksFile, json_encode($links));
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Short URL không tồn tại']);
        }
        break;

    case 'delete':
        $data = json_decode(file_get_contents('php://input'), true);
        $shortUrl = $data['shortUrl'];
        if (isset($links[$shortUrl])) {
            unset($links[$shortUrl]);
            file_put_contents($linksFile, json_encode($links));
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Short URL không tồn tại']);
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
        break;
}
?>