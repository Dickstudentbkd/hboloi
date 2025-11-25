<?php
//zorgt voor de databaseconnectie; Door te werken met een static property $instance en function
//hoef je geen object aan te maken en kan je de db-connect ophalen via getConnection. Hiervoor is wel
//self voor nodig. Geen $this zoals vanuit een object.
class Database {
    private static $instance = null;

    public static function getConnection() {
        if (!self::$instance) {
            try {
                self::$instance = new PDO('mysql:host=db;port=3306;dbname=loi33045FA4;charset=utf8',
                    'webuser', 'W#bdeveloper');
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $e) {
                self::$instance = null;
                return $e->getMessage();
            }
        }
        return self::$instance;
    }
}
