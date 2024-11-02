const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// getUserProfile controller
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

// updateUserProfile controller
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, password } = req.body;

    // Validate request data
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    const updateFields = { username, email };

    // Check if password is provided and hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword; // Include hashed password in update fields
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
};

