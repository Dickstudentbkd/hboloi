<?php
$table = "<table>";
$start = 8;

echo "De tafels rond de tafel van 10:<br>";

for ($i=1;$i<11;$i++) {
    $table .= "<tr>";
    $table .= "<td>$i x $start = " . $start*$i . "</td>";
    $table .= "<td>$i x " . ($start+1) . " = " . ($start+1)*$i . "</td>";
    $table .= "<td>$i x " . $start+2 . " = " . ($start+2)*$i . "</td>";
    $table .= "<td>$i x " . $start+3 . " = " . ($start+3)*$i . "</td>";
    $table .= "<td>$i x " . $start+4 . " = " . ($start+4)*$i . "</td>";
    $table .= "</tr>";
}
$table .= "</table>";

echo $table;