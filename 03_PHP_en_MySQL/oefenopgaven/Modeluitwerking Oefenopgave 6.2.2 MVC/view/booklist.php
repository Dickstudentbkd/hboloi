<html>
<head></head>
<body>
<table>
<tbody>
<tr><td>Title</td><td>Author</td><td>Description</td></tr>
</tbody>
<?php
foreach ($books as $book) {
    print_r($book->title);
    echo '<tr><td><a href="index.php?book=' . $book->title . '">' . $book->title . '</a></td><td>' .
        $book->author . '</td><td>' . $book->description . '</td></tr>';
}
?>
</table>
</body>
</html>
