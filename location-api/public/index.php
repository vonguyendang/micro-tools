<?php
// public/index.php

declare(strict_types=1); // Bật chế độ strict type cho code chặt chẽ hơn

/**
 * API Entry Point and Router
 * Handles incoming requests and routes them to the appropriate controller action.
 */

// --- Autoloader & Config ---
// Giả định file này nằm trong thư mục public/ và các thư mục khác ở cấp trên (../)
// Đường dẫn tương đối quan trọng!
require_once __DIR__ . '/../vendor/autoload.php'; // Composer autoloader
require_once __DIR__ . '/../config/config.php';   // File cấu hình (chứa các hằng số như CACHE_PATH, DATA_JSON_PATH)

// --- Use Statements ---
// Khai báo các class sẽ sử dụng để không cần viết đầy đủ namespace
use App\Service\LocationService;
use App\Controller\LocationController;
use App\Exception\NotFoundException;

// --- Error Handling & Default Headers ---
// Thiết lập header mặc định là JSON UTF-8.
// Sẽ bị ghi đè thành text/html nếu request là trang /help.
header("Content-Type: application/json; charset=utf-8");

// (Tùy chọn) Thêm các header CORS nếu API cần được gọi từ tên miền khác (ví dụ: frontend JavaScript)
// Bỏ comment các dòng dưới nếu cần và điều chỉnh cho phù hợp với tên miền của bạn
// header("Access-Control-Allow-Origin: *"); // Nguy hiểm cho production, chỉ nên dùng để test hoặc giới hạn tên miền cụ thể
// header("Access-Control-Allow-Methods: GET, OPTIONS"); // Chỉ cho phép phương thức GET và OPTIONS (preflight)
// header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With"); // Các header được phép

// --- Xử lý Preflight Request (OPTIONS) cho CORS ---
// Trình duyệt sẽ gửi request OPTIONS trước request chính để kiểm tra CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Không cần xử lý gì thêm, chỉ cần trả về mã 204 No Content
    http_response_code(204);
    exit;
}

// --- Khởi tạo Dependencies (Service & Controller) ---
$locationService = null;
$locationController = null;
try {
    // Khởi tạo LocationService, nó sẽ tự động load dữ liệu từ cache hoặc JSON
    $locationService = new LocationService();
    // Khởi tạo LocationController và inject LocationService vào
    $locationController = new LocationController($locationService);
} catch (\Throwable $e) {
    // Bắt lỗi nghiêm trọng nếu không thể khởi tạo Service/Controller
    // (ví dụ: không đọc được file data/vn-location.json hoặc không ghi được cache)
    error_log("API Initialization Failed: " . $e->getMessage() . "\n" . $e->getTraceAsString());
    // Trả về lỗi server cho client
    http_response_code(500);
    // Đảm bảo trả về JSON hợp lệ ngay cả khi lỗi khởi tạo
    echo json_encode(['error' => 'API initialization failed. Please contact administrator or check server logs.']);
    exit;
}


// --- Simple Routing Logic ---
// Phân tích URI để xác định người dùng muốn truy cập resource nào

$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$routePath = parse_url($requestUri, PHP_URL_PATH); // Lấy phần đường dẫn, bỏ query string

// Xác định đường dẫn gốc của script đang chạy so với document root
// Quan trọng khi project không nằm ở gốc của domain (ví dụ: localhost/vn-api/public/)
$scriptDir = dirname($_SERVER['SCRIPT_NAME']);
// Loại bỏ đường dẫn gốc khỏi route path để lấy đường dẫn tương đối từ gốc web
// Ví dụ: Nếu scriptDir là /vn-api/public và routePath là /vn-api/public/help -> /help
// Ví dụ: Nếu scriptDir là / và routePath là /help -> /help
if ($scriptDir && $scriptDir !== '/' && strpos($routePath, $scriptDir) === 0) {
    $routePath = substr($routePath, strlen($scriptDir));
}
// Xóa dấu / ở đầu và cuối để chuẩn hóa
$routePath = trim($routePath, '/');

