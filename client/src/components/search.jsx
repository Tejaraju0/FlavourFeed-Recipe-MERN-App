import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';


function SearchResult() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('searchTerm');
    if (searchTerm) {
      fetchSearchResults(searchTerm);
    }
  }, []);

  const fetchSearchResults = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/search', { searchTerm });
      setSearchResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setLoading(false);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <section className="pb-4 pt-4">
      <div className="search-results-heading mb-5">
        <FaSearch className="search-icon" /> {/* Render the icon */}
        <h2>Search Results</h2>
        <div className="underline"></div> {/* Add the underline element */}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length > 0 ? (
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          {searchResults.map(recipe => (
            <div key={recipe._id} className="col text-center category__link">
              <a href={`/recipe/${recipe._id}`}>
                <div className="category__img category__img--large shadow">
                  <img src={`/uploads/${recipe.image}`} alt={recipe.name} loading="lazy" />
                </div>
                <div className="pt-1">{recipe.name}</div>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No search results found.</p>
      )}
    </section>
  );
}

export default SearchResult;

