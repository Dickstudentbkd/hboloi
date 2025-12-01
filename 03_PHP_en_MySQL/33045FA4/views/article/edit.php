<a href="/../home">Home</a><br>

<a href="/../article">Artikelen</a>
<?php
echo '<h1>Bewerken artikel</h1>';

?>
<form action="/article/update/<?php echo $article->id; ?>" method="POST">
    <label for="fid">Id:</label><br>
    <input type="text" id="fid" name="fid" value="<?php echo $article->id; ?>"><br>
    <label for="farticle">Name:</label><br>
    <input type="text" id="farticle" name="farticle" value="<?php echo $article->articlename; ?>"><br>
    <label for="fprice">Price:</label><br>
    <input type="text" id="fprice" name="fprice" value="<?php echo $article->price; ?>"><br>
    <input type="submit" value="opslaan">
</form>
<?php



