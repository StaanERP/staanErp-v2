import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../../../context/ItemMasterContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {   Formik , Field, Form } from 'formik';
import { StoreSchema } from '../../../validations/itemmaster';
import Select from 'react-select';
import axiosInstance from '../../../../api/axoiss';

const StoreAdd = ({storeEditId,setstoreEditId }) => {
    const {storedata, storeAdd, handleStoreAddClose, setStoredata , Accountdata, userdata} =
     useContext(DataContext)
    const [selectAccount , setSelectAccount] = useState()
    const handleSelectAccount =(option)=>{
        setSelectAccount( { value: option.value , label:  option.label });
    }
    const [selectInCharge , setSelectInCharge] = useState()
    const handleSelectCharge =(option)=>{
        setSelectInCharge( { value: option.value , label:  option.label });
    }
    const [initialStore, setinitialStore] = useState({
        "StoreName": "",
        "matained": false,
        "Action": true,
        "StoreAccount": '',
        "StoreInCharge": ''
})



if (storeEditId) {
    const selectedStore = storedata.find(store => storeEditId === store.id);
     
    initialStore.StoreName = selectedStore['StoreName']
    initialStore.StoreAccount = selectedStore['StoreAccount']
    initialStore.StoreInCharge = selectedStore['StoreInCharge']
    initialStore.matained = selectedStore['matained'] 
    initialStore.Action = selectedStore['Action']
}
useEffect(() => {
  if (storeEditId === "") {
    setinitialStore({
      "StoreName": "",
      "matained": false,
      "Action": true,
      "StoreAccount": '',
      "StoreInCharge": ''
    });
  }
}, [storeEditId]);
// initialStore.StoreName =  ""
    // initialStore.StoreAccount = ""
    // initialStore.StoreInCharge = ""
    // initialStore.matained = false
    // initialStore.Action = true
if (storeEditId === "storeEditId"){
  setinitialStore(
    {
      "StoreName": "",
      "matained": false,
      "Action": true,
      "StoreAccount": '',
      "StoreInCharge": ''
}
  )
}
function reset_form(){ 

    setSelectAccount( { value: "" , label:  "" });
    setSelectInCharge( { value: "" , label:  "" });


}


  
  
  useEffect(() => {
    if (initialStore.StoreAccount !== '') {
      const defaultSelectedAccount = Accountdata.find(item => item.id === initialStore.StoreAccount);
  
      if (defaultSelectedAccount) {
        setSelectAccount({ value: defaultSelectedAccount.id, label: defaultSelectedAccount.Accounts_Name });
      }
    }
    if (initialStore.StoreInCharge !== '') {
        const defaultSelecteduser = userdata.find(item => item.id === initialStore.StoreInCharge);
    
        if (defaultSelecteduser) {
            setSelectInCharge({ value: defaultSelecteduser.id, label: defaultSelecteduser.username });
        }
      }
  }, [initialStore.StoreAccount,initialStore.StoreInCharge ]);
    
    

    const handlesubmit = async (values, { setSubmitting,   setErrors, resetForm })=>{
    
        const SaveStore ={
            "StoreName": values['StoreName'],
            "matained": values['matained'],
            "Action": values['Action'],
            "StoreAccount": values['StoreAccount'],
            "StoreInCharge": values['StoreInCharge']
        }
        if(storeEditId){
            const response = await axiosInstance.put(`/itemmaster/Store/${storeEditId}`, SaveStore)
            const responseData = Array.isArray(response.data) ? response.data : [response.data];
           
            setStoredata((prevData) => {
                return prevData.map((item) => {
                  console.log(item.id, responseData[0].id); // Log the IDs for debugging
                  return item.id === responseData[0].id ? responseData[0] : item;
                });
              }); 
              setstoreEditId('') 
              handleStoreAddClose() 
              try{
                reset_form()
              }catch(error){ 
                error.log(error);
                  
              }
                   
 
            
        }else{
            try{
                const response = await axiosInstance.post("/itemmaster/Store", SaveStore)
                if (response && response.data) {
                    const responseData = Array.isArray(response.data) ? response.data : [response.data];
                    setStoredata(prevData => [...prevData, ...responseData]);
             
                    handleStoreAddClose()
                    setstoreEditId('')  
                }else{
                    console.error('Invalid response:', response);
                }
               
            } catch(error){
                console.log(error);
            } 

        }
       
         
        
    }
  return (
     <>
      <Modal   size="lg"  show={storeAdd} onHide={()=>{
        handleStoreAddClose()
        setstoreEditId('')
        reset_form()
      }}>
        <Modal.Header closeButton>
        <Modal.Title>Store Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Formik initialValues={initialStore} 
         onSubmit={handlesubmit}
         validationSchema={StoreSchema}>
         {({errors, touched, isSubmitting, values, setFieldValue , Formik, formikProps })=>(
         <>
         <Form>
            <div className="row">
                <div className="col-6">
                      <label htmlFor="StoreName" className='form-label    pt-2 ps-1'>Name  </label>
                      <Field type='text' id='StoreName' name='StoreName'  placeholder='' className='w-100 form-control '/>
                      {  touched.StoreName &&  errors.StoreName && <small>{errors.StoreName}</small>}
                </div>
                <div className="col-6">
                      <label htmlFor="Account" className='form-label    pt-2 ps-1'>Account</label>
                      <Select
                            name="Account"
                            options={Accountdata.map((item) => ({ value: item.id, label: item.Accounts_Name }))}
                            isSearchable={true} 
                            value={selectAccount}
                            onChange={(option) => {setFieldValue('StoreAccount', option ? option.value : null);
                            handleSelectAccount(option)} }
                      />
                      {  touched.StoreAccount &&  errors.StoreAccount && <small>{errors.StoreAccount}</small>}
                </div>
                <div className="col-6">
                      <label htmlFor="Store In Charge" className='form-label    pt-2 ps-1'>Store InCharge</label>
                      <Select
                            name="StoreInCharge"
                            options={userdata.map((item) => ({ value: item.id, label: item.username }))}
                            isSearchable={true} 
                            value={selectInCharge}
                            onChange={(option) => {setFieldValue('StoreInCharge', option ? option.value : null);
                            handleSelectCharge(option)} }
                      />
                      {  touched.StoreInCharge &&  errors.StoreInCharge && <small>{errors.StoreInCharge}</small>}
                </div>
                <div className="col-3"  style={{ marginTop: "40px" }}>
                          <label>
                          Maintained
                          <Field type="checkbox" name="matained"   className='ms-4'/>
                          
                          </label>
                </div>
                <div className="col-3" style={{ marginTop: "40px" }}>
                          <label>
                          Active
                          <Field type="checkbox" name="Action"   className='ms-4'/>
                          
                          </label>
                </div>
            </div>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{handleStoreAddClose();
                   setstoreEditId('');
                   reset_form()}}>
                    Close
                </Button>
                <Button type='submit' variant="primary" >
                    Save
                </Button>
            </Modal.Footer>
         </Form>
         </>
         )}
         </Formik>

        </Modal.Body>
      
      </Modal>
     </>
  )
}

export default StoreAdd