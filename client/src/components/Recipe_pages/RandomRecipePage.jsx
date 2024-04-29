import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRandom, FaSyncAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ExploreRandom() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomRecipe = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/explore-random');
      setRecipe(response.data.recipe);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching random recipe:', error);
    }
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  return (
    <section className="page-recipes pb-4 pt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Random Recipe</li>
        </ol>
      </nav>

      <div className='mb-5'>
        <h2 className="search-results-heading page-recipes-heading animated">
          < FaRandom className="search-icon" /> {/* Replace with your chosen icon */}
          Random Recipes
          <div className="underline"></div> {/* Add the underline element */}
        </h2>
      </div>  
      <div>

        {loading ? (
          <p>Loading...</p>
        ) : recipe ? (
          <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            <a href={`/recipe/${recipe._id}`} className="col text-center category__link">
              <div className="category__img category__img--large shadow">
                <img src={`/uploads/${recipe.image}`} alt={recipe.name} loading="lazy" />
              </div>
              <div className="pt-1">{recipe.name}</div>
            </a>
          </div>
        ) : (
          <p>No items found.</p>
        )}
      </div>
      <button onClick={fetchRandomRecipe} className="refresh-button">
        <FaSyncAlt className="refresh-icon" />
        <span className="refresh-label">Refresh</span>
      </button>
    </section>
  );
}

export default ExploreRandom;
