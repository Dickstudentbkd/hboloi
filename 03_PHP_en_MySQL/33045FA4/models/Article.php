<?php
require_once __DIR__ . '/../core/Database.php';
class Article {
    public $name;
    public $price;
    public function __construct($name, $price) {
        $this->name = $name;
        $this->price = $price;
    }

    public static function all() {
        $db = Database::getConnection();
        // query the database for all articles
        $stmt = $db->query('SELECT * FROM article');
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }
    public static function find($id) {
        $db = Database::getConnection();
        //ophalen artikel
        $stmt = $db->prepare("SELECT * FROM article
                                WHERE id=:article");
        $stmt->bindParam('article', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_OBJ);
    }
    public static function update($id, $article, $price) {
        $db = Database::getConnection();
        //update article
        $stmt = $db->prepare("UPDATE article set articlename=:article, price=:price 
                                WHERE id=:id");
        $stmt->bindParam('id', $id);
        $stmt->bindParam('article', $article);
        $stmt->bindParam('price', $price);
        $stmt->execute();
    }
    public static function create($article, $price) {
        $db = Database::getConnection();
        //update article
        $stmt = $db->prepare("INSERT INTO article (articlename, price) 
                                VALUES(?, ?)");
        return $stmt->execute([$article, $price]);
    }
    public static function delete($id) {
        $db = Database::getConnection();
        $stmt = $db->prepare("DELETE FROM article
                                WHERE id=:id");
        $stmt->bindParam('id', $id);
        $stmt->execute();
    }
}


