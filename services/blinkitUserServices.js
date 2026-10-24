import blinkitUserModel from '../model/blinkitUserModel.js';

// 1. Create a new user
export const createUser = async (userData) => {
  return await blinkitUserModel.create(userData);
};

// 2. Find a user by phone number
export const findUserByPhone = async (phone) => {
  return await blinkitUserModel.findOne({ phone });
};

// 3. Find a user by MongoDB ID
export const findUserById = async (userId) => {
  return await blinkitUserModel.findById(userId);
};

// 4. Find all users
export const findAllUsers = async () => {
  return await blinkitUserModel.find();
};

// 5. Update a user's profile
export const updateUser = async (userId, updateData) => {
  const allowedFields = ["name", "email"];
  const filteredData = {};

  for (const field of allowedFields) {
    if (Object.hasOwn(updateData, field)) {
      filteredData[field] = updateData[field];
    }
  }

  return await blinkitUserModel.findByIdAndUpdate(
    userId,
    { $set: filteredData },
    {
      new: true,
      runValidators: true,
    }
  );
};

// 6. Delete a user by ID
export const deleteUser = async (userId) => {
  return await blinkitUserModel.findByIdAndDelete(userId);
};

// 7. Check whether a user exists by phone number
export const isPhoneRegistered = async (phone) => {
  const user = await blinkitUserModel.exists({ phone });
  return Boolean(user);
};