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
//    PDO::ATTR_EMULATE_PREPARES   =>false,
];
try {
    $pdo = new PDO($attr, $user, $password, $opts);
}
catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}
?>

<FORM action="" method="POST">
    Gebruikersnaam <input type="text" name="username">
    Wachtwoord <input type="text" name="password">
    <input type="submit" name="submit" value="inloggen">
</FORM>
<?php
function get_post($pdo, $var) {
    return $pdo->quote($_POST[$var]);
}
if (isset($_POST['submit'])) {
    $userName = get_post($pdo, 'username');
    $passWord = get_post($pdo, 'password');
    $query = "SELECT id, username, password FROM login
                WHERE username = :username and password='hogesch00l';";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':username', $userName);
    //$stmt->bindParam(':password', $passWord);
    $stmt->execute();
//    echo $query . '<br>';
//    $result = $stmt->fetch(PDO::FETCH_BOTH);
    $rows = $stmt->rowCount();
    echo 'ROWS: ' . $rows . '<br>';
    echo 'Gebruikersnaam: ' . $userName . '<br>';
    echo 'Wachtwoord: ' . $passWord . '<br>';

    if ($rows===1) {
        echo 'Succesvol ingelogd!';
        $_SESSION["loggedin"] = true;
    } else {
        echo 'helaas, combinatie gebruikersnaam en wachtwoord is bij ons niet bekend!';
        $_SESSION["loggedin"] = false;
    }
}
?>
