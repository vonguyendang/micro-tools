<?php
// src/Service/LocationService.php
namespace App\Service;

use App\Exception\NotFoundException;
use Exception; // Thêm Exception

class LocationService
{
    private array $provinces = [];
    private array $districtsByProvince = []; // Index: [province_code => [districts...]]
    private array $wardsByDistrict = []; // Index: [district_code => [wards...]] // Lưu ý: district_code có thể trùng!
    private array $wardsByProvinceDistrict = []; // Index: [province_code . '_' . district_code => [wards...]]
    private array $provinceIndex = []; // Index: [province_code => province_data]
    private array $districtIndex = []; // Index: [district_code => district_data] // Lưu ý: district_code có thể trùng!
    private array $districtIndexByProvince = []; // Index: [province_code . '_' . district_code => district_data]

    public function __construct()
    {
        $this->loadAndProcessData();
    }

    /**
     * Tải dữ liệu từ cache hoặc JSON và xử lý, tạo index.
     */
    private function loadAndProcessData(): void
    {
        // Kiểm tra cache trước
        if ($this->isCacheValid()) {
            try {
                // echo "Loading from cache... "; // Debug
                $cachedData = require DATA_CACHE_FILE;
                $this->provinces = $cachedData['provinces'] ?? [];
                $this->districtsByProvince = $cachedData['districtsByProvince'] ?? [];
                $this->wardsByProvinceDistrict = $cachedData['wardsByProvinceDistrict'] ?? [];
                $this->provinceIndex = $cachedData['provinceIndex'] ?? [];
                $this->districtIndexByProvince = $cachedData['districtIndexByProvince'] ?? [];
                // echo "OK\n"; // Debug
                return; // Dữ liệu đã được load từ cache
            } catch (\Throwable $e) {
                // echo "Cache load failed: " . $e->getMessage() . "\n"; // Debug
                // Xử lý lỗi đọc cache, sẽ đọc lại từ JSON
                error_log("Failed to load location data from cache: " . $e->getMessage());
            }
        }

        // Nếu cache không hợp lệ hoặc load lỗi, đọc từ JSON
        // echo "Loading from JSON and building cache...\n"; // Debug
        try {
            if (!file_exists(DATA_JSON_PATH)) {
                throw new Exception("Data file not found: " . DATA_JSON_PATH);
            }
            $jsonContent = file_get_contents(DATA_JSON_PATH);
            if ($jsonContent === false) {
                throw new Exception("Could not read data file: " . DATA_JSON_PATH);
            }
            $data = json_decode($jsonContent, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception("Error parsing JSON data: " . json_last_error_msg());
            }

            // Xử lý dữ liệu và tạo index
            $this->provinces = $data; // Lưu dữ liệu gốc
            $this->buildIndices($data);

            // Lưu vào cache
            $this->saveCache();
        } catch (Exception $e) {
            // Lỗi nghiêm trọng khi không load được dữ liệu
            error_log("CRITICAL: Failed to load location data from JSON: " . $e->getMessage());
            // Có thể ném lại lỗi hoặc để mảng rỗng tùy yêu cầu
            throw new Exception("Could not initialize location data service.", 500, $e);
        }
    }

