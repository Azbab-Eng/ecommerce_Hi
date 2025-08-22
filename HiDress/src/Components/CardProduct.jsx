import React, { useState, useEffect } from 'react';
import { HiOutlineShoppingCart, HiShoppingCart } from 'react-icons/all';
import { Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CardProduct = ({ product }) => {
  const [showbtn, setShowbtn] = useState(false);
  const [Incart, setIncart] = useState(false);
  const PORT = import.meta.env.VITE_API_URL
  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log(cartItems)
    if(product && product._id){
      let isInCart = cartItems.find((item) => item && item.productId === product?._id);
    if (isInCart) {

      setIncart(true)
    }else{

      setIncart(false);
    }
    }
    
  }, [product._id]);

  const addcart = () => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newItem = {
            productId: product._id,
            name: product.name,
            images: product.images,
            price: product.price,
            countInStock: product.countInStock,
            qty: 1,
    };

    const existingItem = cartItems.find((item) => item && item.productId === product._id);
    if (!existingItem) {
      cartItems.push(newItem);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      setIncart(true);
    }else{
      cartItems = cartItems.filter((item)=>item && item.productId !== product._id)
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      setIncart(false)
    }
  };

  return (
    <>
      <div
        name="cardProduct"
        
        onMouseOver={() => setShowbtn(true)}
        onMouseLeave={() => setShowbtn(false)}
      >
        <div name="imgDiv">
          
          <Image name="imgProduct" boxSize="350px" objectFit="cover" src={
            product.images[0]} />
        </div>
        <div name="bottomcard">
          <Link to={`/product/${product._id}`}>
            <span>{product.name}</span>
          </Link>
          {Incart ? (
            <HiShoppingCart name="iconFav" size="26" onClick={addcart} />
          ) : (
            <HiOutlineShoppingCart
              name="iconFav"
              color="#999"
              size="26"
              onClick={addcart}
            />
          )}
          <div name="productpricecard">{`${product.price} $`}</div>
        </div>

        <Link to={`/product/${product._id}`}>
          <button name={showbtn ? 'QuickView QuickViewActive' : 'QuickView'}>
            View Details
          </button>
        </Link>
      </div>
    </>
  );
};

export default CardProduct;
