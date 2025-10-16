<?php
// ===== CÀI ĐẶT CHUNG =====
// Thiết lập header cho phép truy cập từ bất kỳ nguồn nào (CORS)
header("Access-Control-Allow-Origin: *");
// Thiết lập header cho biết nội dung trả về là định dạng JSON
header('Content-Type: application/json');

// ===== HÀM LẤY DỮ LIỆU TỪ URL (sử dụng cURL) =====
/**
 * Thực hiện một yêu cầu cURL để lấy dữ liệu từ một URL.
 * @param string $url URL cần lấy dữ liệu.
 * @param array $custom_headers Mảng các header tùy chỉnh để gửi kèm yêu cầu.
 * @return string Dữ liệu trả về từ URL (dưới dạng chuỗi JSON hoặc HTML).
 */
function fetch_data($url, $custom_headers = []) {
    // Khởi tạo một phiên cURL mới
    $ch = curl_init();

    // Giả lập các header của trình duyệt để trông giống một người dùng thật
    $browser_headers = [
        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language: en-US,en;q=0.9,vi;q=0.8',
    ];
    
    // Gộp các header của trình duyệt và header tùy chỉnh
    $headers = array_merge($browser_headers, $custom_headers);

    // Cấu hình các tùy chọn cho cURL
    curl_setopt($ch, CURLOPT_URL, $url); // Đặt URL
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Trả về kết quả dưới dạng chuỗi thay vì in ra
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); // Đặt các header
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'); // Giả lập User-Agent
    
    // Xử lý cookie để vượt qua các biện pháp bảo vệ (ví dụ: Cloudflare)
    $cookie_file = sys_get_temp_dir() . '/cloudflare_cookie.txt'; // Tạo đường dẫn file cookie tạm
    curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file); // Lưu cookie vào file
    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file); // Đọc cookie từ file
    
    // Bỏ qua việc xác minh chứng chỉ SSL (hữu ích khi test ở local)
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    
    // Cho phép cURL đi theo các chuyển hướng (redirect)
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_MAXREDIRS, 5); // Giới hạn số lần chuyển hướng

    // Đặt thời gian chờ kết nối và thời gian chờ tổng thể
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30); // Chờ kết nối trong 30 giây
    curl_setopt($ch, CURLOPT_TIMEOUT, 45); // Tổng thời gian chờ là 45 giây

    // Thực thi yêu cầu cURL
    $output = curl_exec($ch);
    // Lấy mã trạng thái HTTP
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    // Lấy thông báo lỗi cURL (nếu có)
    $curl_error = curl_error($ch);
    // Đóng phiên cURL
    curl_close($ch);

    // Kiểm tra nếu có lỗi cURL
    if ($curl_error) {
        return json_encode(['error' => true, 'message' => 'Lỗi cURL: ' . $curl_error]);
    }

    // Kiểm tra nếu mã trạng thái HTTP là lỗi (>= 400)
    if ($http_code >= 400) {
        return json_encode(['error' => true, 'message' => 'Yêu cầu API thất bại với mã trạng thái ' . $http_code, 'details' => $output]);
    }
    
    // Trả về dữ liệu nếu không có lỗi
    return $output;
}

// ===== XỬ LÝ ROUTING DỰA TRÊN ENDPOINT =====

// Lấy tham số 'endpoint' từ query string để xác định yêu cầu là gì
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