    /**
     * Xây dựng các mảng index để tra cứu nhanh.
     */
    private function buildIndices(array $data): void
    {
        $this->districtsByProvince = [];
        $this->wardsByProvinceDistrict = [];
        $this->provinceIndex = [];
        $this->districtIndexByProvince = [];

        foreach ($data as $province) {
            $pCode = $province['code'] ?? null;
            if (!$pCode) continue;

            $this->provinceIndex[$pCode] = $province; // Index tỉnh theo code
            $this->districtsByProvince[$pCode] = []; // Khởi tạo mảng huyện cho tỉnh

            if (!empty($province['districts']) && is_array($province['districts'])) {
                foreach ($province['districts'] as $district) {
                    $dCode = $district['code'] ?? null;
                    if (!$dCode) continue;

                    $this->districtsByProvince[$pCode][] = $district; // Thêm huyện vào danh sách của tỉnh
                    $provinceDistrictKey = $pCode . '_' . $dCode;
                    $this->districtIndexByProvince[$provinceDistrictKey] = $district; // Index huyện theo tỉnh_code + huyện_code
                    $this->wardsByProvinceDistrict[$provinceDistrictKey] = []; // Khởi tạo mảng xã cho huyện

                    if (!empty($district['wards']) && is_array($district['wards'])) {
                        foreach ($district['wards'] as $ward) {
                            $wCode = $ward['code'] ?? null;
                            if (!$wCode) continue;
                            $this->wardsByProvinceDistrict[$provinceDistrictKey][] = $ward; // Thêm xã vào danh sách của huyện
                            // Có thể tạo thêm index cho xã nếu cần tra cứu trực tiếp xã
                        }
                    }
                }
            }
        }
        // echo "Indices built.\n"; // Debug
    }

    /**
     * Kiểm tra xem file cache có hợp lệ không (tồn tại và mới hơn file JSON).
     */
    private function isCacheValid(): bool
    {
        if (!file_exists(DATA_CACHE_FILE)) {
            // echo "Cache file does not exist.\n"; // Debug
            return false;
        }
        // So sánh thời gian sửa đổi của file cache và file JSON
        $cacheMTime = @filemtime(DATA_CACHE_FILE);
        $jsonMTime = @filemtime(DATA_JSON_PATH);

        if ($cacheMTime === false || $jsonMTime === false) {
            // echo "Cannot get file modification times.\n"; // Debug
            // Lỗi khi lấy thời gian -> coi như cache không hợp lệ
            return false;
        }
        // echo "Cache Time: $cacheMTime, JSON Time: $jsonMTime\n"; // Debug

        return $cacheMTime >= $jsonMTime; // Cache hợp lệ nếu nó mới hơn hoặc bằng file JSON
    }

    /**
     * Lưu dữ liệu đã xử lý vào file cache PHP.
     */
    private function saveCache(): void
    {
        $dataToCache = [
            'provinces' => $this->provinces,
            'districtsByProvince' => $this->districtsByProvince,
            'wardsByProvinceDistrict' => $this->wardsByProvinceDistrict,
            'provinceIndex' => $this->provinceIndex,
            'districtIndexByProvince' => $this->districtIndexByProvince,
        ];

        // Xuất mảng thành code PHP để require sau này -> Rất nhanh
        $cacheContent = "<?php\n\n// Auto-generated location data cache\n// Generated at: " . date('Y-m-d H:i:s') . "\n\nreturn " . var_export($dataToCache, true) . ";\n";

        // Đảm bảo thư mục cache tồn tại và có quyền ghi
        if (!is_dir(CACHE_PATH)) {
            @mkdir(CACHE_PATH, 0775, true); // Cố gắng tạo thư mục
        }

        // Ghi file cache (ghi vào file tạm rồi đổi tên để tránh lỗi đọc dở dang)
        $tempFile = CACHE_PATH . '/location_data_' . uniqid() . '.tmp';
        if (@file_put_contents($tempFile, $cacheContent) !== false) {
            if (@rename($tempFile, DATA_CACHE_FILE)) {
                @chmod(DATA_CACHE_FILE, 0664); // Set quyền để web server đọc được
                // echo "Cache saved successfully.\n"; // Debug
            } else {
                @unlink($tempFile); // Xóa file tạm nếu rename lỗi
                error_log("Failed to rename temporary cache file to: " . DATA_CACHE_FILE);
                // echo "Cache rename failed.\n"; // Debug
            }
        } else {
            error_log("Failed to write temporary cache file: " . $tempFile);
            // echo "Cache write failed.\n"; // Debug
        }
    }

    // --- Các phương thức Public để truy vấn dữ liệu ---

