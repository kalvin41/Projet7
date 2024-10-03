// Fonction pour afficher les recettes dans des cartes
function displayRecipes(recipesToDisplay) {
    const recipeContainer = document.getElementById('recipe-container');
    const recipeCount = document.getElementById('recipe-count'); // Sélectionner l'élément pour afficher le nombre de recettes

    recipeContainer.innerHTML = ''; // Vider le conteneur avant d'afficher de nouvelles recettes

    // Afficher le nombre de recettes disponibles
    recipeCount.textContent = `${recipesToDisplay.length} recettes`;

    recipesToDisplay.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4'); // Ajouter des classes Bootstrap pour la mise en page

        // Contenu de la carte
        card.innerHTML = `
        <div class="card h-100">
            <img src="images/${recipe.image}" class="card-img-top card-img-top-custom" alt="${recipe.name}">
            <div class="card-body">
                <h5 class="card-title">${recipe.name}</h5>
                <h6>Ingrédients :</h6>
                <ul class="list-unstyled">
                    ${recipe.ingredients.map(ingredient => 
                        `<li>${ingredient.ingredient}${ingredient.quantity ? ` - ${ingredient.quantity} ${ingredient.unit || ''}` : ''}</li>`
                    ).join('')}
                </ul>
            </div>
            <div class="card-footer">
                <small class="text-muted">Temps de préparation : ${recipe.time} min</small>
            </div>
        </div>
        `;
        recipeContainer.appendChild(card);
    });
}

// Fonction de recherche avec plusieurs mots-clés
function searchRecipes(keywords) {
    const keywordArray = keywords.toLowerCase().split(' '); // Séparer les mots-clés par espace

    // Filtrer les recettes par mots-clés dans le nom, description ou ingrédients
    const filteredRecipes = recipes.filter(recipe => {
        // Vérifier si chaque mot-clé est présent dans le nom, description ou ingrédients
        return keywordArray.every(keyword => 
            recipe.name.toLowerCase().includes(keyword) ||
            recipe.description.toLowerCase().includes(keyword) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(keyword))
        );
    });

    displayRecipes(filteredRecipes); // Afficher les recettes filtrées
}

// Écouteur sur la barre de recherche
document.getElementById('searchInput').addEventListener('input', function() {
    const keywords = this.value.trim();
    if (keywords.length > 0) {
        searchRecipes(keywords);
    } else {
        displayRecipes(recipes); // Afficher toutes les recettes si l'input est vide
    }
});

// Afficher toutes les recettes au chargement de la page
displayRecipes(recipes);
