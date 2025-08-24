import React from 'react';
import { Link } from 'react-router-dom';
// import { product } from './Home';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    // assume product has { id, title, price, image }
    const { id, title, price, image } = product;

    return (
        <Link
            to={`/products/${id}`}
            state={{ product }}
            className="text-decoration-none text-dark"
        >
            <div className="card">
                <img src={image} alt={title} loading="lazy" />
                <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <div className="card-price">${price}</div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;