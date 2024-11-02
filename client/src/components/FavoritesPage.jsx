import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './Layout/authContext';
import { FaHeart, FaTimes } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

function FavoritesPage() {
  const { user } = useContext(AuthContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeMessage, setRemoveMessage] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!user || !user._id) {
          console.log('User or userId is missing.'); 
          return;
        }
        const response = await axios.get(`https://flavourfeed-backend.onrender.com/api/favorites/${user._id}`);
        setFavoriteRecipes(response.data.favorites);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleRemoveFavorite = async (event, recipeId) => {
    event.preventDefault();
    try {
      await axios.delete('https://flavourfeed-backend.onrender.com/api/favorites/remove', {
        data: {
          userId: user._id,
          recipeId: recipeId
        }
      });
      setFavoriteRecipes(prevFavorites => prevFavorites.filter(favorite => favorite.recipe._id !== recipeId));
      setRemoveMessage('Recipe removed from favorites.');
      setTimeout(() => {
        setRemoveMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error removing favorite recipe:', error);
    }
  };

  return (
    <div className="favorite_container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Favorite Recipes</li>
        </ol>
      </nav>

      <h1>Favorites</h1>
      <section className="page-recipes pb-4 pt-4">
        <div className='mb-5'>
          <h2 className="search-results-heading page-recipes-heading animated">
            <FaHeart className="search-icon" />
            Favorite Recipes
            <div className="underline"></div>
          </h2>
        </div>

        {removeMessage && (
          <div className="alert alert-success mb-3" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <FaTimes className="float-end" onClick={() => setRemoveMessage('')} style={{ cursor: 'pointer' }} />
            {removeMessage}
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : favoriteRecipes.length > 0 ? (
          <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            {favoriteRecipes.map(favorite => (
              <Link key={favorite.recipe._id} to={`/recipe/${favorite.recipe._id}`} className="col text-center category__link">
                <div className="category__img category__img--large shadow">
                  <img src={`/uploads/${favorite.recipe.image}`} alt={favorite.recipe.name} loading="lazy" />
                </div>
                <div className="pt-1">{favorite.recipe.name}</div>
                <button onClick={(event) => handleRemoveFavorite(event, favorite.recipe._id)} className="btn btn-danger btn-sm mt-2">
                  <FaTimes /> Remove
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <p>No favorite recipes yet.</p>
        )}
      </section>
    </div>
  );
}

export default FavoritesPage;
