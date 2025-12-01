<?php
//$file = basename($_SERVER['REQUEST_URI']);
//Title aanpassen...
$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$urlSegments = explode('/', trim($url, '/'));
$action = !empty($urlSegments[0]) ? $urlSegments[0] : 'home';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $action; ?></title>
</head>
<body>
