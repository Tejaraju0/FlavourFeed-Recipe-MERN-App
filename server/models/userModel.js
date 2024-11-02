const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
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
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/.test(v);
      },
      message: props => `Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.`
    }
  },

  favorites: [favoriteSchema] 
});

userSchema.methods.getFavorites = async function () {
  try {
    await this.populate('favorites.recipe').execPopulate();
    return this.favorites.map(favorite => favorite.recipe);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);
