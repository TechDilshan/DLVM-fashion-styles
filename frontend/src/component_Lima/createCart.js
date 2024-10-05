import React, { useState } from 'react';
import createCart from './createCart'; // Import your createCart function

const ProductPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(10); // Example stock count (this should come from your backend)
    
    // Assuming the product data is fetched and set
    const handleAddToCart = () => {
        if (selectedProduct) {
            createCart({ 
                productId: selectedProduct.id, 
                qty: quantity, 
                stk: stock 
            });
        }
    };

    return (
        <div>
            <h1>{selectedProduct ? selectedProduct.name : "Product Name"}</h1>
            <p>Available Stock: {stock}</p>

            <label htmlFor="quantity">Quantity:</label>
            <input 
                type="number" 
                id="quantity" 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max={stock}
            />

            <button onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductPage;
