<?php

define("VAR_NAME","test");
${VAR_NAME} = "value";
echo VAR_NAME;
echo ${VAR_NAME};
$This = "extra";
echo $This . '<br>';

echo "\$x";
echo "$$x";
echo "/$x";
echo "$x;";
echo '<br>';

function track() {
    static $count = 0;
    $count++;
    echo $count;
}
track();
track();
track();
echo '<br>';
$x = 0;
if ($x++) {
    print "hi";
} else {
    print "how ar u";
}
$a = 5;
$b = 5;
echo ($a === $b);

