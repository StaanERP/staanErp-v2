import React, { useContext, useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { SideNavbar } from '../../../components/sideNavbar/SideNavbar';
import DataContext from '../../../context/ItemMasterContext';
import AddAccountGroup from '../../components/model/AddAccountGroup';
import DeleteConformation from '../../../components/deleteConformations.js/DeleteConformation';



const AccountGroup = () => {
    const {AccountGroupdata, handlAccountGroupShow, handltoastDeleteConfomationShow} = useContext(DataContext)

    const [post , setPost] = useState()
    const [AccountEdit , setAccountEdit] = useState()
    const [deletedata, setdeleteData] = useState({
        Name:"",
        id: ""
       })
    useEffect(()=>{
        setPost(AccountGroupdata)
    },[AccountGroupdata])
    const columns = [
  
        { headerName: "Name", field: "Accounts_Group_Name",flex: 1 },
        { headerName: "Type", field: "Accounts_Type",flex: 1 },
        { headerName: "Group", field: "Group_Active", flex: 1 },
        { headerName: "Saved by", field: "modified_by",flex: 1, hide:true },
        { headerName: "Action", cellRenderer: 'deleteButton'},
      ]
      const defaultColDef = {
        sortable: true,
        editable: false,
        filter: true,
        floatingFilter: true,
        resizable: true,
      };
      const url = "/itemmaster/AccountsGroup"
       
   const deleteButton = ({ value, data }) => {
       // Assign the value to the higher-scoped itemId
     const handleClick = () => { 
        handlAccountGroupShow()
       setAccountEdit(data);  setdeleteData({
        Name: "",
        id: ""
       }); 
       
     };
     
     const handledeleteConfomation = () => {
     console.log(data);
       handltoastDeleteConfomationShow();
       setdeleteData({
        Name:data.Accounts_Group_Name,
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
  const components = {
    deleteButton: deleteButton,
  };
  return (
    <>
    <SideNavbar/>
     <div className="container-md mt-5">
        <div className="itemMaster_Top mx-3 mt-3" style={{   width: "100%" }}>
            <div className="row py-3 ps-3">
                <div className="col-6">
                <h3>Account Group</h3>
                </div>
                <div className="col-6 text-end pe-4">
                <button type="button" className="btn btn-outline-primary" onClick={handlAccountGroupShow} ><i class='bx bxs-plus-circle' ></i> New</button>
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
      <AddAccountGroup AccountEdit={AccountEdit}
      setAccountEdit ={setAccountEdit}
        />

     </div>
    <DeleteConformation deleteData = {deletedata} 
    url = {url} />
    </>
  )
}

export default AccountGroup