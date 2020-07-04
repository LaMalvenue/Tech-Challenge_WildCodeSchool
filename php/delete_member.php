<?php
include('../config.php');

$delete_member = $WildCodeSchool->prepare('	DELETE FROM equipage
								WHERE id_member=:id_member');

$delete_member->execute(array(
    'id_member' => $_GET['id_member']));

$delete_member->closeCursor();


header('Location:../index.php');