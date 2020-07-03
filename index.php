<?php
include('config.php');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <!-- **************** GENERAL META **************** -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- **************** SHARE META **************** -->
    <title>Anaïs Rouvière - Tech Challenge</title>
    <meta name="title" property="og:title" content="Anaïs Rouvière- Tech Challenge">
    <meta name = "description" content = "Tech challenge pour la Wild Code School"/>

    <!-- **************** LINKS / CSS **************** -->
    <link rel="shortcut icon" type="image/png" href="https://avatars2.githubusercontent.com/u/8874047?s=280&v=4"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link href="css/style.css" rel="stylesheet" type="text/css">
</head>
<body>
<!-- Header section -->
<header>
    <h1>
        <img width="400px"
             src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
             alt="Wild Code School logo"/>
        Les Argonautes
    </h1>
</header>

<!-- Main section -->
<main class="container-fluid">
    <div class="row">
    <div class="col-md-5 col-sm-12 add-member">

    <!-- New member form -->
    <h2>Ajouter un(e) Argonaute</h2>
    <form action="php/add_member.php" method="post" class="new-member-form">
        <label for="name">Nom de l&apos;Argonaute</label>
        <input id="name" name="name" type="text" placeholder="Charalampos" required/>
        <button type="submit">Envoyer</button>
    </form>
    </div>

    <div class="col-md-6 col-sm-12 list">
    <!-- Member list -->
    <h2>Membres de l'équipage</h2>
    <section class="member-list">

        <?php

        $req_members = $WildCodeSchool->query(' SELECT name_member FROM equipage ORDER BY id_member ASC');
        $members_count = $WildCodeSchool->query('SELECT COUNT(*) FROM equipage');
        $count = $members_count->fetch();

        if ($count == 0) { ?>

            <p>Ton équipage est vide ! 😯</p>
            <p>Ajoute tes compagnons via le champ ci-dessus !</p>

        <?php } else {

            while ($member = $req_members->fetch()) { ?>

                <div class="member-item"><?php echo htmlspecialchars($member['name_member']) ?></div>

            <?php }
        }
        $req_members->closeCursor();
        $members_count->closeCursor();
        ?>

    </section>
    </div>
    </div>
</main>

<footer>
    <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
</footer>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</body>
</html>