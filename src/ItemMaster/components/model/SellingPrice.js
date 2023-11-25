import React, { useContext, useEffect, useState,useRef } from 'react' 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Field, Form } from 'formik';
import Select from 'react-select';
import DataContext from '../../../context/ItemMasterContext';

const SellingPrice = ({touched, errors, handleSellingClose ,Selling ,  setFieldValue
,  setAccountGroupType, ItemAccountSelect, type}) => {
 const {Accountdata,handlAccountShow,AccountGroupdata } = useContext(DataContext)
 const [salesAccountdata, setsalesAccountdata] = useState([])
 const [selectedAccount, setSelectedAccount] = useState({
  value: null,
  label: null,
});
const AccountsellingRef_ = useRef(null)
const handleSelectAccount = (option) => {
  setSelectedAccount( { value: option.value , label:  option.label });
  };
  
 
  useEffect(()=>{
    const updatedSalesAccountData = [];
 for (let Accountdata_ of Accountdata) {
        const group = Accountdata_.Accounts_Group_Name
        if(group){
          const data = AccountGroupdata.find(item => item.id === group )
          if(data.Accounts_Type ==="Asset" || data.Accounts_Type ==="Income" ){
      
            updatedSalesAccountData.push(Accountdata_)
          }
        }
      }
      setsalesAccountdata(updatedSalesAccountData)

     
  },[Accountdata, AccountGroupdata])
  return (
    <>
    <Form >
    <Modal show={Selling} onHide={()=>{
      handleSellingClose()
     
    }}
    size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Selling Price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div className="row">
             <div className="col-6">
             <label htmlFor="Item_Mrp" className='form-label    pt-2 ps-1'>Item Mrp </label>
                      <Field type='text' name='Item_Mrp'  className='w-100 form-control '/>
              
                      {  touched.Item_Mrp &&  errors.Item_Mrp && <small>{errors.Item_Mrp}</small>}
             </div>
             <div className="col-6">
             <label htmlFor="Item_min_price" className='form-label    pt-2 ps-1'>Item Min Price </label>
                      <Field type='text' name='Item_min_price'  className='w-100 form-control '/>
              
                      {  touched.Item_min_price &&  errors.Item_min_price && <small>{errors.Item_min_price}</small>}
             </div>
             <div className="col-6">
             <label htmlFor="Item_Sales_Account" className='form-label    pt-2 ps-1'>Item Sales Account 
             <i class='bx bx-plus-circle'    onClick={()=>{
                   handlAccountShow()
                  setAccountGroupType("sell")
                 }} ></i></label>
             <Select
                      name="Item_Sales_Account"
                       
                      options={salesAccountdata.map((item) => ({ value: item.id, label: item.Accounts_Name }))}
                      isSearchable={true}
                      ref={AccountsellingRef_} 
                      value={selectedAccount}
                      onChange={(option) => {setFieldValue('Item_Sales_Account', option ? option.value : null);
                      handleSelectAccount(option)} }
                    />
              
                      {  touched.Item_Sales_Account &&  errors.Item_Sales_Account && <small>{errors.Item_Sales_Account}</small>}
             </div>
            </div>    
            
  
            
            
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={()=>{
      handleSellingClose()
       
    }}>
            Save  
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
    </>
  )
}

export default SellingPrice