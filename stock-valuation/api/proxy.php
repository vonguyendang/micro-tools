<?php
// ===== CÀI ĐẶT CHUNG =====
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
// Yêu cầu trình duyệt không cache kết quả để đảm bảo tính real-time
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

/**
 * --- CẢI TIẾN: HÀM GỌI API SONG SONG ---
 * Thực hiện nhiều yêu cầu cURL đồng thời để tăng tốc độ.
 * @param array $requests Mảng kết hợp ['key' => ['url' => '...', 'headers' => []]]
 * @return array Mảng kết hợp chứa kết quả ['key' => 'response_body']
 */
function fetch_data_parallel(array $requests): array {
    $multi_handle = curl_multi_init();
    $handles = [];
    $results = [];

    // Cấu hình chung cho tất cả các yêu cầu
    $browser_headers = [
        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language: en-US,en;q=0.9,vi;q=0.8',
    ];

    foreach ($requests as $key => $req) {
        $ch = curl_init();
        // Gộp header chung và header riêng của từng request
        $headers = array_merge($browser_headers, $req['headers'] ?? []);
        // Đảm bảo mỗi request có file cookie riêng để tránh xung đột
        $cookie_file = sys_get_temp_dir() . '/cookie_' . uniqid() . '.txt';

        curl_setopt_array($ch, [
            CURLOPT_URL => $req['url'],
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            CURLOPT_COOKIEJAR => $cookie_file,
            CURLOPT_COOKIEFILE => $cookie_file,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 5,
            CURLOPT_CONNECTTIMEOUT => 30,
            CURLOPT_TIMEOUT => 45,
        ]);

        curl_multi_add_handle($multi_handle, $ch);
        $handles[$key] = $ch;
    }

    // Thực thi tất cả các request cùng lúc
    $running = null;
    do {
        curl_multi_exec($multi_handle, $running);
        curl_multi_select($multi_handle);
    } while ($running > 0);

    // Lấy kết quả và đóng các handle
    foreach ($handles as $key => $ch) {
        $results[$key] = curl_multi_getcontent($ch);
        curl_multi_remove_handle($multi_handle, $ch);
    }

    curl_multi_close($multi_handle);
    return $results;
}

/**
 * Hàm lấy dữ liệu cho các request đơn lẻ (giữ lại cho các endpoint khác).
 */
function fetch_data($url, $custom_headers = []) {
    $ch = curl_init();
    $headers = array_merge([
        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language: en-US,en;q=0.9,vi;q=0.8',
    ], $custom_headers);
    $cookie_file = sys_get_temp_dir() . '/cookie_single.txt';
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        CURLOPT_COOKIEJAR => $cookie_file,
        CURLOPT_COOKIEFILE => $cookie_file,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 5,
        CURLOPT_CONNECTTIMEOUT => 30,
        CURLOPT_TIMEOUT => 45,
    ]);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;
}


// ===== XỬ LÝ ROUTING DỰA TRÊN ENDPOINT =====

$endpoint = $_GET['endpoint'] ?? '';
$fireant_api_key = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoyMDA5MTc4MDczLCJuYmYiOjE3MDkxNzgwNzMsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIzMWYzYzU5Ny1jYjZlLTQzYWEtYmRlZS01NjkyYjM3YWNiM2EiLCJhdXRoX3RpbWUiOjE3MDkxNzgwNzMsImlkcCI6Imlkc3J2IiwibmFtZSI6InZvZGFuZzI3MDJAZ21haWwuY29tIiwic2VjdXJpdHlfc3RhbXAiOiJlNjA5NTEzYy05ZDFmLTQ4NGUtOTAyNi01MTA0ZDVlNmYzNTMiLCJqdGkiOiIwNzc0MDRiNmE1ZmM3MjQ4ZmMyMmNlYmEzYjUzYjlhZCIsImFtciI6WyJwYXNzd29yZCJdfQ.yhyKMefOxXhxIFTD9YCAUnQYqGAnA7-m89g-EWX3B3N51m614d2uj3IhEMH6kl8W-zhgdWu1yfIY7PgiwIUqAKL4M-LG93roNzTN0F0tk_WCFbrpxyc3Z4Cv1uTi4A10EGCkqwnZ3sZV8ValCmzfxmDvXDoQRFuy91nznmiUFEg_YVnukVsZyASetLh6-_jYC-FsuW9ZCLAXo4QNkr6_DsJKbIywZkkofn7IsfWFMDBoa5dEiPyxfG8zMq3F3pydh_fKPjaz-oUWmewjIRwm0ohfNwvTJqs4jU0Pz4t4QmFYvRj_yrILxTc_59ewZvKb_fvuE8q3l1E7dXvIb7SYIg';
$fireant_headers = ['Authorization: ' . $fireant_api_key, 'Accept: application/json'];
$third_party_proxy = 'https://webproxy.vodang2702.workers.dev/?url=';

