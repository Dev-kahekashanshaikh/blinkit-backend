import express from 'express';
import { getAllCarts,addCarts,getCartById,updateCart,deleteCart
} from "../controllers/cartController.js";

let cartRoute = express.Router();



cartRoute.get('/getallcarts',getAllCarts);
cartRoute.post('/addcart',addCarts);
cartRoute.get('/getcart/:id',getCartById);
cartRoute.put('/updatecart/:id',updateCart);
cartRoute.delete('/deletecart',deleteCart);

export default cartRoute;