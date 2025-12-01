<?php
session_start();
if (!isset($_SESSION['ingelogd'])) {
    header('location: login.php');
    exit;
}
//ingelogd en verder...

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HOME</title>
    <link rel="stylesheet"  thype = "text/css" href="css/style.css">
</head>
<body>
<?php
include_once 'include/connection.php';
    //navbar
    if ($_SESSION['role']==='admin') {
        $menu = '<nav>
                    <ul>
                        <li><a href="index.php">Dashboard</a></li>
                        <li><a href="uitloggen.php">Logout</a></li>
                    </ul>
                </nav>';
    } elseif ($_SESSION['role']==='user') {
        $menu = '<nav>
                    <ul>
                        <li><a href="uitloggen.php">Logout</a></li>
                    </ul>
                </nav>';
    }
    echo $menu;
    echo '<h2>Welkom ' . $_SESSION['username'] . '!</h2>';
    echo '<p>Uw rol is: ' . $_SESSION['role'] . '</p>';
    if ($_SESSION['role']==='admin') { ?>
        <div>
            <form action="" method="POST" class="frmDetail">
                <label for="fusername">Username:</label>
                <input type="text" name="username" id="fusername">
                <label for="fpasword">Password</label>
                <input type="password" id="fpassword" name="wachtwoord">
                <input type="submit" name="create" value="Create"><br>
            </form>
        </div>
        <h2>User bijwerken</h2>
        <div>
            <form action="" method="POST" class="frmDetail">
                <label for="fusername">Username:</label>
                <input type="text" name="username" id="fusername">
                <label for="fpasword">Password</label>
                <input type="password" id="fpassword" name="wachtwoord">
                <input type="submit" name="update" value="Edit"><br>
            </form>
        </div>
        <h2>User bijwerken</h2>
        <div>
            <form action="" method="POST" class="frmDetail">
                <label for="fusername">Username:</label>
                <input type="text" name="username" id="fusername">
                <label for="fpasword">Password</label>
                <input type="password" id="fpassword" name="wachtwoord">
                <input type="submit" name="update" value="Edit"><br>
            </form>
        </div>

<?php
        } elseif ($_SESSION['role']==='user') { ?>
        <h2>Wachtwoord wijzigen</h2>
        <div>
            <form action="" method="POST" class="frmDetail">
                <input type="hidden" name="username" id="fusername" value="<?php echo $_SESSION['username'];?>" readonly>
                <label for="fpasword">Password</label>
                <input type="password" id="fpassword" name="wachtwoord">
                <input type="submit" name="update" value="Edit"><br>
            </form>
        </div>
<?php
        }
        if (isset($_POST)) {
            $username = isset($_POST['username']) ? $_POST['username'] : '';
            $password = isset($_POST['wachtwoord']) ? $_POST['wachtwoord'] : '';
            if (isset($_POST['create'])) {
                $stmt = $dbconn->prepare("INSERT INTO user (username, password, role)
                                VALUES (?, ?, ?);");
                $stmt->execute([$username, $password, 'user']);
            } elseif (isset($_POST['update'])) {
                $stmt = $dbconn->prepare("UPDATE user SET password=:password
                                        WHERE username=:username;");
                $stmt->bindParam('password', $password);
                $stmt->bindParam('username', $username);
                $stmt->execute();
            }
        }
?>

</body>
</html>
