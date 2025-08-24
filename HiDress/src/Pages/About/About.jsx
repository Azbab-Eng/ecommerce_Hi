import React,{useRef,useEffect, useState} from 'react'
import { Helmet } from 'react-helmet';
import {Image} from '@chakra-ui/react'
import HashLoader from "react-spinners/HashLoader";
import './About.css'
const About = () => {
    const Line = useRef(null);
    const text = useRef(null);
    useEffect(() => {
                setTimeout(() =>{
        Line.current.classList.add('lineon')
        text.current.classList.add('titleon');
        },5)


        return () => {

        }
    },[])
    return (
        

        
        <>
        <Helmet>
            <title>About</title>
        </Helmet>


            <div className='headingA'>
                <div className = 'line' ref={Line}>
                </div>
                <h1 className ='title' ref={text}>About Us</h1>
            </div>
            <div className='Content1'>
                <div className = 'text'>
                    <h1>
                        Why?
                    </h1>
                <p>At HiDressUp, we believe that fashion is more than just clothing — 
                    it is a powerful form of self-expression, confidence, 
                    and identity. Our journey began with a simple mission: 
                    to make quality, stylish, and affordable fashion 
                    accessible to everyone, regardless of age or lifestyle. 
                    From our early beginnings as a small local brand, 
                    we have grown into a platform that connects people 
                    with carefully designed products that reflect elegance,
                     comfort, and creativity. Every piece in our collection
                      is crafted with attention to detail, inspired by both
                       modern trends and timeless classics.</p>
                </div>
               
                   <div className ='imagecontainer'>
                    <div className = 'Imageabt'>
                    <Image className='mImage' boxSize = '400px' objectFit="cover" src='https://images.unsplash.com/photo-1614771637369-ed94441a651a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80' alt="Ibrahim Babalola"/>
                    </div>
                   </div>
            </div>
            <div className ='Content2'>
                   
                   <div className ='imagecontainer'>
                    <div className = 'Imageabt'>
                    <Image className='mImage' boxSize = '400px' objectFit="cover" src='https://images.unsplash.com/photo-1614038276039-667c23bc32fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=389&q=80' alt="Ibrahim Babalola"/>
                    </div>
                   </div>
                   <div className = 'text'>
                    <h1>
                        How?
                    </h1>
                <p>At HiDressUp, our customers are at the heart of everything we do. 
                    Thats why we provide a seamless shopping experience
                     — from browsing products, adding to cart, 
                     and secure checkout, to reliable delivery and 
                     customer support. We are constantly innovating and 
                     listening to feedback to ensure we meet and exceed 
                     your expectations. We also understand that 
                     fashion is personal. That’s why we offer customization,
                      size guides, and detailed product descriptions to help you 
                      make the right choice. For us, every order is more than
                       just a transaction — it is a relationship built on 
                       trust, satisfaction, and loyalty.</p>

                </div>
            </div>
        </>
    
    )
}

export default About
