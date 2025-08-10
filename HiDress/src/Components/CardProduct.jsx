import React, { useState, useEffect } from 'react';
import { HiOutlineShoppingCart, HiShoppingCart } from 'react-icons/all';
import { Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CardProduct = ({ product }) => {
  const [showbtn, setShowbtn] = useState(false);
  const [Incart, setIncart] = useState(false);
  const PORT = "http://localhost:8000/"
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const isInCart = cartItems.find((item) => item.product === product._id);
    if (isInCart) {
      setIncart(true);
    }
  }, [product._id]);

  const addcart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newItem = {
      product: product._id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.images[0],
    };

    const existingItem = cartItems.find((item) => item.product === product._id);
    if (!existingItem) {
      cartItems.push(newItem);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      setIncart(true);
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
            `${PORT}${product.images[0]}` || product.images[0]} />
        </div>
        <div name="bottomcard">
          <Link to={`/product/${product._id}`}>
            <span>{product.name}</span>
          </Link>
          {Incart ? (
            <HiShoppingCart name="iconFav" size="26" />
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
