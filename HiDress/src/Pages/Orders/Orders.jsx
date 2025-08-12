import React,{useEffect, useState} from 'react'
import HashLoader from "react-spinners/HashLoader";
import { Helmet } from 'react-helmet';
import {Button, Input, Table,  Thead,Tbody,Tr,Th,Td,Stack,Box} from "@chakra-ui/react"
import { Link, useNavigate } from 'react-router-dom';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import axios from 'axios';

const Orders = ({userInfo}) => {
    const PORT = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const [orders,setOrders] = useState([])
    const [loading,setlLoading] = useState(false)
    const [error,setError] = useState('')

    const listOrders =async () =>{
        try {
            const config = {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            setlLoading(true)
            const {data} = await axios.get(`${PORT}orders/`,config)
            console.log(data)
            setOrders(data)
            setlLoading(false)
   
        } catch (error) {
            console.log(error)
            setlLoading(false)
            setError(error?.response?.data?.message || error?.message || "Cant find Orders" )
            console.log(error?.response?.data?.message)

        }
    }

    useEffect(()=>{
        
        if(!userInfo.isAdmin){
            navigate('/login')
            
        }else{
            listOrders()
        }
    },[userInfo])

    return (
        <div className = 'Users'>
            <Helmet>
                <title>Orders</title>
            </Helmet>
        <h1 className = 'titlepanel'>{orders.length} Orders :</h1>
        {loading ?  <div className='loading'>
                     <HashLoader   color={"#1e1e2c"}  loading={loading} size={40} />
                   </div> : 
                   error ? <h1>error</h1> :
                   <Box overflowX = 'auto'>
                   <Table  className = 'tableusers' variant="striped">
                       <Thead>
                        <Tr>
                            <Th textAlign = 'center'w = '3%'>S/N</Th>
                            <Th textAlign = 'center'w = '20%'>Email</Th>
                            <Th textAlign = 'center' w = '15%'>User</Th>
                            <Th textAlign = 'center' w = '10%'>Date</Th>
                            <Th textAlign = 'center' w = '7%'>TOTAL</Th>
                            <Th textAlign = 'center' w = '5%'>PAID</Th>
                            <Th textAlign = 'center' w = '5%'>Deliverd</Th>
                            <Th textAlign = 'center' w = '10%'>Action</Th>

                        </Tr>
                      </Thead>
                      <Tbody>
                            {orders.map((order,index) =>(
                                <Tr key = {order._id}>
                                    <Td>{index +1}</Td>
                                    <Td>{order.user && order.user.email}</Td>
                                    <Td>{order.user && order.user.name}</Td>
                                    <Td>{order.createdAt.substring(0,10)}</Td>
                                    <Td>{order.totalPrice}</Td>

                                    <Td>{order.isPaid ? <div className ='paid'>{order.paidAt.substring(0,10)}</div> : <div className = 'notpaid'>NO</div>}</Td>
                                    <Td>{order.isDelivered ? <div className ='paid'>{order.deliveredAt.substring(0,10)}</div> : <div className = 'notpaid'>NO</div>}</Td>

                                    <Td>
                                        <Stack>
                                        <Link to ={ `/order/${order._id}`}>
                                             <Button leftIcon = {<AiOutlineEdit size = '16' />} colorScheme ='blue' size="xs"  >Details</Button>
                                        </Link>
                                        </Stack>
                                    </Td>

                                </Tr>
                            ))}
                      </Tbody>
                    </Table>
                    </Box>
                   }
            
        </div>
    )
}

export default Orders