    /**
     * Lấy danh sách tất cả tỉnh/thành phố (chỉ code và name).
     */
    public function getAllProvinces(): array
    {
        // Trả về từ dữ liệu gốc đã load, chỉ lấy code và name
        return array_map(function ($province) {
            return [
                'code' => $province['code'] ?? null,
                'name' => $province['name'] ?? null
            ];
        }, $this->provinces);
    }

    /**
     * Lấy thông tin chi tiết một tỉnh theo code.
     */
    public function getProvinceByCode(int $provinceCode): array
    {
        if (!isset($this->provinceIndex[$provinceCode])) {
            throw new NotFoundException("Province with code {$provinceCode} not found.");
        }
        // Trả về toàn bộ thông tin tỉnh (trừ districts, wards nếu muốn gọn)
        $province = $this->provinceIndex[$provinceCode];
        unset($province['districts']); // Bỏ bớt dữ liệu con cho gọn
        return $province;
    }

    /**
     * Lấy danh sách quận/huyện của một tỉnh (chỉ code và name).
     */
    public function getDistrictsByProvinceCode(int $provinceCode): array
    {
        if (!isset($this->districtsByProvince[$provinceCode])) {
            // Kiểm tra xem tỉnh có tồn tại không
            if (!isset($this->provinceIndex[$provinceCode])) {
                throw new NotFoundException("Province with code {$provinceCode} not found.");
            }
            // Tỉnh tồn tại nhưng không có huyện? (Ít xảy ra với dữ liệu VN)
            return []; // Trả về mảng rỗng
        }

        return array_map(function ($district) {
            return [
                'code' => $district['code'] ?? null,
                'name' => $district['name'] ?? null
            ];
        }, $this->districtsByProvince[$provinceCode]);
    }

    /**
     * Lấy danh sách phường/xã của một quận/huyện trong một tỉnh (chỉ code và name).
     */
    public function getWardsByDistrictCode(int $provinceCode, int $districtCode): array
    {
        $provinceDistrictKey = $provinceCode . '_' . $districtCode;

        if (!isset($this->wardsByProvinceDistrict[$provinceDistrictKey])) {
            // Kiểm tra xem huyện/tỉnh có tồn tại không
            if (!isset($this->districtIndexByProvince[$provinceDistrictKey])) {
                throw new NotFoundException("District with code {$districtCode} in province {$provinceCode} not found.");
            }
            // Huyện tồn tại nhưng không có xã?
            return []; // Trả về mảng rỗng
        }

        return array_map(function ($ward) {
            return [
                'code' => $ward['code'] ?? null,
                'name' => $ward['name'] ?? null
            ];
        }, $this->wardsByProvinceDistrict[$provinceDistrictKey]);
    }
    /**
     * Chuẩn hóa chuỗi tiếng Việt: chuyển về chữ thường, bỏ dấu.
     *
     * @param string $str Chuỗi đầu vào
     * @return string Chuỗi đã được chuẩn hóa
     */
    private static function normalizeString(string $str): string
    {
        // Chuyển về chữ thường
        $str = mb_strtolower($str, 'UTF-8');
        // Bỏ dấu tiếng Việt bằng cách thay thế ký tự có dấu bằng ký tự không dấu tương ứng
        $str = preg_replace('/[áàảãạăắằẳẵặâấầẩẫậ]/u', 'a', $str);
        $str = preg_replace('/[éèẻẽẹêếềểễệ]/u', 'e', $str);
        $str = preg_replace('/[íìỉĩị]/u', 'i', $str);
        $str = preg_replace('/[óòỏõọôốồổỗộơớờởỡợ]/u', 'o', $str);
        $str = preg_replace('/[úùủũụưứừửữự]/u', 'u', $str);
        $str = preg_replace('/[ýỳỷỹỵ]/u', 'y', $str);
        $str = preg_replace('/[đ]/u', 'd', $str);
        // (Tùy chọn) Xóa các ký tự đặc biệt không mong muốn
        // $str = preg_replace('/[^a-z0-9\s-]/u', '', $str);
        // Chuẩn hóa khoảng trắng
        $str = trim(preg_replace('/\s+/', ' ', $str));
        return $str;
    }

