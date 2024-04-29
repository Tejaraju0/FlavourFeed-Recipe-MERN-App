import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Layout/authContext';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './RecipePage.css';
import { Link } from 'react-router-dom';

function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user } = useContext(AuthContext);
  const recipeRef = useRef(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/recipes/${id}`);
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleAddToFavorites = async (event) => {
    event.preventDefault();

    try {
      if (!isLoggedIn) {
        window.alert('Please log in to add recipes to favorites.');
        return;
      }
      if (!recipe || !user) {
        return;
      }

      const userData = {
        userId: user._id
      };
      const requestBody = {
        ...userData,
        recipeId: recipe._id
      };

      await axios.post(`http://localhost:8000/api/favorites/add`, requestBody);

      navigate('/favorites/user:Id');
      const updatedFavorites = [...(sessionStorage.getItem('favorites') ? JSON.parse(sessionStorage.getItem('favorites')) : []), recipe];
      sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      navigate('/favorites/user:Id');
      console.error('Error adding to favorites:', error.response.data);
    }
  };

  
  // Function to render PDF content with basic styling
  const renderPdfContent = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.recipeContainer}>
          <Text style={styles.recipeTitle}>{recipe.name}</Text>
          <Text style={styles.category}>{`Category: ${recipe.category}`}</Text>

          <Text style={styles.sectionTitle}>Ingredients:</Text>
          <View style={styles.ingredientList}>
            {recipe.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredient}>{ingredient}</Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Cooking Instructions:</Text>
          <View style={styles.instructions}>
            {recipe.description.split('\n').map((instruction, index) => (
              <Text key={index} style={styles.instructionText}>{instruction}</Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );


  const styles = StyleSheet.create({
    page: {
      padding: 20,
      backgroundColor: '#f0f0f0', // Add background color from CSS
    },
    
    recipeTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FF8C00', // Add color from CSS
      marginBottom: 10,
    },

    category: {
      fontSize: 16,
      marginBottom: 10,
      color: '#333', // Add color from CSS
    },

    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333', // Add color from CSS
    },

    ingredientList: {
      marginBottom: 15,
    },

    ingredient: {
      fontSize: 16,
      marginBottom: 5,
      color: '#555', // Add color from CSS
    },

    instructionText: {
      fontSize: 16,
      marginBottom: 5,
      color: '#666', // Add color from CSS
    },

    pdfContainer: {
      position: 'absolute',
      top: 2,
      right: 2,
      display: 'flex',
      justifyContent: 'flex',
      borderRadius: '',
    
    },
    // Style the Save as PDF button
    saveAsPdfButton: {
      backgroundColor: '#FF8C00', // Orange color
      color: '#fff', // White text
      padding: '10px 20px',
      borderRadius: '20px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  });

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (!recipe) {
    return <p className="error-text">No recipe found.</p>;
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{recipe.name}</li>
        </ol>
      </nav>

      <div className="recipe-container" ref={recipeRef}>
        <div className="recipe-image-container">
          <img src={`/uploads/${recipe.image}`} className="img-fluid recipe-image" alt={recipe.name} loading="lazy" />
        </div>

        <div className="recipe-details">
          <h1 className="recipe-title">{recipe.name}</h1>
          <div className="section-title">Category: {recipe.category}</div>

          <div className="ingredient-list">
            <h2 className="section-title">Ingredients</h2>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="cooking-instructions">
            <h2 className="section-title">Cooking Instructions</h2>
            {recipe.description.split('\n').map((instruction, index) => (
              <div key={index} className="instruction-item">
                <span className="instruction-text">{instruction}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddToFavorites} className="add-to-favorites-form">
            <input type="hidden" name="recipeId" value={recipe._id} />
            <button type="submit" className="add-to-favorites-btn">Add to Favorites</button>
          </form>

          {/* PDF Download Link */}
          <div className={styles.pdfContainer} >
            <PDFDownloadLink document={renderPdfContent()} fileName={`${recipe.name}.pdf`}>
              {({ blob, url, loading, error }) =>
                <button className={styles.saveAsPdfButton} disabled={loading}>
                  {loading ? 'Loading...' : 'Save as PDF'}
                </button>
              }
            </PDFDownloadLink>
          </div>  
        </div>
      </div>
    </>
  );
}

export default RecipePage;
