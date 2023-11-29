import React, { useContext, useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { SideNavbar } from '../../../components/sideNavbar/SideNavbar';
import DataContext from '../../../context/ItemMasterContext';
import StockAdjusFrom from  "./StockAdjusFrom"

const InventoryApprovals = () => {
    const {stockInventory, itemmasterdata, storedata, userdata} = useContext(DataContext)
    const [post , setPost] = useState('')
    const [stockFrom , setStockFrom] = useState(false)
    const handStockCose = () => setStockFrom(false);
    const handStockShow = () => setStockFrom(true);
    useEffect(()=>{
       const postInventory = stockInventory.map((itemData)=>{
           const itemmaster_code = itemmasterdata.map((item)=>{
            return Number(itemData.part_no) === Number(item.id ) ?  item.Item_PartCode : "";
           }).filter(name => name !== "");
           const itemmaster_Name = itemmasterdata.map((item)=>{
            return Number(itemData.part_no) === Number(item.id ) ?  item.Item_name : "";
           }).filter(name => name !== "");
           const store = storedata.map((stores)=>{
            return Number(itemData.store) === Number(stores.id ) ?  stores.StoreName : "";
           }).filter(name => name !== "");
           const savedby = userdata.map((user)=>{
            return Number(itemData.users) === Number(user.id ) ?  user.username : "";
           }).filter(name => name !== ""); 
  
 
         
        return {
        ...itemData,
        part_no_: String(itemmaster_code),
        part_name: String(itemmaster_Name),
        store_: String(store ),
        saved : String(savedby)
        };
       })
   
       setPost(postInventory)
     
     
    },[stockInventory, itemmasterdata, storedata, userdata])
    const columns = [
        { headerName: "Part Code", field: "part_no_",flex: 1 },
        { headerName: "Part Name", field: "part_name",flex: 1 }, 
        { headerName: "Qty", field: "qty",flex: 1 }, 
        { headerName: "store", field: "store_",flex: 1 }, 
        { headerName: "User", field: "saved",flex: 1 }, 
      ]
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
                        <h3>Inventory Approvals</h3>
                    </div> 
                    <div className="col-6 text-end ">
                        <button type="button" class="btn btn-outline-success me-3" onClick={handStockShow} >Add/reduce</button>
                    </div>
                </div>
            </div>
            <div className='ag-theme-alpine mx-3   ' style={{ height: "80%", width: "100%" }}>
                <AgGridReact
                rowData={post}
                columnDefs={columns}
                defaultColDef={defaultColDef}
                pagination={true}
                />
            </div>
 
         <StockAdjusFrom
          stockFrom = {stockFrom}
          handStockCose = {handStockCose}/>
    
    </div>
    
   </>
  )
}

export default InventoryApprovals