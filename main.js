const fetchRecipes = async (query) => {
  const appId = "e908daf8";
  const appKey = "0e741c0e5f5ac7a04c264718c2a2a349";
  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// let query = "chicken";

// fetchRecipes(query)
//   .then((data) => {
//     if (data) {
//       console.log("Fetched data:", data);
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//we need name, image and recipe instructions.
//how will we get it?
//how will we display it?

//function to create recipes.
const createRecipeElement = (recipe) => {
  const recipeDiv = document.createElement("div");
  recipeDiv.classList.add("card");

  const heading = document.createElement("h2");
  heading.textContent = recipe.label;
  recipeDiv.appendChild(heading);

  const ingredientsParagraph = document.createElement("p");
  ingredientsParagraph.textContent = `Ingredients: ${recipe.ingredients
    .map((ingredient) => ingredient.text)
    .join(", ")}`;
  recipeDiv.appendChild(ingredientsParagraph);

  const imageDiv = document.createElement("div");
  imageDiv.classList.add("image-div");
  const image = document.createElement("img");
  image.src = recipe.image;
  image.alt = recipe.label;
  imageDiv.appendChild(image);
  recipeDiv.appendChild(imageDiv);

  return recipeDiv;
};

//function to display recipes.
const displayRecipes = (recipes) => {
  const recipeListDiv = document.querySelector(".recipe-list-container");
  if (recipes && recipes.hits && recipes.hits.length > 0) {
    recipes.hits.forEach((hit) => {
      const recipe = hit.recipe;
      const recipeElement = createRecipeElement(recipe);
      recipeListDiv.appendChild(recipeElement);
    });
  } else {
    recipeListDiv.innerHTML = "<p>No recipes found.</p>";
  }
};

const fetchAndDisplayRecipes = async (query) => {
  try {
    const data = await fetchRecipes(query);
    if (data) {
      displayRecipes(data);
      console.log("Fetched data:", data);
    } else {
      console.log("No data fetched.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const clearRecipeList = () => {
  const recipeListDiv = document.querySelector(".recipe-list-container");
  recipeListDiv.innerHTML = "";
};

const searchRecipes = async () => {
  const query = document.querySelector(".searchInput").value;
  if (query.trim() !== "") {
    clearRecipeList();
    fetchAndDisplayRecipes(query);
  } else {
    alert("Please enter a search query");
  }
};
