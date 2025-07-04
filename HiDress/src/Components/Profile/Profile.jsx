import React, {useState, useEffect,useRef} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Image} from 'react-bootstrap'
// import {useDispatch, useSelector} from 'react-redux'
import avatarRegister from '../img/avatarRegister.svg'
import addUs from '../img/new.svg'
import wave from '../img/wavev.png'
import { Helmet } from 'react-helmet';
// import {getUserDetails, updateUserProfile} from '../actions/userActions'
// import {listMyOrders } from '../actions/orderActions'
import { IoIosArrowDown } from 'react-icons/all';
import HashLoader from "react-spinners/HashLoader";



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

const ProfileScreen = ({userInfo,setUserInfo}) => {
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

  const PORT ="http://localhost:8000"

  const authConfig = (token, contentType = "application/json") => ({
  headers: {
    "Content-Type": contentType,
    Authorization: `Bearer ${token}`,
  },
})

  const getUserDetails = async (_id)=> {
    try {
      // dispatch({ type: USER_DETAILS_REQUEST });
  
      // const {
      //   userLogin: { userInfo },
      // } = getState();
  
      const config = authConfig(userInfo.token);
  
      const { data } = await axios.get(`${PORT}/users/${_id}`, config);
      setMessage(data?.message || "User Details Successful")
      setUserInfo(data)
      // dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something Wrong")
      // dispatch({
      //   type: USER_DETAILS_FAIL,
      //   payload:
      //     error.response && error.response.data.message
      //       ? error.response.data.message
      //       : error.message,
      // });
    }
  };

  const updateUserProfile = async (userData) =>{
    try {
      // dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
  
      // const {
      //   userLogin: { userInfo },
      // } = getState();
  
      const config = authConfig(userInfo.token);
  
      const { data } = await axios.put(`${PORT}/users/profile`, userData, config);
      setUserInfo(data)
      setMessage(data?.message || "User Details Updated")
      setSuccess(true)
      console.log(data)
      console.log(userData)
      // dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      setError(true)
      console.log(error)
      setMessage(error.response?.data?.message || "Something Wrong")
      // dispatch({
      //   type: USER_UPDATE_PROFILE_FAIL,
      //   payload:
      //     error.response && error.response.data.message
      //       ? error.response.data.message
      //       : error.message,
      // });
    }
  };

  const listMyOrders = () => async(dispatch, getState) => {
      try {
          // dispatch({
          //     type: ORDER_LIST_MY_REQUEST
          // })
  
          // const { userLogin: {userInfo} } = getState()
          authConfig(userInfo.token)
          // const config = {
          //     headers:{
          //         Authorization: `Bearer ${userInfo.token}`
          //     }
          // }
          setLoading(true)
          const {data} = await axios.get(`${PORT}/orders/myorders`,config)
          setOrders(data)
          setLoading(false)
          setErrorOrders("Cant get Order list")
          // dispatch({
          //     type: ORDER_LIST_MY_SUCCESS,
          //     payload: data
          // })
  
  
         
      } catch (error) {
        setLoading(false)
        setErrorOrders("Cant get Order list")
          dispatch({
              type: ORDER_LIST_MY_FAIL,
              payload: 
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
          })
          
      }
  }



  useEffect(() => {
    if(!userInfo) {
    navigate('/login')
    }else{
        if(!userInfo.name)
        {
            getUserDetails(userInfo._id)
            listMyOrders()
        }else{
            setUserData({...userData,name:userInfo.name})
            setUserData({...userData,email:userInfo.email})
            // setEmail(userInfo.email)
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
    <div className="registerSc">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Image className="wave" src={wave}/>
      <div className="containera">
              
		<div className="imga">
			<Image src={addUs} />
		</div>
    <div className = 'rightinfos'>
    <div className = 'showbtn' onClick = {()=>setShowOrders(!ShowOrders)}>{ShowOrders ? 'Show my infos' :'Show my orders'} <IoIosArrowDown /></div>
    <>
    {!ShowOrders ? 
		<div className= 'login-content'>
			<form onSubmit={submitHandler}>
				<Image src={avatarRegister} />
				{error && <h4>{error}</h4>}
                {success && <h4>Profile Updated</h4>}
                



                <div className="input-div zz">
                       <div className="i">
           		   		<i className="fas fa-user"></i>
           		   </div>
                   <div className="div">
           		   		
           		   		<input type="text" value={userData.name} readOnly = {isEditablename} ref = {nameinput} className="inputa" placeholder="Enter name"  onChange={(e) => setUserData({...userData,name:e.target.value})}/>
           		   </div>

           		   
           		</div>
               <AiOutlineEdit size ='26' className = 'edit' onClick = {nameinputfocus}/>



           		<div className="input-div one">
                       

           		   <div className="i">
           		   		<i className="fas fa-envelope"></i>
           		   </div>
           		   <div className="div">
           		   		
           		   		<input type="text" value={userData.email} readOnly = {isEditableemail} ref = {emailinput} className="inputa" placeholder="Enter email" onChange={(e) => setUserData({...userData,email:e.target.value})} />
           		   </div>
                  
           		</div>
               <AiOutlineEdit size ='26' className = 'edit' onClick = {()=>{setisEditableemail(!isEditableemail)
              emailinput.current.focus()
              }}/>



                

           		<div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	
           		    	<input type="password" value={userData.password} required className="inputa" placeholder="Enter password" onChange={(e) => setUserData({...userData,password:e.target.value})}/>
            	   </div>
            	</div>


                <div className="input-div passconf">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	
           		    	<input type="password" value={confirmPassword} className="inputa" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            	   </div>
            	</div>
                {message && <h4 className = 'Message'>{message}</h4>}
                <input type="submit" className="btna2" value="Update"/>
               
            	
                
              
            </form>
        </div>
         :
         <div className = 'tableorder'>
           {loading ? <div className='loading'>
                          <HashLoader   color={"#fff"}  loading={loading} size={40} />
                     </div>  : errorOrders ? <h1>{errorOrders}</h1>
                     :
                     <Table size="sm">
                       <Thead>
                        <Tr>
                            <Th>_ID</Th>
                            <Th>DATE</Th>
                            <Th>TOTAL</Th>
                            <Th>PA_ID</Th>
                            <Th>DELIVERED</Th>
                            <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {orders.map(order=>(    
                        <Tr key = {order.__id}>
                          <Td>{order.__id}</Td>
                          <Td>{order.createdAt.substring(0,10)}</Td>
                          <Td>{order.totalPrice}</Td>
                          <Td>{order.isPa_id ? order.pa_idAt.substring(0,10) : 'Not Pa_id Yet'}</Td>
                          <Td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'Not Yet'}</Td>
                          <Td>
                            <Link to ={ `/order/${order.__id}`}>
                            <Button size="xs">DETAILS</Button>
                            </Link>
                          </Td>
                        </Tr>
                        ))}
                      </Tbody>
                     </Table>
                     }
         </div>
         }
        </>
      </div>
    </div>
        </div>
    )
}

export default ProfileScreen
