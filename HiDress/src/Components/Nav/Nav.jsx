import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import {
  IoMdArrowDropdown,
} from 'react-icons/io';
import {
  IoLogOutOutline
} from 'react-icons/io5';
import {
  MdSearch,
  MdKeyboardArrowRight
} from 'react-icons/md';
import { BsArrowRightShort } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { RiShoppingCart2Line } from 'react-icons/ri';

import Searchnav from '../Searchnav';

const Nav = ({ userInfo, setUserInfo }) => {
//   const [userInfo, setUserInfo] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [hoverSignin, setHoverSignin] = useState(false);
  // const [incart, setIncart] = useState(0); // dummy value, you can update this later
    const navigate = useNavigate()
  const searchRef = useRef(null);
  const navRef = useRef(null);
  const burgerRef = useRef(null);
  const navLinksRef = useRef(null);
  const rightItemsRef = useRef(null);

  const getCart = ()=>{
      const cart = localStorage.getItem('cartItems')
      return cart ? JSON.parse(cart) : []
    }
  const cart = getCart()
  // Handle scroll navbar background change
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY >= 60);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Load userInfo from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUserInfo(parsed);
      }
    } catch (error) {
      console.error('Invalid userInfo in localStorage', error);
    }
  }, []);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    searchRef.current?.classList.toggle('searchActive');
    searchRef.current.style.animation = 'moving 0.3s ease both 0.3s';
  };

  const toggleBurger = () => {
    navLinksRef.current.classList.toggle('burgerActive');
    rightItemsRef.current.classList.toggle('burgerActive');

    const links = document.querySelectorAll('.navLinks li');
    links.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `moving 0.5s ease forwards ${index / 5}s`;
      }
    });

    burgerRef.current.classList.toggle('toggle');
  };

  const logoutHandler = () => {
    // localStorage.removeItem('userInfo');
    setUserInfo(null);
    console.log('User logged out');
    navigate('/login')
  };


  return (
    <nav ref={navRef} className={`nav ${isScrolled ? 'active' : ''}`}>
      <div className="logo">
        <Link to="/">HiDress-Up</Link>
      </div>

      <ul className="navLinks" ref={navLinksRef}>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'activilink' : '')}><li>Home</li></NavLink>
        <NavLink to="/shop" className={({ isActive }) => (isActive ? 'activilink' : '')}><li>Shop</li></NavLink>
        <NavLink to="/contactus" className={({ isActive }) => (isActive ? 'activilink' : '')}><li>Contact Us</li></NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'activilink' : '')}><li>About</li></NavLink>
      </ul>

      <div className="burger" ref={burgerRef} onClick={toggleBurger}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

      <div className="rightComp" ref={rightItemsRef}>
        <div ref={searchRef} className="search">
          <Searchnav />
        </div>
        <MdSearch className="iconSearch" size={26} onClick={toggleSearchBar} />

        <Link to="/cart">
          <RiShoppingCart2Line className="iconCart" size={26} />
          {userInfo && !userInfo.isAdmin && (
            <div className="dotcart">{cart.length}</div>
          )}
        </Link>

        {userInfo ? (
          <>
            <div className="ic_sett_dis">
              <Link to="/profile">
                <CgProfile size={25} className="settingIcon" />
              </Link>
              <IoLogOutOutline size={28} className="displayIcon" onClick={logoutHandler} />
            </div>

            {userInfo.isAdmin && (
              <Menu>
                <MenuButton as={Button} rightIcon={<IoMdArrowDropdown />}>
                  Admin
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to="/admin/userlist">Users</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/admin/productlist">Products</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/admin/orderlist">Orders</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </>
        ) : (
          <Link to="/login">
            <div
              className="signin"
              onMouseOver={() => setHoverSignin(true)}
              onMouseOut={() => setHoverSignin(false)}
            >
              Sign in {hoverSignin ? <MdKeyboardArrowRight size={25} /> : <BsArrowRightShort size={25} />}
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
