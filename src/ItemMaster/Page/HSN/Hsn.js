import React, { useContext, useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { SideNavbar } from '../../../components/sideNavbar/SideNavbar';
import DataContext from '../../../context/ItemMasterContext';
import AddHsn from '../../components/model/AddHsn';
import DeleteConformation from '../../../components/deleteConformations.js/DeleteConformation';

const Hsn = () => {
    const {ItemHsndata,   handlHSNShow, handltoastDeleteConfomationShow} = useContext(DataContext)
    const [post , setPost] = useState([])
    const [HSNedit, setHsnEdit] = useState('')
    const [deleteData, setDeleteData] = useState('')
    useEffect(()=>{
        setPost(ItemHsndata)
    },[ItemHsndata])

    const url = "/itemmaster/hsn"
    
    const itemId = ""    
 
    const deleteButton = ({ value, data }) => {
      itemId = data.id; // Assign the value to the higher-scoped itemId
      const handleClick = () => {
        handlHSNShow(); 
        setHsnEdit(data);
      };
      
      const handledeleteConfomation = () => {
        
        handltoastDeleteConfomationShow();
        setDeleteData({
         Name:data.hsn_code,
         id: data.id
        }); 
    
      };
     
 
     return ( 
       <>
       <button className='btn btn-outline-danger btn-sm px-3 mx-2' onClick={handledeleteConfomation}    ><i class="fa-solid fa-trash " ></i> </button>
       <button className='btn btn-outline-success btn-sm px-3 mx-2' onClick={handleClick}> <i class="fa-solid fa-pen   " ></i> </button>      
       
       </>
     );
   } 
     
  const columns = [
  
    { headerName: "Hsn Code ", field: "hsn_code",flex: 1 },
    { headerName: "Type", field: "hsn_type",flex: 1 },
    { headerName: "Gst", field: "gst_rate",flex: 1 },
    { headerName: "Description", field: "Description", flex: 1 },
    { headerName: "Cess Rate", field: "cess_rate",flex: 1 },
    { headerName: "RCM", field: "rcm",flex: 1 },
    { headerName: "ITC", field: "itc",flex: 1 },
    { headerName: "Created Date", field: 'created_at'},
    { headerName: "USER", field: 'modified_by', hide:true},
    { headerName: "Action", cellRenderer: 'deleteButton'},
  ]
  const components = {
    deleteButton: deleteButton,
  };
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
      <div className="container-lg">
        <div className="itemMaster_Top mx-3 mt-3" style={{   width: "100%" }}>
            <div className="row py-3 ps-3">
            <div className="col-6">
            <h3>HSN</h3>
            </div>
            <div className="col-6 text-end pe-4">
            <button type="button" className="btn btn-outline-primary" onClick={handlHSNShow}  ><i class='bx bxs-plus-circle' ></i> New</button>
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
        <AddHsn HSNedit={HSNedit} 
         setHsnEdit= {setHsnEdit}/>
         <DeleteConformation url  = {url}
         deleteData= {deleteData} />
      </div>
    </>
  )
}

export default Hsn