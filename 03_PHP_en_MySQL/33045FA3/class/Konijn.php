<?php
class Konijn {
    public $oren = "()_()";
    public $emotie;
    public $emoties;
    public $emotieText;
    public $voeten = '("")("")';
    public $score = 0;

    public function __construct() {
        $this->emoties = array(
            "blij" => "(^.^)",
            "verwonderd" => "(o.o)",
            "boos" => "(@.@)",
            "teleurgesteld" => "(>.<)",
            "vragend" => "(?.?)",
            "nadenkend" => "(&.&)",
        );
    }

    private function genereerEmotie() {
        //emoties altijd bekend door constructor
        $willekeurigeEmotie = array_rand($this->emoties);
        $this->emotieText = $willekeurigeEmotie;
        return $this->emoties[$willekeurigeEmotie];
    }
    public function printKonijn($emotie) {
        $konijn = $this->oren . "<br>";
        $this->emotie = $emotie;
        $konijn .= $this->emotie . "<br>";
        $konijn .= $this->voeten;
        return $konijn;
    }
    public function getEmotie() {
        $emotie = $this->genereerEmotie();
        return array($this->emotieText, $emotie);
    }
    public function setScore($emotietekst) {
        $file = "score/" . $emotietekst . ".txt";
        $score = 0; //integer
        if (file_exists($file)) { //bestaat
            //ophalen waarde score in bestand
            $readFile = fopen($file, "r");
            $score = fgets($readFile); //leest 1e regel
            $score++; //+1
            fclose($readFile);
            $writeFile = fopen($file, "w");
            fwrite($writeFile, $score);
            //ophalen en terugschrijven
            fclose($writeFile);
        } else {
            //echo 'Bestaat niet: ' . $file;
            $this->checkTxtFiles(); //alsnog alles aanmaken
            //alsnog invullen
            $this->setScore($emotietekst); //als path onjuist is, zou dit een loop kunnen veroorzaken
        }

    }
    public function checkTxtFiles() {
        //controleert of bestand met 'emotie'.txt bestaat, zo niet, maakt aan en zet waarde op 0
        foreach ($this->emoties as $emotietekst=>$emotie) {
            $file = "score/" . $emotietekst . ".txt";
            if (!file_exists($file)) { //bestand bestaat niet in map: aanmaken
                $newFile = fopen($file, "w");
                fwrite($newFile, 0);
                fclose($newFile);
            }
        }
    }
    public function getScores() {
        $scores = array();
        $score = 0;
        foreach ($this->emoties as $emotieTekst=>$emotie) {
                $score = $this->getScore($emotieTekst);
                $scores[$emotieTekst] = $score;
        }
        return $scores;
    }
    private function getScore($tekst) {
        $file = "score/" . $tekst . ".txt";
        if (file_exists($file)) { //bestaat
            //ophalen waarde score in bestand
            $readFile = fopen($file, "r");
            $score = fgets($readFile); //leest 1e regel
            fclose($readFile);
        } else {
            $score = 0;
        }
        return $score;

    }


}