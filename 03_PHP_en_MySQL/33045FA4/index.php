<?php
//load necessary files
require_once 'core/Database.php';
require_once 'models/Article.php';
require_once 'controllers/HomeController.php';
require_once 'controllers/ArticleController.php';
//load header...
include 'views/layout/header.php';

// Receive request and process the route to the correct controller...
$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$br = '<br>';
//echo $url;
$urlSegments = explode('/', trim($url, '/'));
$action = !empty($urlSegments[0]) ? $urlSegments[0] : 'home';
$method = !empty($urlSegments[1]) ? $urlSegments[1] : 'index';
$id = !empty($urlSegments[2]) ? $urlSegments[2] : null;
// Controleer welke controller en methode moet worden uitgevoerd
switch ($action) {
    case 'home':
        $controller = new HomeController();
        $controller->index();
        break;
    case 'article':
        $controller = new ArticleController();
        //$method wordt ook afgevangen en zorgt voor
        // verwijzing naar andere methode in de controller
        if (method_exists($controller, $method)) {
            $controller->$method($id);
        } else {
            echo '404 - Controller niet gevonden';
        }
        break;
    default:
        echo 'Pagina niet gevonden!' . $br;
        break;
}

?>