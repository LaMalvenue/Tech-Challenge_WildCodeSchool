<?php
include('../config.php');
if (isset($_POST['name_member'])) {


    $update_member = $WildCodeSchool->prepare('	UPDATE equipage
								SET name_member = :name_member
								WHERE id_member=:id_member'
    );

    $update_member->execute(array(
        'name_member'=> htmlspecialchars($_POST['name_member']),
        'id_member'=> $_GET['id_member']
    ));

    $update_member->closeCursor();
}

header('Location: ../index.php');