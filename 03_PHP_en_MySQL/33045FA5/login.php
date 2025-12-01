<?php
session_start();

if (isset($_SESSION['ingelogd'])) {
    header('location: index.php');
    exit;
}
//inlogprocedure



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet"  thype = "text/css" href="css/style.css">
</head>
<body>
<main class="main-content">
    <div id="login">
        <div>
            <form action="" method="POST" class="frmlogin">
                <label for="fInlog">Inlognaam:</label><input type="text" name="inlognaam" id="fInlog" size="25" placeholder="inlognaam..."><br>
                <label for="fWachtwoord">Wachtwoord:</label><input type="password" id="fWachtwoord" name="wachtwoord" size="25" placeholder="wachtwoord..."><br>
                <input type="submit" name="submit" value="login"><br>
            </form>
        </div>
    </div>
    <div id="login">
        <div>
            <form action="" method="POST" class="frmlogin">
                <label for="fInlog">Inlognaam:</label><input type="text" name="inlognaam" id="fInlog" size="25" placeholder="inlognaam..."><br>
                <label for="fWachtwoord">Wachtwoord:</label><input type="password" id="fWachtwoord" name="wachtwoord" size="25" placeholder="wachtwoord..."><br>
                <input type="submit" name="register" value="Registreer"><br>
            </form>
        </div>
    </div>
</main>
<?php
    if (isset($_POST['submit'])) {
        include_once('include/connection.php');
        $inlognaam = isset($_POST['inlognaam']) ? $_POST['inlognaam'] : '';
        $wachtwoord = isset($_POST['wachtwoord']) ? $_POST['wachtwoord'] : '';
        $stmt = $dbconn->prepare("SELECT username, password, role 
                                    FROM user
                                    WHERE username=:user and password=:pword;");
        $stmt->bindParam('user', $inlognaam);
        $stmt->bindParam('pword', $wachtwoord);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($stmt->rowCount()===1) { //ingelogd!
            $_SESSION['ingelogd'] = true;
            $_SESSION['username'] = $inlognaam;
            $_SESSION['password'] = $wachtwoord;
            $_SESSION['role'] = $result['role'];
            header('location: index.php');
            exit;
        } else { //username en/of wachtwoord niet  correct...
            echo 'Helaas, de combinatie van gebruikersnaam en wachtwoord is niet juist!<br>';
            session_destroy();
            session_unset();
            header('refresh=2; url=login.php');
            exit;
        }
    } elseif (isset($_POST['register'])) { //op registreer geklikt
        include_once('include/connection.php');

        $inlognaam = isset($_POST['inlognaam']) ? $_POST['inlognaam'] : '';
        $wachtwoord = isset($_POST['wachtwoord']) ? $_POST['wachtwoord'] : '';
        if ($inlognaam!=='' && $wachtwoord!=='') {
            $stmt = $dbconn->prepare("INSERT INTO user (username, password, role)
                                    VALUES (?, ?, ?);");
            $stmt->execute([$inlognaam, $wachtwoord, 'user']); //default user role
            echo 'Uw account is aangemaakt...<br>';
        }
        header('refresh=2; url=login.php');
        exit;
}

?>
</body>
</html>
