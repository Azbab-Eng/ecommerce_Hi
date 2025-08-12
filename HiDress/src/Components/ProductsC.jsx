import React,{useEffect,useState} from 'react'

import CardProduct from './CardProduct'
// import {listProducts,ListproductbyCg, Listproductbyfiter,Listproductbyprice} from '../actions/productActions'
import {BsFilter,AiOutlineSearch,IoMdClose} from 'react-icons/all'
import Search from './Search';
import {NumberInput,NumberInputField,FormLabel, Button, Stack, FormControl, filter} from "@chakra-ui/react"
import HashLoader from "react-spinners/RingLoader";
import { Link,useLocation} from 'react-router-dom'
import axios from 'axios';

const ProductsC = () => {
    const PORT = import.meta.env.VITE_API_URL
    const [From, setFrom] = useState(0)
    const [To, setTo] = useState(0)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const Cg = searchParams.get('cg')
    const filter = searchParams.get('filter');
    // let Cg = window.location.search ? window.location.search.split('=')[1] : null
    const keyword = location.pathname.split('/')[2] 

    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState('') 
    const [products,setProducts] = useState([])

    const listProducts = async (keyword="") =>{
        try {
            setLoading(true)
            const {data}= await axios.get(`${PORT}/products/?Cg=${keyword}`)
            console.log(data)
            setProducts(data)
            setLoading(false)
            setMessage(data?.message || "All Products loaded ")
        } catch (error) {
            setLoading(false)
            setMessage(error?.response?.data?.message || "Something went wrong")
        }
    }

    const ListproductbyCg =async (Cg) =>{
        try {
            setLoading(true)
            const {data} = await axios.get(`${PORT}/products/?Cg=${Cg}`)
            console.log(data)
            setProducts(data)
            setLoading(false)
            setMessage(data?.message || `${Cg} Products loaded`)
    
            } catch (error) {
                setMessage(error?.response?.data?.message || `Cant find ${Cg}` ) 
        }
    }

    const Listproductbyfiter = async(filter) =>{
        try {
            setLoading(true)
            const {data} = await axios.get(`${PORT}/products/?filter=${filter}`)
            console.log(data)
            setProducts(data)
            setLoading(false)
            setMessage(`${filter} Products loaded`)
            } catch (error) {
                setMessage(`Cant find ${filter}` ) 
        }
    }

   const Listproductbyprice = async (from, to) => {
    try {
        setLoading(true);
        const { data } = await axios.get(`${PORT}/products/?from=${from}&to=${to}`);
        console.log(data)
        setProducts(data);
        setLoading(false);
        setMessage(`Products from ${from} to ${to}`);
    } catch (error) {
        setMessage(`Can't find products from ${from} to ${to}`);
    }
};
        
// Fetch products based on category, filter, or keyword
useEffect(() => {
    if (Cg) {
        ListproductbyCg(Cg);
        console.log(`Category search for ${Cg}`);
    } else if (filter) {
        Listproductbyfiter(filter); // Make sure `filter` is a string here
        console.log(`Filter search for ${filter}`);
    } else {
        listProducts(keyword);
        console.log(`Keyword search for ${keyword}`);
    }
}, [Cg, filter, keyword]);
    const [showfilter,setshowfilter] = useState(false);
    const [showsearch,setshowsearch] = useState(false);
    const filterfunc = () =>{
        setshowfilter(!showfilter);
        if(showsearch){
            setshowsearch(false)
        }
 
    }
    const searchfunc=()=>{
        setshowsearch(!showsearch);
        if(showfilter){
            setshowfilter(false)
        }
    }
    const pricehandler = ()=>{
        Listproductbyprice(From,To)
        setshowfilter(false)
        console.log(From,To)
    }
    return (
        <>
        <div className = 'Cgfilter'>
            <h1>{Cg ? Cg : keyword ?  "*" + keyword + "* Search" : 'All'} Products</h1>
            <div className = 'filtersbtn '>
                <button className = {`filterbtn ${showfilter ? 'activebtn' : ''}` }  
                    onClick = {filterfunc} > {showfilter ?  <IoMdClose  size = '20'/>: <BsFilter size = '20'/> } 
                    Filter
                </button>
        
                <button className = {`searchbtn ${showsearch ? 'activebtn' : ''}` } 
                    onClick = {searchfunc}>{showsearch ?  <IoMdClose  size = '20'/>:<AiOutlineSearch size = '20'/>}
                    Search
                </button>
            </div>
        
            <div className = 'filters'> 
            <ul>
                    <Link className = 'lined' to = '?cg'>All</Link>
                    <Link className = 'lined'  to = '?cg=Men'>Men</Link>
                    <Link className = 'lined'  to = '?cg=Women'>Women</Link>
                    <Link className = 'lined'  to = '?cg=Embroideries'>Embroideries</Link>
                    <Link className = 'lined' to = '?cg=Art'>Art Works</Link>
                    <Link className = 'lined' to = '?cg=Contents'>Contents</Link>
            </ul>
            </div>
        </div>
        {showsearch && <Search/>} 
        <div className = {`filterarea ${showfilter ? 'filter' : 'filteroff' }`}>
        <div className = 'sortbydiv'>
            <h1> Sort By</h1>
            <ul>
                <Link onClick = {()=>(setshowfilter(false))} className = 'lined' to = '?filter'>Default</Link>
                <Link onClick = {()=>(setshowfilter(false))} className = 'lined' to = '?filter=Rating'>Rating</Link>
                <Link onClick = {()=>(setshowfilter(false))} className = 'lined' to = '?filter=date'>Date</Link>
                <Link onClick = {()=>(setshowfilter(false))} className = 'lined' to = '?filter=highprice'>Low to high price</Link>
                <Link onClick = {()=>(setshowfilter(false))} className = 'lined' to = '?filter=lowprice'>high to low price</Link>
            </ul> 
        </div>
        <div className = 'pricediv'>
            <h1> Price</h1>
            <FormControl id="email">
                <Stack spacing = {2}>
                 <FormLabel>From :</FormLabel>
                 <NumberInput value={From} bg = 'white' onChange = {(e) => setFrom(e)} borderRadius="md" borderTopRadius="md" borderTopLeftRadius="md">
                 <NumberInputField />
                </NumberInput>
                 <FormLabel>To :</FormLabel>
                <NumberInput value = {To} bg = 'white' onChange = {(e) => setTo(e)} borderRadius="md" borderTopRadius="md" borderTopLeftRadius="md">
                 <NumberInputField />
                </NumberInput>
                <Button onClick = {pricehandler} type="submit" colorScheme="teal">Filter</Button>
                </Stack>
            </FormControl>

        </div>
 
    </div>
            {loading ?
               <div className='loading'>
                          <HashLoader   color={"#fff"}  loading={loading} size={40} />
                     </div> 
            // : message ? <h2>{message} </h2> 
            : products.length === 0 ? 
            <h1 className = 'nothingfound'>Nothing Found !!!</h1> : <div className='cardsProduct'>
                       {products.map((product) =>(
                               <CardProduct key={product._id} product={product} />

                          )  )}

                  
                 </div> }
                   
        </> 
    )
}

export default ProductsC
