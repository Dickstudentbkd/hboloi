<a href="/../home">Home</a><br>

<a href="/../article">Artikelen</a>
<?php
echo '<h1>Artikelen</h1>';
echo '<a href="/../article/create">Artikel toevoegen</a><br>';
$table = "<table>
            <tr>
                <th>Id</th>
                <th>Naam</th>
                <th>Prijs</th>
                <th>Edit</th>
                <th>Verwijder</th>
            </tr>";
foreach ($articles as $article) {
    $table .= "<tr>
                    <td>" . $article->id . "</td>
                    <td>" . $article->articlename . "</td>
                    <td>" . $article->price . "</td>
                    <td><a href='/../article/edit/" . $article->id ."'>Bewerken</td>
                    <td><a href='/../article/delete/" . $article->id ."'>Verwijder</td>
                </tr>";
}
$table .= "</table>";
echo $table;
//TODO: Moet dit niet zijn edit?id=x? dan wordt het een ander verhaal. dit werkt nog niet.


