// Fonction pour afficher les recettes dans des cartes
function displayRecipes(recipesToDisplay) {
    const recipeContainer = document.getElementById('recipe-container');
    const recipeCount = document.getElementById('recipe-count'); // Sélectionner l'élément pour afficher le nombre de recettes

    recipeContainer.innerHTML = ''; // Vider le conteneur avant d'afficher de nouvelles recettes

    // Afficher le nombre de recettes disponibles
    recipeCount.textContent = `${recipesToDisplay.length} recette${recipesToDisplay.length > 1 ? 's' : ''}`;

    // Afficher les recettes sous forme de cartes
    recipesToDisplay.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4'); // Classes Bootstrap pour mise en page

        // Contenu de la carte
        card.innerHTML = `
        <div class="card h-100">
            <div class="position-relative">
                <img src="images/${recipe.image}" class="card-img-top card-img-top-custom" alt="${recipe.name}">
                <div class="time-badge"> ${recipe.time} min </div> <!-- Affichage du temps de cuisson -->
            </div>
            <div class="card-body">
                <h5 class="card-title">${recipe.name}</h5>
                <h6 class="text-muted">Recette :</h6>
                <p class="clamp-text">${recipe.description}</p> <!-- Ajout de la description ici -->
                <h6 class="text-muted">Ingrédients :</h6>
<div class="row">
    ${recipe.ingredients.map(ingredient => `
        <div class="col-6 mb-2"> <!-- Colonne pour deux ingrédients par ligne -->
            <h6>${ingredient.ingredient}</h6>
            <small>${ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : ''}</small>
        </div>
    `).join('')}
</div>

            </div>
           
        </div>
        `;

        recipeContainer.appendChild(card);
    });
}

// Initialisation des filtres sélectionnés
let selectedFilters = {
    ingredients: [],
    appareils: [],
    ustensiles: []
};
// Fonction pour afficher les tags dans la div `#selected-tags`
function displayTags() {
    const tagContainer = document.getElementById('selected-tags');
    tagContainer.innerHTML = ''; // Vider le conteneur avant d'ajouter les nouveaux tags

    for (const [category, tags] of Object.entries(selectedFilters)) {
        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('badge', 'bg-warning', 'me-2', 'mb-3'); // Utilise bg-warning pour un badge jaune

            tagElement.innerHTML = `${tag} <button type="button" class="btn-close btn-close-black ms-2" aria-label="Close"></button>`;

            // Écouteur pour supprimer le tag au clic
            tagElement.querySelector('.btn-close').addEventListener('click', function () {
                removeTag(category, tag); // Supprimer le tag
            });

            tagContainer.appendChild(tagElement);
        });
    }
}

// Fonction pour ajouter un tag (un filtre)
function addTag(category, value) {
    // Vérifier si le tag n'existe pas déjà
    if (!selectedFilters[category].includes(value)) {
        selectedFilters[category].push(value); // Ajouter le tag
        displayTags(); // Mettre à jour l'affichage des tags
        filterRecipes(); // Filtrer les recettes après l'ajout d'un tag
    }
}

// Fonction pour supprimer un tag (un filtre)
function removeTag(category, value) {
    // Retirer le tag de la catégorie correspondante
    selectedFilters[category] = selectedFilters[category].filter(tag => tag !== value);
    displayTags(); // Mettre à jour l'affichage des tags
    filterRecipes(); // Filtrer les recettes après la suppression d'un tag
}

// Exemple d'appel de displayTags au chargement de la page
displayTags();


