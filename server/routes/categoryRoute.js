const express = require('express');
const { create, fetchAll, fetchOne, exploreRecipesByID, exploreLatest, getAllRecipes, searchRecipes, submitRecipe, submitRecipeOnPost, exploreRandom} = require('../controller/categoryController');
const { signup, login, addFavorite, getFavorites, removeFavorite } = require('../controller/authController');
const { getUserProfile, updateUserProfile } = require('../controller/userController');
const route = express.Router();


route.post('/create', create);
route.get('/fetchall', fetchAll);
route.get('/fetchone/:id', fetchOne);
// route.get('/recipes', fetchAllRecipes);
route.get('/recipes/:id', exploreRecipesByID);
route.get('/latest', exploreLatest);
route.get('/recipes', getAllRecipes);
route.post('/search', searchRecipes);
route.get('/submit-recipes', submitRecipe );
route.post('/submit-recipe', submitRecipeOnPost);


route.post('/signup', signup);
route.post('/login', login);
route.post('/favorites/add', addFavorite);
route.get('/favorites/:userId', getFavorites);
route.delete('/favorites/remove', removeFavorite);
route.get('/explore-random', exploreRandom);



route.get('/profile/:userId', getUserProfile);
route.put('/profile/:userId', updateUserProfile); 

module.exports = route;
