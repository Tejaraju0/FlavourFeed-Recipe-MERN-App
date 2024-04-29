const User = require('../models/userModel');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors: errorMessages });
    }
    
    // Handle other errors
    console.error(error);
    res.status(500).json({ message: 'Error occurred during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and password
    const user = await User.findOne({ email, password });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Send success response with user data
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ message: 'Error occurred during login' });
  }
};



exports.addFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if recipe already exists in favorites
    if (user.favorites.some(favorite => favorite.recipe.equals(recipeId))) {
      return res.status(400).json({ message: 'Recipe already added to favorites' });
    }

    // Add recipe to favorites
    user.favorites.push({ recipe: recipeId });
    await user.save();

    res.status(200).json({ message: 'Recipe added to favorites' });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while adding recipe to favorites' });
  }
};



exports.getFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('favorites.recipe');

    if (!user) {
      console.log('User not found'); // Add logging
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ favorites: user.favorites });
  } catch(error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error occurred while retrieving favorites' });
  }
};





// Remove favorite recipe from user
exports.removeFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if recipe exists in favorites
    const existingFavorite = user.favorites.find(favorite => favorite.recipe.equals(recipeId));
    if (!existingFavorite) {
      return res.status(400).json({ message: 'Recipe not found in favorites' });
    }

    // Remove recipe from favorites
    user.favorites = user.favorites.filter(favorite => !favorite.recipe.equals(recipeId));
    await user.save();
    return res.status(200).json({ message: 'Recipe removed from favorites' });
  } catch(error) {
    console.error('Error removing favorite:', error);
    return res.status(500).json({ message: 'Error occurred while removing recipe from favorites' });
  }
}


