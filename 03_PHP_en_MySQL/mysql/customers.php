<?php
require_once '../../vendor/autoload.php';

$faker = Faker\Factory::create('nl_NL'); //NL data

try {
    $pdo = new PDO('mysql:host=localhost;dbname=lesindexes;charset=utf8mb4', 'root', 'H00rnb33ck');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO customers (firstname, lastname, street, postalcode, city, email)
            VALUES (:firstname, :lastname, :street, :postalcode, :city, :email)";
    $stmt = $pdo->prepare($sql);

    $records = 10000; // aantal records
    for ($i = 0; $i < $records; $i++) {
        $stmt->execute([
            ':firstname' => $faker->firstName(),
            ':lastname' => $faker->lastName(),
            ':street' => $faker->streetName() . ' ' . $faker->buildingNumber(),
            ':postalcode' => $faker->postcode(),
            ':city' => $faker->city(),
            ':email' => $faker->unique()->email()
        ]);
    }

    echo "$records klanten toegevoegd.\n";

} catch (PDOException $e) {
    echo "Fout: " . $e->getMessage();
}