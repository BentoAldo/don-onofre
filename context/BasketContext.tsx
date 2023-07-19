'use client';
import React, {createContext, useContext, useState} from 'react';
import {Product} from "@/models/Product";

interface BasketContextData {
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (id: string) => void;
    clearBasket: () => void;
    total: number;
}

interface BasketProviderProps {
    children: React.ReactNode;
}

const BasketContext = createContext<BasketContextData | undefined>(undefined);

export const BasketProvider: React.FC<BasketProviderProps> = ({children}) => {
    const [products, setProducts] = useState<Product[]>([]);

    const addProduct = (product: Product) => {
        setProducts(prevProducts => [...prevProducts, product]);
    }

    const removeProduct = (id: string) => setProducts(products.filter(product => product.id !== id));

    const clearBasket = () => setProducts([]);

    const total = products.reduce((sum, product) => sum + product.price, 0);

    return (
        <BasketContext.Provider value={{products, addProduct, removeProduct, clearBasket, total}}>
            {children}
        </BasketContext.Provider>
    );
};

export const useBasket = (): BasketContextData => {
    const context = useContext(BasketContext);

    if (!context) {
        throw new Error('useBasket must be used within a BasketProvider');
    }

    return context;
};
