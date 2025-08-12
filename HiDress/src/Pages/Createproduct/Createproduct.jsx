import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import HashLoader from "react-spinners/RingLoader";
import { Input,InputGroup } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';

import {Box, Checkbox, Stack, Textarea, VStack} from '@chakra-ui/react'


// import './Editproduct.css'
const Createproduct = ({userInfo}) => {
    
    const PORT = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const [name,setName] = useState('')
    const [description,setdescription] = useState('')
    const [price,setprice] = useState(0)
    const [countInStock,setcountInStock] = useState(0)

    const [images,setImages] = useState([])
    const [sizes,setsizes] = useState([])
    const [category,setCategory] = useState([])
    const [Menselected,setMenselected] = useState(false)
    const [Womenselected,setWomenselected] = useState(false)
    const [Bagselected,setBagselected] = useState(false)
    const [Watchesselected,setWatchesselected] = useState(false)
    const [Shoesselected,setShoesselected] = useState(false)
    const [Jacketselected,setJacketselected] = useState(false)

    const [Sselected,setSselected] = useState(false)
    const [Mselected,setMselected] = useState(false)
    const [Lselected,setLselected] = useState(false)
    const [XLselected,setXLselected] = useState(false)

    const [message,setMessage] = useState(null) 

    const [product,setProduct] = useState({})

    const [lodingUpdate,setLodingUpdate] = useState(false)
    const [errorUpdate,setErrorUpdate] = useState("")
    const [successUpdate,setSuccessUpdate] = useState(null)

    const handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
        }
    };


 const CreateProduct = async () => {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("countInStock", countInStock);
        formData.append("description", description);
        formData.append("sizes", JSON.stringify(sizes));
        formData.append("category", JSON.stringify(category));
        images.forEach((img) => {
            formData.append("images", img);  // must match multer field name
        });
        console.log(images)
        
        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        setLodingUpdate(true);
        const { data } = await axios.post(`${PORT}/products`, formData, config);
        setProduct(data);
        setLodingUpdate(false);
        setSuccessUpdate("Product Created");
    } catch (error) {
        console.error(error);
        setErrorUpdate(error?.response?.data?.message || "Could not create product");
        setLodingUpdate(false);
    }
};





    useEffect(() => {

        if(successUpdate){
            navigate('/admin/productlist')
        }
      
        return () => {
        }
    }, [product,userInfo,category,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        CreateProduct()
    }
    const checkboxhandler = (D) =>{
        let index = sizes.indexOf(D)
        if(index> -1){ 
            sizes.splice(index,1)
            console.log(sizes)
        }
        else{
            sizes.push(D)
            console.log(sizes)
        }
    }
    
    const checkboxhandlercg = (D) =>{
        
            let index = category.indexOf(D)
        if(index> -1){ 
            category.splice(index,1)

        }
        else{
            category.push(D)


        }
    }

    return (
        <div className = 'Edituser'>
            <Helmet>
                <title>Create Product</title>
            </Helmet>
               
               {/* {successUpdate && <h4>Profile Updated</h4>} */}
               { lodingUpdate ? 
                        <div className='loading'>
                            <HashLoader   color={"#1e1e2c"}  loading={lodingUpdate} size={40} />
                        </div>
                
                : errorUpdate ? <h4>{errorUpdate}</h4> :
          <div>
            <h4 className = 'Edittitle'>Create Product :</h4>
            <div className ='formedit'>
                    <form onSubmit={submitHandler}>

                <div >
                <div className="input-div zz">
                Name :

                   <div className="div">
                       
                   <InputGroup>

                      <Input type="text" value={name}  placeholder="Enter name"  onChange={(e) => setName(e.target.value)}/>
                   </InputGroup>
                   </div>
                </div>


                <div className="input-div one">
                   Price:

                   <div className="div">

                        <InputGroup>
                              <Input  type="text" value={price} placeholder="Enter price" onChange={(e) => setprice(e.target.value)} />
                         </InputGroup>
                         
                   </div>
                  
                </div>
                   <div className="input-div one">
                   countInStock :

                   <div className="div">
                        <InputGroup>
                              <Input  type="text" value={countInStock} placeholder="number in store" onChange={(e) => setcountInStock(e.target.value)} />
                         </InputGroup>
                         
                   </div>
                  
                </div>
                   <div className="input-div one">
                       Description/Category
                   <div className="div">
                          <Stack direction = 'column' spacing={4}>
                          <InputGroup>
                              <Textarea size = 'sm' value={description}  placeholder="Enter description" onChange={(e) => setdescription(e.target.value)} />
                         </InputGroup>
                         <Stack direction="row">
                      <Checkbox onChange = {() =>{checkboxhandlercg('Men');setMenselected(!Menselected)}} isChecked = {Menselected}>Men </Checkbox>
                      <Checkbox onChange = {() =>{checkboxhandlercg('Women') ; setWomenselected(!Watchesselected)}} isChecked = {Womenselected}>Women </Checkbox>
                      <Checkbox onChange = {() =>{checkboxhandlercg('Bag'); setBagselected(!Bagselected)}} isChecked = {Bagselected}>Bag </Checkbox>
                      <Checkbox onChange = {() =>{checkboxhandlercg('Watches') ; setWatchesselected(!Watchesselected)}} isChecked = {Watchesselected}>Watches </Checkbox>
                      <Checkbox onChange = {() =>{checkboxhandlercg('Shoes') ; setShoesselected(!Shoesselected)}} isChecked = {Shoesselected}>Shoes </Checkbox>
                      <Checkbox onChange = {() =>{checkboxhandlercg('Jacket') ; setJacketselected(!Jacketselected)}} isChecked = {Jacketselected}>Jacket </Checkbox>
                      </Stack>
  
                          </Stack>
                          
          
                   </div>
                  
                </div>              

                <div className="input-div pass">

                   <div className="div">
                      
                   </div>
                </div>

                <div className="input-div pass">
                Sizes:

                   <div className="div">

                      <Stack direction="row">
                      <Checkbox onChange = {() =>{checkboxhandler('S') ; setSselected(!Sselected)}} isChecked = {Sselected}>S </Checkbox>
                      <Checkbox onChange = {() =>{checkboxhandler('M') ; setMselected(!Mselected)}} isChecked = {Mselected}>M </Checkbox>
                      <Checkbox onChange = {() =>{checkboxhandler('L') ; setLselected(!Lselected)}} isChecked = {Lselected}>L </Checkbox>
                      <Checkbox onChange = {() =>{checkboxhandler('XL') ; setXLselected(!XLselected)}} isChecked = {XLselected}>XL </Checkbox>
                      </Stack>
                   </div>
                </div>
                <div className="input-div pass">
                Urls for images:
                   <div className="div urls">

  

                      <Box>
                         <Stack direction ='column' >
                            <Input type='file' accept="image/*" onChange={(e) => handleImageUpload(e, 0)} />
                            <Input type='file' accept="image/*" onChange={(e) => handleImageUpload(e, 1)} />
                            <Input type='file' accept="image/*" onChange={(e) => handleImageUpload(e, 2)} />

                         </Stack> 
                         </Box>
                      {/* <Input type= 'text' value={category} onChange = {(e)=>{setcategory((e.target.value).split(' ')) ; }}/> */}
                   </div>
                </div>
                {message && <h4 className = 'Message'>{message}</h4>}
                <input type="submit" className="btna2 postionbtnupdate" value="Update"/>
                
                </div>
                
               
                
                
              
            </form>
            </div>
            </div>
}
        </div>
    )
}

export default Createproduct
