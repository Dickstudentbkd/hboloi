<?php
//echo "a: [" . TRUE . "]<br>";
//echo "b: [" . FALSE . "]<br>";

$score  = 1234;
$scoreboard = (array)$score;
echo $scoreboard[0];

echo "<br>";
$time = strtotime("2004/01/01");
echo date('H:i:s',$time);

$fruits = array("mango", "apple", "pear", "peach");
$fruits = array_flip($fruits);
//echo ($fruits[0]);
print_r($fruits);

$fruits = array("apple", "orange", array("pear", "mango"), "banana");
echo (count($fruits, 1));