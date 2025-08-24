import React, { useState } from 'react';
import { MdMessage } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { AiOutlineShopping } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const authToken = sessionStorage.getItem('auth-token');
    const userName = sessionStorage.getItem('name');
    const isLoggedIn = Boolean(authToken && userName);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };


    const goSearch = () => {
        const params = new URLSearchParams();
        if (search.trim()) params.set('search', search.trim());
        if (category) params.set('category', category);
        navigate(`/products?${params.toString()}`);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        goSearch();
    };

    return (
        <header className="navbar-container">
            <div className="top-navbar">
                <div className="nav-left">
                    <FaBars
                        className="hamburger-icon mobile-only"
                        onClick={toggleMenu}
                    />

                    <Link className="brand" to="/">
                        <img
                            className="brand-icon"
                            src="https://static.vecteezy.com/system/resources/thumbnails/022/674/232/small/shoping-bag-icon-in-square-gradient-colors-shop-bag-sign-for-web-or-commerce-apps-interface-png.png"
                            alt="Brand Logo"
                        />
                        <h1 className="brand-title">Brand</h1>
                    </Link>
                </div>

                {menuOpen && (
                    <div className="hamburger-menu">
                        <ul>
                            {isLoggedIn && (
                                <li>
                                    <Link to="/profile">👤 Profile</Link>
                                </li>
                            )}
                            {!isLoggedIn && (
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/messages">Messages</Link>
                            </li>
                            <li>
                                <Link to="/favorites">Favorites</Link>
                            </li>
                            <li>
                                <Link to="/help">Help</Link>
                            </li>
                        </ul>
                    </div>
                )}


                <div className="nav-center desktop-only">
                    <form className="Search-form d-flex align-items-center" role="search" onSubmit={onSubmit}>
                        <input
                            type="text"
                            className="search form-control rounded-start search-input"
                            placeholder="Search"
                            aria-label="Search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <select
                            className="search-dropdown"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option value="">All category</option>
                            <option value="automobiles">Automobiles</option>
                            <option value="clothes">Clothes and wear</option>
                            <option value="home">Home interiors</option>
                            <option value="tech">Computer and tech</option>
                            <option value="tools">Tools, equipment</option>
                            <option value="sports">Sports and outdoor</option>
                            <option value="pets">Animal and pets</option>
                            <option value="machinery">Machinery tools</option>
                            <option value="more">More category</option>
                        </select>
                        <button className="btn btn-primary rounded-end search-button" type="submit">
                            Search
                        </button>
                    </form>
                </div>

                {/* Icons */}
                {/* <div className="icon-group nav-right d-flex align-items-center gap-4"> */}
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
            {/* Mobile Search */}
            <div className="mobile-search mobile-only">
                <form value={search} onSubmit={onSubmit} >
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input full-width"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>
            </div>

            {/* Lower Navbar */}
            <nav className="lower-navbar ">
                <div className="category-scroll">
                    <button>All Category</button>
                    <button>Gadgets</button>
                    <button>Clothes</button>
                    <button>Accessories</button>
                    <button>Hot Offers</button>
                    <button>Gift Boxes</button>
                    <button>Projects</button>
                    <button>Help</button>
                </div>

                {/* <nav className="lower-navbar d-flex justify-content-between align-items-center px-3 py-2 border-top">
                    <ul className="nav gap-3">
                        <li className="nav-item"><Link className="nav-link" to="/categories">All category</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/offers">Hot offers</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/gifts">Gift boxes</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/menu">Menu item</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/help">Help</Link></li>
                    </ul> */}

                {/* Right Dropdowns */}
                <div className="nav-settings desktop-only">
                    <select className="form-select form-select-sm">
                        <option value="en-us">English, USD</option>
                        <option value="ur-pk">Urdu, PKR</option>
                        <option value="de-eu">German, EUR</option>
                    </select>
                    <select className="form-select form-select-sm">
                        <option value="pk">Ship to Pakistan</option>
                        <option value="us">Ship to USA</option>
                        <option value="de">Ship to Germany</option>
                    </select>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
