import React, { useContext, useEffect, useState} from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { SideNavbar } from '../../../components/sideNavbar/SideNavbar';
import DataContext from '../../../context/ItemMasterContext';
import AddUom from '../../components/model/AddUom'; 
import DeleteConformation from '../../../components/deleteConformations.js/DeleteConformation';
const Unit = () => {
    const {ItemUOMdata, handlUOMShow, handltoastDeleteConfomationShow} = useContext(DataContext)
    const [post, setPost] = useState([])
    const [uomEditId , setuomEditId] = useState('')
    const [deleteData, setdeleteData] = useState({  Name:"",id:""})

    useEffect(()=>{
        setPost(ItemUOMdata)
        
    },[ItemUOMdata])
    const columns = [
  
        { headerName: "Name", field: "name",flex: 1 },
        { headerName: "E Way Bill Uom", field: "e_way_bill_uom",flex: 1 },
        { headerName: "Description", field: "Description",flex: 1 },
        { headerName: "User", field: "modified_by", flex: 1 ,hide: true},
        { headerName: "Action", cellRenderer: 'deleteButton'},
      ]
      const defaultColDef = {
                sortable: true,
                editable: false,
                filter: true,
                floatingFilter: true,
                resizable: true,
              };


            
   

       const url = "/itemmaster/UOM"
        const itemId = ""       
            
        const deleteButton = ({ value, data }) => {
                itemId = data.id; // Assign the value to the higher-scoped itemId
                const handleClick = () => {
                  
                    handlUOMShow()
                    setuomEditId(data);
                };
                
                const handledeleteConfomation = () => {
                  
                  handltoastDeleteConfomationShow();
                  setdeleteData({
                   Name:data.name,
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
      <div className='container-md'>
            <div className="itemMaster_Top mx-3 mt-3" style={{   width: "100%" }}>
                <div className="row py-3 ps-3">
                    <div className="col-6">
                        <h3>Unit</h3>
                    </div>
                    <div className="col-6 text-end pe-4">
                        <button type="button" className="btn btn-outline-primary" onClick={handlUOMShow}><i class='bx bxs-plus-circle' ></i> New</button>
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
      <AddUom uomEditId = {uomEditId} 
       setuomEditId = {setuomEditId}/>

      </div>
      <DeleteConformation 
      deleteData = {deleteData}
      url={url}/>
     
     
     </>
  )
}

export default Unit