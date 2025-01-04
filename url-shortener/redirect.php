<?php
$shortUrl = $_GET['s'];
$linksFile = 'links.json';

if (file_exists($linksFile)) {
    $links = json_decode(file_get_contents($linksFile), true);
    if (isset($links[$shortUrl])) {
        header('Location: ' . $links[$shortUrl]['originalUrl']);
        exit;
    }
}

echo 'Link not found';
?>