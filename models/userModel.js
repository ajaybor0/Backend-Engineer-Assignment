import mongoose from 'mongoose';

// Define the schema for users
const userSchema = new mongoose.Schema({
  phoneNumber: { type: Number, unique: true, required: true },
  priority: { type: Number, enum: [0, 1, 2] }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
