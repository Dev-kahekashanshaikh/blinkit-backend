import { getAllCartData, createCart, getSingleCart, updateCartData, deleteOneCart } from '../services/cartService.js'
//check for name conventions*  this shwoing errors ok cahnge first




//get all products in cart
export let getAllCarts = async (req, res) => {

    try {
        let cart = await getAllCartData();

        res.status(201).json(cart)

    } 
    catch (error) {

        res.send(error);
    }
}



//add a product in cart

export let addCarts = async (req, res) => {
    try {
        let product = req.body;

        let data = await createCart(product);

        res.status(201).json({

            message: "Cart created successfully",
            data: data
            
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to create cart",
            error: error.message
        });
    }
};


//find product in cart by id
export let getCartById = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await getSingleCart(id);
        res.status(201).json(
            {
                'message': "product is available",
                'product': data
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                'message': "product is not available",
                'error': error
            })
    }
}



//find by id and update cart
export let updateCart = async (req, res) => {
    try {
        let id = req.params.id;
        let cartData = req.body;
        let data = await updateCartData(id, cartData);
        res.status(201).json(
            {
                'message': "product is updated",
                'product': data
            }
        )

    } catch (error) {
        res.status(400).json(
            {
                'message': "error while updating cart",
                'error': error
            })
    }
}

//delete a cart by id
export let deleteCart = async (req, res) => {
    try {
        let id = req.body;

        let data = await deleteOneCart(id)
        res.status(201).json(
            {
                'message': "product is deleted",
                'product': data
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                'message': "error while deleting cart",
                'error': error
            })
    }
}

