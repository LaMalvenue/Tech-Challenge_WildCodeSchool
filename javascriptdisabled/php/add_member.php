<?php
include('../configNoJS.php');

if( isset($_POST['name']) ) {
    $add_member = $WildCodeSchool->prepare('INSERT INTO equipage(name_member) VALUES(:name)');
    $add_member->execute(array(
        'name'=> htmlspecialchars($_POST['name'])
    ));
    $add_member->closeCursor();
}

header('Location:../index.php');