    /**
     * Tìm kiếm địa danh theo tên (tỉnh, huyện, xã).
     *
     * @param string $query Chuỗi tìm kiếm (có thể có dấu hoặc không).
     * @param ?string $type Loại địa danh cần tìm ('province', 'district', 'ward') hoặc null để tìm tất cả.
     * @param int $limit Giới hạn số lượng kết quả trả về.
     * @return array Mảng các kết quả phù hợp.
     */
    public function searchLocations(string $query, ?string $type = null, int $limit = 20): array
    {
        if (empty(trim($query))) {
            return [];
        }

        $normalizedQuery = self::normalizeString($query);
        if (empty($normalizedQuery)) {
            return [];
        }

        $results = [];
        $count = 0;

        // Lặp qua toàn bộ dữ liệu đã load (từ cache hoặc json)
        foreach ($this->provinces as $province) {
            if ($count >= $limit) break; // Dừng nếu đủ kết quả

            $provinceCode = $province['code'] ?? null;
            $provinceName = $province['name'] ?? '';
            $normalizedProvinceName = self::normalizeString($provinceName);

            // 1. Tìm kiếm Tỉnh
            if (($type === null || $type === 'province') && mb_strpos($normalizedProvinceName, $normalizedQuery, 0, 'UTF-8') !== false) {
                $results[] = [
                    'level' => 'province',
                    'code' => $provinceCode,
                    'name' => $provinceName,
                    'full_name' => $provinceName // Thêm full_name để dễ hiển thị
                ];
                $count++;
                if ($count >= $limit) break;
            }

            // 2. Tìm kiếm Huyện trong Tỉnh hiện tại
            if (($type === null || $type === 'district') && !empty($province['districts']) && is_array($province['districts'])) {
                foreach ($province['districts'] as $district) {
                    if ($count >= $limit) break 2; // Dừng cả 2 vòng lặp

                    $districtCode = $district['code'] ?? null;
                    $districtName = $district['name'] ?? '';
                    $normalizedDistrictName = self::normalizeString($districtName);

                    if (mb_strpos($normalizedDistrictName, $normalizedQuery, 0, 'UTF-8') !== false) {
                        $results[] = [
                            'level' => 'district',
                            'code' => $districtCode,
                            'name' => $districtName,
                            'full_name' => $districtName . ', ' . $provinceName, // Thêm tên tỉnh
                            'province_code' => $provinceCode,
                            'province_name' => $provinceName
                        ];
                        $count++;
                    }

                    // 3. Tìm kiếm Xã trong Huyện hiện tại
                    if (($type === null || $type === 'ward') && !empty($district['wards']) && is_array($district['wards'])) {
                        foreach ($district['wards'] as $ward) {
                            if ($count >= $limit) break 3; // Dừng cả 3 vòng lặp

                            $wardCode = $ward['code'] ?? null;
                            $wardName = $ward['name'] ?? '';
                            $normalizedWardName = self::normalizeString($wardName);

                            if (mb_strpos($normalizedWardName, $normalizedQuery, 0, 'UTF-8') !== false) {
                                $results[] = [
                                    'level' => 'ward',
                                    'code' => $wardCode,
                                    'name' => $wardName,
                                    'full_name' => $wardName . ', ' . $districtName . ', ' . $provinceName, // Thêm tên huyện, tỉnh
                                    'district_code' => $districtCode,
                                    'district_name' => $districtName,
                                    'province_code' => $provinceCode,
                                    'province_name' => $provinceName
                                ];
                                $count++;
                            }
                        } // end loop wards
                    } // end if check wards
                } // end loop districts
            } // end if check districts
        } // end loop provinces

        return $results;
    }
}
