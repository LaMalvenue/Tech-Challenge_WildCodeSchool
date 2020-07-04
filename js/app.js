let members = document.querySelectorAll('.member-item');

for (let i = 0; i < members.length; i++) {

    let member = members[i];

    // ************* UPDATE MEMBER NAME *************
    let memberName = member.querySelector('.name-member');
    let updateLink = member.querySelector('.update');
    let updateAction = member.querySelector('a[href]');

    updateLink.addEventListener('click', function (e) {
        e.preventDefault();
        member.innerHTML = '';
        member.innerHTML = '<form method="post" action="'+updateAction+'" class="update-form">' +
            '<input class="name-input" type="text" name="name_member" value="'+memberName.innerText.trim()+'" required>' +
            '<input style="display:none;" type="text" name="id_member" value="<?php echo $member[\'id_member\']?>">' +
            '<input class="update-input" type="submit" name="submit" value="✔️">' +
            '</form>';
    });

    // ************* SECURITY DELETE MEMBER *************
    let deleteButton = member.querySelector('.delete');
    deleteButton.addEventListener('click', function (e) {
        if(!confirm("Es-tu sûr de vouloir supprimer ce membre ? 🤔")){
            e.preventDefault();
        }
    })
}
