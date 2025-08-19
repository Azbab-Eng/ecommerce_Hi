import React, {useState, useEffect,useRef} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Image} from 'react-bootstrap'
// import {useDispatch, useSelector} from 'react-redux'
import addUs from '../img/new.svg'
import wave from '../img/wavev.png'
import { Helmet } from 'react-helmet';
import { IoIosArrowDown } from 'react-icons/all';
import HashLoader from "react-spinners/RingLoader";
import "./Profile.css"

import {
  Button, Input, Table,  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"
import { AiOutlineEdit } from 'react-icons/ai'

const Profile = ({userInfo,setUserInfo}) => {
  // const [name,setName] = useState('')
  const [ShowOrders,setShowOrders] = useState(false)
  const navigate = useNavigate()
  // const [email,setEmail] = useState('')
  // const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [message,setMessage] = useState(null) 
  const [isEditablename,setisEditablename] = useState(false) 
  const [isEditableemail,setisEditableemail] = useState(false) 

  const nameinput = useRef(null)
  const emailinput = useRef(null)

  // const dispatch = useDispatch()

  // const userDetails = useSelector(state => state.userDetails)

  // const { error, user } = userDetails
  const [error,setError] =useState(false)
  const [success,setSuccess] = useState(null)
  const [userData,setUserData] = useState({_id:userInfo._id,name:userInfo.name,
    email:userInfo.email,password:userInfo.password})
  // const userLogin = useSelector(state => state.userLogin)

  // const {userInfo } = userLogin
  // const userUpdateProfile = useSelector(state => state.userUpdateProfile)

  // const {success } = userUpdateProfile

  // const orderMylist = useSelector(state => state.orderMylist)
  const [orders,setOrders] = useState([])
  const [loading,setLoading] = useState(true)
  const [errorOrders,setErrorOrders] = useState(null)

  // const { loading:loading,error:errorOrders,orders } = orderMylist

 const PORT = import.meta.env.VITE_API_URL

  const authConfig = (token, contentType = "application/json") => ({
  headers: {
    "Content-Type": contentType,
    Authorization: `Bearer ${token}`,
  },
})

  const getUserDetails = async (_id)=> {
    try {
      const config = authConfig(userInfo.token);
  
      const { data } = await axios.get(`${PORT}/users/${_id}`, config);
      setMessage(data?.message || "User Details Successful")
      setUserInfo(data)
    } catch (error) {
      setMessage(error.response?.data?.message || "Something Wrong")

    }
  };

  const updateUserProfile = async (userData) =>{
    try {

      const config = authConfig(userInfo.token);
  
      const { data } = await axios.put(`${PORT}/users/profile`, userData, config);
      setUserInfo(data)
      setMessage(data?.message || "User Details Updated")
      setSuccess(true)
      console.log(data)
      console.log(userData)
    } catch (error) {
      setError(true)
      console.log(error)
      setMessage(error.response?.data?.message || "Something Wrong")

    }
  };

  const listMyOrders = async () => {
      try {
          const config = authConfig(userInfo.token);
          setLoading(true)
          const {data} = await axios.get(`${PORT}/orders/myorders`,config)
          setOrders(data)
          setLoading(false)
         
      } catch (error) {
        setLoading(false)
        setErrorOrders(error.response?.data?.message || "Cant get Order list")
      }
  };



  useEffect(() => {
    if(!userInfo) {
    navigate('/login')
    }else{
        if(!userInfo.name)
        {
            getUserDetails(userInfo._id)
            // listMyOrders()
        }else{
            setUserData({...userData,name:userInfo.name})
            setUserData({...userData,email:userInfo.email})
            listMyOrders()
          
        }
    }
  }, [ userInfo,])

  const submitHandler = (e) => {
    e.preventDefault()
    if(userData.password !== confirmPassword){
        setMessage('Password do not match')
    }
    else{
        updateUserProfile(userData)
    }
    
  }
  const inputs = document.querySelectorAll(".inputa");


  function addcl(){
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }
  
  function remcl(){
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
      parent.classList.remove("focus");
    }
  }
  
  const nameinputfocus = () =>{
    setisEditablename(!isEditablename)
    if(isEditablename){
      nameinput.current.focus()        
    }else{

    }
  }
  
  inputs.forEach(inputa => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });
  const handelshow = ()=>{

  }


        return (
    <div className="profile-container">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <h1 className="profile-title">My Profile</h1>
        {error && <h4>{error}</h4>}
        {success && <h4>Profile Updated</h4>}
      <div className="profile-grid">
        {/* Profile Card */}
        <div className="profile-card">
            
          <img src={wave} alt="User" className="profile-avatar" />
          <h2>{userData.name}</h2>
          <p>{userData.email}</p>
        </div>

        {/* Edit Profile */}
        <div className="profile-form">
          <h2>Edit Profile</h2>
          <form onSubmit={submitHandler}>
            <div>
            <label>Name</label>
            <input type="text" 
            value={userData.name} 
            readOnly = {isEditablename} 
            ref = {nameinput} className="inputa" 
            placeholder="Enter name"  
            onChange={(e) => 
            setUserData({...userData,name:e.target.value})}
            />
            <AiOutlineEdit size ='26' 
            className = 'edit' 
            onClick = {nameinputfocus}/>
            </div>
            <div>
            <label>Email</label>
            <input type="text" 
            value={userData.email} 
            readOnly = {isEditableemail} 
            ref = {emailinput} className="inputa" 
            placeholder="Enter email" 
            onChange={(e) => 
            setUserData({...userData,email:e.target.value})} 
            />
             <AiOutlineEdit size ='26' 
             className = 'edit' 
             onClick = {()=>{setisEditableemail(!isEditableemail)
              emailinput.current.focus()
              }}/>
              </div>
            <div>
            <label>Password</label>
            <input type="password" 
            value={userData.password} required 
            className="inputa" 
            placeholder="Enter password" 
            onChange={(e) => setUserData({...userData,password:e.target.value})}
            />
            </div>
            <div>
            <label>Comfirm Password</label>
            <input type="password" 
            value={confirmPassword} 
            className="inputa" 
            placeholder="Confirm password" 
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </div>
            {message && <h4 className = 'Message'>{message}</h4>}
    <input type="submit" className="btna2" id='btn' value="Save Changes"/>
            {/* <button type="submit">Save Changes</button> */}
          </form>
        </div>
      </div>

      {/* Order History */}
        <div className = 'order-history'>
           {loading && !orders? <div className='loading'>
                          <HashLoader   color="orange"  loading={loading} size={40} />
                     </div>  : errorOrders && !orders ? <h1>{errorOrders}</h1>
                     : orders &&
                     <Table size="sm">
                       <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>DATE</Th>
                            <Th>TOTAL</Th>
                            <Th>PA_ID</Th>
                            <Th>DELIVERED</Th>
                            <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {orders.map(order=>(    
                        <Tr key = {order._id}>
                          <Td>{order._id}</Td>
                          <Td>{order.createdAt.substring(0,10)}</Td>
                          <Td>{order.totalPrice}</Td>
                          <Td>{order.isPa_id ? order.pa_idAt.substring(0,10) : 'Not Pa_id Yet'}</Td>
                          <Td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'Not Yet'}</Td>
                          <Td>
                            <Link to ={ `/order/${order._id}`}>
                            <Button size="xs">DETAILS</Button>
                            </Link>
                          </Td>
                        </Tr>
                        ))}
                      </Tbody>
                     </Table>
                     }
         </div>
    </div>
  );


}

export default Profile
