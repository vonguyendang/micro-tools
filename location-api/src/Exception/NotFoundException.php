<?php
// src/Exception/NotFoundException.php
namespace App\Exception;

use Exception;

class NotFoundException extends Exception
{
    // Bạn có thể thêm logic tùy chỉnh nếu cần
    public function __construct($message = "Resource not found", $code = 404, Exception $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}