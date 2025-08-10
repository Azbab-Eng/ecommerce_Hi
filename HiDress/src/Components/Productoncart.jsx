import { Image } from '@chakra-ui/react'
import React,{useRef,useState,useEffect} from 'react'
import { Select } from "@chakra-ui/react"
import { VscChromeClose } from "react-icons/all";
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';
const Productoncart = ({qty,setQty,product,cartItems,setCartItems}) => {

    // const [qty,setqty] = useState(0)
    const select = useRef(null);
    const PORT = "http://localhost:8000/"
    // const qty = params.has('qty') ? Number(params.get('qty')) : 1
    const getCart = ()=>{
    const cart = localStorage.getItem('cartItems')
      return cart ? JSON.parse(cart) : []
    }
    const saveCart = (items)=>{
      localStorage.setItem('cartItems',JSON.stringify(items))
    }
    
    const addToCart = async (id, qty) => {
        const carts = getCart();
        const { data } = await axios.get(`${PORT}products/${id}`);

        const newItem = {
            productId: data._id,
            name: data.name,
            images: data.images,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        };

        const exist = carts.find((cart) => cart.productId === data._id);

        let updatedItems;
        if (exist) {
            updatedItems = carts.map((cart) =>
            cart.productId === data._id ? { ...cart, qty: cart.qty } : cart
            );
        } else {
            updatedItems = [...carts, newItem]; // use newItem here directly
  }
  console.log(id,qty)
  saveCart(updatedItems);
  setCartItems(updatedItems); // also update state here
};

   const removeFromCart = (id) => {
        const updated = cartItems.filter((item) => item.productId !== id);
        setCartItems(updated);
        saveCart(updated);
    };


    useEffect(() => {
        console.log(product.image)
        return () => {
        }
    },[])

    const optionvalue = () => {
        const qty = parseInt(select.current?.value)
        //  setqty(parseInt(select.current.value));
        // addToCart(id,qty)
         console.log(qty)
    }
    const removeFromCartHandler  = (id) =>{
        removeFromCart(id)
    }
    return (
        <div className = 'productcart'>
            <div className = 'imagecart'>
            <Image objectFit="cover" src = {`${PORT}${product?.image}`}/>

            </div>
                <div>
                    <Link to = {`/product/${product.productId}`}>
                        <h2 className = 'productname'>
                            {product.name}
                        </h2>
                    </Link>

                <h2 className = 'priceproduct'>
                    {product.price}$</h2>
                <h2 className = 'sandh'>
                    sold and shiped by FedEx</h2>

                </div>
                <div className = 'qtyoption' >
                <Select ref = {select} defaultValue = {product.qty} 
                onChange ={
                    async e =>{ 
                        await setQty(e.target.value)
                        addToCart(product.productId,qty)
                        console.log(e.target.value)
                       
                        console.log(product.qty)
                        console.log(qty)
                    }
                    }
                    >
                    {[...Array(product.countInStock).keys()].map(x=>
                     (
                     <option value={x+1}> {x+1}</option>
                     )
                    )}
                </Select>
                <h2>
                {(qty === 0 ? product.qty*product.price : qty*product.price).toFixed(2)}$
                </h2>
                </div>
                <VscChromeClose className = 'deletecart' size = '26' onClick = {
                    () => removeFromCartHandler(product.productId)} />



            
        </div>
    )
}

export default Productoncart
