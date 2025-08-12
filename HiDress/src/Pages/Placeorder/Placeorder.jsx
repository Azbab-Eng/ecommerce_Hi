import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';

import './Placeorder.css'
const Placeorder = ({userInfo}) => {
    const PORT = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const getOrder = ()=>{
      const order = localStorage.getItem('orderDetails')
      return order ? JSON.parse(order) : {}
  }
      const cart = getOrder()
    const addDecimals = (num) =>{
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    // cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice))
    //  + Number(cart.taxPrice)).toFixed(2)
    const [order,setOrder] = useState({})
    const [success,setSuccess] = useState(false)
    const [error,setError] = useState("")
    const CreateOrder =async (order) =>{
    try {

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log(order)
        const {data} = await axios.post(`${PORT}/orders`, order, config)
        setSuccess(true)
        setOrder(data)
       localStorage.setItem('placeOrder',JSON.stringify(data))
    } catch (error) {
      setError(error?.message || "Cant place order" )
      console.log(error)
      console.log(error?.response?.data?.message)
    }
}
    const Placeorderhanlder = ()=>{
        CreateOrder(
          {
            orderItems : cart.cartItems,
            shippingAddress : cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice : cart.itemsPrice,
            shippingPrice : cart.shippingPrice,
            // taxPrice : cart.taxPrice,
            totalPrice : cart.totalPrice,

        }
      )

    }

    useEffect(() => {
      console.log(cart)
        if(success){
            console.log(order._id)
            // getOrderDetails(order._id)
            navigate(`/order/${order._id}`)
        }
        return () => {
            
        }
        //eslint-disable-next-line
    }, [success])
    return (
        <div className="placeorder">
            <Helmet>
                <title>Placeorder</title>
            </Helmet>
            <h2>                                    {error && error}</h2>
            <div className="informations-placeorder">
                <div className="shipping-placeorder">
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address: </strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.cp}, {cart.shippingAddress.country}
                    </p>
                </div>
                      <hr />
                <div className="payment-placeorder">
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </p>
                </div>
                      <hr />
                <div>
                    <h2>Order Items: </h2>
                   {cart.cartItems.length === 0 ? <p>Your cart is empty</p>:
                        <div className="orders-placeorder">
                        {cart.cartItems.map((item, index) => (
                                
                            <p><span className="color-name"><Link to={`/product/${item.product}`}>{item.name}</Link></span> <b>{item.qty} x ${item.price} = ${item.qty * item.price}</b><hr /></p>
                          

                        ))}
                            
                    </div>
                   }    
                </div>
            </div>
                <div className="your-products">
                       
                        
                        <div className="cart-summ">
                            <h1>Order Summary</h1>
                            
                                    <div className="calculs-placeorder">
                                <h3>Items: </h3><p>${cart.itemsPrice}</p>
                                <h3>Shipping: </h3><p>${cart.shippingPrice}</p>
                                {/* <h3>Tax: </h3><p>${cart.taxPrice}</p> */}
                                <h3>Total: </h3><p>${cart.totalPrice}</p>
                                <div className="div-placeorder-btn"> 
                                    <button className="placeorder-btn" onClick = {Placeorderhanlder}>Place Order</button>
                                </div>
                              </div>
                                
                            
                        </div>
                    
                    </div>
             
        </div>
    )
}

export default Placeorder



