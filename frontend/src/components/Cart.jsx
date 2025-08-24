import React from 'react';
import { MdMessage } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { AiOutlineShopping } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
    const { items, addToCart, removeFromCart } = useCart();

    // Update quantity
    const handleQtyChange = (product, newQty) => {
        removeFromCart(product.id);
        addToCart(product, newQty);
    };

    // Calculate total
    const totalPrice = items.reduce(
        (sum, { product, quantity }) =>
            sum + Number(product.price) * quantity,
        0
    );

    return (
        <div>
            <div className="top-navbar">
                <div className="nav-left">
                    <FaBars className="hamburger-icon mobile-only" />

                    {/* Brand */}
                    <Link className="brand" to="/">
                        <img
                            className="brand-icon"
                            src="https://static.vecteezy.com/system/resources/thumbnails/022/674/232/small/shoping-bag-icon-in-square-gradient-colors-shop-bag-sign-for-web-or-commerce-apps-interface-png.png"
                            alt="Brand Logo"
                        />
                        <h1 className="brand-title">Brand</h1>
                    </Link>
                </div>


                <div className="nav-right">
                    <Link className="nav-link" to="/profile">
                        <div className="icon">
                            <FaUser size={24} title="Profile" className="nav-icon" />
                            <span className="icon-label">Profile</span>
                        </div>
                    </Link>
                    <Link className="nav-link" to="/messages">
                        <div className="icon desktop-only">
                            <MdMessage size={24} title="Message" className="nav-icon " />
                            <span className="icon-label ">Message</span>
                        </div>
                    </Link>
                    <Link className="nav-link" to="/orders">
                        <div className="icon desktop-only">
                            <AiOutlineShopping size={24} title="Orders" className="nav-icon " />
                            <span className="icon-label">Orders</span>
                        </div>
                    </Link>
                    <Link className="nav-link" to="/cart">
                        <div className="icon">
                            <BsCart size={24} title="My cart" className="nav-icon" />
                            <span className="icon-label">My cart</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="cart-page">
                <h2>Your Cart</h2>

                {items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(({ product, quantity }) => {
                                    const price = Number(product.price) || 0;
                                    const subtotal = price * quantity;
                                    const stock = Number(product.countInStock) || 1;

                                    return (
                                        <tr key={product.id}>
                                            <td className="product-col">
                                                <Link
                                                    to={`/products/${product.id}`}
                                                    state={{ product }}
                                                    className="cart-product-link"
                                                >
                                                    <img
                                                        src={product.image}
                                                        alt={product.title || product.name}
                                                        className="cart-product-img"
                                                    />
                                                    <span className="cart-product-name">
                                                        {product.title || product.name}
                                                    </span>
                                                </Link>
                                            </td>

                                            <td>${price.toFixed(2)}</td>

                                            <td>
                                                <select
                                                    value={quantity}
                                                    onChange={e =>
                                                        handleQtyChange(product, Number(e.target.value))
                                                    }
                                                >
                                                    {Array.from({ length: stock }, (_, i) => (
                                                        <option key={i + 1} value={i + 1}>
                                                            {i + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>

                                            <td>${subtotal.toFixed(2)}</td>

                                            <td>
                                                <button
                                                    className="remove-btn"
                                                    onClick={() => removeFromCart(product.id)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div className="cart-summary">
                            <p>
                                Total ({items.length} items):{' '}
                                <strong>${totalPrice.toFixed(2)}</strong>
                            </p>
                            <button
                                className="checkout-btn"
                                onClick={() => {
                                    // navigate to checkout or payment
                                }}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;