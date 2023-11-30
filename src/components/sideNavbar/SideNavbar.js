import React, { useContext, useState } from 'react'
import "./sideNavbar.css"
import DataContext from '../../context/ItemMasterContext'
import staanlogo from "../../img/logo-final.png"

export const SideNavbar = () => {
    const {logout, userName,   userEmail} =useContext(DataContext)
 
    const [InventorySubBar , setInventorySubBar] = useState(false)
    const [accountSubBar , setaccountSubBar] = useState(false)
    const [conferenceSubBar , setconferenceSubBar] = useState(false)
    
  return (
    <>
    <div className="nav_sidebar">
      <div className="nav_logodetails  ">
      
        {/* <div className="nav_logo_name">S<span className='nav_logo_name_t'>t</span>aan</div> */}
        <img src = {staanlogo} alt=""    className='img-fluid' srcset="" />
      
      </div>
      <ul className="nav-list">
        <li>
            <div>
            <i className='bx bx-home-alt'></i>
                <span className='nav_link_name' >Home</span>
            </div>
           
        </li>
        <li onClick={() => setInventorySubBar(true)}  onMouseEnter={() => setInventorySubBar(true)} onMouseLeave={() => setInventorySubBar(false)}>
            <div >
            <i className='bx bx-notepad'></i>
                <span className='nav_link_name' >Inventory</span>
            </div>
            <ul className='sub_nav-list' style={{ display: InventorySubBar ? 'block' : 'none' }}>
                <li> 
                     <a href="/store" >
                     <i class='bx bx-store-alt' ></i>
                     <span className='nav_link_name'>Store</span>
                     </a> 
                </li>
                <li> 
                     <a href="/unit" >
                     <i class="fa-solid fa-weight-hanging"></i>
                     <span className='nav_link_name' >Unit</span>
                     </a> 
                </li>
                <li> 
                     <a href="/item_Group" >
                     <i class="fa-solid fa-sitemap"></i>
                     <span className='nav_link_name' >Item Group</span>
                     </a> 
                </li>
                <li> 
                     <a href="/hsn" >
                     <i class="fa-regular fa-credit-card"></i>
                     <span className='nav_link_name' >HSN</span>
                     </a> 
                </li>
                <li> 
                     <a href="/StockStement" >
                     <i class="fa-solid fa-note-sticky"></i>
                     <span className='nav_link_name' >Stock StateMent</span>
                     </a> 
                </li>
                <li> 
                     <a href="/inventoryApproval" >
                     <i class="fa-solid fa-boxes-stacked"></i>
                     <span className='nav_link_name' >Inventory Approval</span>
                     </a> 
                </li>
                
             </ul>
          
        </li>
        <li>
            <div>
                   <i className='bx bx-credit-card' ></i>
                <span className='nav_link_name' >Purchase</span>
            </div>
        </li>
        <li>
            <div>
            <i className='bx bx-bar-chart-alt'></i>
                <span className='nav_link_name' >Sales</span>
            </div>
        </li>
        {/*  */}
        <li onMouseEnter={() => setconferenceSubBar(true)} onMouseLeave={() => setconferenceSubBar(false)}>
            <div>
            <i class="fa-solid fa-people-roof"></i>
                <span className='nav_link_name' >Conference </span>
            </div>
            <ul className='sub_nav-list' style={{ display: conferenceSubBar ? 'block' : 'none' }}>
                <li> 
                     <a href="/Enquiry" >
                     <i class="fa-brands fa-wpforms"></i>
                     <span className='nav_link_name' >Enquiry form</span>
                     </a> 
                </li>
                <li> 
                     <a href="/EnquiryDetieal" >
                     <i class="fa-regular fa-rectangle-list"></i> 
                     <span className='nav_link_name' >Enquiry Contacts</span>
                     </a> 
                </li>
                <li> 
                     <a href="/conference" >
                     <i class="fa-solid fa-list-ul"></i>
                     <span className='nav_link_name' >Conference</span>
                     </a> 
                </li>
            </ul>
           
        </li>
        <li onMouseEnter={() => setaccountSubBar(true)} onMouseLeave={() => setaccountSubBar(false)}>
            <div>
            <i className='bx bx-rupee' ></i>
                <span className='nav_link_name' >Account</span>
            </div>
            <ul className = "sub_nav-list" style={{ display: accountSubBar ? 'block' : 'none' }}>
                <li> 
                     <a href="/account" >
                     <i class="fa-regular fa-note-sticky"></i>
                     <span className='nav_link_name' >Account Master</span>
                     </a> 
                </li>
                <li> 
                     <a href="/account_Group" >
                     <i class="fa-solid fa-cubes-stacked"></i>
                     <span className='nav_link_name' >Account Group</span>
                     </a> 
                </li>
             </ul>
        </li>
        <li>
            <div>
            <i className='bx bx-grid-alt'></i>
                <span className='nav_link_name' >Service</span>
            </div>
        </li>
        <li>
            <div>
            <i className='bx bx-cog' ></i>
                <span className='nav_link_name' >Production</span>
            </div>
        </li>
        <li>
            <div>
            <i className='bx bxs-user-circle' ></i>
                <span className='nav_link_name' >HR</span>
               
            </div>
       
        </li>
        <div className="profile">
            <div className="profile_details">
                <img className='userimg' src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="user" />
                <div>
                    <div className="profile_name">{userName}</div>
                    <div className="desingnations">{userEmail}</div>
                </div> 
            </div>
            <i className='bx bx-log-out-circle' onClick={logout} id='log_out'></i>
        </div>
      </ul>
    </div>
    
    </>
  )
}
