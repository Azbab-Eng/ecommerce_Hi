 import React,{useState,useEffect} from 'react'
import Slider from '../../Components/Slider'
import Cardscg from '../../Components/Cardscg'
import CgDiv from '../../Components/CgDiv'
import ProductsC from '../../Components/ProductsC'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'


const Home = () => {
 
    return (
        <>
        <Helmet>
            <title>Azbab CLOTHING</title>
        </Helmet>
             <div>
                <Slider/>
                 <div className="cards">
                         <Cardscg title='Women'/>
                         <Cardscg title='Men'/>
                         <Cardscg title='Accessoires'/>                
                 </div>
                <CgDiv/>
                <ProductsC/>
        </div>
        </>
    )
}

export default Home
