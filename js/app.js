let getHttpRequest = function () {
    let httpRequest = false;
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
const memberList = document.querySelector('.member-list');
const emptyEquipage = document.querySelector('.empty-equipage');

// ************************ Affichage des membres ************************
function getMembers() {
    const requeteAjax = getHttpRequest();
    requeteAjax.open("GET", "config.php");

    // ***** Contenu de la fonction *****
    requeteAjax.onload = function () {
        // Récupération de la BDD au format JSON puis conversion en HTML
        const result = JSON.parse(requeteAjax.responseText);
        const html = result.map(function (member) {
            return '<div class="member-item">' +
                '<span class="name-member" data-id="' + member.id_member + '" data-name="' + member.name_member + '">' + member.name_member + '</span>' +
                '<span class="modify">\n' +
                '<a class="update" href="config.php?task=update' + member.id_member + '" title="Modifier ce membre">✏️</a>' +
                '<a class="delete" href="config.php?task=delete&id_member=' + member.id_member + '" title="Supprimer ce membre">❌</a>' +
                '</span>' +
                '</div>'
        }).join('');

        if (html === "") {
            emptyEquipage.style.display = "block";
            memberList.style.display = "none";
        } else {
            // Insersion des données récupérées dans la section member-list
            memberList.style.display = "flex";
            emptyEquipage.style.display = "none";
            memberList.innerHTML = html;

            const members = document.querySelectorAll('.member-item');

            for (let i = 0; i < members.length; i++) {
                const member = members[i];
                const dataID = member.querySelector('.name-member').getAttribute('data-id');
                const dataName = member.querySelector('.name-member').getAttribute('data-name');

// ************************ Suppression de membre ************************
                const deleteButton = member.querySelector('.delete');
                deleteButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (confirm("Es-tu sûr(e) de vouloir supprimer ce membre ? 🤔")) {
                        const deleteXHR = getHttpRequest();
                        deleteXHR.open("GET", deleteButton.getAttribute("href"));
                        deleteXHR.onload = function () {
                            getMembers();
                        }
                        deleteXHR.send();
                    }
                });
// ************************ Update de membre ************************
                const updateButton = member.querySelector('.update');
                updateButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    // On remplace le contenu de member-item par un formulaire
                    member.innerHTML = '';
                    member.innerHTML = '<form method="post" action="config.php?task=update&id_member=' + dataID + '" class="update-form">' +
                        '<input class="name-input" type="text" name="name_update" value="' + dataName + '" required>' +
                        '<input class="update-input" type="submit" name="submit" value="✔️">' +
                        '</form>';

                    const updateForm = member.querySelector('.update-form');
                    const nameUpdate = member.querySelector(".name-input");
                    // Pour placer le curseur à la fin du nom du membre
                    const nameLength = nameUpdate.value.length * 2;
                    nameUpdate.focus();
                    nameUpdate.setSelectionRange(nameLength, nameLength);

                    updateForm.addEventListener('submit', function (e) {
                        e.preventDefault();
                        const data = new FormData();
                        data.append('name_update', nameUpdate.value);
                        const updateXHR = getHttpRequest();
                        updateXHR.open("POST", updateForm.getAttribute("action"));
                        updateXHR.onload = function () {
                            getMembers();
                        }
                        updateXHR.send(data);
                    });
                });
            }
        }
    }
    requeteAjax.send();
}

// Ajouter des membres
function postMembers(event) {
    const nameAdded = document.querySelector("#name");
    event.preventDefault();
    // Récupération du champ name du formulaire
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

document.querySelector('.new-member-form').addEventListener('submit', postMembers);

getMembers();
