import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from 'react-spinners/RingLoader';

import Nav from './Components/Nav/Nav';
import Footer from './Pages/Footer/Footer';
// import ScrollView from "./Components/Scrollview";

import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Shop from './Pages/Shop/Shop';
import Contactus from './Pages/Contactus/Contactus';
import Productpage from './Pages/Product/Productpage';
import Cartpage from './Pages/Cart/Cartpage';
import Login from './Pages/Login/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import Checkout from './Pages/Checkout/Checkout';
import Placeorder from './Pages/Placeorder/Placeorder';
import Order from './Pages/Order/Order';
import Users from './Pages/Users/Users';
import Products from './Pages/Products/Products';
import Orders from './Pages/Orders/Orders';
import EditUser from './Pages/Useredit/EditUsers';
import Editproduct from './Pages/Editproduct/Editproduct';
import Forgot from './Components/Forgot/Forgot';
import NotFound from './Components/Notfound/NotFound';
import Createproduct from './Pages/Createproduct/Createproduct';

const App = () => {
  const [loading, setLoading] = useState(false);
   const [userInfo, setUserInfo] = useState(() => {
    const storedUser = localStorage.getItem('userInfo');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  // Save or remove userInfo on change
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  return (
    <div className="main">
      <Router basename='/ecommerce_Hi/'>
        {/* <ScrollView /> */}
        {loading ? (
          <div className="loading">
            <Loader color="orange" loading={loading} size={80} />
          </div>
        ) : (
          <>
            <Nav userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div style={{padding:"100px"}}>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contactus" element={<Contactus />} />
                <Route path="/product/:id" element={<Productpage />} />
                <Route path="/cart/:id?" element={<Cartpage  />} />
                <Route path="/login" element={<Login setUserInfo={setUserInfo} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile userInfo={userInfo} setUserInfo={setUserInfo} />} />
                <Route path="/shipping" element={<Checkout />} />
                <Route path="/placeorder" element={<Placeorder />} />
                <Route path="/order/:id" element={<Order />} />
                <Route path="/admin/userlist" element={<Users userInfo={userInfo} setUserInfo={setUserInfo} />} />
                <Route path="/admin/productlist" element={<Products userInfo={userInfo} />} />
                <Route path="/admin/orderlist" element={<Orders />} />
                <Route path="/search/:keyword" element={<Shop />} />
                <Route path="/admin/user/:id/edit" element={<EditUser />} />
                <Route path="/admin/product/:id/edit" element={<Editproduct userInfo={userInfo} />} />
                <Route path="/admin/product/create" element={<Createproduct userInfo={userInfo} />} />
                <Route path="/forgot" element={<Forgot/>} />
                <Route path="*" element={<NotFound />} />
                </Routes>    
            </div>
            
            <Footer />
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
