<?php
// Connexion a la base de donnee
try {
    $WildCodeSchool = new PDO('mysql:host=localhost:3306;dbname=wildcodeschool;charset=utf8', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

// Analyser la demande faite en GET
$task = "list";
if (array_key_exists("task", $_GET)) {
    $task = $_GET['task'];
}

if ($task == "write") {
    postMembers();
} else if ($task == "update") {
    updateMember();
} else {
    getMembers();
}

function getMembers()
{
    global $WildCodeSchool;
    $req_members = $WildCodeSchool->query(' SELECT * FROM equipage ORDER BY id_member ASC');
    $members = $req_members->fetchAll();
    echo json_encode($members);
}

function postMembers()
{
    global $WildCodeSchool;
    if (!array_key_exists('name', $_POST)) {
        echo json_encode(["status" => "error"]);
        return;
    }
    $member_name = htmlspecialchars($_POST['name']);
    $add_member = $WildCodeSchool->prepare('INSERT INTO equipage SET name_member = :name');
    $add_member->execute([
        'name' => $member_name
    ]);
    echo json_encode(["status" => "success"]);
}

function updateMember() {
    global $WildCodeSchool;
    if (!array_key_exists('name', $_POST)) {
        echo json_encode(["status" => "error"]);
        return;
    }
    $member_name_update = htmlspecialchars($_POST['name_member']);
    $update_member = $WildCodeSchool->prepare('UPDATE equipage SET name_member = :name_member WHERE id_member=:id_member'
    );
    $update_member->execute(array(
        'name_member'=> $member_name_update,
        'id_member'=> $_GET['id_member']
    ));
    echo json_encode(["status" => "success"]);
}
