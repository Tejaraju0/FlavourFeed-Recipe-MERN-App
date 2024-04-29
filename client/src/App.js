import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/Layout/authContext';
import Header from './components/Layout/Layout_parts/header';
import Main from './components/Layout/Layout_parts/main';
import Footer from './components/Layout/Layout_parts/footer';
import AllCategoriesPage from './components/views/Category/CategoryPage';
import HomePage from './components/homePage';
import RecipeList from './components/views/Recipe/RecipePage';
import AmericanRecipesPage from './components/Recipe_pages/AmericanRecipePage';
import LatestRecipePage from './components/views/Latest/LatestRecipePage';
import ThaiRecipesPage from './components/Recipe_pages/ThaiRecipesPage';
import IndianRecipesPage from './components/Recipe_pages/IndianRecipesPage';
import ChineseRecipesPage from './components/Recipe_pages/ChineseRecipesPage';
import MexicanRecipesPage from './components/Recipe_pages/MexicanRecipesPage';
import ItalianRecipesPage from './components/Recipe_pages/ItalianRecipesPage';
import SpanishRecipesPage from './components/Recipe_pages/SpanishRecipesPage';
import About from './components/about';
import SearchResult from './components/search';
import SubmitRecipe from './components/submitRecipe';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import LoginLayout from './components/Layout/loginLayout';
import RecipePage from './components/views/Recipe/RecipePage';
import FavoritesPage from './components/FavoritesPage';
import ExploreRandom from './components/Recipe_pages/RandomRecipePage';
import ProfilePage from './components/Profile'; 

function App() {
  const isLoggedIn = useAuth(); 

  return (
    <div>
      <AuthProvider>
        <Router>
          <Header />
          <Main>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/categories" element={<AllCategoriesPage />} />
              <Route path="/recipes" element={<RecipeList />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/categories/American" element={<AmericanRecipesPage />} />
              <Route path="/categories/latest" element={<LatestRecipePage />} />
              <Route path="/categories/Thai" element={<ThaiRecipesPage />} />
              <Route path="/categories/Indian" element={<IndianRecipesPage />} />
              <Route path="/categories/Chinese" element={<ChineseRecipesPage />} />
              <Route path="/categories/Mexican" element={<MexicanRecipesPage />} />
              <Route path="/categories/Italian" element={<ItalianRecipesPage />} />
              <Route path="/categories/Spanish" element={<SpanishRecipesPage />} />
              <Route path="/explore-random" element={<ExploreRandom />} />
              <Route path="/latest-recipes" element={<LatestRecipePage />} />
              <Route path="/search" element={<SearchResult />} />

              {/* Login/Signup */}
              <Route path="/login" element={<LoginLayout><LoginPage /></LoginLayout>} />
              <Route path="/signup" element={<LoginLayout><SignupPage /></LoginLayout>} />

              {/* Protected routes (requires login) */}
              <Route
                path="/submit-recipe"
                element={
                  isLoggedIn ? <SubmitRecipe /> : <Navigate to="/login" replace />
                }
              />

              {/* Favorites page */}
              <Route
                path="/favorites/user:Id"
                element={
                  isLoggedIn ? <FavoritesPage /> : <Navigate to="/login" replace />
                }
              />

              {/* Profile page route */}
              <Route
                path="/profile"
                element={
                  isLoggedIn ? <ProfilePage userId={isLoggedIn.userId} /> : <Navigate to="/login" replace />
                }
              />
            </Routes>

            {/* Conditionally render LoginLayout based on login status */}
            {!isLoggedIn && (
              <div>
                <LoginLayout>
                  <h2>Login or Signup</h2>
                  <LoginPage />
                  <SignupPage />
                </LoginLayout>
              </div>
            )}
          </Main>
          <Footer />
        </Router>
      </AuthProvider>  
    </div>
  );
}

export default App;