// --- Xử lý route đặc biệt /help ĐẦU TIÊN ---
if ($routePath === 'help') {
    try {
         // Set header HTML TRƯỚC KHI có bất kỳ output nào
         header('Content-Type: text/html; charset=utf-8');
         // Xóa các header không cần thiết cho trang HTML (nếu đã set ở trên)
         // header_remove("Access-Control-Allow-Origin");
         // header_remove("Access-Control-Allow-Methods");
         // header_remove("Access-Control-Allow-Headers");

        // Gọi phương thức trong controller để hiển thị trang HTML
        $locationController->showHelpPage();

    } catch (\Throwable $e) {
         // Bắt lỗi nếu không thể hiển thị trang help (ví dụ: file template bị thiếu)
         error_log("Help Page Rendering Error: " . $e->getMessage() . "\n" . $e->getTraceAsString());
         // Hiển thị lỗi HTML đơn giản
          if (!headers_sent()) { // Chỉ set header/status code nếu chưa gửi
              header('Content-Type: text/html; charset=utf-8');
              // Xác định mã lỗi phù hợp
              $errorCode = ($e->getCode() >= 400 && $e->getCode() < 600) ? $e->getCode() : 500;
              http_response_code($errorCode);
          }
         echo "<h1>Lỗi Server</h1><p>Không thể hiển thị trang trợ giúp. Chi tiết lỗi đã được ghi lại.</p>";
         // Ghi thêm chi tiết lỗi vào body nếu đang ở môi trường dev
         // if (ini_get('display_errors') === '1') { echo "<pre>" . $e . "</pre>"; }
    }
    exit; // Dừng script hoàn toàn sau khi xử lý /help
}

// --- Tiếp tục xử lý các route API (JSON) ---
// Đặt lại header JSON phòng trường hợp bị ghi đè nếu có lỗi trước đó mà script chưa exit
header("Content-Type: application/json; charset=utf-8");

// Kiểm tra xem route có bắt đầu bằng tiền tố 'api' không
$baseApiPath = 'api';
$apiRoutePath = null;

if (strpos($routePath, $baseApiPath) === 0) {
    // Lấy phần đường dẫn sau 'api/'
    $apiRoutePath = substr($routePath, strlen($baseApiPath));
    $apiRoutePath = trim($apiRoutePath, '/'); // Xóa dấu / ở đầu/cuối
}

// Nếu không phải /help và cũng không bắt đầu bằng /api -> Lỗi 404
if ($apiRoutePath === null) {
     http_response_code(404);
     echo json_encode(['error' => 'Not Found. API endpoints start with /api/']);
     exit;
}

// Phân tích các phần của đường dẫn API (resource, id, subresource)
$pathSegments = explode('/', $apiRoutePath);
$resource = $pathSegments[0] ?? null;       // vd: provinces, districts, wards, search
$resourceId1 = $pathSegments[1] ?? null;    // vd: province_code
$subResource = $pathSegments[2] ?? null;    // vd: districts (khi gọi /provinces/.../districts)

// Lấy các tham số từ query string (ví dụ: ?province_code=...)
$queryParams = $_GET;

// Biến lưu kết quả và mã trạng thái HTTP
$response = null;
$statusCode = 200; // Mặc định là 200 OK

