import React, { useState,useEffect,useLayoutEffect } from 'react'
import axios from "axios";
import { PayPalButton } from 'react-paypal-button-v2';
import {Link, useNavigate, useParams} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { IoMdDoneAll } from 'react-icons/all';
import HashLoader from "react-spinners/RingLoader";

import './Order.css'
import { Button } from '@chakra-ui/react';
const Order = ({userInfo}) => {
    const [sdkReady, setsdkReady] = useState(false)
    const PORT = import.meta.env.VITE_API_URL 
    const {id}= useParams()
    const navigate = useNavigate()
    const orderId = id

    const [order,setOrder] = useState(()=>{
      const placeOrder = JSON.parse(localStorage.getItem('placeOrder'))
     return placeOrder ? placeOrder : {}
    })
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")

    const [loadingpay,setLoadingpay] = useState(false)
    const [successPay,setSuccessPay] = useState(false)

    const [loadingDeliver,setloadingDeliver] = useState(false)
    const [successDeliver,setSuccessDeliver] = useState(false)

    // const addDecimals = (num) =>{
    //     return (Math.round(num * 100) / 100).toFixed(2)
    // }
    //     order.itemsPrice = addDecimals(order.orderItems.reduce((acc,item) => acc + item.price * item.qty, 0))
    
        //  const getOrderDetails = async (id)=>{
        //     try {
        //         const config = {
        //             headers:{
        //                 Authorization: `Bearer ${userInfo.token}`
        //             }
        //         }
        //         const {data} = await axios.get(`${PORT}orders/${id}`,config)
        //         localStorage.setItem('placeOrder',JSON.stringify(data))

        //     } catch (error) {
        //         console.log(error?.response?.data?.message)
        //       setError(error?.response?.data?.message || error?.message || "Couldnt find Order")
                
        //     }
        // }


    


     const payOrder =async (orderId,paymentResult) =>{
        try {
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            setLoadingpay(true)
            const {data} = await axios.put(`${PORT}/orders/${orderId}/pay`,paymentResult,config)
            setOrder(data)
            setSuccessPay(true)
            setLoadingpay(false)  
        } catch (error) {
          setLoadingpay(false)
          setSuccessPay(false)
        }
    }
    
     const deliverOrder =async (order) =>{
        try {
            const config = {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            setloadingDeliver(true)
            const {data} = await axios.put(`${PORT}/orders/${order._id}/deliver`,{},config)
            setOrder(data)
            setloadingDeliver(false)
            setSuccessDeliver(true)
        } catch (error) {
          setloadingDeliver(false)
          setSuccessDeliver(false)
        }
    }

    // useEffect(()=>{
    //   const placeOrder = JSON.parse(localStorage.getItem('placeOrder'))
    //   setOrder(placeOrder)
    //   console.log(placeOrder)
    //   console.log(order)
    // },[orderId])

    useEffect(() => {
        console.log(order)
        console.log(orderId)
        if(!userInfo){
            navigate('/login')
        }
        const addPaypalscript = async () =>{
            const {data : clientId} = await axios.get(`${PORT}/config/paypal`) 
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload = () =>{
                setsdkReady(true)
            }
            document.body.appendChild(script)

        }
        // if(!order || successPay || successDeliver || order._id !== orderId){
        //   console.log('Get Order Details')
        // }else 
        if(order && !order.isPaid){
            if(!window.paypal){
                addPaypalscript();
            }else{
                setsdkReady(true)
            }
        }
        
    }, [orderId,userInfo])
// useEffect(() => {
//   if (!userInfo) {
//     navigate('/login');
//   } else {
//     getOrderDetails(orderId);
//   }

// useEffect(() => {
//   if (!userInfo) {
//     navigate('/login');
//     return;
//   }

//   const loadOrder = async () => {
//     await getOrderDetails(orderId);

//     if (!order.isPaid) {
//       if (!window.paypal) {
//         const { data: clientId } = await axios.get(`${PORT}config/paypal`);
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.async = true;
//         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
//         script.onload = () => setsdkReady(true);
//         document.body.appendChild(script);
//       } else {
//         setsdkReady(true);
//       }
//     }
//   };

//   loadOrder();
// }, [orderId, userInfo, successPay, successDeliver]);



//   const addPaypalscript = async () => {
//     const { data: clientId } = await axios.get(`${PORT}config/paypal`);
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.async = true;
//     script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
//     script.onload = () => setsdkReady(true);
//     document.body.appendChild(script);
//   };

//   if (!order.isPaid) {
//     if (!window.paypal) {
//       addPaypalscript();
//     } else {
//       setsdkReady(true);
//     }
//   }

// }, [orderId, userInfo]);




    const successpaymenthandler = (paymentResult) =>{
        payOrder(orderId,paymentResult)
    }
    const deliverhandler = () =>{
        deliverOrder(order)
    }
    return loading || loadingDeliver ? <div className='loading-product'>
                        <HashLoader   color="orange"  loading={loading || loadingDeliver} size={50} />
                     </div> : error ? <h1>{error}</h1> :
    (
        <div className="placeorder">
            <Helmet>
                <title>ORDER</title>
            </Helmet>
            <div className="informations-placeorder">
                <div className="shipping-placeorder">
                    <h2>Shipping</h2>
                    <p>
                        <strong>Name: </strong>
                        {order.user.name}
                    </p>
                    <p>
                    <strong> Email: </strong>
                       <a href ={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p>
                        <strong>Address: </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.cp}, {order.shippingAddress.country}
                        {order.isDelivered ? <div className = 'paid'>Delivered at {order.deliveredAt}</div> : <div className = 'notpaid'>NOT Delivered YET</div>}

                    </p>
                </div>
                      <hr className= 'hr' />
                <div className="payment-placeorder">
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                        {order.isPaid ? <div className = 'paid'>PAID AT {order.paidAt}</div> : <div className = 'notpaid'>NOT PAID YET</div>}
                    </p>
                </div>
                      <hr className= 'hr' />
                <div>
                    <h2>Order Items: </h2>
                   {order.orderItems.length === 0 ? <p>Your order is empty</p>:
                        <div className="orders-placeorder">
                        {order.orderItems.map((item, index) => (
                                
                            <p key = {index}><span className="color-name"><Link to={`/product/${item.product}`}>{item.name}</Link></span> <b>{item.qty} x ${item.price} = ${item.qty * item.price}</b><hr className= 'hr' /></p>
                          

                        ))}
                            
                    </div>
                   }    
                </div>
            </div>
                <div className="your-products">
                       
                        
                        <div className="cart-summ">
                            <h1>Order Summary</h1>
                            
                                    <div className="calculs-placeorder">
                                <h3>Items: </h3><p>${order.itemsPrice}</p>
                                <h3>Shipping: </h3><p>${order.shippingPrice}</p>
                                {/* <h3>Tax: </h3><p>${order.taxPrice}</p> */}
                                <h3>Total: </h3><p>${order.totalPrice}</p>
                              </div>


                                
                            
                        </div>
                        <div className = 'bottominfos'>
                        <h1 className = 'orderid'>Order : {order._id}</h1>
                        {!order.isPaid && (
                            <>
                            {loadingpay && <div className='loading-product'>
                                            <HashLoader   color="orange"  loading={loading} size={50} />
                                           </div> }
                            {!sdkReady ? <div className='loading-product'>
                                            <HashLoader   color="orange"  loading={loading} size={50} />
                                           </div> :
                                           <div className = 'paypalbuttons'>
                                           <PayPalButton className = 'buttonsp' amount = {order.totalPrice} onSuccess = {successpaymenthandler}/>
                                           </div>}
                            </>
                        )}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&(
                            <Button   height="40px" width = "200px"
                            size = "lg" onClick = {deliverhandler} leftIcon = {<IoMdDoneAll size = '16' />} colorScheme ='blue'  >DELIVERED</Button>
                        )}

                        </div>

                    
                    </div>
             
        </div>
    )
}

export default Order
