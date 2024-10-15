import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async (req,res)=>{
    try {
        const products = await Product.find({})
        res.status(201).json({success:true , data: products})
    } catch (error) {
        res.status(500).json({ success: false, message: "Error Fetching Products" });
    }
}

export const updateProduct = async (req,res)=>{
    const {id} = req.params;
    const product = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({ success: false, message: "Invalid ID" });
    }

    try {
       const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true})
       res.status(201).json({success:true , data: updatedProduct})

    } catch (error) {
        res.status(500).json({ success: false, message: "Product not found!" });
    }
}

export const createProduct = async (req,res)=>{
    const product = req.body; //data from user

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:"Please Provide all fields"})   
    }

    const newProduct = new Product(product)
    try {
        await newProduct.save();
        res.status(201).json({success:true , data: newProduct})
    } catch (error) {
        console.log("Error in creating product",`${error.message}`);
        res.status(500).json({success:false, message:"Server error"})
    }

}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({ success: false, message: "Invalid ID" });
    }
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted" });
    
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}