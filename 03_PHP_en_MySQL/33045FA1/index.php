<?php
$studentName = "Dick van Braak";
$job = "Docent ICT";
$hobby = "Fotografie, vogels (wild/volière)";
$br = "<br>";
$leeftijd = 58;

?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    Hello, world!
    <h1>Persoonlijke informatie</h1>
    <p>
        <?php
            echo 'Naam: ' . $studentName . $br;
            echo 'Beroep: ' . $job . $br;
            echo 'Hobby: ' . $hobby . $br;
            echo 'Leeftijd: ' . $leeftijd . ' jaar' . $br;
        ?>
    </p>
</body>
</html>
