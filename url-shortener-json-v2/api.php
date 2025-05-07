<?php
session_start();
header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *'); // Bỏ comment nếu cần cho CORS (ví dụ: khi phát triển local với port khác)
// header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, Authorization');

// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//     exit(0);
// }

$action = isset($_GET['action']) ? $_GET['action'] : null;
$linksFile = 'links.json';

// Đọc dữ liệu từ links.json
$linksArray = [];
if (file_exists($linksFile)) {
    $fileContent = file_get_contents($linksFile);
    if (!empty($fileContent)) {
        $decodedContent = json_decode($fileContent, true);
        // Đảm bảo $decodedContent là một mảng, nếu không thì khởi tạo mảng rỗng
        if (is_array($decodedContent)) {
            $linksArray = $decodedContent;
        }
    }
}

$now = date('Y-m-d H:i:s');

// Xác thực cho các hành động cần bảo vệ
$protected_actions = ['load', 'add', 'edit', 'delete'];
if (in_array($action, $protected_actions)) {
    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        http_response_code(401); // Unauthorized
        echo json_encode(['success' => false, 'message' => 'Unauthorized. Vui lòng đăng nhập.']);
        exit;
    }
}

switch ($action) {
    case 'load':
        // Sắp xếp theo ngày tạo mới nhất lên đầu (tùy chọn, có thể làm ở client)
        usort($linksArray, function($a, $b) use ($now) { // use $now để tránh lỗi nếu createdAt không tồn tại
            return strtotime($b['createdAt'] ?? $now) - strtotime($a['createdAt'] ?? $now);
        });
        echo json_encode($linksArray); // Trả về mảng trực tiếp
        break;

    case 'add':
        $data = json_decode(file_get_contents('php://input'), true);
        $shortCode = isset($data['shortUrl']) ? trim($data['shortUrl']) : null; // 'shortUrl' từ client là 'shortCode' mong muốn
        $originalUrl = isset($data['originalUrl']) ? trim($data['originalUrl']) : null;

        if (empty($shortCode) || empty($originalUrl)) {
            echo json_encode(['success' => false, 'message' => 'Short URL (Alias) và Original URL không được để trống.']);
            exit;
        }
        if (filter_var($originalUrl, FILTER_VALIDATE_URL) === false) {
            echo json_encode(['success' => false, 'message' => 'Original URL không hợp lệ.']);
            exit;
        }
        if (!preg_match('/^[a-zA-Z0-9_-]+$/', $shortCode)) {
            echo json_encode(['success' => false, 'message' => 'Short URL (Alias) không hợp lệ. Chỉ cho phép chữ, số, "_" và "-".']);
            exit;
        }

        // Kiểm tra shortCode đã tồn tại chưa
        $shortCodeExists = false;
        foreach ($linksArray as $link) {
            if (isset($link['shortCode']) && $link['shortCode'] === $shortCode) {
                $shortCodeExists = true;
                break;
            }
        }

        if (!$shortCodeExists) {
            $newLink = [
                'id'          => uniqid('link_'), // Tạo ID duy nhất
                'shortCode'   => $shortCode,
                'originalUrl' => $originalUrl,
                'clicks'      => 0,
                'createdAt'   => $now,
                'updatedAt'   => $now
            ];
            $linksArray[] = $newLink; // Thêm vào mảng
            file_put_contents($linksFile, json_encode($linksArray, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            echo json_encode(['success' => true, 'message' => 'Thêm liên kết thành công!', 'newLink' => $newLink]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Short URL (Alias) "' . htmlspecialchars($shortCode) . '" đã tồn tại.']);
        }
        break;

    case 'edit':
        $data = json_decode(file_get_contents('php://input'), true);
        $idToEdit = isset($data['id']) ? trim($data['id']) : null;
        $newShortCode = isset($data['newShortCode']) ? trim($data['newShortCode']) : null;
        $newOriginalUrl = isset($data['newOriginalUrl']) ? trim($data['newOriginalUrl']) : null;

        if (empty($idToEdit) || empty($newShortCode) || empty($newOriginalUrl)) {
            echo json_encode(['success' => false, 'message' => 'ID, Short URL (Alias) mới và Original URL mới không được để trống.']);
            exit;
        }
        if (filter_var($newOriginalUrl, FILTER_VALIDATE_URL) === false) {
            echo json_encode(['success' => false, 'message' => 'Original URL mới không hợp lệ.']);
            exit;
        }
        if (!preg_match('/^[a-zA-Z0-9_-]+$/', $newShortCode)) {
            echo json_encode(['success' => false, 'message' => 'Short URL (Alias) mới không hợp lệ. Chỉ cho phép chữ, số, "_" và "-".']);
            exit;
        }

        $foundIndex = -1;
        foreach ($linksArray as $index => $link) {
            if (isset($link['id']) && $link['id'] === $idToEdit) {
                $foundIndex = $index;
                break;
            }
        }

        if ($foundIndex !== -1) {
            // Kiểm tra xem newShortCode có bị trùng với link khác không (có ID khác)
            // Chỉ kiểm tra nếu newShortCode thực sự thay đổi so với shortCode hiện tại của link đang sửa
            if ($linksArray[$foundIndex]['shortCode'] !== $newShortCode) {
                foreach ($linksArray as $index_check => $link_check) {
                    if (isset($link_check['id']) && $link_check['id'] !== $idToEdit && isset($link_check['shortCode']) && $link_check['shortCode'] === $newShortCode) {
                        echo json_encode(['success' => false, 'message' => 'Short URL (Alias) mới "' . htmlspecialchars($newShortCode) . '" đã được sử dụng bởi một link khác.']);
                        exit;
                    }
                }
            }

            // Cập nhật thông tin link
            $linksArray[$foundIndex]['shortCode'] = $newShortCode;
            $linksArray[$foundIndex]['originalUrl'] = $newOriginalUrl;
            $linksArray[$foundIndex]['updatedAt'] = $now;

            file_put_contents($linksFile, json_encode($linksArray, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            echo json_encode(['success' => true, 'message' => 'Sửa liên kết thành công!', 'updatedLink' => $linksArray[$foundIndex]]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Không tìm thấy liên kết với ID cung cấp.']);
        }
        break;

    case 'delete':
        $data = json_decode(file_get_contents('php://input'), true);
        $idToDelete = isset($data['id']) ? trim($data['id']) : null; // Thay đổi: Nhận 'id' để xóa

        if (empty($idToDelete)) {
            echo json_encode(['success' => false, 'message' => 'ID của liên kết cần xóa không được để trống.']);
            exit;
        }

        $initialCount = count($linksArray);
        $deletedLinkData = null;
        // Lọc ra khỏi mảng các link có id trùng với id cần xóa
        $linksArray = array_filter($linksArray, function($link) use ($idToDelete, &$deletedLinkData) {
            if (isset($link['id']) && $link['id'] === $idToDelete) {
                $deletedLinkData = $link; // Lưu lại thông tin link đã xóa (tùy chọn)
                return false; // Loại bỏ phần tử này
            }
            return true; // Giữ lại phần tử này
        });
        // Re-index array sau khi filter
        $linksArray = array_values($linksArray);


        if (count($linksArray) < $initialCount) {
            file_put_contents($linksFile, json_encode($linksArray, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            echo json_encode(['success' => true, 'message' => 'Xóa liên kết thành công!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Không tìm thấy liên kết với ID "' . htmlspecialchars($idToDelete) . '" để xóa.']);
        }
        break;

    default:
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Hành động không hợp lệ.']);
        break;
}
?>