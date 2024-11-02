const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors: errorMessages });
    }
    
    console.error(error);
    res.status(500).json({ message: 'Error occurred during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: 'Error occurred during login' });
  }
};




exports.addFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    if (user.favorites.some(favorite => favorite.recipe.equals(recipeId))) {
      return res.status(400).json({ message: 'Recipe already added to favorites' });
    }

    
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
      console.log('User not found'); 
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ favorites: user.favorites });
  } catch(error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error occurred while retrieving favorites' });
  }
};






exports.removeFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const existingFavorite = user.favorites.find(favorite => favorite.recipe.equals(recipeId));
    if (!existingFavorite) {
      return res.status(400).json({ message: 'Recipe not found in favorites' });
    }

    
    user.favorites = user.favorites.filter(favorite => !favorite.recipe.equals(recipeId));
    await user.save();
    return res.status(200).json({ message: 'Recipe removed from favorites' });
  } catch(error) {
    console.error('Error removing favorite:', error);
    return res.status(500).json({ message: 'Error occurred while removing recipe from favorites' });
  }
}


