import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FaFlagUsa, FaSpa, FaFish, FaPepperHot, FaPizzaSlice, FaFire, FaUtensilSpoon } from 'react-icons/fa';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/recipes');
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const getCategoryRecipes = (category) => {
    return recipes.filter((recipe) => recipe.category === category).slice(0, 5);
  };


  return (
    <section className="Main-page-recipes pb-4 pt-4">




      {/* American Recipe Start */}

 
      <div className="d-flex mb-2 align-items-center mt-5 mb-4">
        <h2 className="heading"> {/* Apply heading styles */}
          <FaFlagUsa className="flag-icon" /> {/* Apply flag icon styles */}
          American Recipes
        </h2>
        <Link to="/categories/American" className="ms-auto">View All</Link>
      </div>

      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {loading ? (
          <p>Loading...</p>
        ) : recipes.length > 0 ? (
          getCategoryRecipes('American').map((recipe) => ( // Use slicedRecipes for rendering
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


      {/* American Recipe end */}





      {/* Thai Recipe Start */}


      <div className="d-flex mb-2 align-items-center mt-5 mb-4">
        <h2 className="heading"> {/* Apply heading styles */}
          <FaSpa className="flag-icon" /> {/* Apply flag icon styles */}
          Thai Recipes
        </h2>
        <Link to="/categories/Thai" className="ms-auto">View All</Link>
      </div>

      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {loading ? (
          <p>Loading...</p>
        ) : recipes.length > 0 ? (
          getCategoryRecipes('Thai').map((recipe) => (
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



      {/* Thai Recipe End */}




      {/* Indian Recipe Start */}




      <div className="d-flex mb-2 align-items-center mt-5 mb-4">
        <h2 className="heading"> {/* Apply heading styles */}
          <FaFire className="flag-icon" /> {/* Apply flag icon styles */}
          Indian Recipes
        </h2>
        <Link to="/categories/Indian" className="ms-auto">View All</Link>
      </div>

      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {loading ? (
          <p>Loading...</p>
        ) : recipes.length > 0 ? (
          getCategoryRecipes('Indian').map((recipe) => (
            <Link key={recipe._id} to={`/recipe/${recipe._id}`} className="col text-center category__link">
              <div className="category__img category__img--large shadow">
                <img src={`/uploads/${recipe.image}`} alt={recipe.name} loading="lazy" />
              </div>
              <div className="rep-name pt-1">{recipe.name}</div>
            </Link>
          ))
        ) : (
          <p>No Indian recipes found.</p>
        )}
      </div>  



      {/* Indian Recipe End */}



      {/* Chinese Recipe Start */}




      <div className="d-flex mb-2 align-items-center mt-5 mb-4">
        <h2 className="heading"> {/* Apply heading styles */}
          <FaUtensilSpoon  className="flag-icon" /> {/* Apply flag icon styles */}
          Chinese Recipes
        </h2>
        <Link to="/categories/Chinese" className="ms-auto">View All</Link>
      </div>

      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {loading ? (
          <p>Loading...</p>
        ) : recipes.length > 0 ? (
          getCategoryRecipes('Chinese').map((recipe) => (
            <Link key={recipe._id} to={`/recipe/${recipe._id}`} className="col text-center category__link">
              <div className="category__img category__img--large shadow">
                <img src={`/uploads/${recipe.image}`} alt={recipe.name} loading="lazy" />
              </div>
              <div className="rep-name pt-1">{recipe.name}</div>
            </Link>
          ))
        ) : (
          <p>No Chinese recipes found.</p>
        )}
      </div>  



      {/* Chinese Recipe End */}




      {/* Mexican Recipe Start */}




      <div className="d-flex mb-2 align-items-center mt-5 mb-4">
        <h2 className="heading"> {/* Apply heading styles */}
          <FaPepperHot  className="flag-icon" /> {/* Apply flag icon styles */}
          Mexican Recipes
        </h2>
        <Link to="/categories/Mexican" className="ms-auto">View All</Link>
      </div>

      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {loading ? (
          <p>Loading...</p>
        ) : recipes.length > 0 ? (
          getCategoryRecipes('Mexican').map((recipe) => (
            <Link key={recipe._id} to={`/recipe/${recipe._id}`} className="col text-center category__link">
              <div className="category__img category__img--large shadow">
                <img src={`/uploads/${recipe.image}`} alt={recipe.name} loading="lazy" />
              </div>
              <div className=" rep-name pt-1">{recipe.name}</div>
            </Link>
          ))
        ) : (
          <p>No Mexican recipes found.</p>
        )}
      </div>  



      {/* Mexican Recipe End */}




      {/* Spanish Recipe Start */}




      <div className="d-flex mb-2 align-items-center mt-5 mb-4">
        <h2 className="heading"> {/* Apply heading styles */}
          <FaFish  className="flag-icon" /> {/* Apply flag icon styles */}
          Spanish Recipes
        </h2>
        <Link to="/categories/Spanish" className="ms-auto">View All</Link>
      </div>

      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {loading ? (
          <p>Loading...</p>
        ) : recipes.length > 0 ? (
          getCategoryRecipes('Spanish').map((recipe) => (
            <Link key={recipe._id} to={`/recipe/${recipe._id}`} className="col text-center category__link">
              <div className="category__img category__img--large shadow">
                <img src={`/uploads/${recipe.image}`} alt={recipe.name} loading="lazy" />
              </div>
              <div className="rep-name pt-1">{recipe.name}</div>
            </Link>
          ))
        ) : (
          <p>No Spanish recipes found.</p>
        )}
      </div>  



      {/* Spanish Recipe End */}




      {/* Italian Recipe Start */}



      <div className="d-flex mb-2 align-items-center mt-5 mb-4">
        <h2 className="heading"> {/* Apply heading styles */}
          <FaPizzaSlice  className="flag-icon" /> {/* Apply flag icon styles */}
          Italian Recipes
        </h2>
        <Link to="/categories/Italian" className="ms-auto">View All</Link>
      </div>

      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {loading ? (
          <p>Loading...</p>
        ) : recipes.length > 0 ? (
          getCategoryRecipes('Italian').map((recipe) => (
            <Link key={recipe._id} to={`/recipe/${recipe._id}`} className="col text-center category__link">
              <div className="category__img category__img--large shadow">
                <img src={`/uploads/${recipe.image}`} alt={recipe.name} loading="lazy" />
              </div>
              <div className=" rep-name pt-1">{recipe.name}</div>
            </Link>
          ))
        ) : (
          <p>No Italian recipes found.</p>
        )}
      </div>  



      {/* Italian Recipe End */}



    </section>
  );
}

export default RecipeList;
