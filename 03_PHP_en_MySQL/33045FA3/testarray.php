<?php
$emoties = array(
    "blij" => "(^.^)",
    "verwonderd" => "(o.o)",
    "boos" => "(@.@)",
    "teleurgesteld" => "(>.<)",
    "vragend" => "(?.?)",
    "nadenkend" => "(&.&)",
);
foreach ($emoties as $emotietekst=>$emotie) {
    echo "Emotie: $emotie" . PHP_EOL;
}
//testen tellen/wegschrijven score uit bestand...
$emotietekst = "blij";
$file = "score/" . $emotietekst . ".txt";
$score = 0; //integer
if (file_exists($file)) { //bestaat
    //ophalen waarde score in bestand
    $activeFile = fopen($file, "r");
    $score = fgets($activeFile);
    echo 'score: ' . $score  . PHP_EOL;
//            $score = (int)$score;
    $score++;
    fclose($activeFile);
    $activeFileWrite = fopen($file, "w");
    fwrite($activeFileWrite, (int)$score);
    //ophalen en terugschrijven
    fclose($activeFileWrite);
    echo $score . '<br>';
} else {
    echo 'Bestaat niet: ' . $file;
}