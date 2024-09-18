
const recipeContainer = document.getElementById('recipe-container');

// Parcourir le tableau de recettes
recipes.forEach(recipe => {
    // Créer une div pour la carte
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4'); // Ajouter des classes Bootstrap pour les colonnes et l'espacement

    // Contenu de la carte Bootstrap
    card.innerHTML = `
    <div class="card h-100">
        <img src="images/${recipe.image}" class="card-img-top card-img-top-custom" alt="${recipe.name}">
        <div class="card-body">
            <h5 class="card-title">${recipe.name}</h5>
            <h6>Ingrédients :</h6>
            <ul class="list-unstyled">
                ${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient} ${ingredient.quantity ? ` - ${ingredient.quantity} ${ingredient.unit || ''}` : ''}</li>`).join('')}
            </ul>
        </div>
        <div class="card-footer">
            <small class="text-muted">Temps de préparation : ${recipe.time} min</small>
        </div>
    </div>
`;


    // Ajouter la carte au conteneur de recettes
    recipeContainer.appendChild(card);
});
