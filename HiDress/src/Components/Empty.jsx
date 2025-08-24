import React,{useState} from 'react'
import EmptyS from "./Empty.jpeg"
import { Link } from "react-router-dom";
import { RiArrowRightSLine  , TiArrowRight,BsArrowBarRight} from "react-icons/all";
import { Image } from '@chakra-ui/react';
//           <Image name="imgProduct" boxSize="350px" objectFit="cover" src={
//             `${PORT}${product.images[0]}` || product.images[0]} />


const Empty = () => {
    const [arrow, setarrow] = useState(false)
    return (
        <div className = 'Emptycart'>
            <Image name="imgProduct" className='cardP' objectFit="cover" src={EmptyS}/>

            <div className = 'textempty'>
            <h1>
                Wow Such an empty Cart
            </h1>
             
            <Link to = '/shop' className ='goshop' onMouseOver = {()=>{setarrow(true)}} onMouseLeave = {()=>{setarrow(false)}}>
            Go Shop
            {!arrow ? <RiArrowRightSLine className = 'arrow' /> : <BsArrowBarRight className = 'arrow'/> }
            </Link>
            </div>

            

        </div>
    )
}

export default Empty
