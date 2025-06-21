import React, {useState, useEffect,} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { Helmet } from 'react-helmet';

import {Form, Image} from 'react-bootstrap'

import {BsArrowRight} from "react-icons/all"
import avatar from './img/avatare.svg'
// import {login} from '../../actions/userActions'
import login_svg from './img/login.svg'
import wave from './img/wavev.png'
import './Login.css'
import axios from 'axios';


const Login = ({ setUserInfo }) => {
  const [formData,setFormData] = useState({email:"",password:""})
  const [message,setMessage] = useState('')
  const navigate = useNavigate()

  const PORT = "http://localhost:8000"
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
        <div>
          <Helmet>
            <title>Login</title>

          </Helmet>
          <Image className="wave" src={wave} />
            <div className="containera">
              <div className="imga">
			          <Image src={login_svg} />
		          </div>
		          <div className="login-content">
			        <form onSubmit={submitHandler}>
			          <h1>Member Login</h1>
				        {<h4>{message}</h4>}

           		  <div className="input-div one">
           		    <div className="i">
                    <i class="fas fa-envelope"></i>
           		    </div>

           		    <div className="div">
           		   		<input type="text" value={formData.email} className="inputa" placeholder="Enter Email" onChange={(e) => setFormData({...formData,email:e.target.value})} />
           		    </div>
           		  </div>

           		  <div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">	
           		    	<input type="password" value={formData.password} className="inputa" placeholder="Enter Password" onChange={(e) => setFormData({...formData,password:e.target.value})}/>
            	   </div>
            	  </div>
            	
            	  <input type="submit" className="btna" value="Login" />
               
                <div className='div-forgot'>
                    <span>Forgot </span>
                    <Link className ='text-forgot'  to ='/forgot'>Password? </Link>
                         
                </div>
                <Link className="createAcc" to="/register">Create your Account <BsArrowRight size="25"/></Link>
             
              </form>
        </div>
    </div>
        </div>
    )
}

export default Login
