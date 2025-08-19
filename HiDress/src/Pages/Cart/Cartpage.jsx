import React from 'react'
import { useEffect,useState ,useRef} from 'react';
import { Helmet } from 'react-helmet';
import Empty from '../../Components/Empty';
import Productoncart from '../../Components/Productoncart';
import { useParams,useNavigate, useLocation } from 'react-router-dom';
import './Cartpage.css'
import axios from 'axios';


const Cartpage = () => {
    const PORT = import.meta.env.VITE_API_URL
    const delivery = 5
    const {id} = useParams()
    const location = useLocation()
    const params =new URLSearchParams(location.search)
    const navigate = useNavigate()
    const [qty,setQty] = useState(()=>{
        const stored = params.has('qty') ? Number(params.get('qty')) : 1
        return stored
    }) 
    const [cartItems,setCartItems] = useState([])
    const getCart = ()=>{
      let cart = JSON.parse(localStorage.getItem('cartItems')) || []
      cart = cart.filter((item)=> item && item.productId &&item.qty !== undefined)
      
      return cart 
      
    }
    
    const saveCart = (items)=>{
      localStorage.setItem('cartItems',JSON.stringify(items))
    }

const addToCart = async (id, qty) => {
  // const { data } = await axios.get(`${PORT}/products/${id}`);
  // setCartItems(prevItems =>{
  //   const exist = prevItems.find(item=>item && item.productId === id)
  //   if(exist){
  //     const updated = prevItems.map(item=>item.productId===id?{...item,qty}:item)
  //     saveCart(updated)
  //     return updated
  //   }else{
  // const newItem = {
  //   productId: data._id,
  //   name: data.name,
  //   images: data.images,
  //   price: data.price,
  //   countInStock: data.countInStock,
  //   qty,
  // };
  // const updated = [...prevItems,newItem]
  // return updated
  //   }
  // })
  const carts = getCart();
  const { data } = await axios.get(`${PORT}/products/${id}`);

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
      cart.productId === data._id ? { ...cart, qty } : cart
    );
  } else {
    updatedItems = [...carts, newItem];
  }

  saveCart(updatedItems);
  setCartItems(updatedItems); // ✅
};

const hasAdded = useRef(false);

useEffect(() => {
  if (id && !hasAdded.current) {
    addToCart(id, qty);
    hasAdded.current = true;
  }
}, [id, qty]);


    const checkoutHandler =()=>{
        navigate('/shipping');
        // navigate('./login?redirect=shipping');
    }
    useEffect(()=>{
      setCartItems(getCart())
    },[])
    return (
        <>
        <Helmet>
            <title>Cart</title>
        </Helmet>
        {cartItems.length === 0 ? 
        <Empty />
        // "EMPTY CART"
        :
        <div className ='cartfull'>
        <div className = 'cart'>
            <h1>Your Cart : {cartItems.length}</h1>
            <div className ='productsoncart'>
            {cartItems?.map(product =>(
                    <Productoncart product={product} qty={qty} setQty={setQty} cartItems={cartItems} setCartItems={setCartItems} />
                ))}
            </div>

        </div>
        <div className = 'totalcart'>
            <h3>
            Subtotal ({cartItems.reduce((acc,item )=>
              ( Number(acc.qty) + Number(item.qty) )
              )} items) :

            </h3>
            <h3 className = 'totalprice'>
            {cartItems.reduce((acc,item )=>
                acc + item.qty * item.price,0

             ).toFixed(2)}$
            </h3>
            <h3>
            Delivery :

            </h3>
            <h3 className = 'totalprice'>
            {delivery}$

            </h3>
            <h3>
            Taxes :

            </h3>
            <h3 className = 'totalprice'>
            -- --.

            </h3>
            <h3>
            Total :

            </h3>
            <h3 className = 'totalprice'>
            {cartItems.reduce((acc,item )=>
              // delivery +  acc + item.qty * item.price,0
              ( Number(acc.qty)*acc.price + Number(item.qty)*item.price + delivery )

             ) }$
            </h3>
            <button className = 'checkoutbtn' disabled={cartItems.length===0} onClick={checkoutHandler}>
            CHECKOUT
            </button>
        </div>

        </div>
        }
        </>
    )
}

export default Cartpage
