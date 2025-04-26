<?php
// src/Controller/LocationController.php
namespace App\Controller;

use App\Service\LocationService;
use App\Exception\NotFoundException; // Import exception tùy chỉnh
use InvalidArgumentException; // Import exception cho tham số không hợp lệ
use Exception;

class LocationController
{
    private LocationService $locationService;

    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    /**
     * Xử lý yêu cầu lấy danh sách tỉnh.
     */
    public function listProvinces(): array
    {
        return $this->locationService->getAllProvinces();
    }

    /**
     * Xử lý yêu cầu lấy chi tiết một tỉnh.
     * @param int $provinceCode Mã tỉnh từ URL path.
     */
    public function getProvince(int $provinceCode): array
    {
        // NotFoundException sẽ được bắt ở index.php
        return $this->locationService->getProvinceByCode($provinceCode);
    }


    /**
     * Xử lý yêu cầu lấy danh sách huyện theo tỉnh.
     * @param int $provinceCode Mã tỉnh từ URL path hoặc query param.
     */
    public function listDistricts(int $provinceCode): array
    {
         // NotFoundException sẽ được bắt ở index.php nếu tỉnh không tồn tại
        return $this->locationService->getDistrictsByProvinceCode($provinceCode);
    }

     /**
     * Xử lý yêu cầu lấy danh sách xã theo huyện và tỉnh.
     * @param int $provinceCode Mã tỉnh từ query param.
     * @param int $districtCode Mã huyện từ query param.
     */
    public function listWards(int $provinceCode, int $districtCode): array
    {
         // NotFoundException sẽ được bắt ở index.php nếu huyện/tỉnh không tồn tại
        return $this->locationService->getWardsByDistrictCode($provinceCode, $districtCode);
    }
    /**
     * Xử lý yêu cầu tìm kiếm địa danh.
     * @param array $queryParams Mảng các tham số query string (ví dụ: $_GET).
     */
    public function search(array $queryParams): array
    {
        $query = trim($queryParams['q'] ?? ''); // Lấy tham số 'q' (query)
        $type = isset($queryParams['type']) ? trim(strtolower($queryParams['type'])) : null; // Lấy loại (province, district, ward)
        $limit = isset($queryParams['limit']) ? (int)$queryParams['limit'] : 20; // Lấy giới hạn, mặc định 20

        if (empty($query)) {
            throw new InvalidArgumentException("Missing or empty search query parameter 'q'.", 400);
        }

        // Validate type nếu được cung cấp
        $allowedTypes = ['province', 'district', 'ward'];
        if ($type !== null && !in_array($type, $allowedTypes)) {
             throw new InvalidArgumentException("Invalid type parameter. Allowed values are: " . implode(', ', $allowedTypes), 400);
        }

        // Đảm bảo limit hợp lệ
        if ($limit < 1) {
            $limit = 1;
        } elseif ($limit > 100) { // Đặt giới hạn tối đa hợp lý
            $limit = 100;
        }

        // Gọi service để tìm kiếm
        $results = $this->locationService->searchLocations($query, $type, $limit);

        // Trả về kết quả (có thể là mảng rỗng nếu không tìm thấy)
        return $results;
    }
    /**
     * Hiển thị trang hướng dẫn API (HTML).
     */
    public function showHelpPage(): void
    {
        // Xác định Base URL cho các ví dụ
        $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['SERVER_PORT'] ?? 80) == 443 ? "https" : "http";
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';

        // Cố gắng xác định base path của API một cách linh hoạt hơn
        // Giả định index.php nằm trong /public/ và .htaccess điều hướng đúng
        $scriptDir = str_replace($_SERVER['DOCUMENT_ROOT'], '', dirname($_SERVER['SCRIPT_FILENAME']));
        $baseApiPath = rtrim($scriptDir, '/') . '/api'; // Giả sử API nằm dưới /api so với index.php
        // Nếu bạn không dùng /api làm tiền tố, chỉ cần $scriptDir
        // $baseApiPath = rtrim($scriptDir, '/');

        // Loại bỏ /public nếu có trong đường dẫn tính toán (phổ biến khi dev)
        $baseApiPath = str_replace('/public', '', $baseApiPath);


        $baseUrl = $scheme . '://' . $host . $baseApiPath;

        // Set header là HTML
        // Di chuyển việc set header ra index.php để quản lý tập trung
        // header('Content-Type: text/html; charset=utf-8');

        // Include file template HTML, truyền biến $baseUrl vào
        $templatePath = __DIR__ . '/../../templates/api_help.php'; // Đường dẫn từ Controller đến templates

        if (file_exists($templatePath)) {
            // Bắt đầu output buffering để lấy nội dung HTML
            ob_start();
            // Include template (biến $baseUrl sẽ có sẵn trong scope của file này)
            include $templatePath;
            // Lấy nội dung đã được buffer và xóa buffer
            $htmlContent = ob_get_clean();
            // In nội dung HTML ra
            echo $htmlContent;
        } else {
            // Chỉ log lỗi, việc set http code và echo lỗi nên ở index.php
            error_log("Error: Help page template not found at " . $templatePath);
            throw new \RuntimeException("Help page template not found.", 500);
        }
    }
}