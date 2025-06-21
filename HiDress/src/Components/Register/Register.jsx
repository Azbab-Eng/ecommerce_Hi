import React, {useState, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Form, Image} from 'react-bootstrap'
 import {useDispatch, useSelector} from 'react-redux'
import avatarRegister from '../img/avatarRegister.svg'
 import {login,register,verify} from '../../actions/userActions'
import { Helmet } from 'react-helmet';
import addUs from '../img/new.svg'
import wave from '../img/wavev.png'
import {Button, Input} from "@chakra-ui/react"
import axios from 'axios';

const Register = () => {
  const [formData,setFormData] = useState({name:"",email:"",no:"",password:""})
  const [confirmPassword,setConfirmPassword] = useState('')
  const [message,setMessage] = useState(null) 
  const [otp,setOtp] = useState('') 
  const [step,setStep] = useState("form")
  const navigate = useNavigate()

  const PORT ="http:localhost:8000"
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

  inputs.forEach(inputa => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });
  
    return (
        <div className="registerSc">
          <Helmet>
            <title>
              Register
            </title>
          </Helmet>
          	<Image className="wave" src={wave} />

            <div className="containera">
              
		<div className="imga">
			<Image src={addUs} />
		</div>
		<div className="login-content">
      <h2>{message}</h2>
      {/* {error ? <h4>{error}</h4>:<h4>{message}</h4>} */}

        {step === "otp"?<form onSubmit={verifyOtp}>
               <div className="input-div passconf">
            		   <div className="i"> 
            		    	<i className="fas fa-lock"></i>
            		   </div>
            		   <div className="div">   	
            		    	<input type="text" value={otp} className="inputa" placeholder="Enter Otp" onChange={(e) => setOtp(e.target.value)}/>
             	   </div>
             	</div>
               <input type="submit" className="btna2" value="Verify"/>
             </form> : 
			 <form onSubmit={handRegister}>
			 	<Image src={avatarRegister} />
			 	 {<h4>{message}</h4>} 
                  <div className="input-div zz">
                        <div className="i">
            		   		<i className="fas fa-user"></i>
            		   </div>
                    <div className="div">
           		   		
            		   		<input type="text" value={formData.name} className="inputa" placeholder="Enter name"  onChange={e =>setFormData({...formData,name:e.target.value})}/>
            		   </div>

           		   
            		</div>

            		<div className="input-div one">
            		   <div className="i">
            		   		<i className="fas fa-envelope"></i>
            		   </div>
            		   <div className="div">
           		   		
            		   		<input type="email" value={formData.email} className="inputa" placeholder="Enter email" onChange={e =>setFormData({...formData,email:e.target.value})} />
            		   </div>
            		</div>

            		<div className="input-div one">
                       

            		   <div className="i">
            		   		<i className="fas fa-envelope"></i>
            		   </div>
            		   <div className="div">
           		   		
            		   		<input type="text" value={formData.no} className="inputa" placeholder="Enter number" onChange={e =>setFormData({...formData,no:e.target.value})} />
            		   </div>
            		</div>

            		<div className="input-div pass">
            		   <div className="i"> 
            		    	<i className="fas fa-lock"></i>
            		   </div>
            		   <div className="div">
           		    	
            		    	<input type="password" value={formData.password} className="inputa" placeholder="Enter password" onChange={e =>setFormData({...formData,password:e.target.value})}/>
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
    
                 <input type="submit" className="btna2" value="Sign up"/>
                 <br />
               <div>
                  Have an Account? 
             	    <Link to={'/login'}>Login</Link>
            
               </div>  
              </form> }
            
        </div>
    </div>
        </div>
    )
}

export default Register

