import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPepperHot  } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function MexicanRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://flavourfeed-backend.onrender.com/api/recipes'); // Replace with your actual API endpoint
        const mexicanRecipes = response.data.filter(recipe => recipe.category === "Mexican");
        setRecipes(mexicanRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Handle error (e.g., display error message)
      }
    };

    fetchRecipes();
  }, []);

  return (
    <section className="page-recipes pb-4 pt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Indian Recipes</li>
        </ol>
      </nav>

      <div className='mb-5'>
        <h2 className="search-results-heading page-recipes-heading animated">
          <FaPepperHot  className="search-icon" /> {/* Replace with your chosen icon */}
          Mexican Recipes
          <div className="underline"></div> {/* Add the underline element */}
        </h2>
      </div>  


      {loading ? (
        <p>Loading...</p>
      ) : recipes.length > 0 ? (
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          {recipes.map(recipe => (
            <a key={recipe._id} href={`/recipe/${recipe._id}`} className="col text-center category__link">
              <div className="category__img category__img--large shadow">
                <img src={`/uploads/${recipe.image}`} alt={recipe.name} loading="lazy" />
              </div>
              <div className="pt-1">{recipe.name}</div>
            </a>
          ))}
        </div>
      ) : (
        <p>No Mexican recipes found.</p>
      )}
    </section>
  );
}

export default MexicanRecipesPage;
