import { create } from 'zustand';


export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields" };
    }
    
    try {
      const res = await fetch("/api/products", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(newProduct) 
      });
      
      const data = await res.json();
      
      
      set((state) => ({
        products: [...state.products, data.data] 
      }));
      
      return { success: true, message: "Successful" };
    } catch (error) {
      return { success: false, message: "Failed to create product" };
    }
  },

   fetchProducts : async()=>{
    const res = await fetch('/api/products');
    const data = await res.json();
    set({products: data.data})
   },

   DeleteProduct: async (pid)=>{
    const res = await fetch(`/api/products/${pid}`,{
      method:'DELETE'
    });
    const data = await res.json();
    if(!data.success){
      return {success:false, message:"Failed"}
    }

    set(state => ({products:state.products.filter(product=>product._id!==pid)}))
    return {success:true, message:"Successfully"}
   },

   UpdateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: 'PUT', // Use PUT for updating resources
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();

      if (!data.success) {
        return { success: false, message: "Update failed" };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? { ...product, ...updatedProduct } : product
        ),
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "An error occurred" };
    }
  },
}));



