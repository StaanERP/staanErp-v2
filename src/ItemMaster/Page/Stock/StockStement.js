import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useContext } from 'react';
import DataContext from '../../../context/ItemMasterContext';
import { SideNavbar } from '../../../components/sideNavbar/SideNavbar';
import { useState } from 'react';
import { useEffect } from 'react';


const StockStement = () => {
    const {itemmasterdata, stock, storedata} = useContext(DataContext)
    const [post , setPost] = useState()


    
    
    const columns = [
  
        { headerName: "Part Code", field: "Item_PartCode",flex: 1 },
        { headerName: "Part Name", field: "Item_name",flex: 1 }, 
        { headerName: "Qty", field: "Qty",flex: 1 }, 
        { headerName: "store", field: "store",flex: 1 }, 
        
      ]
      const defaultColDef = {
        sortable: true,
        editable: false,
        filter: true,
        floatingFilter: true,
        resizable: true,
      };

        useEffect(() => {
            const updatePostStatement = async () => {
              const updatedPostStatement = await Promise.all(
                itemmasterdata.map(async (item) => {
                  const qty = await Promise.all(
                    stock
                      .filter((stockData) => Number(item.id) === Number(stockData.part_no))
                      .map(async (stockData) => {
                        return stockData.currentStock;
                      })
                  );
          
                  const store = await Promise.all(
                    stock
                      .filter((stockData) => Number(item.id) === Number(stockData.part_no))
                      .map(async (stockData) => {
                        const getStock = await Promise.all(
                          storedata
                            .filter((store) => Number(stockData.store) === Number(store.id))
                            .map(async (store) => store.StoreName)
                        );
                        return getStock;
                      })
                  );
          
                  return {
                    ...item,
                    Qty: String(qty),
                    store: String(store),
                  };
                })
              );
          
              setPost(updatedPostStatement);
            };
          
            updatePostStatement();
          }, [itemmasterdata, stock, storedata]);
          
     

  return (
    <>
    <SideNavbar/>
        <div className="container-lg">
            <div className="itemMaster_Top mx-3 mt-3" style={{   width: "100%" }}>
                <div className="row py-3 ps-3">
                <div className="col-6">
                <h3>Stock Statement</h3>
                </div>
                  
                </div>
            </div>
            <div className='ag-theme-alpine mx-3   ' style={{ height: "80%", width: "100%" }}>
                <AgGridReact
                rowData={post}
                columnDefs={columns}
                defaultColDef={defaultColDef}
                // components={components}
                pagination={true}
                />
                </div>
       
      </div>  
      
       
 
    </>
  )
}

export default StockStement