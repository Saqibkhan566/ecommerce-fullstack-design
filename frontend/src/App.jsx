// import Home from './components/Home'
// import Navbar from './components/Navbar/Navbar'
// import Products from './components/ProductList'
// import ProductDetails from './components/ProductDetails'
// import Cart from './components/Cart'
// import Login from './components/Login/Login'
// import Signup from './components/SignUp/Signup'
// import Profile from './components/Profile/Profile'
// import './App.css'
// import { Route, Routes } from 'react-router-dom'

// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/products/:id" element={<ProductDetails />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </div>
//   )
// }

// export default App

import Home from './components/Home';
import Products from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import Profile from './components/Profile/Profile';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CartProvider, useCart } from './components/CartContext';

// Small wrapper so Cart gets its cartItems from context
const RoutedCart = () => {
  const { cartItems } = useCart();
  return <Cart cartItems={cartItems} />;
};

function App() {
  const token = localStorage.getItem('token');
  const isAdmin = JSON.parse(localStorage.getItem('user'))?.isAdmin;


  return (
    <CartProvider>
      <Routes>
        <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/login" />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<RoutedCart />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
