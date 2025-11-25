<?php

require_once __DIR__ . '/../models/Article.php';

class ArticleController {

    public function index() {
        $articles = Article::all();
        //data doorgeven aan index
        include __DIR__ . '/../views/article/index.php';
    }
    public function edit($id) {
        $article = Article::find($id);
        include __DIR__ . '/../views/article/edit.php';
    }
    public function update($id) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $article = isset($_POST['farticle']) ? $_POST['farticle'] : "" ;
            $price = isset($_POST['fprice']) ? $_POST['fprice'] : "" ;
            $article = Article::update($id, $article, $price);
        } else {
            echo 'POST niet gevonden...' . "<br>";
        }
        $this->index();
    }
    public function create() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $article = isset($_POST['farticle']) ? $_POST['farticle'] : "" ;
            $price = isset($_POST['fprice']) ? $_POST['fprice'] : "" ;
            $article = Article::create($article, $price);
            $this->index();
        } else {
            include __DIR__ . '/../views/article/create.php';
        }
    }
    public function delete($id) {
        //eventueel nog de vraag of artikel echt verwijdert moet worden...
        $article = Article::delete($id);
        $this->index();
    }
}