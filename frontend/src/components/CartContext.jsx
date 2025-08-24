import React, { createContext, useContext, useState, useEffect } from 'react';

// shape: { product: {...}, quantity: number }
const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    // Load from localStorage or start empty
    const [items, setItems] = useState(() => {
        const json = localStorage.getItem('cartItems');
        return json ? JSON.parse(json) : [];
    });

    // Persist to localStorage on change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);

    // Add or update quantity
    const addToCart = (product, qty = 1) => {
        setItems(prev => {
            const exists = prev.find(item => item.product.id === product.id);
            if (exists) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            return [...prev, { product, quantity: qty }];
        });
    };

    // Remove completely
    const removeFromCart = productId => {
        setItems(prev => prev.filter(item => item.product.id !== productId));
    };

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};