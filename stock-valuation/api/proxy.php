<?php
// Cho phép truy cập từ bất kỳ nguồn nào (cần thiết cho môi trường phát triển)
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Hàm để thực hiện một yêu cầu cURL và trả về kết quả
function fetch_data($url, $headers = []) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    // Bỏ qua xác minh SSL (chỉ nên dùng trong môi trường phát triển)
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $output = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code >= 400) {
        return json_encode(['error' => true, 'message' => 'API request failed with status code ' . $http_code, 'details' => $output]);
    }
    return $output;
}

// Lấy tham số 'endpoint' từ query string
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

// API Key của Fireant
$fireant_api_key = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoyMDA5MTc4MDczLCJuYmYiOjE3MDkxNzgwNzMsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIzMWYzYzU5Ny1jYjZlLTQzYWEtYmRlZS01NjkyYjM3YWNiM2EiLCJhdXRoX3RpbWUiOjE3MDkxNzgwNzMsImlkcCI6Imlkc3J2IiwibmFtZSI6InZvZGFuZzI3MDJAZ21haWwuY29tIiwic2VjdXJpdHlfc3RhbXAiOiJlNjA5NTEzYy05ZDFmLTQ4NGUtOTAyNi01MTA0ZDVlNmYzNTMiLCJqdGkiOiIwNzc0MDRiNmE1ZmM3MjQ4ZmMyMmNlYmEzYjUzYjlhZCIsImFtciI6WyJwYXNzd29yZCJdfQ.yhyKMefOxXhxIFTD9YCAUnQYqGAnA7-m89g-EWX3B3N51m614d2uj3IhEMH6kl8W-zhgdWu1yfIY7PgiwIUqAKL4M-LG93roNzTN0F0tk_WCFbrpxyc3Z4Cv1uTi4A10EGCkqwnZ3sZV8ValCmzfxmDvXDoQRFuy91nznmiUFEg_YVnukVsZyASetLh6-_jYC-FsuW9ZCLAXo4QNkr6_DsJKbIywZkkofn7IsfWFMDBoa5dEiPyxfG8zMq3F3pydh_fKPjaz-oUWmewjIRwm0ohfNwvTJqs4jU0Pz4t4QmFYvRj_yrILxTc_59ewZvKb_fvuE8q3l1E7dXvIb7SYIg';
$fireant_headers = ['Authorization: ' . $fireant_api_key, 'Accept: application/json'];

switch ($endpoint) {
    case 'stock_data':
        $code = isset($_GET['code']) ? strtoupper($_GET['code']) : '';
        if (empty($code)) {
            echo json_encode(['error' => true, 'message' => 'Stock code is required.']);
            exit;
        }

        // Lấy tất cả dữ liệu cần thiết cho việc định giá
        $fundamental = fetch_data("https://restv2.fireant.vn/symbols/{$code}/fundamental", $fireant_headers);
        $financial_q = fetch_data("https://restv2.fireant.vn/symbols/{$code}/financial-data?type=Q&count=4", $fireant_headers);
        $financial_y = fetch_data("https://restv2.fireant.vn/symbols/{$code}/financial-data?type=Y&count=5", $fireant_headers);
        $transaction = fetch_data("https://iboard-query.ssi.com.vn/stock/{$code}");
        $profile = fetch_data("https://restv2.fireant.vn/symbols/{$code}/profile", $fireant_headers);
        
        $date_from = date('Y-m-d', strtotime('-10 year'));
        $date_to = date('Y-m-d', strtotime('+1 year'));
        $events = fetch_data("https://restv2.fireant.vn/events/search?symbol={$code}&orderBy=1&type=0&startDate={$date_from}&endDate={$date_to}&offset=0&limit=100", $fireant_headers);

        // API Trái phiếu - Thử nguồn chính trước
        $bonds_data = fetch_data('https://sbcharts.investing.com/bond_charts/bonds_chart_72.json');
        $bonds_decoded = json_decode($bonds_data, true);
        if (json_last_error() !== JSON_ERROR_NONE || empty($bonds_decoded)) {
            // Nếu nguồn chính lỗi, thử nguồn dự phòng
            $fallback_url = 'https://www.worldgovernmentbonds.com/wp-json/common/v1/historical';
            // Dữ liệu cần gửi cho API dự phòng
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

    case 'stock_price':
        $code = isset($_GET['code']) ? strtoupper($_GET['code']) : '';
        if (empty($code)) {
            echo json_encode(['error' => true, 'message' => 'Stock code is required.']);
            exit;
        }
        echo fetch_data("https://iboard-query.ssi.com.vn/stock/{$code}");
        break;

    case 'listings':
        $statusId = isset($_GET['statusId']) ? $_GET['statusId'] : '0';
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
        echo json_encode(['error' => true, 'message' => 'Invalid endpoint.']);
        break;
}
?>