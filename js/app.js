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
let memberButtons;
let memberNameArea;
let originalMemberName;
const emptyEquipage = document.querySelector('.empty-equipage');

// ************************ Affichage des membres ************************
function getMembers() {

    let requeteAjax = getHttpRequest();
    requeteAjax.open("GET", "config.php");

    // Récupération de la BDD au format JSON puis conversion en HTML
    requeteAjax.onload = function () {
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
        const memberList = document.querySelector('.member-list');

        if (html === "") {
            emptyEquipage.style.display = "block";
            memberList.style.display = "none";
        } else {
            // Insersion des données récupérées dans la section member-list
            memberList.style.display = "flex";
            emptyEquipage.style.display = "none";
            memberList.innerHTML = html;

            let members = document.querySelectorAll('.member-item');

            for (let i = 0; i < members.length; i++) {
                let member = members[i];
// ************************ Suppression de membre ************************
                const deleteButton = member.querySelector('.delete');
                deleteButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (confirm("Es-tu sûr(e) de vouloir supprimer ce membre ? 🤔")) {
                        const deleteXHR = getHttpRequest();
                        deleteXHR.open("GET", member.querySelector('.delete').getAttribute("href"));
                        deleteXHR.onload = function () {
                            getMembers();
                        }
                        deleteXHR.send();
                    }
                });
// ************************ Update de membre ************************
                memberButtons = member.querySelector('.modify').cloneNode(true);
                memberNameArea = member.querySelector('.name-member').cloneNode(false);
                originalMemberName = member.querySelector('.name-member').innerHTML;

                const updateButton = member.querySelector('.update');

                updateButton.addEventListener('click', function (e) {
                    e.preventDefault();

                    const dataID = member.querySelector('.name-member').getAttribute('data-id');
                    const dataName = member.querySelector('.name-member').getAttribute('data-name');

                    // On remplace le contenu de member-item par un formulaire
                    member.innerHTML = '';
                    member.innerHTML = '<form method="post" action="config.php?task=update&id_member=' + dataID + '" class="update-form">' +
                        '<input class="name-input" type="text" name="name_update" value="' + dataName + '" required>' +
                        '<input class="update-input" type="submit" name="submit" value="✔️">' +
                        '</form>';

                    const updateForm = member.querySelector('.update-form');
                    const button = member.querySelector('input[type="submit"]');

                    updateForm.addEventListener('submit', function (e) {
                        e.preventDefault();
                        // Récupération du champ name du formulaire
                        const nameUpdate = member.querySelector("input[name=name_update]");
                        if (nameUpdate.value !== dataName) {
                            const data = new FormData();
                            data.append('name_update', nameUpdate.value);
                            let updateXHR = getHttpRequest();
                            updateXHR.open("POST", updateForm.getAttribute("action"));
                            updateXHR.onload = function () {
                                getMembers();
                            }
                            updateXHR.send(data);

                        } else {
                            member.innerHTML = '<div class="member-item">' +
                                '<span class="name-member" data-id="' + dataID + '" data-name="' + dataName + '">' + dataName + '</span>' +
                                '<span class="modify">\n' +
                                '<a class="update" href="config.php?task=update' + dataID + '" title="Modifier ce membre">✏️</a>' +
                                '<a class="delete" href="config.php?task=delete&id_member=' + dataID + '" title="Supprimer ce membre">❌</a>' +
                                '</span>' +
                                '</div>'
                        }
                    });
                });
            }
        }
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
    let requeteAjax = getHttpRequest();
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

