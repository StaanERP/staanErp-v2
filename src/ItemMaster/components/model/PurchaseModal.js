import React, {useState, useContext,useEffect,useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {  Field, Form } from 'formik';
import Select from 'react-select'; 
import DataContext from '../../../context/ItemMasterContext';

const PurchaseModal = ({touched, errors, handlePurchaseClose ,setFieldValue, Purchase}) => {
  
 const { ItemUOMdata,  Accountdata,  AccountGroupdata , setAccountGroupType,handlAccountShow,  
  ItemAccountSelect, type}
  =  useContext(DataContext)

  const [purchaseAccountdata, setpurchaseAccountdata] = useState([])
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
  
  },[AccountGroupdata, Accountdata])



  const AccountRef = useRef(null)
 
  const [selectedAccount_, setSelectedAccount] = useState({
    value: null,
    label: null,
  });
  const handleSelectAccount = (option) => {
    console.log(option);
    setSelectedAccount( { value: option.value , label:  option.label });
    };
    useEffect(() => {
      const selectedItemID = ItemAccountSelect.id;
      const selectedItemlable = ItemAccountSelect.lable;
      
       if(selectedItemID && type ==="Buyer" ){
        setSelectedAccount({ value: selectedItemID, label:  selectedItemlable })
        console.log({ value: selectedItemID, label:  selectedItemlable });
        AccountRef.current.setValue({ value: selectedItemID, label:  selectedItemlable })
       }
  
    }, [ItemAccountSelect, type ]);
  return (
    <>
    <Form>
          <Modal show={Purchase} onHide={()=>{
            handlePurchaseClose()
             
          }}
          size="lg">
        <Modal.Header closeButton>
          {/* <Modal.Title>Purchase</Modal.Title> */}
        </Modal.Header>
        <Modal.Body> 
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
                <label htmlFor="Item_Purchase_Account" className='form-label    pt-2 ps-1'>Item Purchase Account <i class='bx bx-plus-circle'
                 onClick={()=>{
                   
                  handlAccountShow()
                  setAccountGroupType('purchase')
             
                 }} ></i></label>
                        
                      <Select
                      options={purchaseAccountdata.map((item) => ({ value: item.id, label: item.Accounts_Name }))}
                      isSearchable={true}
                      ref={AccountRef} 
                       value={selectedAccount_}
                      onChange={(option) => {setFieldValue('Item_Purchase_Account', option ? option.value : null);
                      handleSelectAccount(option);  }}
                      
                    />
                      {  touched.Item_Purchase_Account &&  errors.Item_Purchase_Account && <small>{errors.Item_Purchase_Account}</small>}
                </div>
                
    

             </div>

        </Modal.Body>
        <Modal.Footer>
       
          <Button variant="primary" onClick={()=>{
            handlePurchaseClose()
           
          }}>
            Save  
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
    </>
  )
}

export default PurchaseModal