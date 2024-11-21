import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

// Provider Component
export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook for easier access
export const useProduct = () => useContext(ProductContext);
