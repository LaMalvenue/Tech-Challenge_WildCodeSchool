let getHttpRequest = function () {
    var httpRequest = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
            httpRequest.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
            }
        }
    }
    if (!httpRequest) {
        alert('Abandon :( Impossible de créer une instance XMLHTTP');
        return false;
    }
    return httpRequest
}

// Récupérer les membres
function getMembers() {
    const requeteAjax = getHttpRequest();
    requeteAjax.open("GET", "config.php");

    requeteAjax.onload = function () {
        const result = JSON.parse(requeteAjax.responseText);

        const html = result.map(function (member) {
            return '<div class="member-item"><span class="name-member">' + member.name_member + '</span><span class="modify">\n' +
                '                                <a class="update"\n' +
                '                                   href="php/update_member.php?id_member=<?php //echo $member[\'id_member\']?>"\n' +
                '                                   title="Modifier ce membre">\n' +
                '                                ✏️\n' +
                '                                </a>\n' +
                '                                <a class="delete" href="php/delete_member.php?id_member=<?php echo $member[\'id_member\']?>"\n' +
                '                                   title="Supprimer ce membre">\n' +
                '                                ❌\n' +
                '                                </a>\n' +
                '                            </span></div>'
        }).join('');
        const members = document.querySelector('.member-list');
        members.innerHTML = html;
    }
    requeteAjax.send();
}

// Ajouter des membres
function postMembers(event) {
    event.preventDefault();
    // Récupération du champ name du formulaire
    const nameAdded = document.querySelector("#name");

    const data = new FormData();
    data.append('name', nameAdded.value);
    const requeteAjax = getHttpRequest();
    requeteAjax.open('POST', 'config.php?task=write');
    requeteAjax.onload = function () {
        nameAdded.value = '';
        nameAdded.focus();
        getMembers();
    }
    requeteAjax.send(data);
}

getMembers();

document.querySelector('.new-member-form').addEventListener('submit', postMembers);

/*

for (let i = 0; i < members.length; i++) {

    let member = members[i];
    let memberButtons = member.querySelector('.modify');
    let memberNameArea = member.querySelector('.name-member');
    let memberName = memberNames[i].innerText.trim();
    let button;

    // ************* UPDATE MEMBER NAME *************

    let updateLink = member.querySelector('.update');
    let updateAction = member.querySelector('a[href]');

    updateLink.addEventListener('click', function (e) {
        e.preventDefault();
        member.innerHTML = '';
        member.innerHTML = '<form method="post" action="' + updateAction + '" class="update-form">' +
            '<input class="name-input" type="text" name="name_member" value="' + memberName + '" required>' +
            '<input type="hidden" name="id_member" value="<?php echo $member[\'id_member\']?>">' +
            '<input class="update-input" type="submit" name="submit" value="✔️">' +
            '</form>';

        button = member.querySelector('input[type="submit"]');


        form.addEventListener('submit', function (e) {
            button.disabled = true
            button.textContent = 'Chargement...'
            e.preventDefault()
            var data = new FormData(form)
            var xhr = getHttpRequest()
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        alert("Une erreur est survenue !");
                    }
                } else {
                    member.innerHTML = "";
                    memberNameArea.innerHTML = "<?php echo htmlspecialchars($member['name_member']) ?>";
                    member.appendChild(memberNameArea);
                    member.appendChild(memberButtons);
                }
                button.disabled = false
            }
            xhr.open('POST', updateAction, true)
            xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
            xhr.send(data)
        })
    });


    // ************* SECURITY DELETE MEMBER *************
    let deleteButton = member.querySelector('.delete');
    deleteButton.addEventListener('click', function (e) {
        if (!confirm("Es-tu sûr(e) de vouloir supprimer ce membre ? 🤔")) {
            e.preventDefault();
        }
    })
}
*/
