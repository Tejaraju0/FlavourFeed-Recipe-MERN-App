import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {  FaGlobe } from 'react-icons/fa';

function LatestRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/latest'); 
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <section className="page-recipes pb-4 pt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Latest Recipes</li>
        </ol>
      </nav>

      <div className='mb-5'>
        <h2 className="search-results-heading page-recipes-heading animated">
          <FaGlobe className="search-icon" /> {/* Replace with your chosen icon */}
          Latest Recipes
          <div className="underline"></div> {/* Add the underline element */}
        </h2>
      </div>  


      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {loading ? (
          <p>Loading...</p>
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => ( 
            <Link key={recipe._id} to={`/recipe/${recipe._id}`} className="col text-center category__link">
              <div className="category__img category__img--large shadow">
                <img src={`/uploads/${recipe.image}`} alt={recipe.name} loading="lazy" />
              </div>
              <div className="pt-1">{recipe.name}</div>
            </Link>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </section>
  );
}

export default LatestRecipesPage;

