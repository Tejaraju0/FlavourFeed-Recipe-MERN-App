import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Layout/authContext';
import './RecipePage.css';
import { Link } from 'react-router-dom';
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import InstagramIcon from "@material-ui/icons/Instagram";
import SmsIcon from "@material-ui/icons/Sms";
import ShareIcon from "@material-ui/icons/Share";
import ShareButton from './ShareButton';
import { makeStyles } from '@material-ui/core/styles';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const socials = [
  {
    outlet: "LinkedIn",
    href:
      "https://www.linkedin.com/shareArticle?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&title=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React",
    background: "#0a66c2",
    color: "white",
    label: "Share on LinkedIn",
    icon: <LinkedInIcon />
  },
  {
    outlet: "Facebook",
    href:
      "https://www.facebook.com/sharer.php?u=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig",
    background: "#3b5898",
    color: "white",
    label: "Share on Facebook",
    icon: <FacebookIcon />
  },
  {
    outlet: "Twitter",
    href:
      "https://twitter.com/intent/tweet?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&text=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React&via=dannysasse",
    background: "#00aced",
    color: "white",
    label: "Share on Twitter",
    icon: <TwitterIcon />
  },
  {
    outlet: "Email",
    href:
      "mailto:?subject=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React&body=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig%20Check%20out%20this%20new%20article%20on%20Jest%20testing%20in%20React!",
    background: "#dd4b39",
    color: "white",
    label: "Share via Email",
    icon: <MailOutlineIcon />
  },
  {
    outlet: "SMS",
    href:
      "sms:?body=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig",
    background: "#7bcb20",
    color: "white",
    label: "Share via SMS",
    icon: <SmsIcon />
  },
  {
    outlet: "WhatsApp",
    href: "whatsapp://send?text=Check%20out%20this%20awesome%20recipe%20on%20%3A%20https://example.com",
    background: "#25D366",
    color: "white",
    label: "Share on WhatsApp",
    icon: <WhatsAppIcon />
  },
{
  outlet: "Instagram",
  href: "https://www.instagram.com/",
  background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
  color: "white",
  label: "Share on Instagram",
  icon: <InstagramIcon />
}
];

const useStyles = makeStyles((theme) => ({
  // Styles for the sharing components
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'mistyrose',
    height: '100vh',
  },
  shareContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    display: 'flex',
    marginBottom: 20,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    background: (props) => props.background,
    color: (props) => props.color,
    borderRadius: '100%',
    outline: 'none',
    border: (props) => `2px solid ${props.background}`,
    padding: 8,
    transform: (props) => (props.isActive ? 'scale(0.8)' : 'scale(1.0)'),
    transition: 'all 0.2s, transform 0.2s 0.2s',
    '&:hover': {
      background: 'white',
      color: (props) => props.background,
      boxShadow: (props) => (props.isActive ? '0 2px 5px rgba(0, 0, 0, 1)' : 'none'),
    },
  },
  socialLink: {
    position: 'absolute',
    zIndex: 0,
    transform: 'none',
    transition: 'top 0.2s ease-in-out', // Adjusted for smoother animation
    left: (props) => (props.isActive ? `${(-1) ** props.position * Math.ceil(props.position / 2) * 50}px` : '0'),
    top: (props) => (props.isActive ? `50px` : '0'),
    boxShadow: (props) => (props.isActive ? '0 4px 10px 0 black' : '0'),
  },

}));

function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user } = useContext(AuthContext);
  const recipeRef = useRef(null);
  const [menuActive, setMenuActive] = useState(false);
  const classes = useStyles();

  const shareButtonRef = useRef(null);
  
  const handleToggleMenu = () => {
    setMenuActive((menuActive) => !menuActive);
  };

  
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
      border: 'none', // Remove border
      marginRight: '20px', // Add right margin
      transition: 'background-color 0.3s', // Add transition for hover effect
      '&:hover': {
        backgroundColor: '#FFA500', // Change background color on hover
      },
    }  
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

        {/* Sharing Button */}
          <ShareButton 
            isActive={menuActive}
            aria-label="Share Button"
            aria-expanded={menuActive}
            role="button"
            background="#242424"
            color="white"
            onClick={handleToggleMenu}
            className={classes.shareButton} 
            ref={shareButtonRef}
          >
          <ShareIcon />
          </ShareButton>
          {/* Sharing Links (conditionally rendered) */}
          {menuActive && (
            <ul className="social-links">
              {socials.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    style={{ background: social.background, color: social.color }}
                    className={classes.shareButton} 
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          )}


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
        </div>
      </div>
    </>
  );
}

export default RecipePage;