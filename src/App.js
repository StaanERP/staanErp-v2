 
import "./App.css"
import { Route, Routes  } from 'react-router-dom';
import { DataProvider } from './context/ItemMasterContext';
import ItemMaster from './ItemMaster/Page/ItemMaster';
import Login from './components/login/Login';
// import NotificationSaved from "./components/notifications/NotificationSaved";
import ItemMasterEdit from "./ItemMaster/Page/itemmasterEdit/ItemMasterEdit";
import Store from "./ItemMaster/Page/Store/Store";
import Unit from "./ItemMaster/Page/Uom/Unit";
import ItemGroup from "./ItemMaster/Page/Itemgroup/ItemGroup";
import Hsn from "./ItemMaster/Page/HSN/Hsn"; 
import AccountMasterlist from "./ItemMaster/Page/AccountMaster/AccountMasterlist";
// import AddAccountGroup from "./ItemMaster/components/model/AddAccountGroup";
import AccountGroup from "./ItemMaster/Page/AccountGroup/AccountGroup";
import EnquiryFrom from "./Enquiry_Conference/Component/EnquiryFrom/EnquiryFrom"; 
import Conference from "./Enquiry_Conference/Component/ConferenceTable/Conference";
import EnquiryTable from "./Enquiry_Conference/Component/EnquiryFrom/EnquiryTable";
import StockStement from "./ItemMaster/Page/Stock/StockStement";
import InventoryApprovals from "./ItemMaster/Page/Stock/InventoryApprovals";
import TextEditer from "./components/textEditer/TextEditer";


function App({msalInstance}) {


  return (
    <div className="App">
    
       <DataProvider msalInstance ={msalInstance}>
 
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/ItemMaster' element={<ItemMaster/>}/>
      <Route path='/ItemMaster/:id' element={<ItemMasterEdit/>}/>
      <Route path='/store' element={<Store/>}/> 
      <Route path='/unit' element={<Unit/>}/> 
      <Route path='/item_Group' element={<ItemGroup/>}/> 
      <Route path='/hsn' element={<Hsn/>}/>  
      <Route path='/account' element={<AccountMasterlist/>}/>  
      <Route path='/account_Group' element={<AccountGroup/>}/>
      <Route path='/Enquiry' element={<EnquiryFrom/>}/> 
      <Route path='/EnquiryDetieal' element={<EnquiryTable/>}/> 
      
      <Route path='/conference' element={<Conference/>}/> 
      <Route path='/StockStement' element={<StockStement/>}/> 
      <Route path='/inventoryApproval' element={<InventoryApprovals/>}/> 
      <Route path='/textEditer' element={<TextEditer/>}/> 

      
       </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
