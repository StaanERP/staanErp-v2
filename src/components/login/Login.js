import React, { useContext } from 'react'
import {Formik , Field, Form } from 'formik';  
import axiosInstance from '../../api/axoiss';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  staanlogo from "../../img/logo-final.png"
import "./login.css"
import DataContext from '../../context/ItemMasterContext';


const Login = () => {
  const {login, logout, userName}= useContext(DataContext)
    const navigate = useNavigate();
    const initialValueslogin ={
        "email": "",
        "password": ""
  }

  const handleSubmit = async(values, {resetForm })=>{
	 

    axiosInstance
        .post(`/api/token/`, {
            email: values.email,
            password: values.password,
        })
        .then((res) => { 
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token');
                navigate('/ItemMaster');
         
        })
  .catch((error) => {
    if(error.response.request.statusText === "Unauthorized"){
      toast.error("Pls Check Your Email And PassWord", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })

    }else{
      toast.error("Contect admin", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
        console.log(error);

    }
     
    // Handle the error, show a user-friendly message, or perform a redirect if necessary
  });
}
  return (
    <>
    
    <div className='top_div shadow-lg px-4 py-4  container-sm    loginDiv container-lg  m-auto justify-content-end '>
         
         <div className='header'>
         <img src={staanlogo} className="img-thumbnail" alt="staan logo"/>
         <ToastContainer/>
         <h3 className="title pt-md-4">{userName ?  "Hi  " + userName : "Need To Login"}</h3>
         </div>
         <div className="row">
          <div className="col-12 text-center">
          <button type="submit" className="btn shadow-sm  enquiry_submit_button" onClick={login} >Login</button>
          </div>
         </div>
      
       </div>
    </>
  )
}

export default Login