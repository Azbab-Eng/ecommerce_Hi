import React, {useState, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {BsArrowRight} from "react-icons/all"
import { Helmet } from 'react-helmet';
import lfImg from './img/lfImg2.JPG'
import axios from 'axios';
import './Register.css'
import dotenv from "dotenv";
dotenv.config();



const Register = () => {
  const [formData,setFormData] = useState({name:"",email:"",no:"",password:""})
  const [confirmPassword,setConfirmPassword] = useState('')
  const [message,setMessage] = useState(null) 
  const [otp,setOtp] = useState('') 
  const [step,setStep] = useState("form")
  const navigate = useNavigate()

  const PORT = import.meta.env.API_URL
//  Helper to create config with Authorization header and Content-Type
  const authConfig = (token, contentType = "application/json") => ({
  headers: {
    "Content-Type": contentType,
    Authorization: `Bearer ${token}`,
  },
  });
  const config = {
    header:{
      "Content-Type":"application/json"
    }
  }

  const handRegister = async(e)=>{
    e.preventDefault()
    if(formData.name === "" || formData.no === "" || formData.email === "" || formData.password === ""){
      setMessage("Please fill up the form")
      console.log('no value')
      return
    }else if(formData.password !== confirmPassword){
      setMessage("Password doesnt match")
      console.log('no match')
      return
    }
    try{
        const res = await axios.post(`${PORT}/users`,formData,config)  
        setMessage(res.data.message) 
        setStep('otp')
    }
    catch(error){
      setMessage(error.response?.data?.error || "Something went wrong") 
      setStep('form')
    }
  }
  const verifyOtp = async(e)=>{
    e.preventDefault()
    if(otp === ""|| formData.email === ""){
      setMessage('Enter the Otp')
      return
    }
    try{
      const res = await axios.post(`${PORT}/users/verify`,{otp, email:formData.email})
      setMessage(res.data.message || "Verification Successful!")
      navigate('/')
    }
    catch(error){
      setMessage(error.response?.data?.message || "Invalid Otp")
    }
  }

   return (
      <>
         <Helmet>
            <title>Register</title>
          </Helmet>
          <div className='cong'>
            <div className='conform'>
              <div className='left'><img src={lfImg} alt="left_img" /></div>
                {/* {<h4>{message}</h4>} */}
              <div className="form-wrapper">
                {step === "otp"?
                <div>
                  <h2>Comfirm Otp</h2>
                  <form onSubmit={verifyOtp}>
                     <div className="form-control">
                          <input type="text" value={otp} className="inputa" placeholder="Enter Otp" onChange={(e) => setOtp(e.target.value)}/>
                          <label>Otp sent to you</label>
                      </div>
                      <button type="submit">Confirm</button>
                  </form></div>
                  :
                  <div><h2>Sign Up</h2>
                  <form onSubmit={handRegister}>
                      <div className="form-control">
                          <input type="text" value={formData.name} className="inputa" placeholder="Enter name"  onChange={e =>setFormData({...formData,name:e.target.value})}/>
                          <label>Name</label>
                      </div>
                      <div className="form-control">
                          <input type="email" value={formData.email} className="inputa" placeholder="Enter email" onChange={e =>setFormData({...formData,email:e.target.value})} />
                          <label>Email</label>
                      </div>
                      <div className="form-control">
                          <input type="text" value={formData.no} className="inputa" placeholder="Enter number" onChange={e =>setFormData({...formData,no:e.target.value})} />
                          <label>Phone number</label>
                      </div>
                      <div className="form-control">
                          <input type="password" value={formData.password} className="inputa" placeholder="Create password" onChange={e =>setFormData({...formData,password:e.target.value})}/>
                          <label>Password</label>
                      </div>
                      <div className="form-control">
                          <input type="password" value={confirmPassword} className="inputa" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                          <label>Confirm Password</label>
                      </div>
                      <button className='btn2' type="submit">Sign Up</button>
                  </form></div>}
                  <span className='lk'><p>Already with Hidressup?</p><Link className="createAcc" to="/login">Sign In</Link><BsArrowRight size="25"/></span> 
              </div>

            </div>
          </div>
      </>
    )
}

export default Register

