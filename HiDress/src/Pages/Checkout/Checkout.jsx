import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { Input, Stack, Select, Image, Link } from "@chakra-ui/react"
import {RiShoppingCart2Line} from "react-icons/all"
import './Checkout.css'
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate()
    const [shippingAddress,setShippingAddress] = useState({address:"",city:"",postalCode:"",country:""})
    // const [address, setAddress] = useState(shippingAddress.address)
    // const [city, setCity] = useState(shippingAddress.city)
    // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    // const [country, setCountry] = useState(shippingAddress.country)
    const countries = ["Nigeria","USA","Cairo","UK","Saudi"]
    const [paymentMethod, setPaymentMethod] = useState('Card')
    const [order,setOrder] = useState({})
    const [carddetails, setcarddetails] = useState(true)

    const getCart = ()=>{
    const cart = localStorage.getItem('cartItems')
    return cart ? JSON.parse(cart) : []
    }

 
  const saveOrder = (order)=>{
    localStorage.setItem('orderDetails',JSON.stringify(order))
  }
    

  const cartItems = getCart()

     const saveAddressshipping = (data)=>{
      localStorage.setItem('shippingAddress', JSON.stringify(data))
    
    }
     const savepaymentmethod = (data)=>{
      localStorage.setItem('paymentMethod', JSON.stringify(data))
    
    }


    const handleorder = (e)=>{
        e.preventDefault()
         saveAddressshipping(shippingAddress)
         savepaymentmethod(paymentMethod)
        saveOrder({cartItems,shippingAddress,paymentMethod})
         navigate('/placeorder')


    }
    return (
        <div>
            <Helmet>
                <title>Checkout</title>
            </Helmet>
            <div className="limit-check">
                
                <div className="info-check">
                    <form onSubmit = {handleorder}>
                    <div className="billing-check">
                        <h1>Billing Address</h1>
                        {/* <label 
                        htmlFor="name" className="this-label">Full Name</label><br />
                        <Input variant="flushed" placeholder="Your name" required id="name"/><br />
                        <label 
                        htmlFor="email" className="this-label" >Email</label><br />
                        <Input variant="flushed" placeholder="Your mail" required id="email"/><br /> */}
                        <label 
                        htmlFor="address" className="this-label">Address</label><br />
                        <Input variant="flushed" placeholder="Your Address" required value ={shippingAddress.address} id="address" onChange={(e) => setShippingAddress({...shippingAddress,address:e.target.value})}/><br />
                        <label className="this-label">Country</label><br /> 
                        <Stack spacing={3}>
                            
                            <Select variant="flushed" onChange = {(e) =>  setShippingAddress({...shippingAddress,country:e.target.value})} >
                                {countries.map((country)=><option value="Maroc">{country}</option>)}
                                {/* <option value="Maroc">Maroc</option>
                                <option value="Algerie">Algerie</option>
                                <option value="France">France</option>
                                <option value="Espagne">Espagne</option> */}
                            </Select>
                            
                        </Stack>
                        <div className="city-cp-check">
                            <div><label 
                            htmlFor="city" className="this-label">City</label>
                            <Input variant="flushed" required placeholder="Your City" onChange = {(e) =>  setShippingAddress({...shippingAddress,city:e.target.value})} id="city"/></div>
                            <div><label 
                            htmlFor="zip" className="this-label" >Zip</label>
                            <Input variant="flushed" required placeholder="Your Zip" id="zip" onChange = {(e) =>  setShippingAddress({...shippingAddress,postalCode:e.target.value})}/></div>
                        </div>
                    </div>
                    <div className="payment-check">
                        <h1>Payment Method</h1>
                       
                        <input onChange = {(e)=> {setcarddetails(true) ; setPaymentMethod('card')}} checked = {carddetails}  type="radio" name="payment" id="card"/><label 
                        htmlFor="card" className="this-label">Credit Card</label>
                        <div className="accept-cards-imgs">
                            <Image src="https://i.imgur.com/AHCoUZO.png" alt="visa"/>
                            <Image src="https://i.imgur.com/l8OAGyo.png" alt="master"/>
                            <Image src="https://i.imgur.com/IDHC2iv.png" alt="discover"/>

                        </div>
                        <div className = {carddetails ? 'detailsenable' : 'detailsdisable'}>
                        <div><label 
                        htmlFor="name-card" className="this-label">Name on Card</label><br />
                        <Input variant="flushed" id="name-card" placeholder="Souhail Bourhjoul"/></div>
                        <div><label 
                        htmlFor="number-card" className="this-label">Credit card number</label><br />
                        <Input variant="flushed" id="number-card"  placeholder="3333-1111-8888-2222"/></div>
                        <div><label 
                        htmlFor="expir-mt-card" className="this-label">Exp Month</label><br />
                        <Input variant="flushed" id="expir-mt-card"  placeholder="January"/></div>
                        <div className="exp-ye-cvv-check">
                            <div><label 
                            htmlFor="exp-year" className="this-label">Exp Year</label>
                            <Input variant="flushed"  placeholder="2023" id="exp-year"/></div>
                            <div><label 
                            htmlFor="cvv-check" className="this-label">Cvv</label>
                            <Input variant="flushed"  placeholder="512" id="cvv-check"/></div>
                        </div>
                        </div>

                        <input onChange = {(e)=> {setcarddetails(false) ; setPaymentMethod('paypal')}} type="radio" name="payment" id="paypal"/><label 
                        htmlFor="paypal" className="this-label"> Paypal</label>
                        <Image src= 'https://i.imgur.com/W5vSLzb.png' alt="paypal" width="120px" height="40px"/>
                        <div className="confirm">
                          <input type="submit" className="confirm-check" value="Place to order"/>
                        </div>
                    </div>
                    </form>
                    <div className="your-products">
                    {cartItems.length === 0 ? <h1> <RiShoppingCart2Line size="29"/>Cart(0)</h1> : 
                    <>
                        <h1> <RiShoppingCart2Line size="29"/>Cart({cartItems.length})</h1>
                        <div className="cart-summ">
                            {cartItems.map((item,index)=>(
                            <p key = {index}>{item.qty} X <Link to={`/product/${item.product}`}>{item.name}</Link> <b>${item.qty * item.price}</b></p>

                            ))}
                        </div>
                    </>
                    }
                    </div>

                </div>
                
                
                
            </div>

        </div>
    )
}

export default Checkout
