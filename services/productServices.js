import Product  from '../model/productSchema.js';

export let getProductsByCategory = async (
    category        
) => {

    try {

        let products = await Product.find({ category: category });
        return products;
       

    } catch (error) {

        console.log(error);
        throw error; //controller will catch this err

    }
};





export let deleteOneProduct = async (
    id
) => {

    try {

         await Product.findByIdAndDelete(id);

       

    } catch (error) {

        console.log(error);
        throw error; //controller will catch this err

    }
};


export let updateOneProduct = async (
    id,
    category_name,
    product_price,
    product_description,
    product_title
) => {

    try {

        let product = await Product.findByIdAndUpdate(
            id,
            {
                category: category_name,
                price: product_price,
                description: product_description,
                title: product_title
            },
            {
                new: true, //this helps mongoose to return updated record
                runValidators: true
            }
        );

        return product;

    } catch (error) {

        console.log(error);
        throw error; //controller will catch this err

    }
};

// export let updateOneProduct =async (category_id, product_price,
//     product_description,product_title)=>{
// try {
//   let product =  await Product.findByIdAndUpdate({
//         _id: category_id } ,
//     {
//         $set: {
//             price: product_price,
//             description: product_description,
//             title:product_title
//         }
//     });
//     return product;
    
// } catch (error) {
//     console.log(error);
//     return error;
// }
// }


//add product
 export  let addProduct =async (data)=>{

    try {
     let  Product1 = new Product(
 data
)
await Product1.save();
return Product1;

    } catch (error) {
        console.log(error);
    }
}


//single product
 export  let getProduct =async (id)=>{
   
    try {
     let  Product1 = await Product.findById(id);

 
return Product1;

    } catch (error) {
        console.log(error);
    }
}


//all products
 export  let getProducts =async ()=>{

    try {
     let  Products = await Product.find();

 
return Products;

    } catch (error) {
        console.log(error);
    }
}