// --- Điều hướng đến Controller Method dựa trên Resource ---
try {
    switch ($resource) {
        case 'provinces':
            // Logic cho endpoint /api/provinces/...
            if ($resourceId1 !== null && $subResource === 'districts') {
                 // GET /api/provinces/{province_code}/districts
                 // Validate province_code là số
                 if (!ctype_digit($resourceId1)) {
                      throw new InvalidArgumentException("Invalid province code format. Must be an integer.", 400);
                 }
                 $response = $locationController->listDistricts((int)$resourceId1);
            } elseif ($resourceId1 !== null) {
                // GET /api/provinces/{province_code}
                if (!ctype_digit($resourceId1)) {
                     throw new InvalidArgumentException("Invalid province code format. Must be an integer.", 400);
                }
                $response = $locationController->getProvince((int)$resourceId1);
            } elseif ($subResource === null) { // Đảm bảo không có gì sau /provinces
                // GET /api/provinces
                 $response = $locationController->listProvinces();
            } else {
                 // Các trường hợp khác như /api/provinces/abc/xyz là không hợp lệ
                 throw new NotFoundException("Invalid endpoint structure for /provinces.");
            }
            break;

        case 'districts':
            // Logic cho endpoint /api/districts?province_code=...
             if (isset($queryParams['province_code'])) {
                 // Validate province_code là số
                 if (!ctype_digit($queryParams['province_code'])) {
                      throw new InvalidArgumentException("Invalid province code format in query parameter 'province_code'. Must be an integer.", 400);
                 }
                 $response = $locationController->listDistricts((int)$queryParams['province_code']);
             } else {
                 // Thiếu tham số bắt buộc
                 throw new InvalidArgumentException("Missing required query parameter 'province_code' for /districts endpoint.", 400);
             }
            break;

        case 'wards':
            // Logic cho endpoint /api/wards?province_code=...&district_code=...
             if (isset($queryParams['province_code']) && isset($queryParams['district_code'])) {
                 // Validate province_code và district_code là số
                  if (!ctype_digit($queryParams['province_code'])) {
                       throw new InvalidArgumentException("Invalid province code format in query parameter 'province_code'. Must be an integer.", 400);
                  }
                  if (!ctype_digit($queryParams['district_code'])) {
                       throw new InvalidArgumentException("Invalid district code format in query parameter 'district_code'. Must be an integer.", 400);
                  }
                 $response = $locationController->listWards((int)$queryParams['province_code'], (int)$queryParams['district_code']);
             } else {
                  // Thiếu tham số bắt buộc
                  throw new InvalidArgumentException("Missing required query parameters 'province_code' and 'district_code' for /wards endpoint.", 400);
             }
            break;

        case 'search':
             // Logic cho endpoint /api/search?q=...[&type=...][&limit=...]
             // Controller sẽ tự validate tham số 'q' bên trong
             $response = $locationController->search($queryParams);
            break;

        default:
            // Resource không được hỗ trợ hoặc đường dẫn không hợp lệ
            throw new NotFoundException("API endpoint not found.");
    }

} catch (NotFoundException $e) {
    // Bắt lỗi 404 Not Found từ Controller hoặc Router
    $statusCode = $e->getCode() ?: 404; // Lấy mã lỗi từ exception hoặc mặc định 404
    $response = ['error' => $e->getMessage()];
} catch (InvalidArgumentException $e) {
    // Bắt lỗi tham số không hợp lệ (ví dụ: thiếu, sai định dạng)
     $statusCode = $e->getCode() ?: 400; // Lấy mã lỗi từ exception hoặc mặc định 400
     $response = ['error' => $e->getMessage()];
} catch (\Throwable $e) { // Bắt tất cả các lỗi/exception khác không mong muốn
    // Lỗi server không xác định
    $statusCode = 500;
    $response = ['error' => 'An internal server error occurred. Please try again later.'];
    // Ghi log lỗi chi tiết để debug
    error_log("API Runtime Error: " . $e->getMessage() . "\n" . $e->getTraceAsString());
}

// --- Output Response ---
// Set mã trạng thái HTTP cuối cùng
http_response_code($statusCode);
// Encode kết quả thành JSON và xuất ra
// JSON_UNESCAPED_UNICODE để hiển thị tiếng Việt đúng
// JSON_PRETTY_PRINT để dễ đọc khi debug (có thể bỏ ở production để tiết kiệm dung lượng)
// JSON_PARTIAL_OUTPUT_ON_ERROR để cố gắng trả về phần JSON hợp lệ nếu có lỗi encode (PHP >= 5.5)
echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_PARTIAL_OUTPUT_ON_ERROR);

exit; // Kết thúc scripts