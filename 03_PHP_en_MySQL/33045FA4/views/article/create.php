<a href="/../home">Home</a><br>

<a href="/../article">Artikelen</a>
<?php
echo '<h1>Nieuw artikel!</h1>';

?>
<form action="/article/create" method="POST">
    <label for="farticle">Name:</label><br>
    <input type="text" id="farticle" name="farticle" value=""><br>
    <label for="fprice">Price:</label><br>
    <input type="text" id="fprice" name="fprice" value=""><br>
    <input type="submit" value="opslaan">
</form>
<?php



