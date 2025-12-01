<?php
$host = 'localhost';
$dbname = 'rolapplicatie';
$tblname = 'user';
$user = 'webuser';
$pw = 'W#bdeveloper';

//Connectie met MySQL maken
$dbconn = new PDO("mysql:host=$host;port=3306;charset=utf8", $user, $pw,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
//Controle bestaan database
$stmt = $dbconn->prepare("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA
                            WHERE SCHEMA_NAME = :dbname");
$stmt->bindParam('dbname', $dbname);
$stmt->execute();

$dbExist = $stmt->rowCount() == 0 ? false : true;

if (!$dbExist) { //database bestaat niet: aanmaken
    $stmt = $dbconn->prepare("CREATE DATABASE $dbname");
    $stmt->execute();
}
//controle database: bestaat altijd na dit if-statement
//connectie opnieuw opbouwen, maar nu met database
$dbconn = new PDO("mysql:host=$host;dbname=$dbname;port=3306;charset=utf8", $user, $pw,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
$stmt = $dbconn->prepare("SELECT TABLE_NAME 
                    FROM INFORMATION_SCHEMA.TABLES 
                    WHERE TABLE_SCHEMA = :dbname
                    AND TABLE_NAME = :tblname;");
$stmt->bindParam('dbname', $dbname);
$stmt->bindParam('tblname', $tblname);
$stmt->execute();
$tblExist = $stmt->rowCount() == 0 ? false : true;
if ($tblExist===false) { // tabel bestaat niet: aanmaken
    $stmt = $dbconn->prepare("CREATE TABLE $tblname (
                        id int NOT NULL AUTO_INCREMENT,
                        username VARCHAR(50) UNIQUE NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        role VARCHAR(50) NOT NULL,
                        PRIMARY KEY (id)
                        );");
    $stmt->execute();
    //invoer 2 users

    $stmt = $dbconn->prepare("INSERT INTO $tblname (username, password, role)
                                VALUES (?, ?, ?);");
    $stmt->execute(['administrator', 'geheim', 'admin']);
    $stmt->execute(['gebruiker', 'geheim', 'user']);

}
//database + tabel bestaan + connectie bestaat;
//eventueel kunnen gebruikers zich aanmelden...