import Nav from './Components/Nav/Nav'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Shop from './Pages/Shop/Shop'
import Contactus from './Pages/Contactus/Contactus'
import Productpage from './Pages/Product/Productpage'
import Cartpage from './Pages/Cart/Cartpage'
import Footer from './Pages/Footer/Footer'
import Login from './Pages/Login/Login'
import React, {useState,useEffect} from 'react'
import {BrowserRouter as Router , Routes ,Route } from 'react-router-dom'
// import { ChakraProvider } from "@chakra-ui/react"
import ScrollView from "./Components/Scrollview";
import HashLoader from "react-spinners/HashLoader";
import Register from './Components/Register/Register'
import Profile from './Components/Profile/Profile'
import Checkout from "./Pages/Checkout/Checkout";
import Placeorder from './Pages/Placeorder/Placeorder'
import Order from './Pages/Order/Order'
import Users from './Pages/Users/Users'
import NotFound from './Components/Notfound/NotFound'
import EditUser from './Pages/Useredit/EditUsers'
import Products from './Pages/Products/Products'
import Editproduct from './Pages/Editproduct/Editproduct'
import Orders from './Pages/Orders/Orders'


const App = () => { 
  const  [loading,setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout( ()=> {
      setLoading(false)
    },3000)

  }, [])

  return (
    <div className = 'main'>
{/* <ChakraProvider> */}
       <Router>
         <ScrollView>
         {loading ?  
        ( 
            <div className='loading'>
                 <HashLoader   color={"orange"}  loading={loading} size={80} />
            </div>)
          : (
         <>
                 <Nav/>
                 <Routes>              
                 <Route path="/" index element={<Home/>}/>
                 <Route path="/about" element={<About/>}/>
                 <Route path="/shop" element={<Shop/>}/>
                 <Route path="/contactus" element={<Contactus/>}/>
                 <Route path="/product/:id" element={<Productpage/>}/>
                 <Route path="/cart/:id?" element={<Cartpage/>}/>
                 <Route path="/login" element={<Login/>}/>
                 <Route path="/register" element={<Register/>}/>
                 <Route path="/profile" element={<Profile/>}/>
                 <Route path="/shipping" element={<Checkout/>}/>
                 <Route path="/placeorder" element={<Placeorder/>}/>
                 <Route path="/order/:id" element={<Order/>}/>
                 <Route path="/admin/userlist" element={<Users/>}/>
                 <Route path="/admin/productlist" element={<Products/>}/>
                 <Route path="/admin/orderlist" element={<Orders/>}/>
                 <Route path="/search/:keyword" element={<Shop/>}/>
                 <Route path="/admin/user/:id/edit" element={<EditUser/>}/>
                 <Route path="/admin/product/:id/edit" element={<Editproduct/>}/>                 
                 <Route path='*' element={<NotFound/>} />


                 </Routes>
                 <Footer/>
          </>)
         }
        </ScrollView>
      </Router>
   {/* </ChakraProvider> */}
    </div>
     
    
  )
}
export default App;
