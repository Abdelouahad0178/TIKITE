// script.js
document.addEventListener('DOMContentLoaded', function() {
    if(sessionStorage.getItem('tableData')) {
        document.querySelector('#tableau tbody').innerHTML = sessionStorage.getItem('tableData');
    }

    fetch('merged.json')
        .then(response => response.json())
        .then(data => {
            const codeSelect = document.getElementById('code');
            data.codes.forEach(code => {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = code;
                codeSelect.appendChild(option);
            });
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
}

function modifierLigne(row) {
    const article = row.cells[0].textContent;
    const code = row.cells[1].textContent;
    const prix = row.cells[2].textContent.split(" ")[0];

    document.getElementById('article').value = article;
    document.getElementById('code').value = code;
    document.getElementById('prix').value = prix;

    supprimerLigne(row);
}

function supprimerLigne(row) {
    row.remove();
    sessionStorage.setItem('tableData', document.querySelector('#tableau tbody').innerHTML);
}

function imprimerTableau() {
    window.print();
}
