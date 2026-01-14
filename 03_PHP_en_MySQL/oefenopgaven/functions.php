<?php


function getAge($date1, $date2) {
    $newDate1 = date_create($date1);
    $newDate2 = date_create($date2);
    $ageRaw = date_diff($newDate1, $newDate2);
    return $ageRaw->format("%Y");
}
$age = getAge('1967-03-31', '2025-12-4');
echo $age . '<br>';
?>