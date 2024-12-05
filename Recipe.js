const apiUrl = 'http://localhost:3306';

function displayrecipies() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(recipe => {
            const recipe_List = document.getElementById('recipelist');
            recipe_List.innerHTML = ''; 

        recipe.forEach(recipes => {
            const result = document.createElement('div');
            result.innerHTML = `
            ${recipes.title} - 
            ${recipes.category} - 
            ${recipes.ingredients} - 
            ${recipes.steps} - 
            ${recipes.cookingTime} min - 
            ${recipes.cookingMethod} - 
            ${recipes.spiceLevel}
            <button onclick ="deleteRecipe(${index})">Delete</button>
    `;
    recipe_List = appendchild(result);
    
        });
    })
      .catch(err => {
        console.error('Error fetching recipes:', err);
      });
}


function addrecipe() {  
    
    const newRecipe = {
        title: document.getElementById('recipe-title').value,
        category: document.getElementById('category').value,
        ingredients: document.getElementById('ingredients').value,
        steps: document.getElementById('steps').value,
        cookingTime: document.getElementById('cooking-time').value,
        spiceLevel: document.getElementById('spice-level').value,
        cookingMethod: document.getElementById('cooking-method').value   
};
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)
    })
    .then(() => displayrecipies())
    .catch(err => {
        console.error('Error adding recipe:', err);
    });
}

function deleteRecipe(id) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(() => displayrecipies())
        .catch(err => {
            console.error('Error deleting recipe:', err);
        });
}
displayrecipies();
