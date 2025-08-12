import React, {useState, useEffect,} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import {BsArrowRight} from "react-icons/all"
import lfImg from './img/lfImg.jpg'
import './Login2.css'
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();


const Login = ({ setUserInfo }) => {
  const [formData,setFormData] = useState({email:"",password:""})
  const [message,setMessage] = useState('')
  const navigate = useNavigate()
  
  const PORT = import.meta.env.API_URL

  const config = {
    header:{
      "Content-Type":"application/json"
    }
  }

  const submitHandler = async(e) => {
    e.preventDefault()
    if(formData.email === "" || formData.password === ""){
      setMessage("Please fill up the form")
      console.log('Enter value')
      return
    }
    try{
      const res = await axios.post(`${PORT}/users/login`,formData,config)
      setMessage(res.data.message || "Login Successful")
      // localStorage.setItem('userInfo',JSON.stringify(res.data))
      setUserInfo(res.data)
      navigate('/')
    }
    catch(error){
      setMessage(error.response?.data?.message || "Something Wrong")
    }
  }



    return (
      <>
         <Helmet>
            <title>Login</title>
          </Helmet>
          <div className='cong'>
            <div className='conform'>
              <div className='left'><img src={lfImg} alt="left_img" /></div>
                {/* {<h4>{message}</h4>} */}
              <div className="form-wrapper2">
                
                  <h2>Sign In</h2>
                  <form onSubmit={submitHandler}>
                      <div className="form-control">
                          <input type="text"  value={formData.email} className="inputa" placeholder="Enter Email" onChange={(e) => setFormData({...formData,email:e.target.value})} />
                          <label>Email or phone number</label>
                      </div>
                      <div className="form-control">
                          <input type="password" value={formData.password} className="inputa" placeholder="Enter Password" onChange={(e) => setFormData({...formData,password:e.target.value})}/>
                          <label>Password</label>
                      </div>
                      <button className='button2' type="submit">Sign In</button>
                      <div className="form-help"> 
                          <div className="remember-me">
                              <input type="checkbox" className="inputa" id="remember-me" />
                              <label >Remember me</label>
                          </div>
                          <Link className ='text-forgot'  to ='/forgot'>Forget Password? </Link>
                      </div>
                  </form>
                  <span className='lk'><p>New to Hidressup?</p><Link className="createAcc" to="/register">Create Account</Link><BsArrowRight size="25"/></span> 
              </div>

            </div>
          </div>
      </>
    )
}

export default Login
