import { askAI } from "./aiService.js";
import Product from "../model/productSchema.js";

export const getChatResponse = async (message) => {
  try {
    const aiResult = await askAI(message);


    //Create an empty MongoDB query
    //An empty MongoDB query means:
    //Product.find({})
    const query = {};

    
    // -------------------------
    // Search product name/item
    // -------------------------
//$or = This means: Search multiple fields, and if any one of them matches, return the product
//$options: "i" = means case-insensitive.
    if (aiResult.searchText) {
      query.$or = [
        {
          title: {
            $regex: aiResult.searchText,
            $options: "i",
          },
        },
        {
          description: {
            $regex: aiResult.searchText,
            $options: "i",
          },
        },
        {
          category: {
            $regex: aiResult.searchText,
            $options: "i",
          },
        },
      ];
    }

    // -------------------------
    // Category
    // -------------------------

    if (aiResult.category) {
      query.category = {
        $regex: aiResult.category,
        $options: "i",
      };
    }

    // -------------------------
    // Maximum price
    // -------------------------

    if (aiResult.maxPrice !== null) {
      query.price = {
        ...query.price,
        $lte: aiResult.maxPrice,
      };
    }

    // -------------------------
    // Minimum price
    // -------------------------

    if (aiResult.minPrice !== null) {
      query.price = {
        ...query.price,
        $gte: aiResult.minPrice,
      };
    }

    // -------------------------
    // Minimum rating
    // -------------------------

    if (aiResult.minRating !== null) {
      query["rating.rate"] = {
        $gte: aiResult.minRating,
      };
    }

    console.log("AI Result:", aiResult);
    console.log("MongoDB Query:", query);

    //Find products matching the query, but return a maximum of 10 products.
    const products = await Product.find(query).limit(10);
    console.log("MongoDB Query:", query);
    console.log("Products found:", products.length);
console.log("Products:", products);

    return {
      reply: aiResult.reply,
      products,
    };

  } catch (error) {
    console.log("Chat Service Error:", error);
    throw error;
  }
};