<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$originalUrl = isset($input['originalUrl']) ? trim($input['originalUrl']) : null;
$customShortCode = isset($input['customUrl']) ? trim($input['customUrl']) : null; // customUrl từ client là shortCode mong muốn

if (empty($originalUrl)) {
    echo json_encode(['success' => false, 'message' => 'Original URL không được để trống.']);
    exit;
}
if (filter_var($originalUrl, FILTER_VALIDATE_URL) === false) {
    echo json_encode(['success' => false, 'message' => 'Original URL không hợp lệ.']);
    exit;
}

$linksFile = 'links.json';
$linksArray = []; // Luôn làm việc với mảng
if (file_exists($linksFile)) {
    $fileContent = file_get_contents($linksFile);
    if (!empty($fileContent)) {
        $decodedContent = json_decode($fileContent, true);
        if (is_array($decodedContent)) {
            $linksArray = $decodedContent;
        }
    }
}

$now = date('Y-m-d H:i:s');
$message = "Link đã được xử lý thành công.";
$finalShortCode = '';
$existingLinkByOriginalUrl = null;
$existingLinkByOriginalUrl_index = -1;

// Tìm xem originalUrl đã tồn tại chưa
foreach ($linksArray as $index => $link) {
    if ($link['originalUrl'] === $originalUrl) {
        $existingLinkByOriginalUrl = $link;
        $existingLinkByOriginalUrl_index = $index;
        break;
    }
}

if ($customShortCode) {
    $finalShortCode = $customShortCode;

    // 1. Kiểm tra customShortCode này có đang được dùng cho một originalUrl KHÁC không
    $customShortCodeInUseByOther = false;
    foreach ($linksArray as $index => $link) {
        if ($link['shortCode'] === $customShortCode && $link['originalUrl'] !== $originalUrl) {
            $customShortCodeInUseByOther = true;
            break;
        }
    }
    if ($customShortCodeInUseByOther) {
        echo json_encode(['success' => false, 'message' => 'Custom URL (alias) này đã được sử dụng cho một link khác.']);
        exit;
    }

    // 2. Xử lý logic khi có customShortCode
    if ($existingLinkByOriginalUrl_index !== -1) { // OriginalURL đã tồn tại
        // Đây là trường hợp người dùng muốn đổi alias cho một originalUrl đã có
        // Hoặc xác nhận lại alias cũ
        if ($linksArray[$existingLinkByOriginalUrl_index]['shortCode'] === $customShortCode) {
            // Alias không đổi, chỉ cập nhật updatedAt
            $linksArray[$existingLinkByOriginalUrl_index]['updatedAt'] = $now;
            $message = 'Link không đổi, đã cập nhật thời gian.';
        } else {
            // Alias thay đổi. Cập nhật shortCode và updatedAt cho entry hiện tại của originalUrl
            // (Giả định là một originalUrl chỉ có một shortCode tại một thời điểm)
            $linksArray[$existingLinkByOriginalUrl_index]['shortCode'] = $customShortCode;
            $linksArray[$existingLinkByOriginalUrl_index]['updatedAt'] = $now;
            $message = 'Alias của link đã được cập nhật thành công.';
        }
    } else { // OriginalURL này mới, và người dùng cung cấp customShortCode
        $newLink = [
            'id'          => uniqid('link_'),
            'shortCode'   => $customShortCode,
            'originalUrl' => $originalUrl,
            'clicks'      => 0,
            'createdAt'   => $now,
            'updatedAt'   => $now
        ];
        $linksArray[] = $newLink;
        $message = 'Link với custom URL đã được tạo thành công.';
    }
} else { // Không có customShortCode (rút gọn tự động)
    if ($existingLinkByOriginalUrl_index !== -1) { // OriginalURL đã tồn tại
        $finalShortCode = $linksArray[$existingLinkByOriginalUrl_index]['shortCode'];
        $linksArray[$existingLinkByOriginalUrl_index]['updatedAt'] = $now;
        $message = 'Link đã tồn tại, thông tin đã được cập nhật.';
    } else { // OriginalURL này mới, tạo shortCode tự động
        do {
            $tempShortCode = substr(md5(time() . $originalUrl . rand()), 0, 7);
            $isDuplicate = false;
            foreach ($linksArray as $link) {
                if ($link['shortCode'] === $tempShortCode) {
                    $isDuplicate = true;
                    break;
                }
            }
        } while ($isDuplicate);
        $finalShortCode = $tempShortCode;
        $newLink = [
            'id'          => uniqid('link_'),
            'shortCode'   => $finalShortCode,
            'originalUrl' => $originalUrl,
            'clicks'      => 0,
            'createdAt'   => $now,
            'updatedAt'   => $now
        ];
        $linksArray[] = $newLink;
        $message = 'Link đã được rút gọn thành công.';
    }
}

file_put_contents($linksFile, json_encode($linksArray, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
echo json_encode(['success' => true, 'shortUrl' => $finalShortCode, 'message' => $message]);
?>