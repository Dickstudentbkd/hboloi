<?php
  $author = "Brian W. Kernighan";

  echo <<<X
  Debugging is twice as hard as writing the code in the first place.
  Therefore, if you write the code as cleverly as possible, you are,
  by definition, not smart enough to debug it.
  
  - $author.
X;
  echo '<br>';
  echo '<br>';
  echo 'line number: ' . __LINE__;
  echo '<br>';
  echo __FILE__;
echo '<br>';
echo __DIR__;
?>