// API Key của Fireant (cần được bảo mật hơn trong môi trường thực tế)
$fireant_api_key = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoyMDA5MTc4MDczLCJuYmYiOjE3MDkxNzgwNzMsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIzMWYzYzU5Ny1jYjZlLTQzYWEtYmRlZS01NjkyYjM3YWNiM2EiLCJhdXRoX3RpbWUiOjE3MDkxNzgwNzMsImlkcCI6Imlkc3J2IiwibmFtZSI6InZvZGFuZzI3MDJAZ21haWwuY29tIiwic2VjdXJpdHlfc3RhbXAiOiJlNjA5NTEzYy05ZDFmLTQ4NGUtOTAyNi01MTA0ZDVlNmYzNTMiLCJqdGkiOiIwNzc0MDRiNmE1ZmM3MjQ4ZmMyMmNlYmEzYjUzYjlhZCIsImFtciI6WyJwYXNzd29yZCJdfQ.yhyKMefOxXhxIFTD9YCAUnQYqGAnA7-m89g-EWX3B3N51m614d2uj3IhEMH6kl8W-zhgdWu1yfIY7PgiwIUqAKL4M-LG93roNzTN0F0tk_WCFbrpxyc3Z4Cv1uTi4A10EGCkqwnZ3sZV8ValCmzfxmDvXDoQRFuy91nznmiUFEg_YVnukVsZyASetLh6-_jYC-FsuW9ZCLAXo4QNkr6_DsJKbIywZkkofn7IsfWFMDBoa5dEiPyxfG8zMq3F3pydh_fKPjaz-oUWmewjIRwm0ohfNwvTJqs4jU0Pz4t4QmFYvRj_yrILxTc_59ewZvKb_fvuE8q3l1E7dXvIb7SYIg';
$fireant_headers = ['Authorization: ' . $fireant_api_key, 'Accept: application/json'];

// ===== FIX: SỬ DỤNG PROXY TRUNG GIAN CHO CÁC API BỊ CHẶN (ví dụ: SSI) =====
$third_party_proxy = 'https://webproxy.vodang2702.workers.dev/?url=';
// =======================================================================