// Fonction pour filtrer les recettes en fonction des filtres sélectionnés
function filterRecipes() {
    const filteredRecipes = recipes.filter(recipe => {
        // Filtrer par ingrédients
        const ingredientsMatch = selectedFilters.ingredients.every(ingredient =>
            recipe.ingredients.some(item => item.ingredient.toLowerCase().includes(ingredient.toLowerCase()))
        );

        // Filtrer par appareils 
        const appareilsMatch = selectedFilters.appareils.every(appareil =>
            recipe.appliance.toLowerCase().includes(appareil.toLowerCase())
        );

        // Filtrer par ustensiles
        const ustensilesMatch = selectedFilters.ustensiles.every(ustensile =>
            recipe.ustensils.some(item => item.toLowerCase().includes(ustensile.toLowerCase()))
        );

        return ingredientsMatch && appareilsMatch && ustensilesMatch;
    });

    displayRecipes(filteredRecipes); // Afficher les recettes filtrées
    // Mettre à jour les options dans les dropdowns en fonction des recettes filtrées
    updateDropdownOptions(filteredRecipes);
}
// Fonction pour mettre à jour les options dans les dropdowns selon les recettes filtrées
function updateDropdownOptions(filteredRecipes) {
    const ingredientsDropdown = document.getElementById('ingredientsDropdown');
    const appareilsDropdown = document.getElementById('appareilsDropdown');
    const ustensilesDropdown = document.getElementById('ustensilesDropdown');

    // Vider les dropdowns actuels
    ingredientsDropdown.innerHTML = '';
    appareilsDropdown.innerHTML = '';
    ustensilesDropdown.innerHTML = '';

    const uniqueIngredients = new Set();
    const uniqueAppareils = new Set();
    const uniqueUstensiles = new Set();

    // Collecter les valeurs uniques à partir des recettes filtrées
    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(item => uniqueIngredients.add(item.ingredient));
        uniqueAppareils.add(recipe.appliance);
        recipe.ustensils.forEach(ustensil => uniqueUstensiles.add(ustensil));
    });

    // Mettre à jour les dropdowns avec les nouvelles options

    uniqueIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.innerHTML = `<a class="dropdown-item" href="#">${ingredient}</a>`;
        li.addEventListener('click', function () {
            addTag('ingredients', ingredient); // Ajouter l'ingrédient sélectionné comme filtre
        });
        ingredientsDropdown.appendChild(li);
    });

    uniqueAppareils.forEach(appareil => {
        const li = document.createElement('li');
        li.innerHTML = `<a class="dropdown-item" href="#">${appareil}</a>`;
        li.addEventListener('click', function () {
            addTag('appareils', appareil); // Ajouter l'appareil sélectionné comme filtre
        });
        appareilsDropdown.appendChild(li);
    });

    uniqueUstensiles.forEach(ustensile => {
        const li = document.createElement('li');
        li.innerHTML = `<a class="dropdown-item" href="#">${ustensile}</a>`;
        li.addEventListener('click', function () {
            addTag('ustensiles', ustensile); // Ajouter l'ustensile sélectionné comme filtre
        });
        ustensilesDropdown.appendChild(li);
    });
}

// Appeler la fonction pour remplir les dropdowns lors du chargement de la page
populateDropdowns();
// Extraire et afficher les options dans les dropdowns
function populateDropdowns() {
    const ingredientsDropdown = document.getElementById('ingredientsDropdown');
    const appareilsDropdown = document.getElementById('appareilsDropdown');
    const ustensilesDropdown = document.getElementById('ustensilesDropdown');

    const uniqueIngredients = new Set();
    const uniqueAppareils = new Set();
    const uniqueUstensiles = new Set();

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(item => uniqueIngredients.add(item.ingredient));
        uniqueAppareils.add(recipe.appliance);
        recipe.ustensils.forEach(ustensil => uniqueUstensiles.add(ustensil));
    });

    uniqueIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.innerHTML = `<a class="dropdown-item" href="#">${ingredient}</a>`;
        li.addEventListener('click', function () {
            addTag('ingredients', ingredient); // Ajouter l'ingrédient sélectionné comme filtre
        });
        ingredientsDropdown.appendChild(li);
    });

    uniqueAppareils.forEach(appareil => {
        const li = document.createElement('li');
        li.innerHTML = `<a class="dropdown-item" href="#">${appareil}</a>`;
        li.addEventListener('click', function () {
            addTag('appareils', appareil); // Ajouter l'appareil sélectionné comme filtre
        });
        appareilsDropdown.appendChild(li);
    });

    uniqueUstensiles.forEach(ustensile => {
        const li = document.createElement('li');
        li.innerHTML = `<a class="dropdown-item" href="#">${ustensile}</a>`;
        li.addEventListener('click', function () {
            addTag('ustensiles', ustensile); // Ajouter l'ustensile sélectionné comme filtre
        });
        ustensilesDropdown.appendChild(li);
    });
}

// Appeler la fonction pour remplir les dropdowns lors du chargement de la page
populateDropdowns();

// Fonction de recherche avec plusieurs mots-clés
function searchRecipes(keywords) {
    const keywordArray = keywords.toLowerCase().split(' '); // Séparer les mots-clés

    // Filtrer les recettes par mots-clés dans le nom, description ou ingrédients
    const filteredRecipes = recipes.filter(recipe => {
        return keywordArray.every(keyword =>
            recipe.name.toLowerCase().includes(keyword) ||
            recipe.description.toLowerCase().includes(keyword) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(keyword))
        );
    });

    displayRecipes(filteredRecipes); // Afficher les recettes filtrées
}

// Écouteur sur la barre de recherche
document.getElementById('searchInput').addEventListener('input', function () {
    const keywords = this.value.trim();
    if (keywords.length > 0) {
        searchRecipes(keywords);
    } else {
        displayRecipes(recipes); // Afficher toutes les recettes si l'input est vide
    }
});

// Afficher toutes les recettes au chargement de la page
displayRecipes(recipes);
