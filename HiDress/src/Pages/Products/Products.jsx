import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/RingLoader";
import './Products.css'
import {
    Button, Table,  Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Stack,
    Box,
  } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import { CgAdd } from 'react-icons/cg';
import { Helmet } from 'react-helmet';


const Products = ({userInfo}) => {
    const PORT = import.meta.env.VITE_API_URL
    
    const authConfig = (token, contentType = "application/json") => ({
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${token}`,
    }})
    const navigate = useNavigate()
    const [products,setProducts] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    const [loadingDelete,setLoadingDelete] =useState(false)
    const [errorDelete,setErrorDelete] =useState(null)
    const [successDelete,setSuccessDelete] =useState(null)

    const [product,setProduct] = useState({})
    const [loadingCreate,setLoadingCreate] =useState(false)
    const [errorCreate,setErrorCreate] =useState(null)
    const [successCreate,setSuccessCreate] =useState(null)


    const listProducts = async ()=>{
            try {
                setLoading(true)
                const {data} = await axios.get(`${PORT}/products/`)
                console.log(data)
                setProducts(data)
                setLoading(false)
                // setMessage(data?.message || "All Products loaded ")
            } catch (error) {
                setLoading(false)
                setError(error?.response?.data?.message || "Cant load all the Products")
            }
        }


    
    const DeleteProduct =async (id) =>{
        try {
          setLoadingDelete(true)
            const config = {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            await axios.delete(`${PORT}/products/${id}`, config) 
            setLoadingDelete(false)
            setSuccessDelete("Products deleted")
        } catch (error) {
          setErrorDelete(error?.response?.data?.message || "Could not delete")
          setLoadingDelete(false)          
        }
    }

    useEffect(()=>{
        if(!userInfo.isAdmin){
            navigate('/login')
        }
        if(successCreate){
            navigate(`/admin/product/${product._id}/edit`)
        }else{
            listProducts()

        }
    },[userInfo,successDelete,successCreate,product])
    const deletehandler = (id) =>{
        if(window.confirm('Are You Sure?')){
          DeleteProduct(id)

        }
    }

    const createproducthandler = () =>{
      navigate("/admin/product/create")
    }
    return (

        <div className = 'Users'>
            <Helmet>
                <title>products</title>
            </Helmet>
        <h1 className = 'titlepanel'> Products : {!loading && products.length}</h1>
        {loading || loadingDelete || loadingCreate ?  <div className='loading'>
                     <HashLoader   color="orange"  loading={loading || loadingDelete || loadingCreate} size={40} />
                   </div> : 
                   error || errorDelete || errorCreate  ? <h1>{error || errorDelete || errorCreate}</h1> : 
                   <>
                   <h1>{successCreate || successDelete}</h1>
                    <Button leftIcon = {<CgAdd size = '20' />}  style={{margin:"10px 45%"}} colorScheme ='blue' onClick = {createproducthandler}>ADD</Button>

                   <Box overflowX = 'auto'>
                   <Table  className = 'productusers' variant="striped">
                       <Thead>
                        <Tr>
                            <Th w = '5%'>S/N</Th>
                            <Th w = '10%'>ID</Th>
                            <Th  w = '20%'>Name</Th>
                            <Th   w = '10%'>Price</Th>
                            <Th  w = '22%'>Category</Th>
                            <Th  w = '12%'>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                            {products.map((product,index) =>(
                                <Tr key = {product._id}>
                                    <Td>{index+1}</Td>
                                    <Td>{product._id}</Td>
                                    <Td>{product.name}</Td>
                                    <Td isNumeric>{product.price}</Td>
                                    <Td>{product.category.join(' | ')}</Td>
                                    <Td>
                                        <Stack>
                                        <Link to ={ `/admin/product/${product._id}/edit`}>
                                             <Button leftIcon = {<AiOutlineEdit size = '16' />} colorScheme ='blue' size="xs"  >EDIT</Button>
                                        </Link>
                                             <Button colorScheme ='red' leftIcon = {<AiFillDelete size = '16' />} size="xs" onClick= {()=>{deletehandler(product._id)}}>DELETE</Button>
                                        </Stack>
                                    </Td>

                                </Tr>
                            ))}
                      </Tbody>
                    </Table>
                    </Box>
                   </>
                }
            
        </div>
    )
}

export default Products
