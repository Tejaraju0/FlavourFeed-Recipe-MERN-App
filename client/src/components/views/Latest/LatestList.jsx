import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';

function LatestList() {
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestRecipes = async () => {
      try {
        const response = await axios.get('https://flavourfeed-backend.onrender.com/api/latest'); 
        setLatestRecipes(response.data.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching latest recipes:', error);
      }
    };

    fetchLatestRecipes();
  }, []);

  return (
    <>
      <div className="d-flex mb-2 align-items-center mt-5 mb-4">
        <h2 className="heading"> {/* Apply heading styles */}
          <FaGlobe className="flag-icon" /> {/* Apply flag icon styles */}
          Latest Recipes
        </h2>
        <Link to="/categories/Latest" className="ms-auto">View All</Link>
      </div>

      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {loading ? (
          <p>Loading...</p>
        ) : latestRecipes.length > 0 ? (
          latestRecipes.map((recipe) => ( 
            <Link key={recipe._id} to={`/recipe/${recipe._id}`} className="col text-center category__link">
              <div className="category__img category__img--large shadow">
                <img src={`/uploads/${recipe.image}`} alt={recipe.name} loading="lazy" />
              </div>
              <div className="rep-name pt-1">{recipe.name}</div>
            </Link>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </>
  );
}

export default LatestList;
