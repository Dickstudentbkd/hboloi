<?php
$file = 'oefening1.txt';
if (!file_exists($file)) { //bestaat niet
    $newFile = fopen($file, "w");
    fwrite($newFile, "Dit is de eerste regel!");
    fclose($newFile);
    $readFile = fopen($file, "r");
    $inhoud = fgets($readFile);
    fclose($readFile);
    echo $inhoud;
}
?>


