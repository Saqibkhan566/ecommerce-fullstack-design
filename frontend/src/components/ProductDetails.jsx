import React, { useState, useEffect } from 'react';
import {
    useParams,
    useLocation,
    useNavigate,
    Link
} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { useCart } from './CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const { addToCart } = useCart();

    // 1) Try to read product from Link state
    // 2) If missing, fetch it from the backend
    const [product, setProduct] = useState(location.state?.product || null);
    const [loading, setLoading] = useState(!location.state?.product);
    const [error, setError] = useState('');
    const [qty, setQty] = useState(1);

    const handleAddToCart = () => {
        addToCart(product, qty);
        navigate('/cart');
    };


    useEffect(() => {
        if (product) return;

        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) {
                    const txt = await res.text();
                    throw new Error(txt || res.statusText);
                }
                const json = await res.json();
                setProduct(json.data || json);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, product]);

    // Reset quantity to 1 whenever a new product loads
    useEffect(() => {
        setQty(1);
    }, [product]);


    if (loading) return <p>Loading…</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!product) return <p>Product not found.</p>;

    // Destructure fields (adjust names if your API differs)
    const {
        name = product.title,
        price,
        originalPrice,
        image,
        description,
        category,
        countInStock,
        rating = 0,
        numReviews = 0
    } = product;

    // Ensure at least 1 option if countInStock is missing or zero
    const stock = countInStock > 0 ? countInStock : 1;

    // Build image URL if needed
    const imgSrc = image.startsWith('http')
        ? image
        : image.startsWith('/')
            ? image
            : `/uploads/${image}`;

    // Stars logic
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    // const handleAddToCart = () => {
    //     navigate(`/cart/${id}?qty=${qty}`);
    // };

    return (
        <>
            <Navbar />
            <div className="product-details-page">

                {/* Breadcrumbs */}
                <nav className="pd-breadcrumbs">
                    <Link to="/">Home</Link> /
                    <Link to="/products">Products</Link> /
                    <span>{name}</span>
                </nav>

                <div className="pd-container">
                    {/* Left: Image */}
                    <div className="pd-image">
                        <img src={imgSrc} alt={name} />
                    </div>

                    {/* Right: Info */}
                    <div className="pd-info">
                        <h1 className="pd-title">{name}</h1>

                        <div className="pd-rating">
                            {[...Array(totalStars)].map((_, i) => {
                                if (i < fullStars) return <span key={i}>★</span>;
                                if (i === fullStars && halfStar) return <span key={i}>⯨</span>;
                                return <span key={i}>☆</span>;
                            })}
                            <span className="pd-reviews">({numReviews} reviews)</span>
                        </div>

                        <div className="pd-price">
                            <span className="pd-current">
                                ${Number(price).toFixed(2)}
                            </span>
                            {originalPrice > price && (
                                <span className="pd-old">
                                    ${Number(originalPrice).toFixed(2)}
                                </span>
                            )}
                        </div>

                        <p className="pd-desc">{description}</p>

                        <div className="pd-meta">
                            <div><strong>Category:</strong> {category}</div>
                            <div><strong>Stock:</strong> {countInStock}</div>
                        </div>

                        <div className="pd-purchase">
                            <select
                                value={qty}
                                onChange={e => setQty(Number(e.target.value))}
                                disabled={countInStock === 0}
                            >
                                {Array.from({ length: stock }, (_, x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleAddToCart}
                                disabled={countInStock === 0}
                            >
                                {countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;