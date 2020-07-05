<?php

// Connexion a la base de donnee
try {
    $WildCodeSchool = new PDO('mysql:host=localhost:3306;dbname=wildcodeschool;charset=utf8', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
