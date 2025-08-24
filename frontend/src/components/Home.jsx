import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import './Home.css';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Appstore from '../assets/appstore.png';
import Playstore from '../assets/playstore.png';

const Home = () => {

    const authToken = sessionStorage.getItem('auth-token');
    const userName = sessionStorage.getItem('name');
    const isLoggedIn = Boolean(authToken && userName);


    const products = [
        {
            id: 1,
            title: 'Wireless Headphones',
            price: '$59.99',
            image: 'https://cdn.pixabay.com/photo/2019/11/05/05/09/headphones-4602719_1280.jpg',
        },
        {
            id: 2,
            title: 'Men Smart Watch',
            price: '$129.99',
            image: 'https://cdn.pixabay.com/photo/2020/03/02/11/52/clock-4895499_1280.jpg',
        },
        {
            id: 3,
            title: 'Running Shoes',
            price: '$89.99',
            image: 'https://cdn.pixabay.com/photo/2014/06/18/18/42/running-shoe-371625_1280.jpg',
        },
        {
            id: 4,
            title: 'Digital Camera',
            price: '$249.99',
            image: 'https://cdn.pixabay.com/photo/2014/11/23/14/32/camera-542784_1280.png',
        },
        {
            id: 5,
            title: 'Bluetooth Speaker',
            price: '$39.99',
            image: 'https://cdn.pixabay.com/photo/2015/10/04/22/03/speakers-971975_1280.png',
        },
        {
            id: 6,
            title: 'Gaming Mouse',
            price: '$29.99',
            image: 'https://cdn.pixabay.com/photo/2016/11/29/04/17/mouse-1869443_1280.jpg',
        },
    ];

    const homeAndOutdoor = [
        {
            id: 7,
            title: 'Soft Chair',
            price: '$19',
            image: 'https://cdn.pixabay.com/photo/2015/09/22/18/57/upholstered-furniture-952291_1280.jpg',
        },
        {
            id: 8,
            title: 'Sofa & Chair',
            price: '$19',
            image: 'https://cdn.pixabay.com/photo/2017/07/24/17/18/sofa-2535447_1280.png',
        },
        {
            id: 9,
            title: 'Kitchen Dishes',
            price: '$19',
            image: 'https://cdn.pixabay.com/photo/2016/10/31/21/18/dishwasher-1786821_1280.jpg',
        },
        {
            id: 10,
            title: 'Smart Watch',
            price: '$19',
            image: 'https://cdn.pixabay.com/photo/2018/10/02/09/52/naviforce-waterproof-watch-3718331_1280.jpg',
        },
        {
            id: 11,
            title: 'Kitchen Mixer',
            price: '$100',
            image: 'https://cdn.pixabay.com/photo/2016/12/27/09/57/polaroid-1933642_1280.png',
        },
        {
            id: 12,
            title: 'Blender',
            price: '$39',
            image: 'https://cdn.pixabay.com/photo/2019/06/04/15/58/antique-4251720_1280.jpg',
        },
        {
            id: 13,
            title: 'Home Appliance',
            price: '$19',
            image: 'https://cdn.pixabay.com/photo/2011/03/01/03/55/iron-5112_1280.jpg',
        },
        {
            id: 14,
            title: 'Coffee Maker',
            price: '$10',
            image: 'https://cdn.pixabay.com/photo/2017/09/23/00/01/coffee-grinder-2777584_1280.png',
        },
    ];

    const electronicsAndGadgets = [
        {
            id: 15,
            title: 'Smart Watch',
            price: '$19',
            image: 'https://cdn.pixabay.com/photo/2019/11/13/10/17/gents-4623183_1280.jpg',
        },
        {
            id: 16,
            title: 'Camera',
            price: '$89',
            image: 'https://cdn.pixabay.com/photo/2022/05/03/01/04/camera-7170604_1280.jpg',
        },
        {
            id: 17,
            title: 'Headphones',
            price: '$10',
            image: 'https://cdn.pixabay.com/photo/2016/07/08/08/24/headphones-1503828_1280.jpg',
        },
        {
            id: 18,
            title: 'Smart Watch',
            price: '$90',
            image: 'https://cdn.pixabay.com/photo/2017/04/18/13/04/mens-2239007_1280.jpg',
        },
        {
            id: 19,
            title: 'Gaming Set',
            price: '$35',
            image: 'https://cdn.pixabay.com/photo/2017/04/04/18/14/video-game-console-2202628_1280.jpg',
        },
        {
            id: 20,
            title: 'Laptop & PC',
            price: '$340',
            image: 'https://cdn.pixabay.com/photo/2018/10/02/09/52/hp-hq-tre-core-i5-laptop-3718328_1280.jpg',
        },
        {
            id: 21,
            title: 'Smartphone',
            price: '$19',
            image: 'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
        },
        {
            id: 22,
            title: 'Electric Kettle',
            price: '$240',
            image: 'https://cdn.pixabay.com/photo/2017/09/07/14/16/kettle-2725431_1280.jpg',
        },
    ];

    const recommendedItems = [
        {
            id: 101,
            name: 'T-shirts',
            price: '10.30',
            image: 'https://cdn.pixabay.com/photo/2013/07/13/14/07/apparel-162180_1280.png',
        },
        {
            id: 102,
            name: 'Jeans shorts',
            price: '10.30',
            image: 'https://cdn.pixabay.com/photo/2018/03/30/15/12/candlestick-3275597_1280.png',
        },
        {
            id: 103,
            name: 'Brown coat',
            price: '12.50',
            image: 'https://cdn.pixabay.com/photo/2015/12/03/18/33/png-1075409_1280.png',
        },
        {
            id: 104,
            name: 'Jeans bag',
            price: '34.00',
            image: 'https://cdn.pixabay.com/photo/2017/07/04/18/27/handbags-white-2472100_1280.jpg',
        },
        {
            id: 105,
            name: 'Leather wallet',
            price: '99.00',
            image: 'https://cdn.pixabay.com/photo/2019/06/09/15/58/wallet-4262349_1280.png',
        },
        {
            id: 106,
            name: 'Canon camera',
            price: '9.99',
            image: 'https://cdn.pixabay.com/photo/2016/12/27/09/57/lens-1933639_1280.png',
        },
        {
            id: 107,
            name: 'Headset',
            price: '8.99',
            image: 'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
        },
        {
            id: 108,
            name: 'Smartwatch',
            price: '10.30',
            image: 'https://cdn.pixabay.com/photo/2017/10/31/14/58/clock-2905507_1280.png',
        },
        {
            id: 109,
            name: 'Blue wallet',
            price: '10.30',
            image: 'https://cdn.pixabay.com/photo/2016/09/22/19/36/wallet-1688106_1280.png',
        },
        {
            id: 110,
            name: 'Kettle',
            price: '80.95',
            image: 'https://cdn.pixabay.com/photo/2017/09/07/14/16/kettle-2725431_1280.jpg',
        },
    ];

    // Countdown timer logic
    const [timeLeft, setTimeLeft] = useState({
        days: 4,
        hours: 13,
        minutes: 34,
        seconds: 56,
    });

    useEffect(() => {
        const target = new Date();
        target.setDate(target.getDate() + 4);
        target.setHours(target.getHours() + 13);
        target.setMinutes(target.getMinutes() + 34);
        target.setSeconds(target.getSeconds() + 56);

        const interval = setInterval(() => {
            const now = new Date();
            const diff = target - now;
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(interval);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="main-container">
            <Navbar />
            <div className="home-container">
                <div className="sidebar desktop-only">
                    <ul>
                        <li className="active">Automobiles</li>
                        <li>Clothes and wear</li>
                        <li>Home interiors</li>
                        <li>Computer and tech</li>
                        <li>Tools, equipments</li>
                        <li>Sports and outdoor</li>
                        <li>Animal and pets</li>
                        <li>Machinery tools</li>
                        <li>More category</li>
                    </ul>
                </div>

                <div className="main-banner mobile-only">
                    <div className="banner-text">
                        <h2>Latest trending</h2>
                        <h1>
                            <b>Electronic items</b>
                        </h1>
                        <button className="learn-more-btn">Learn more</button>
                    </div>
                    {/* <img
                        className="banner-img"
                        src="https://cdn.pixabay.com/photo/2017/02/05/00/19/web-design-2038872_1280.jpg"
                        alt="Banner"
                    /> */}
                </div>

                <div className="right-sidebar desktop-only">
                    <div className="user-box">
                        <div className="user-icon">👤</div>
                        <div className="user-info">
                            {isLoggedIn ? (
                                <>
                                    <div>Hi, {userName}</div>
                                    <div>Welcome back!</div>
                                </>
                            ) : (
                                <>
                                    <div>Hi, user</div>
                                    <div>Let's get started</div>
                                </>
                            )}
                        </div>

                        {!isLoggedIn && (
                            <>
                                <button className="join-btn">Join now</button>
                                <Link to="/login">
                                    <button className="login-btn">Log in</button>
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="offer-box orange">
                        <div>Get US $10 off with a new supplier</div>
                    </div>
                    <div className="offer-box blue">
                        <div>Send quotes with supplier preferences</div>
                    </div>
                </div>
            </div>

            {/* New Sections Below Main Banner */}
            <div className="body-sections">
                {/* Deals and Offers */}
                <div className="deals-offers-section ">
                    <div className="deals-offers-card">
                        <div className='deals-head'>
                            <div className='deals-title'>
                                <h2>Deals and offers</h2>
                                <div className="deals-sub">Hygiene equipments</div>
                            </div>
                            <div className="deals-timer">
                                <div>
                                    <span>{String(timeLeft.days).padStart(2, '0')}</span>
                                    <span>Days</span>
                                </div>
                                <div>
                                    <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                                    <span>Hours</span>
                                </div>
                                <div>
                                    <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                                    <span>Min</span>
                                </div>
                                <div>
                                    <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                                    <span>Sec</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="deals-products-row">
                        {products.slice(0, 5).map((item, idx) => {
                            const discounts = ['-25%', '-15%', '-40%', '-25%', '-25%'];
                            return (
                                <div key={item.id} className="deal-card-wrap" style={{ position: 'relative' }}>
                                    <ProductCard
                                        product={{
                                            id: item.id,
                                            title: item.title,
                                            image: item.image,
                                            // strip $ so ProductCard "$" prefix doesn’t double up
                                            price: String(item.price).replace(/^\$/, ''),
                                        }}
                                    />
                                    <div className="deal-discount">{discounts[idx]}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Home and Outdoor */}
                <div className="category-section">
                    <div className="category-card left-card" style={{ background: '#f8e7c9' }}>
                        <div className="category-info">
                            <h2>Home and outdoor</h2>
                            <button className="btn btn-primary">Source now</button>
                        </div>
                        {/* <img
                            src="https://cdn.pixabay.com/photo/2016/04/18/08/50/kitchen-1336160_1280.jpg"
                            alt="Home and outdoor"
                        /> */}
                    </div>
                    <div className="category-products-grid">
                        {homeAndOutdoor.map((item) => (
                            // <ProductCard key={item.id} product={item} />
                            <ProductCard
                                key={item.id}
                                product={{
                                    id: item.id,
                                    title: item.title,
                                    image: item.image,
                                    price: String(item.price).replace(/^\$/, ''),
                                }}
                            />
                        ))}

                    </div>
                </div>

                {/* Consumer electronics and gadgets */}
                <div className="category-section">
                    <div className="category-card left-card" style={{ background: '#e6f3fa' }}>
                        <div className='category-info'>
                            <h2>Consumer electronics and gadgets</h2>
                            <button className="btn btn-primary">Source now</button>
                        </div>
                        {/* <img
                            src="https://cdn.pixabay.com/photo/2016/01/13/12/17/tablet-1137688_1280.jpg"
                            alt="Consumer electronics"
                        /> */}
                    </div>
                    <div className="category-products-grid">
                        {electronicsAndGadgets.map((item) => (
                            <ProductCard
                                key={item.id}
                                product={{
                                    id: item.id,
                                    title: item.title,
                                    image: item.image,
                                    price: String(item.price).replace(/^\$/, ''),
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Request Banner & Supplier Quote Form */}
            <div className="request-banner-section">
                <div className="request-banner-bg">
                    <h1>An easy way to send requests to all suppliers</h1>
                    <p>
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
                <div className="request-quote-card">
                    <h2>Send quote to suppliers</h2>
                    <input type="text" placeholder="What item you need?" className="quote-input" />
                    <textarea placeholder="Type more details" className="quote-textarea"></textarea>
                    <div className="quote-row">
                        <input type="text" placeholder="Quantity" className="quote-qty" />
                        <select className="quote-unit">
                            <option>Pcs</option>
                            <option>Kg</option>
                            <option>Box</option>
                        </select>
                    </div>
                    <button className="quote-btn">Send inquiry</button>
                </div>
            </div>

            {/* Recommended Items Grid */}
            <div className="recommended-section">
                <h2 className="recommended-title">Recommended items</h2>
                <div className="recommended-grid">
                    {recommendedItems.map((item) => (
                        <ProductCard
                            key={item.id}
                            product={{
                                id: item.id,
                                title: item.name,
                                image: item.image,
                                price: String(item.price).replace(/^\$/, ''),
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Extra Services */}
            <div className="services-section desktop-only">
                <h2 className="services-title">Our extra services</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <div className='sevice-card-back'>Lorem ipsum dolor sit amet consectetur.</div>
                        <div>Source from Industry Hubs</div>
                    </div>
                    <div className="service-card">
                        <div className='sevice-card-back'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae!</div>
                        <div>Customize Your Products</div>
                    </div>
                    <div className="service-card">
                        <div className='sevice-card-back'>Lorem ipsum dolor sit amet consectetur adipisicing.</div>
                        <div>Fast, reliable shipping by ocean or air</div>
                    </div>
                    <div className="service-card">
                        <div className='sevice-card-back'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, sed nemo.</div>
                        <div>Product monitoring and inspection</div>
                    </div>
                </div>
            </div>

            {/* Suppliers by Region */}
            <div className="suppliers-section">
                <h2 className="suppliers-title">Suppliers by region</h2>
                <div className="suppliers-grid">
                    <div className="supplier-card">
                        <img src="https://cdn.pixabay.com/photo/2017/08/30/14/35/u-a-e-2697343_1280.jpg" alt="image" />
                        Arabic Emirates <span className="supplier-url">shopname.ae</span>
                    </div>
                    <div className="supplier-card">
                        <img src="https://cdn.pixabay.com/photo/2017/09/01/12/56/australia-2704143_1280.jpg" alt="image" />
                        Australia <span className="supplier-url">shopname.ae</span>
                    </div>
                    <div className="supplier-card">
                        <img src="https://cdn.pixabay.com/photo/2017/08/26/23/37/international-2684756_1280.jpg" alt="image" />
                        Denmark <span className="supplier-url">denmark.com.dk</span>
                    </div>
                    <div className="supplier-card">
                        <img src="https://cdn.pixabay.com/photo/2017/08/29/21/54/french-flag-2695008_1280.jpg" alt="image" />
                        France <span className="supplier-url">shopname.com.fr</span>
                    </div>
                    <div className="supplier-card">
                        <img src="https://cdn.pixabay.com/photo/2017/08/29/22/12/flag-usa-2695061_1280.jpg" alt="image" />
                        United States <span className="supplier-url">shopname.ae</span>
                    </div>
                    <div className="supplier-card">
                        <img src="https://cdn.pixabay.com/photo/2017/08/30/13/09/russia-2697026_1280.jpg" alt="image" />
                        Russia <span className="supplier-url">shopname.ru</span>
                    </div>
                    <div className="supplier-card">
                        <img src="https://cdn.pixabay.com/photo/2017/08/25/20/31/international-2681316_1280.jpg" alt="image" />
                        Italy <span className="supplier-url">shopname.it</span>
                    </div>
                    <div className="supplier-card">
                        <img src="https://cdn.pixabay.com/photo/2017/08/30/14/35/u-a-e-2697343_1280.jpg" alt="image" />
                        Arabic Emirates <span className="supplier-url">shopname.ae</span>
                    </div>
                    <div className="supplier-card">
                        <img src="https://cdn.pixabay.com/photo/2017/08/30/00/10/china-2695399_1280.jpg" alt="image" />
                        China <span className="supplier-url">shopname.ae</span>
                    </div>
                    <div className="supplier-card">
                        <img src="https://cdn.pixabay.com/photo/2018/07/27/19/26/football-3566694_1280.jpg" alt="image" />
                        Great Britain <span className="supplier-url">shopname.co.uk</span>
                    </div>
                </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="newsletter-section">
                <h2 className="newsletter-title">Subscribe on our newsletter</h2>
                <div className="newsletter-desc">
                    Get daily news on upcoming offers from many suppliers all over the world
                </div>
                <div className="newsletter-form">
                    <input type="email" placeholder="Email" className="newsletter-input" />
                    <button className="newsletter-btn">Subscribe</button>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer-section">
                <div className="footer-main">
                    <div className="footer-brand">
                        <span className="footer-logo"><img src="https://static.vecteezy.com/system/resources/thumbnails/022/674/232/small/shoping-bag-icon-in-square-gradient-colors-shop-bag-sign-for-web-or-commerce-apps-interface-png.png" alt="Brand Logo" /></span>
                        <div className="footer-desc">
                            This company offers a curated selection of trending products and connects buyers with suppliers worldwide.
                        </div>

                    </div>
                    <div className="footer-cols">
                        <div className="footer-col">
                            <div className="footer-col-title">About</div>
                            <div>About Us</div>
                            <div>Find store</div>
                            <div>Categories</div>
                            <div>Blogs</div>
                        </div>
                        <div className="footer-col">
                            <div className="footer-col-title">Partnership</div>
                            <div>About Us</div>
                            <div>Find store</div>
                            <div>Categories</div>
                            <div>Blogs</div>
                        </div>
                        <div className="footer-col">
                            <div className="footer-col-title">Information</div>
                            <div>Help Center</div>
                            <div>Money Refund</div>
                            <div>Shipping</div>
                            <div>Contact us</div>
                        </div>
                        <div className="footer-col">
                            <div className="footer-col-title">For users</div>
                            <div>Login</div>
                            <div>Register</div>
                            <div>Settings</div>
                            <div>My Orders</div>
                        </div>
                        <div className="footer-col">
                            <div className="footer-col-title">Get app</div>
                            <img
                                src={Appstore}
                                alt="App Store"
                                className="footer-app"
                            />
                            <img
                                src={Playstore}
                                alt="Google Play"
                                className="footer-app"
                            />
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>&copy; {new Date().getFullYear()} Ecommerce.</span>
                    <span className="footer-lang">English ^</span>
                </div>
            </footer>
        </div>
    );
};

export default Home;