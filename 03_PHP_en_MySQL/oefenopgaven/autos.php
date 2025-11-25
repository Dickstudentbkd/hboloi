<?php
$cars = array(
    array("Volvo", "Blauw"),
    array("Audi", "Groen"),
    array("BMW", "Geel"),
    array("Skoda", "Rood"),
    array("Opel", "Grijs")
);
echo '<ul>';
for ($i=0;$i<count($cars);$i++) {
    echo '<li>' . $cars[$i][0] . "@" . $cars[$i][1] . '</li>';
}
echo '</ul>';