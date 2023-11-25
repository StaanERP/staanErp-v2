import React, { useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DataContext from '../../../context/ItemMasterContext';
import AddItemGroup from '../../components/model/AddItemGroup';
import { SideNavbar } from '../../../components/sideNavbar/SideNavbar';

const ItemGroup = () => {
    const  {handlitemGroupShow, ItemGroupdata, ItemHsndata, } = useContext(DataContext)
    const [postData, setPostData] = useState()
    const [itemGroupEditId , setitemGroupEditId] = useState()

    const url = "/itemmaster/itemGroup"
   
    let itemId;
 
    const deleteButton = ({ value, data }) => {
      itemId = data.id; // Assign the value to the higher-scoped itemId
      const handleClick = () => {
        handlitemGroupShow();
        console.log(data);
        setitemGroupEditId(data);
      };
      
    //   const handledeleteConfomation = () => {
        
    //     handltoastDeleteConfomationShow();
    //     setdeleteData({
    //      Name:data.StoreName,
    //      id: data.id
    //     }); 
    
    //   };
     
 
     return ( 
       <>
       <button className='btn btn-outline-danger btn-sm px-3 mx-2'   ><i class="fa-solid fa-trash " ></i> </button>
       <button className='btn btn-outline-success btn-sm px-3 mx-2' onClick={handleClick}> <i class="fa-solid fa-pen   " ></i> </button>      
       
       </>
     );
   } 

  

    // useEffect(()=>{
    //     setPostData(ItemGroupdata) 
    // },[ItemGroupdata])

    useEffect(()=>{
        const postGroupData = ItemGroupdata.map((item)=>{
               const parentGroup = ItemGroupdata.map((parent)=>{  
                return  Number(item.Parent_Group) ===  Number(parent.id) ? parent.name : "";
               }).filter(name => name !== ""); 
             
               const HSNS = ItemHsndata.map((HSN)=>{
                return  item.hsn === HSN.id ? HSN.hsn_code : "";
               }).filter(name => name !== "");
              
               return {
                ...item,
                parent: String(parentGroup),
                HSN : String(HSNS)
            
              };
        })
        setPostData(postGroupData)
      },[ItemGroupdata])
    const columns = [
  
        { headerName: "Name", field: "name",flex: 1 },
        { headerName: "Parent Group", field: "parent",flex: 1 },
        { headerName: "HSN", field: "HSN",flex: 1 },
        { headerName: "Saved by", field: "modified_by", flex: 1,hide: true },
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
        <div className='container-md'>
            <div className="itemMaster_Top mx-3 mt-3" style={{   width: "100%" }}>
            <div className='container-lg'>
                <div className="row py-3 ps-3">
                <div className="col-6">
                <h3>Item Group</h3>
                </div>
                <div className="col-6 text-end pe-4">
                <button type="button" className="btn btn-outline-primary" onClick={()=>{handlitemGroupShow();
                    }}><i class='bx bxs-plus-circle' ></i> New</button>
                    </div>
                </div>
            </div>
            </div>
            <div className='ag-theme-alpine mx-3   ' style={{ height: "80%", width: "100%" }}>
                <AgGridReact
                rowData={postData}
                columnDefs={columns}
                defaultColDef={defaultColDef}
                components={components}
                pagination={true}
                />
            </div>
        </div>
     <AddItemGroup itemGroupEditId ={itemGroupEditId}
      setitemGroupEditId ={setitemGroupEditId}/>
     
     </>
  )
}

export default ItemGroup