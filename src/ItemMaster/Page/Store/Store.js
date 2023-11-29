import React, { useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DataContext from '../../../context/ItemMasterContext';
import { SideNavbar } from '../../../components/sideNavbar/SideNavbar';
import StoreAdd from './StoreFrom/StoreAdd';
import DeleteConformation from '../../../components/deleteConformations.js/DeleteConformation';
 

const Store = () => {
   const {storedata, userdata, Accountdata, handlStoreAddShow, storeAdd,   handltoastDeleteConfomationShow} = useContext(DataContext)
   const [deleteData, setdeleteData] = useState({  Name:"",id:""})
   const [post, setPost] = useState([])
   const [storeEditId , setstoreEditId] = useState()
   

   const url = "/itemmaster/Store"
    
    
   const deleteButton = ({ value, data }) => {
     
     const handleClick = () => {
       handlStoreAddShow();
       setstoreEditId(data.id);
     };
     
     const handledeleteConfomation = () => {
       
       handltoastDeleteConfomationShow();
       setdeleteData({
        Name:data.StoreName,
        id: data.id
       }); 
   
     };
    

    return ( 
      <>
      <button className='btn btn-outline-danger btn-sm px-3 mx-2' onClick={handledeleteConfomation}  ><i class="fa-solid fa-trash " ></i> </button>
      <button className='btn btn-outline-success btn-sm px-3 mx-2' onClick={handleClick}> <i class="fa-solid fa-pen   " ></i> </button>      
      
      </>
    );
  } 
  useEffect(()=>{
    console.log(deleteData);
  },[deleteData])

 
  const columns = [
  
    { headerName: "Store Name", field: "StoreName",flex: 1 },
    { headerName: "Store Account", field: "Account",flex: 1 },
    { headerName: "Store InCharge", field: "incharge_name",flex: 1 },
    { headerName: "Maintained", field: "matained", flex: 1 },
    { headerName: "Active", field: "Action",flex: 1 },
    { headerName: "Action", cellRenderer: 'deleteButton'},
  ]
  const components = {
    deleteButton: deleteButton,
  };
   useEffect(()=>{
    const postStoredata = storedata.map((item)=>{
        const incharge = userdata.map((user)=>{
            return  item.StoreInCharge === user.id ? user.username : "";
        }).filter(name => name !== "");
        const Account = Accountdata.map((Account_)=>{ 
            return  item.StoreAccount === Account_.id ? Account_.Accounts_Name : "";
            }).filter(name => name !== "");
        
        return {
            ...item,
            incharge_name: String(incharge),
            Account: String(Account),
            
          };
       })
       setPost(postStoredata)
   },[Accountdata,userdata , storedata])
  const defaultColDef = {
    sortable: true,
    editable: false,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

  return (
    <>
    <SideNavbar/>
      <div className='container-lg'>

      <div className="itemMaster_Top mx-3 mt-3" style={{   width: "100%" }}>
         <div className="row py-3 ps-3">
           <div className="col-6">
           <h3>Store</h3>
           </div>
         <div className="col-6 text-end pe-4">
           <button type="button" className="btn btn-outline-primary" onClick={()=>{handlStoreAddShow();
          console.log(storeAdd);}}><i class='bx bxs-plus-circle' ></i> New</button>
         </div>
         </div>
       </div>
      <div className='ag-theme-alpine mx-3   ' style={{ height: "80%", width: "100%" }}>
        <AgGridReact
          rowData={post}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          components={components}
          pagination={true}
        />
      </div>
      <StoreAdd storeEditId={storeEditId} 
       setstoreEditId={setstoreEditId}/>
    </div>
    <DeleteConformation 
    deleteData= {deleteData}
    url={url}/>
    </>
  
  );
};

export default Store;
