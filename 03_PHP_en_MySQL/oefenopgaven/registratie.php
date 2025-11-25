<?php
$host = 'localhost';
$database = 'loi';
$user = 'root';
$password = 'H00rnb33ck';
$chrs = 'utf8mb4';
$attr = "mysql:host=$host;dbname=$database;charset=$chrs";
$opts = [
    PDO::ATTR_ERRMODE   => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   =>false,
];
try {
    $pdo = new PDO($attr, $user, $password, $opts);
}
catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}
?>

<FORM action="" method="POST">
    Username <input type="text" name="username">
    Password <input type="text" name="password">
    <input type="submit" name="submit" value="register">
</FORM>
<?php
function get_post($pdo, $var) {
    return $pdo->quote($_POST[$var]);
}
if (isset($_POST['submit'])) {
    $userName = get_post($pdo, 'username');
    $passWord = get_post($pdo, 'password');
    $query = 'INSERT INTO login ' .
            "(username, password) " .
        "VALUES ($userName, $passWord)";
    echo $query . '<br>';
    $result = $pdo->query($query);
}
?>
