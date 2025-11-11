<?php
require_once("class/Konijn.php");
$br = "<br>";
//object $konijn aanmaken op basis van de class Konijn...
$konijn = new Konijn();
//controle of alle bestanden bestaan...
$konijn->checkTxtFiles();
//declaratie arrays voor emokonijnen per regel
$emokonijnen_1 = array();
$emokonijnen_2 = array();
//voorbeeld array
/*Array (
    [0] => Array ( [0] => boos [1] => (@.@) )
  $emokonijen_1[0][0] = 'boos' (emotie-tekst)
  $emokonijen_1[0][1] = '(@.@)' (emotie-tekening)
*/
//array 1e regel
for ($i=0;$i<15;$i++) {
    $emokonijnen_1[$i] = $konijn->getEmotie();
}
//array 2e regel
for ($i=0;$i<15;$i++) {
    $emokonijnen_2[$i] = $konijn->getEmotie();
}

//vergelijk waarden 1e regel met 2e regel; scores bepalen en wegschrijven naar bestanden...
for ($i=0;$i<15;$i++) {
    if ($emokonijnen_1[$i][0] == $emokonijnen_2[$i][0] ) {
        $konijn->setScore($emokonijnen_1[$i][0]); // bestanden bijwerken
    }
}
//associatieve array met scores creëren (vanuit bestanden)
//scores zijn al opgehoogd in vorige stap
//voorbeeld: Array ( [blij] => 11 [verwonderd] => 4 ...
$scores = $konijn->getScores();
//array maken voor onderste rij
$waardeScores = array();
for ($i=0;$i<15;$i++) {
    $waardeScores[$i] = $scores[$emokonijnen_1[$i][0]];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Emokonijnen</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<table>

    <?php
        $row_1 = "";
        $row_2 = "";
        $row_scores = "";
        //inhoud tabel samenstellen. Alles kan vanuit 1 for-loop...
        for ($i=0;$i<15;$i++) {
            $row_1 .= "<td>" . $konijn->printKonijn($emokonijnen_1[$i][1]) . "</td>";
            $row_2 .= "<td>" . $konijn->printKonijn($emokonijnen_2[$i][1]) . "</td>";
            $row_scores .= "<td>Score: " . $waardeScores[$i] . "</td>";
        }
    ?>
    <tr>
        <?php echo $row_1; ?>
    </tr>
    <tr>
        <?php echo $row_2; ?>
    </tr>
    <tr>
        <?php echo $row_scores; ?>
    </tr>
</table>
<h2>Hoe vaak komen scores voor</h2>
<table>
    <?php
        //overzicht tabel met scores/emotie
        $tabelInhoud = "";
        foreach ($scores as $tekst=>$score) {
            $tabelInhoud .= "<tr></tr><th>" . $tekst . "</th>";
            $tabelInhoud .= "<td>" . $score . "</td></tr>";
        }
        echo $tabelInhoud;
    ?>
</table>
</body>
</html>