// Sử dụng switch-case để xử lý các endpoint khác nhau
switch ($endpoint) {
    // Endpoint lấy dữ liệu tổng hợp của một mã cổ phiếu
    case 'stock_data':
        $code = isset($_GET['code']) ? strtoupper($_GET['code']) : '';
        if (empty($code)) {
            echo json_encode(['error' => true, 'message' => 'Mã cổ phiếu là bắt buộc.']);
            exit;
        }

        // Lấy dữ liệu từ nhiều nguồn khác nhau
        $fundamental = fetch_data("https://restv2.fireant.vn/symbols/{$code}/fundamental", $fireant_headers); // Dữ liệu cơ bản
        $financial_q = fetch_data("https://restv2.fireant.vn/symbols/{$code}/financial-data?type=Q&count=4", $fireant_headers); // Báo cáo tài chính theo quý
        $financial_y = fetch_data("https://restv2.fireant.vn/symbols/{$code}/financial-data?type=Y&count=5", $fireant_headers); // Báo cáo tài chính theo năm
        $transaction = fetch_data($third_party_proxy . "https://iboard-query.ssi.com.vn/stock/{$code}"); // Dữ liệu giao dịch từ SSI (qua proxy)
        $profile = fetch_data("https://restv2.fireant.vn/symbols/{$code}/profile", $fireant_headers); // Thông tin hồ sơ công ty
        
        // Lấy sự kiện của công ty trong 10 năm qua và 1 năm tới
        $date_from = date('Y-m-d', strtotime('-10 year'));
        $date_to = date('Y-m-d', strtotime('+1 year'));
        $events = fetch_data("https://restv2.fireant.vn/events/search?symbol={$code}&orderBy=1&type=0&startDate={$date_from}&endDate={$date_to}&offset=0&limit=100", $fireant_headers);

        // Lấy dữ liệu lợi suất trái phiếu chính phủ - Thử nguồn chính (investing.com) trước
        $bonds_data = fetch_data('https://sbcharts.investing.com/bond_charts/bonds_chart_72.json');
        $bonds_decoded = json_decode($bonds_data, true);
        // Nếu nguồn chính lỗi hoặc không có dữ liệu
        if (json_last_error() !== JSON_ERROR_NONE || empty($bonds_decoded)) {
            // Thử nguồn dự phòng (worldgovernmentbonds.com)
            $fallback_url = 'https://www.worldgovernmentbonds.com/wp-json/common/v1/historical';
            // Dữ liệu cần gửi cho API dự phòng (dưới dạng POST)
            $post_data = json_encode([
                "GLOBALVAR" => [
                    "JS_VARIABLE" => "jsGlobalVars", "FUNCTION" => "Bond", "DOMESTIC" => true,
                    "ENDPOINT" => "https://www.worldgovernmentbonds.com/wp-json/common/v1/historical",
                    "DATE_RIF" => "2099-12-31", "OBJ" => ["UNIT" => "%", "DECIMAL" => 3, "UNIT_DELTA" => "bp", "DECIMAL_DELTA" => 1],
                    "COUNTRY1" => ["SYMBOL" => "58", "PAESE" => "Vietnam", "PAESE_UPPERCASE" => "VIETNAM", "BANDIERA" => "vn", "URL_PAGE" => "vietnam"],
                    "COUNTRY2" => null, "OBJ1" => ["DURATA_STRING" => "10 Years", "DURATA" => 120], "OBJ2" => null
                ]
            ]);
            $ch_fallback = curl_init($fallback_url);
            curl_setopt($ch_fallback, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch_fallback, CURLOPT_POST, true);
            curl_setopt($ch_fallback, CURLOPT_POSTFIELDS, $post_data);
            curl_setopt($ch_fallback, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Content-Length: ' . strlen($post_data)]);
            $fallback_result = curl_exec($ch_fallback);
            curl_close($ch_fallback);
            $bonds_data = $fallback_result;
        }

        // Gộp tất cả dữ liệu lại và trả về dưới dạng JSON
        echo json_encode([
            'fundamental' => json_decode($fundamental),
            'financial_q' => json_decode($financial_q),
            'financial_y' => json_decode($financial_y),
            'bonds' => json_decode($bonds_data),
            'transaction' => json_decode($transaction),
            'events' => json_decode($events),
            'profile' => json_decode($profile)
        ]);
        break;

    // Endpoint chỉ lấy giá cổ phiếu
    case 'stock_price':
        $code = isset($_GET['code']) ? strtoupper($_GET['code']) : '';
        if (empty($code)) {
            echo json_encode(['error' => true, 'message' => 'Mã cổ phiếu là bắt buộc.']);
            exit;
        }
        // Lấy dữ liệu giá từ SSI (qua proxy)
        echo fetch_data($third_party_proxy . "https://iboard-query.ssi.com.vn/stock/{$code}");
        break;

    // Endpoint lấy danh sách các công ty niêm yết/sắp niêm yết
    case 'listings':
        // statusId=0: Sắp niêm yết, statusId=1: Đã niêm yết
        $statusId = isset($_GET['statusId']) ? $_GET['statusId'] : '0';
        echo fetch_data("https://api.hsx.vn/l/api/v1/1/securities?pageIndex=1&pageSize=100&newListingStatusId={$statusId}");
        break;

    // Endpoint lấy sự kiện chung của toàn thị trường
    case 'events_general':
         $startDate = date('Y-m-d', strtotime('-3 months')); // Từ 3 tháng trước
         $endDate = date('Y-m-d', strtotime('+3 months')); // Đến 3 tháng sau
         echo fetch_data("https://restv2.fireant.vn/events/search?symbol=&orderBy=1&type=0&startDate={$startDate}&endDate={$endDate}&offset=0&limit=500", $fireant_headers);
        break;

    // Endpoint lấy sự kiện từ sàn HOSE
    case 'events_hose':
        $startDate = date('Y-m-d', strtotime('-3 days'));
        $endDate = date('Y-m-d', strtotime('+1 year'));
        echo fetch_data("https://api.hsx.vn/n/api/v1/1/news/newstype/0/3?pageIndex=1&pageSize=200&startDate={$startDate}&endDate={$endDate}&aliasCate=su-kien");
        break;

    // Trường hợp endpoint không hợp lệ
    default:
        echo json_encode(['error' => true, 'message' => 'Endpoint không hợp lệ.']);
        break;
}
?>