 // Fonction pour filtrer les éléments des menus déroulants
 function filterDropdown(inputId, dropdownId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toLowerCase();
    const dropdownItems = document.querySelectorAll(`#${dropdownId} .dropdown-item`);

    dropdownItems.forEach(function(item) {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? '' : 'none';
    });

    // Montrer ou cacher l'icône de suppression
    const clearIcon = document.getElementById('clear' + inputId.charAt(0).toUpperCase() + inputId.slice(1));
    clearIcon.style.display = input.value ? 'block' : 'none';
}

// Ajouter des événements d'écoute pour chaque champ de recherche
document.getElementById('searchIngredients').addEventListener('keyup', function () {
    filterDropdown('searchIngredients', 'dropdownIngredients');
});

document.getElementById('searchAppareils').addEventListener('keyup', function () {
    filterDropdown('searchAppareils', 'dropdownAppareils');
});

document.getElementById('searchUstensiles').addEventListener('keyup', function () {
    filterDropdown('searchUstensiles', 'dropdownUstensiles');
});

// Ajouter la fonctionnalité pour effacer le texte dans la barre de recherche
document.getElementById('clearIngredients').addEventListener('click', function () {
    const input = document.getElementById('searchIngredients');
    input.value = '';
    filterDropdown('searchIngredients', 'dropdownIngredients');
    input.focus(); // Redonne le focus après l'effacement
});

document.getElementById('clearAppareils').addEventListener('click', function () {
    const input = document.getElementById('searchAppareils');
    input.value = '';
    filterDropdown('searchAppareils', 'dropdownAppareils');
    input.focus();
});

document.getElementById('clearUstensiles').addEventListener('click', function () {
    const input = document.getElementById('searchUstensiles');
    input.value = '';
    filterDropdown('searchUstensiles', 'dropdownUstensiles');
    input.focus();
});