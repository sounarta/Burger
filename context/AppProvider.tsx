'use client'

import React, { useContext, createContext, useState,useEffect} from "react";

// Define the type for your product
interface Product {
  // Define the properties of your product
  // Example properties, adjust based on your actual product structure
  _id: string;
  title: string;
  description:string;
  image:string;
  price: number;
}

// Define the type for the cart product
interface CartProduct {
  product: Product;
  addsize?: { name: string; price: number }[] 
  extraIngredients?: { name: string; price: number }[] 
}

// Define the type for the context
interface AppContextProps {
  cartProducts: CartProduct[];
  setCartProducts:React.Dispatch<React.SetStateAction<CartProduct[]>>;
  addToCart: (product: Product, addsize:{name:string,price:number}[], extras:{name:string,price:number}[]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);


export function AppProvider({ children }:{children:React.ReactNode}) {
  // Explicitly type the state as CartProduct[]
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);


  const ls = typeof window !== 'undefined'? window.localStorage : null

   useEffect(() => {
    if(ls && ls.getItem('cart')){
    setCartProducts(JSON.parse(ls.getItem('cart')|| ''))
   
    }
   }, [])
 
   function saveCartProductsToLocalStorage(cartProducts:CartProduct[]) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }
   
  // Function to add a product to the cart
  const addToCart = (product: Product, addsize:{name:string,price:number}[]=[], extraIngredients:{name:string,price:number}[]=[]) => {
    
    setCartProducts((prevProducts) => {
      const cartProduct:CartProduct= {product, addsize, extraIngredients};
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts)
      return newProducts;
      
    });
  };

  return (
    <AppContext.Provider value={{ cartProducts, setCartProducts, addToCart }}>
      {children}
    </AppContext.Provider>
  );
}

// Create the hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be inside AppProvider');
  }

  return context;
}
