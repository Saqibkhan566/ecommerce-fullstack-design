import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = `${API_URL}/api/products`;
                console.log('Fetching products from:', url);
                const response = await axios.get(url);
                // your backend returns either an array or { data: [...] }
                const list = response.data.data || response.data;
                setProducts(list);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    'Failed to load products'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading products…</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="products-grid" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1.5rem',
        }}>
            {products.map((p) => (
                <ProductCard key={p._id} product={p} />
            ))}
        </div>
    );
};

export default ProductList;