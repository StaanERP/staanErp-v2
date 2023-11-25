import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {     Field, Form } from 'formik';
import Select from 'react-select';
import DataContext from '../../../context/ItemMasterContext';

const PurchaseSellingModal = ({touched, errors,  handlebothClose ,Both ,  setFieldValue, 
   setAccountGroupType}) => {
  const {ItemUOMdata, Accountdata, handlAccountShow , AccountGroupdata} = useContext(DataContext)
  //  ItemGroupdata.find(item => item.id === initialMasterData['Item_Group']);
  const [purchaseAccountdata, setpurchaseAccountdata] = useState([])
  const [salesAccountdata, setsalesAccountdata] = useState([])

useEffect(()=>{
  const updatedPurchaseAccountData = [];
  for (let Accountdata_ of Accountdata) {
    const group = Accountdata_.Accounts_Group_Name
    if(group){
      const data = AccountGroupdata.find(item => item.id === group )
      if(data.Accounts_Type ==="Liabilities" || data.Accounts_Type ==="Expenses" ){
 
        updatedPurchaseAccountData.push(Accountdata_)
      }
    }
 }
 setpurchaseAccountdata(updatedPurchaseAccountData)

 const updatedSalesAccountData = [];
 for (let Accountdata_ of Accountdata) {
  const group = Accountdata_.Accounts_Group_Name
  if(group){
    const data = AccountGroupdata.find(item => item.id === group )
    if(data.Accounts_Type === "Asset" || data.Accounts_Type ==="Income" ){
 
      updatedSalesAccountData.push(Accountdata_)
    }
  }
}
setsalesAccountdata(updatedSalesAccountData)


},[Accountdata, AccountGroupdata])
 

  return (
     <>
     <Form>
       <Modal show={Both} onHide={handlebothClose}
         size="lg">
        <Modal.Header closeButton>
          {/* <Modal.Title>Purchase/Selling</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
           <div className="row">
            <h3>Purchase</h3>
           <div className="row">
                <div className="col-6">
                <label htmlFor="Item_Cost" className='form-label    pt-2 ps-1'>Item Cost </label>
                      <Field type='text' name='Item_Cost'  placeholder='' className='w-100 form-control '/>
              
                      {  touched.Item_Cost &&  errors.Item_Cost && <small>{errors.Item_Cost}</small>}
                </div>
                <div className="col-6">
                <label htmlFor="Purchase_uom" className='form-label    pt-2 ps-1'>Unit of Measurement(UOM)</label>
                        <Select
                      name="Purchase_uom"
                       
                      options={ItemUOMdata.map((item) => ({ value: item.id, label: item.name }))}
                      isSearchable={true}
                     
                      onChange={(option) => setFieldValue('Purchase_uom', option ? option.value : null)}
                    />
                      {  touched.Purchase_uom &&  errors.Purchase_uom && <small>{errors.Purchase_uom}</small>}

                      
                </div>
                <div className="col-6">
                <label htmlFor="Item_Safe_Stock" className='form-label    pt-2 ps-1'>Item Safe Stock </label>
                      <Field type='text' name='Item_Safe_Stock'  placeholder='' className='w-100 form-control '/>
              
                      {  touched.Item_Safe_Stock &&  errors.Item_Safe_Stock && <small>{errors.Item_Safe_Stock}</small>}
                </div>
                <div className="col-6">
                <label htmlFor="Item_Order_Qty" className='form-label    pt-2 ps-1'>Item Order Qty </label>
                      <Field type='text' name='Item_Order_Qty'  placeholder='' className='w-100 form-control '/>
              
                      {  touched.Item_Order_Qty &&  errors.Item_Order_Qty && <small>{errors.Item_Order_Qty}</small>}
                </div>
                <div className="col-6">
                <label htmlFor="Item_Leadtime" className='form-label    pt-2 ps-1'>Item Leadtime </label>
                      <Field type='text' name='Item_Leadtime'  placeholder='' className='w-100 form-control '/>
              
                      {  touched.Item_Leadtime &&  errors.Item_Leadtime && <small>{errors.Item_Leadtime}</small>}
                </div>
                <div className="col-6">
                <label htmlFor="Item_Purchase_Account" className='form-label    pt-2 ps-1'>Item Purchase Account <i class='bx bx-plus-circle' onClick={()=>{
                   handlAccountShow()
                  setAccountGroupType("purchase")
                 
                 }} ></i></label>
                        
                      <Select
                      name="Item_Purchase_Account"
                       
                      options={purchaseAccountdata.map((item) => ({ value: item.id, label: item.Accounts_Name }))}
                      isSearchable={true}
                     
                      onChange={(option) => setFieldValue('Item_Purchase_Account', option ? option.value : null)}
                    />
                      {  touched.Item_Purchase_Account &&  errors.Item_Purchase_Account && <small>{errors.Item_Purchase_Account}</small>}
                </div>

             </div>

             <div className="row">
                <h3>Selling</h3>
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
             <label htmlFor="Item_Sales_Account" className='form-label    pt-2 ps-1'>Item Sales Account <i class='bx bx-plus-circle'   onClick={()=>{
                   handlAccountShow()
                  setAccountGroupType("sell")
                 }}></i></label>
             <Select
                      name="Item_Sales_Account"
                       
                      options={ salesAccountdata.map((item) => ({
                        value: item.id,
                        label: item.Accounts_Name,
                      }))}
                      isSearchable={true}
                     
                      onChange={(option) => setFieldValue('Item_Sales_Account', option ? option.value : null)}
                    />
              
                      {  touched.Item_Sales_Account &&  errors.Item_Sales_Account && <small>{errors.Item_Sales_Account}</small>}
             </div>
            </div>    

           </div>


        </Modal.Body>
        <Modal.Footer>
     
          <Button variant="primary" onClick={handlebothClose}>
            Save  
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
     </>
  )
}

export default PurchaseSellingModal