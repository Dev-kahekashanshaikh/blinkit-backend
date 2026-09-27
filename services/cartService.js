import orderModel from "../model/cartModel.js";

export let getAllCartData = async () => {
  try {
    let carts = await orderModel.find();

    return carts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export let createCart = async (cartData) => {
  try {
    let cart = new orderModel(cartData);
    await cart.save();

    return cart;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//get a single cart
export let getSingleCart = async (id) => {
  try {
    let cart = await orderModel.findById(id);

    return cart;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//update a cart
export let updateCartData = async (id, cartData) => {
  try {
    let cart = await orderModel.findByIdAndUpdate(
      id,
      cartData,
      {
        new: true,
        runValidators: true
      }
    );

    return cart;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//delete a cart data
export const deleteOneCart = async (id) => {
  try {
    const cart = await orderModel.findByIdAndDelete(id);

    return cart;
  } catch (error) {
    console.log(error);
    throw error;
  }
};