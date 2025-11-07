<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>BMI Calculator</title>
</head>
<body>
<h1>BMI Calculator</h1>
<form action="" method="POST">
    <label for="flength">Geef uw lengte:</label><br>
    <input type="text" id="flength" name="flength" required placeholder="Vul hier uw lengte in meters in..."><br>
    <input type="submit" name="submit" value="Invoeren">
</form>
<?php
$br = '<br>';
if (isset($_POST['submit'])) {
    $tekst = "";
    $lengte = isset($_POST['flength']) ? $_POST['flength'] : 0;
    for ($i=40;$i<=150;$i=$i+10) {
        $bmi = round($i / ($lengte * $lengte),2);
        $betekenis = "";
        switch ($bmi) {
            case ($bmi<18.5):
                $betekenis = 'ondergewicht';
                break;
            case ($bmi>=18.5 && $bmi <25):
                $betekenis = 'gezond gewicht';
                break;
            case ($bmi >= 25 && $bmi < 30):
                $betekenis = 'overgewicht';
                break;
            case ($bmi >= 30):
                $betekenis = 'ernstig overgewicht';
                break;
            default:
                $betekenis = 'onbekende bmi';
        }
        $tekst .= "Bij een gewicht van " . $i . "kg is de BMI " . $bmi . ", " . $betekenis . $br;
    }
    echo $tekst;
}

?>
</body>
</html>