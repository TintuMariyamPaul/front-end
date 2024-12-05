const apiUrl = 'http://localhost:3000/recipes';
function displayRecipes() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(recipes => {
            const recipeList = document.getElementById('recipelist');
            recipeList.innerHTML = ''; 

            if (recipes.length === 0) {
                recipeList.innerHTML = '<p>No recipes available.</p>';
            } else {
                recipes.forEach(recipe => {
                    const result = document.createElement('div');
                    result.classList.add('recipe-item');
                    result.innerHTML = `
                        <h4>${recipe.title}</h4>
                        <p><strong>Category:</strong> ${recipe.category}</p> 
                        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                        <p><strong>Steps:</strong> ${recipe.steps}</p>
                        <p><strong>Cooking Time:</strong> ${recipe.cookingTime} min</p>
                        <p><strong>Spice Level:</strong> ${recipe.spiceLevel}</p> 
                        <p><strong>Cooking Method:</strong> ${recipe.cookingMethod}</p>
                        <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                    `;
                    recipeList.appendChild(result);
                });
            }

            document.getElementById('recipe-list-container').style.display = 'block';
            document.getElementById('search-results').style.display = 'none';
        })
        .catch(err => {
            console.error('Error fetching recipes:', err);
        });
}

document.getElementById('add-recipe-btn').addEventListener('click', function () {
    const title = document.getElementById('recipe-title').value.trim();
    const category = document.getElementById('category').value;
    const ingredients = document.getElementById('ingredients').value.trim();
    const steps = document.getElementById('steps').value.trim();
    const cookingTime = document.getElementById('cooking-time').value;
    const spiceLevel = document.getElementById('spice-level').value.trim();
    const cookingMethod = document.getElementById('cooking-method').value.trim();

    if (!title || !category || !ingredients || !steps || !cookingTime || !spiceLevel || !cookingMethod) {
        alert('All fields are required!');
        return;
    }

    const newRecipe = {
        title,
        category,
        ingredients,
        steps,
        cookingTime,
        spiceLevel,
        cookingMethod
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)
    })
        .then(response => response.json())
        .then(() => {
            alert('Recipe added successfully!');
            displayRecipes();
        })
        .catch(err => {
            console.error('Error adding recipe:', err);
        });
});
function deleteRecipe(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(() => {
            alert('Recipe deleted successfully!');
            displayRecipes();
        })
        .catch(err => console.error('Error deleting recipe:', err));
}

function searchRecipes() {
    const title = document.getElementById('search-title').value.trim();
    const category = document.getElementById('search-category').value;

    let query = apiUrl;
    if (title || category) {
        query += `?${title ? `title=${encodeURIComponent(title)}` : ''}`;
        query += category ? `&category=${encodeURIComponent(category)}` : '';
    }

    fetch(query)
        .then(response => response.json())
        .then(recipes => {
            const searchList = document.getElementById('search-list');
            searchList.innerHTML = ''; 

            if (recipes.length === 0) {
                searchList.innerHTML = '<p>No recipes found.</p>';
            } else {
                recipes.forEach(recipe => {
                    const result = document.createElement('div');
                    result.classList.add('recipe-item');
                    result.innerHTML = `
                        <h4>${recipe.title}</h4>
                        <p><strong>Category:</strong> ${recipe.category}</p> 
                        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                        <p><strong>Steps:</strong> ${recipe.steps}</p>
                        <p><strong>Cooking Time:</strong> ${recipe.cookingTime} min</p>
                        <p><strong>Spice Level:</strong> ${recipe.spiceLevel}</p> 
                        <p><strong>Cooking Method:</strong> ${recipe.cookingMethod}</p>
                    `;
                    searchList.appendChild(result);
                });
            }

            document.getElementById('search-results').style.display = 'block';
            document.getElementById('recipe-list-container').style.display = 'none';
        })
        .catch(err => {
            console.error('Error searching recipes:', err);
        });
}
document.getElementById('search-btn').addEventListener('click', searchRecipes);
document.getElementById('display-all-btn').addEventListener('click', displayRecipes);

window.onload = displayRecipes;
