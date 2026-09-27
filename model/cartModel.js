import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    products: [
      {
        productId: {
          type: Number,
          required: true
        },

        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ]
  },

);


//   {
//     versionKey: true
//   }



const orderModel = mongoose.model("cart", orderSchema);

export default orderModel;