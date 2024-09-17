// script.js
document.addEventListener('DOMContentLoaded', function() {
    if(sessionStorage.getItem('tableData')) {
        document.querySelector('#tableau tbody').innerHTML = sessionStorage.getItem('tableData');
    }

    document.getElementById('formulaire').addEventListener('reset', function(event) {
        reinitialiserFormulaire();
    });

    document.getElementById('boutonAction').addEventListener('click', function() {
        if (this.textContent === 'Ajouter') {
            ajouterLigne();
        } else {
            mettreAJourLigne();
        }
    });
});

function ajouterLigne() {
    const article = document.getElementById('article').value;
    let code = document.getElementById('code').value;
    const nouveauCode = document.getElementById('nouveauCode').value;

    if(nouveauCode) {
        code = nouveauCode;
        const option = document.createElement('option');
        option.value = code;
        option.textContent = code;
        document.getElementById('code').appendChild(option);
    }

    const prix = document.getElementById('prix').value;
    const unite = document.getElementById('unite').value;

    const table = document.getElementById('tableau').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.textContent = article;
    cell1.setAttribute('data-label', 'ARTICLE');

    cell2.textContent = code;
    cell2.setAttribute('data-label', 'CODE');

    cell3.textContent = prix + " " + unite;
    cell3.setAttribute('data-label', 'PRIX');

    const modifierButton = document.createElement('button');
    modifierButton.textContent = 'Modifier';
    modifierButton.onclick = function() { modifierLigne(newRow); };

    const supprimerButton = document.createElement('button');
    supprimerButton.textContent = 'Supprimer';
    supprimerButton.onclick = function() { supprimerLigne(newRow); };

    cell4.appendChild(modifierButton);
    cell4.appendChild(supprimerButton);
    cell4.setAttribute('data-label', 'Actions');

    sessionStorage.setItem('tableData', document.querySelector('#tableau tbody').innerHTML);

    reinitialiserFormulaire();
}

function modifierLigne(row) {
    const article = row.cells[0].textContent;
    const code = row.cells[1].textContent;
    const prixComplet = row.cells[2].textContent;
    const [prix, unite] = prixComplet.split(" ");

    document.getElementById('article').value = article;
    document.getElementById('code').value = code;
    document.getElementById('prix').value = prix;
    document.getElementById('unite').value = unite;

    sessionStorage.setItem('ligneEnEdition', row.rowIndex);

    const boutonAction = document.getElementById('boutonAction');
    boutonAction.textContent = 'Mettre à jour';
}

function mettreAJourLigne() {
    const indexLigne = sessionStorage.getItem('ligneEnEdition');
    if (indexLigne) {
        const table = document.getElementById('tableau');
        const row = table.rows[indexLigne];

        const article = document.getElementById('article').value;
        const code = document.getElementById('code').value;
        const prix = document.getElementById('prix').value;
        const unite = document.getElementById('unite').value;

        row.cells[0].textContent = article;
        row.cells[1].textContent = code;
        row.cells[2].textContent = prix + " " + unite;

        sessionStorage.setItem('tableData', document.querySelector('#tableau tbody').innerHTML);
    }

    reinitialiserFormulaire();
}

function supprimerLigne(row) {
    row.remove();
    sessionStorage.setItem('tableData', document.querySelector('#tableau tbody').innerHTML);
}

function supprimerTousLesArticles() {
    const tableBody = document.getElementById('tableau').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    sessionStorage.removeItem('tableData');
}

function imprimerTableau() {
    window.print();
}

function reinitialiserFormulaire() {
    document.getElementById('formulaire').reset();
    const boutonAction = document.getElementById('boutonAction');
    boutonAction.textContent = 'Ajouter';
    sessionStorage.removeItem('ligneEnEdition');
}