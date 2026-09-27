import {
    addProduct, getProduct, getProducts, updateOneProduct
    , deleteOneProduct , getProductsByCategory
} from '../services/productServices.js';


export const allProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;


   let data = await getProductsByCategory(category);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message
    });
  }
};




//==============================================================
export let deleteProduct = async (req, res) => {
    try {
        let id = req.body.id;
        await deleteOneProduct(id)
        res.status(200).json({
            'id': id,
            'product': "product deleted successfully"
        })
    } catch (error) {
        res.send(error)
    }


}


//===========update a product by id ===========================
export let updateProduct = async (req, res) => {
    try {
        //category_name, product_price,
        // product_description,product_title
        let { id, category, price, description, title } = req.body;
        let product = await updateOneProduct(id, category, price, description, title);
        res.status(200).json({
            "updatedproduct": product
        })
    } catch (error) {
        res.send(error)

    }
}



//===================add a product into db=====================================
export let insertProduct = async (req, res) => {
    try {
   
        let data = req.body;
        let product = await addProduct(
            data
        );
        res.send(product)

    } catch (error) {
        res.send(error)
    }

}


//==================get all products from db==============================

export let allProducts = async (req, res) => {
    try {

        let products = await getProducts();
        res.send(products)

    } catch (error) {
        res.send(error)
    }

}




//=============get a product from DB by given id=====================

export let showProduct = async (req, res) => {
    try {
        //we will show 1 matched id  product available in db here
        let id = req.body;
       
        let product = await getProduct(id);
        res.status(200).json({
            'message': "1 product matched",
            'product':product
        })

    } catch (error) {
        res.send(error)
    }

}






