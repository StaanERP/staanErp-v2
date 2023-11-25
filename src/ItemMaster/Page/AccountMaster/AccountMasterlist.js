import React, { useContext, useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { SideNavbar } from '../../../components/sideNavbar/SideNavbar';
import DataContext from '../../../context/ItemMasterContext';
import AddAccount from '../../components/model/AddAccount';
import DeleteConformation from '../../../components/deleteConformations.js/DeleteConformation';

const AccountMasterlist = () => {
    const [post, setPost] = useState()
    const {Accountdata, handltoastDeleteConfomationShow ,handlAccountShow, setAccountGroupType, AccountGroupdata} =  useContext(DataContext)
    const [accountEditId , setAccountEditId ] = useState('')
    const [deleteData, setdeleteData] =  useState([])
    useEffect(()=>{
        
        const postAccountdata =  Accountdata.map((item)=>{
            const AccountGroup = AccountGroupdata.map((parent)=>{
                return  item.Accounts_Group_Name === parent.id ? parent.Accounts_Group_Name : "";
            }).filter(name => name !== "");
            return {
                ...item,
                group: String(AccountGroup),
                 
                
              };
        })
        setPost(postAccountdata)
    },[Accountdata])

    const url = "/itemmaster/AccountsMaster"
   
   let itemId;

   const deleteButton = ({ value, data }) => {
     itemId = data.id; // Assign the value to the higher-scoped itemId
     const handleClick = () => {
        handlAccountShow();
        setAccountGroupType('all')
       setAccountEditId(data);
     };
     
     const handledeleteConfomation = () => {
        
        handltoastDeleteConfomationShow();
       setdeleteData({
        Name:data.Accounts_Name,
        id: data.id
       }); 
   
     };
    

    return ( 
      <>
      <button className='btn btn-outline-danger btn-sm px-3 mx-2' onClick={handledeleteConfomation}><i class="fa-solid fa-trash " ></i> </button>
      <button className='btn btn-outline-success btn-sm px-3 mx-2' onClick={handleClick}> <i class="fa-solid fa-pen   " ></i> </button>      
      
      </>
    );
  }

    
    const columns = [
        { headerName: "Accounts Name", field: "Accounts_Name",flex: 1 },
        { headerName: "Accounts Group", field: "group",flex: 1 },
        { headerName: "GST Applicable", field: "GST_Applicable",flex: 1 },
        { headerName: "TDS", field: "TDS", flex: 1 }, 
        { headerName: "Active", field: "Accounts_Active", flex: 1 }, 
        { headerName: "Action", cellRenderer: 'deleteButton'},
      ]
      const defaultColDef = {
        sortable: true,
        editable: false,
        filter: true,
        floatingFilter: true,
        resizable: true,
      };
      const components = {
        deleteButton: deleteButton,
      };

  return (
     <>
        <SideNavbar/>
 
     <div className='container-lg'>
        <div className="itemMaster_Top mx-3 mt-3" style={{   width: "100%" }}>
            <div className="row py-3 ps-3">
                <div className="col-6">
                    <h3>Account Master</h3>
                </div>
                <div className="col-6 text-end pe-4">
                     <button type="button" className="btn btn-outline-primary" onClick={()=>{
                        handlAccountShow();  setAccountGroupType('all')
                     } }><i class='bx bxs-plus-circle' ></i> New</button>
                </div>
            </div>
        </div>
        <div className='ag-theme-alpine mx-3 ' style={{ height: "80%", width: "100%" }}>
        <AgGridReact
          rowData={post}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          components={components}
          pagination={true}
        />
        </div>
     <AddAccount
     accountEditId = {accountEditId}
     setAccountEditId= {setAccountEditId} />
     <DeleteConformation
     deleteData={deleteData}
     url ={url}/>
     </div>
     
     </>
  )
}

export default AccountMasterlist