switch ($endpoint) {
    case 'stock_data':
        $code = isset($_GET['code']) ? strtoupper($_GET['code']) : '';
        if (empty($code)) {
            echo json_encode(['error' => true, 'message' => 'Mã cổ phiếu là bắt buộc.']);
            exit;
        }

        $date_from = date('Y-m-d', strtotime('-10 year'));
        $date_to = date('Y-m-d', strtotime('+1 year'));

        // --- CẢI TIẾN: Định nghĩa các yêu cầu API để chạy song song ---
        $requests = [
            'fundamental' => ['url' => "https://restv2.fireant.vn/symbols/{$code}/fundamental", 'headers' => $fireant_headers],
            'financial_q' => ['url' => "https://restv2.fireant.vn/symbols/{$code}/financial-data?type=Q&count=4", 'headers' => $fireant_headers],
            'financial_y' => ['url' => "https://restv2.fireant.vn/symbols/{$code}/financial-data?type=Y&count=5", 'headers' => $fireant_headers],
            'transaction' => ['url' => $third_party_proxy . "https://iboard-query.ssi.com.vn/stock/{$code}", 'headers' => []],
            'profile'     => ['url' => "https://restv2.fireant.vn/symbols/{$code}/profile", 'headers' => $fireant_headers],
            'events'      => ['url' => "https://restv2.fireant.vn/events/search?symbol={$code}&orderBy=1&type=0&startDate={$date_from}&endDate={$date_to}&offset=0&limit=100", 'headers' => $fireant_headers],
            'bonds'       => ['url' => 'https://sbcharts.investing.com/bond_charts/bonds_chart_72.json', 'headers' => []],
        ];

        // --- CẢI TIẾN: Gọi API song song ---
        $responses = fetch_data_parallel($requests);

        // Xử lý dữ liệu trái phiếu với logic fallback
        $bonds_data = $responses['bonds'];
        $bonds_decoded = json_decode($bonds_data, true);
        if (json_last_error() !== JSON_ERROR_NONE || empty($bonds_decoded)) {
            $fallback_url = 'https://www.worldgovernmentbonds.com/wp-json/common/v1/historical';
            $post_data = json_encode([ "GLOBALVAR" => [ "JS_VARIABLE" => "jsGlobalVars", "FUNCTION" => "Bond", "DOMESTIC" => true, "ENDPOINT" => "https://www.worldgovernmentbonds.com/wp-json/common/v1/historical", "DATE_RIF" => "2099-12-31", "OBJ" => ["UNIT" => "%", "DECIMAL" => 3, "UNIT_DELTA" => "bp", "DECIMAL_DELTA" => 1], "COUNTRY1" => ["SYMBOL" => "58", "PAESE" => "Vietnam", "PAESE_UPPERCASE" => "VIETNAM", "BANDIERA" => "vn", "URL_PAGE" => "vietnam"], "COUNTRY2" => null, "OBJ1" => ["DURATA_STRING" => "10 Years", "DURATA" => 120], "OBJ2" => null ] ]);
            $ch_fallback = curl_init($fallback_url);
            curl_setopt_array($ch_fallback, [ CURLOPT_RETURNTRANSFER => true, CURLOPT_POST => true, CURLOPT_POSTFIELDS => $post_data, CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Content-Length: ' . strlen($post_data)] ]);
            $bonds_data = curl_exec($ch_fallback);
            curl_close($ch_fallback);
        }

        // Gộp tất cả dữ liệu lại và trả về
        echo json_encode([
            'fundamental' => json_decode($responses['fundamental']),
            'financial_q' => json_decode($responses['financial_q']),
            'financial_y' => json_decode($responses['financial_y']),
            'bonds' => json_decode($bonds_data),
            'transaction' => json_decode($responses['transaction']),
            'events' => json_decode($responses['events']),
            'profile' => json_decode($responses['profile'])
        ]);
        break;

    case 'stock_price':
        $code = isset($_GET['code']) ? strtoupper($_GET['code']) : '';
        if (empty($code)) {
            echo json_encode(['error' => true, 'message' => 'Mã cổ phiếu là bắt buộc.']);
            exit;
        }
        echo fetch_data($third_party_proxy . "https://iboard-query.ssi.com.vn/stock/{$code}");
        break;

    case 'listings':
        $statusId = $_GET['statusId'] ?? '0';
        echo fetch_data("https://api.hsx.vn/l/api/v1/1/securities?pageIndex=1&pageSize=100&newListingStatusId={$statusId}");
        break;

    case 'events_general':
         $startDate = date('Y-m-d', strtotime('-3 months'));
         $endDate = date('Y-m-d', strtotime('+3 months'));
         echo fetch_data("https://restv2.fireant.vn/events/search?symbol=&orderBy=1&type=0&startDate={$startDate}&endDate={$endDate}&offset=0&limit=500", $fireant_headers);
        break;

    case 'events_hose':
        $startDate = date('Y-m-d', strtotime('-3 days'));
        $endDate = date('Y-m-d', strtotime('+1 year'));
        echo fetch_data("https://api.hsx.vn/n/api/v1/1/news/newstype/0/3?pageIndex=1&pageSize=200&startDate={$startDate}&endDate={$endDate}&aliasCate=su-kien");
        break;

    default:
        echo json_encode(['error' => true, 'message' => 'Endpoint không hợp lệ.']);
        break;
}
?>