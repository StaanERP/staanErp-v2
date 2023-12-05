import React, { useContext } from 'react'   
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import "./login.css"
import DataContext from '../../context/ItemMasterContext';
import Avatar from 'react-avatar';

const Login = () => {
  const {login,   userName}= useContext(DataContext)
   
     

 
  return (
    <>
     <ToastContainer/>
    <div className='top_div shadow-lg px-4 py-4  container-sm    loginDiv container-lg  m-auto justify-content-end '>
         
         <div className='header'>
          
        
          <div className="row">
            {/* <div className="col-3 p-0">
            <img src={staanlogo} className="img-thumbnail m-0" alt="staan logo"/>
            </div> */}
            <div className="col-12 pe-5">
            <Avatar size="100" facebook-id="invalidfacebookusername" src="https://graph.facebook.com/100008343750912/picture?width=100&height=100" round={true} />
            </div>
            <div className="col-12 ps-5 ms-1">
            <h5 className="title nowrap pt-md-4">{userName ?  "Hi  " + userName : "Need To Login"}</h5>
            </div>
         </div>
         
         
         <div>
         
         
        
         </div>
         
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