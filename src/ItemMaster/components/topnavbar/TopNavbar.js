import React from 'react'
import "./topnavbar.css"

export const TopNavbar = () => {
  return (
    <div>
        
        <nav className="navbar navbar-expand-lg     top_full_content">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0  fs-5 py-0">
      <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Item Master</a>
            </li>
            <li className="nav-item">
              <a className="nav-link  " href="/">Inventory Approvals</a>
            </li>
            <li className="nav-item"> 
              <a className="nav-link  " href="/">Stock Movemont</a>
            </li>
            <li className="nav-item">
              <a className="nav-link  " href="/" TabIndex="-1" aria-disabled="true">Bar Codes</a>
            </li>
         
        
      </ul>
       
    </div>
  </div>
</nav>

    </div>
  )
}
