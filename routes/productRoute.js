import express from "express"
import { allProducts, insertProduct, showProduct ,updateProduct
  ,deleteProduct ,allProductsByCategory
} from "../controllers/productsController.js";


let productRoute = express.Router();

productRoute.get('/getAllProducts', allProducts);

productRoute.get( '/getAllProducts/category/:category',allProductsByCategory);

productRoute.post('/addproduct', insertProduct);

productRoute.get('/getProductById/:id', showProduct);

productRoute.post('/updateproduct',updateProduct);

productRoute.post('/deleteproduct',deleteProduct);

export default productRoute;

