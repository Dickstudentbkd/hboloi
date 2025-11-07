<?php
//CLI applicatie, even zonder html/forms etc.

$lengte = readline("Geef uw lengte in meters: ");
$tekst = "";
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
    $tekst .= "Bij een gewicht van" . $i . "kg is de BMI " . $bmi . ", " . $betekenis . PHP_EOL;
}
echo $tekst;