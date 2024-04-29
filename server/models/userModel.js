// user.model.js

const mongoose = require('mongoose');

// Define the favorite schema
const favoriteSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  }
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        // Check for spaces in the username
        return !/\s/.test(v);
      },
      message: props => `${props.value} contains spaces!`
    }
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Check for password length and complexity
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/.test(v);
      },
      message: props => `Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.`
    }
  },

  favorites: [favoriteSchema] // Embed favorite schema within user schema
});

// Define method to get favorites for a user
userSchema.methods.getFavorites = async function () {
  try {
    // Populate the favorites array with recipe details
    await this.populate('favorites.recipe').execPopulate();
    return this.favorites.map(favorite => favorite.recipe);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);
