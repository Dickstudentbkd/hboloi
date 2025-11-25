<?php
//arrays
/*
 *
 * "The memory of that scene for me is like a frame of film forever frozen at that moment: the red carpet, the green lawn, the white house, the leaden sky. The new president and his first lady. - Richard M. Nixon"

De woorden 'rood', 'groen' en 'wit' komen uit $color.
 */
$tekst = "The memory of that scene for me is like a frame of film forever frozen at that moment: the red carpet, the green lawn, the white house, the leaden sky. The new president and his first lady. - Richard M. Nixon";
$arTekst = explode(" ", $tekst);
$tekstNew = "";
$color = ["rood", "groen", "wit"];
foreach ($arTekst as $word) {
    if ($word == "red") {
        $tekstNew .= $color[0];
    } else if ($word == "green") {
        $tekstNew .= $color[1];
    } else if ($word == "white") {
        $tekstNew .= $color[2];
    } else {
        $tekstNew .= $word;
    }
    $tekstNew .= " ";
}
echo $tekstNew;