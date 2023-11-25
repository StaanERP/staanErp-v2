import React,{useContext} from 'react'
import "./ItemMaster.css"
import { TopNavbar } from '../../ItemMaster/components/topnavbar/TopNavbar'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DataContext from '../../context/ItemMasterContext';
import { SideNavbar } from '../../components/sideNavbar/SideNavbar';
import ItemaMasterModal from '../components/model/ItemaMasterModal';
import { useNavigate } from 'react-router-dom';
 

const ItemMaster = () => {
    const {itemmasterdata, ItemGroupdata , ItemUOMdata, Categorydata
    ,handlItemaMastereShow}  = useContext(DataContext)
    const Navigate = useNavigate();
    const handleAuthenticatedUser = () => {
      // Check if the user is authenticated (access token exists)
      const accessToken = localStorage.getItem('userid')
    
      if (accessToken) {
        // User is authenticated, perform actions accordingly
     
        console.log('User is authenticated!');
        // Call your API or perform other actions here
        
      } else {
        Navigate('/');
        console.log('User is not authenticated.');
      }
    }
    // const [gridApi, setGridApi] = useState()
    const LinkCellRenderer = ({ value, data }) => {
      const handleLinkClick = () => {
        const itemId = data.id;
        const url = `/ItemMaster/${itemId}`;
        window.location.href = url;
      };
  
      return (
        <div style={{ cursor: 'pointer',   color:'#29bffe' }} onClick={handleLinkClick}>
          {value}
        </div>
      );
    };
  

    const colums= [
        {
            headerName:'PartNumber' , field:'Item_PartCode',  
            
        },
        {
            headerName:'Name' , field:'Item_name',  
            cellRenderer: 'linkCellRenderer', // Use the custom cell renderer
        },
        {
          headerName:'Item Category' , field:"item_category",  
        },
        {
          headerName:'Item Group' , field:"item_group",  
        },
        {
          headerName:'UNIT' , field:"item_uom",  
        },
        {
          headerName:'PRODUCT/SERVICE' , field:"Item_type",  
        },
        {
          headerName:'BUY/Sell' , field:"Item_Indicator",  
        },
       
        {
          headerName:'SERVICEABLE' , field:"Service",  
        },
        {
          headerName:'Item Combo' , field:"Item_Combo",  
        },
        {
          headerName:'Keep Stock' , field:"Keep_stock",  
        },
        {
          headerName:'Active' , field:"Item_Active",  
        },
        
    ]
    const defaultColDef ={
      sortable:true, editable:false
      , filter:true, floatingFilter:true,  
      resizable: true,
    }
    const components = {
      linkCellRenderer: LinkCellRenderer,
    };
  
    const post_data = itemmasterdata.map((item) => {
        const item_group = ItemGroupdata.map((group) => {
          return item.Item_Group === group.id ? group.name : "";
        }).filter(name => name !== ""); // filter out empty strings
        
        const UOM = ItemUOMdata.map((uom) => {
          return item.Item_UOM === uom.id ? uom.name : "";
        }).filter(name => name !== ""); // filter out empty strings
    
        const category = Categorydata.map((Category) => {
          return item.category === Category.id ? Category.name : "";
        }).filter(name => name !== ""); // filter out empty strings
        handleAuthenticatedUser()
        return {
          ...item,
          item_group: String(item_group),
          item_uom: String(UOM),
          item_category : String(category),
        };
       
        
        
    
      });

  return (
    
     <> 
       <SideNavbar/>
      <div className='itemMaster_Wrap container-fluid ps-0'> 
       
        <TopNavbar/>
        
       <div className="itemMaster_Top mx-3 mt-3">
         <div className="row py-3 ps-3">
           <div className="col-6">
           <button type="button" class="btn btn-outline-secondary">Filters <i class='bx bx-filter-alt'></i></button>
         
           </div>
         <div className="col-6 text-end pe-4">
           <button type="button" className="btn btn-outline-primary" onClick={handlItemaMastereShow}><i class='bx bxs-plus-circle' ></i> New</button>
         </div>
         </div>
       </div>
       
        <div className='ag-theme-alpine itemMastertable   mx-3'   > 
                <AgGridReact rowData={post_data}
                columnDefs={colums}
                defaultColDef={defaultColDef} 
                components={components}
                pagination={true}
                />
        </div>
     
 </div>
      <ItemaMasterModal/>
     </>
  )
}

export default ItemMaster