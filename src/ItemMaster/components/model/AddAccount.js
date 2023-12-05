import React, {useContext, useRef, useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import {Formik , Field, Form } from 'formik';
import { itemAccountSchema } from '../../validations/itemmaster';
import DataContext from '../../../context/ItemMasterContext';
import axiosInstance from '../../../api/axoiss';

const AddAccount = ({accountEditId, setAccountEditId}) => {

   const {ItemAccountAdd, handleAccountClose , AccountGroupdata,
    setAccountData,setToastSave, handlAccountGroupShow , ItemAccountGroupSelect,
    setItemAccountSelect, AccountGroupType} = useContext(DataContext)
    const [error , setError] = useState('')
   const  accountgroupRef =useRef(null)
   const [saparatedAccountGroup, setsaparatedAccountGroup] = useState([])
   const [initialAccount, setInitialAccount] = useState({
      Name : "",
        Active : true,
        Gst : false,
        tds: false, 
        Group: '',
        modified_by: 10
   })

   if(accountEditId){ 
    initialAccount.Name =  accountEditId['Accounts_Name']
    initialAccount.Group =  accountEditId['Accounts_Group_Name']
    initialAccount.Gst =  accountEditId['GST_Applicable']
    initialAccount.tds =  accountEditId['TDS']
    initialAccount.Active =  accountEditId['Accounts_Active']

   }
   useEffect(()=>{
    setInitialAccount({
      Name : "",
        Active : true,
        Gst : false,
        tds: false, 
        Group: '',
        modified_by: 10
   })
   },[accountEditId])
 
   function reset_form(){ 

    initialAccount.Name =  ''
    initialAccount.Group = ""
    initialAccount.Gst =   false
    initialAccount.tds =   false
    initialAccount.Active = true
    setSelectedAccountGroup( { value: "" , label: "" });

   }
  
    useEffect(()=>{
      if(initialAccount.Group){
        const defaultSelectedGroup = AccountGroupdata.find(item => item.id === initialAccount.Group);
   
        
      if (defaultSelectedGroup) {
        setSelectedAccountGroup({ value: defaultSelectedGroup.id, label: defaultSelectedGroup.Accounts_Group_Name });
      }
      }
    },[initialAccount.Group, AccountGroupdata])

   useEffect(()=>{
    const updatedAccountgroup = []
 
      for (let AccountGroupdata_ of AccountGroupdata) {
        if (AccountGroupType === "purchase"){
          if(AccountGroupdata_.Accounts_Type ==="Liabilities" || AccountGroupdata_.Accounts_Type ==="Expenses" ){
            updatedAccountgroup.push(AccountGroupdata_)
          }
           
        }else if  (AccountGroupType === "sell"){
          if(AccountGroupdata_.Accounts_Type ==="Asset" || AccountGroupdata_.Accounts_Type ==="Income" ){
            updatedAccountgroup.push(AccountGroupdata_)
          }
    
        } 
        else if  (AccountGroupType === "all"){
          if(AccountGroupdata_.Accounts_Type ==="Asset" || AccountGroupdata_.Accounts_Type === "Income"|| 
          AccountGroupdata_.Accounts_Type ==="Liabilities" || AccountGroupdata_.Accounts_Type ==="Expenses"){
            updatedAccountgroup.push(AccountGroupdata_)
          }
    
        } 
        setsaparatedAccountGroup(updatedAccountgroup)
         
       }
  
 
   },[AccountGroupType, AccountGroupdata])
   
   const [selectedAccountGroup, setSelectedAccountGroup] = useState();
   const handleSelectAccountgroup = (option) => {

    try{
      setSelectedAccountGroup( { value: option.value , label:  option.label });
    } catch(error){
      console.log(error);
    }
     };
   useEffect(() => {
    const selectedItemID = ItemAccountGroupSelect.id;
    const selectedItemlable = ItemAccountGroupSelect.lable;
    if (accountgroupRef.current) {
      accountgroupRef.current.setValue({ value: selectedItemID, label: selectedItemlable });

   
    }
    setSelectedAccountGroup({ value: selectedItemID, label:  selectedItemlable })
   
  }, [ItemAccountGroupSelect]);
   const handleSubmit =async  (values, { setSubmitting, resetForm }) =>{
     const saveAccountMaster ={
      Accounts_Name: values['Name'],
      Accounts_Active: values['Active'],
      GST_Applicable: values['Gst'],
      TDS: values['tds'],
      Accounts_Group_Name: values['Group'],
      modified_by: 1
    } 
    if(accountEditId){
      const respones = await axiosInstance.put(`/itemmaster/AccountsMaster/${accountEditId.id}`, saveAccountMaster);
        
      const responseData = Array.isArray(respones?.data) ? respones.data : [respones?.data];
      setAccountData((prevData) => {
        return prevData.map((item) => { // Log the IDs for debugging
          return item.id === responseData[0].id ? responseData[0] : item;
        });
 
      });
      handleAccountClose();
      resetForm();
      reset_form()
              
    }else{
      try {
        const respones = await axiosInstance.post('/itemmaster/AccountsMaster', saveAccountMaster);
        
        const responseData = Array.isArray(respones?.data) ? respones.data : [respones?.data];
      
        if (responseData) {
          console.log(responseData[0]['id'],"-->>>");
          setItemAccountSelect({id:responseData[0]["id"],
          lable: responseData[0]["Accounts_Name"]})
          setAccountData(prevData => [...responseData, ...prevData]);
         
          setToastSave(true);
          resetForm();
          handleAccountClose();
          // accountgroupRef.current.clearValue();
          setTimeout(() => {
            setToastSave(false);
          }, 3000);
          setError('');
          reset_form()
        } else {
          // Handle the case where responseData is null or undefined
          console.error('API response data is null or undefined');
          setError('Unexpected response from the server');
        }
      }catch (errors){
        console.error('Validation errors:', errors.response.data[0]);
        console.error('Validation errors:', errors.response?.data?.[0]); // Use optional chaining
    if (errors.response && errors.response.status === 400) {
      // Handle validation errors
      const validationErrors = errors.response.data;
      if (validationErrors?.Accounts_Name && validationErrors.Accounts_Name[0] === "accounts master with this Accounts Name already exists.") {
        setError("accounts master with this Accounts Name already exists.");
      } else {
        // Handle other validation errors or generic error messages
        setError(validationErrors);
        console.error('Validation errors:', validationErrors);
      }
    } else {
      // Handle other types of errors (network, server, etc.)
      setError(errors.response?.data || 'Unknown error occurred'); // Fallback message for unknown errors
      console.error('API request failed:', errors);
    }
      } finally{
        setSubmitting(false);
      }

    }
 
   }
   

  return (
     <>
     <Modal show={ItemAccountAdd} onHide={()=>{
    handleAccountClose()
    setError()
    if(accountEditId){
      setAccountEditId()
    }
   
    reset_form()
  }}  size="lg">
    
        <Modal.Header closeButton>
          <Modal.Title> Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='text-danger text-center' >{error ? error : ""}</div>
           <Formik initialValues={initialAccount}
           validationSchema={itemAccountSchema}
           onSubmit={handleSubmit}>
              {({errors, touched, isSubmitting , setFieldValue})=>(
             
                <Form>
                
                <div className="row">
                    <div className="col-6">
                      <label htmlFor="Name" className='form-label    pt-2 ps-1'>Account Name</label>
                      <Field type='text' name='Name'  placeholder='' className='w-100 form-control '/>
                      {touched.Name &&  errors.Name && <small className='text-danger' >{errors.Name}</small>}
                    </div>
                    <div className="col-6">
                    <label htmlFor="Group" className='form-label    pt-2 ps-1'>Account Group <i class='bx bx-plus-circle' onClick={handlAccountGroupShow} ></i></label>
                    <Select
                      name="Group"
                       ref={accountgroupRef}
                      options={saparatedAccountGroup.map((item) => ({ value: item.id, label: item.Accounts_Group_Name }))}
                      isSearchable={true}
                      value={selectedAccountGroup}
                      onChange={(option) => {setFieldValue('Group', option ? option.value : null);
                      handleSelectAccountgroup(option);}}                      
                     />
                     
   
              
                      {  touched.Group &&  errors.Group && <small>{errors.Group}</small>}
                       </div>
                       <div className="col-6 pt-4">
                       <label>
                          <Field type="checkbox" name="Gst"  className='me-4'/>
                          Gst
                          </label>
                          {  touched.Gst &&  errors.Gst && <small>{errors.Gst}</small>}
                       </div>
                       <div className="col-6 pt-4 ">
                       <label>
                          <Field type="checkbox" name="tds"  className='me-4'/>
                          TDS
                          </label>
                          {  touched.tds &&  errors.tds && <small>{errors.tds}</small>}
                       </div>
                       <div className="col-6 pt-3 mb-5">
                       <label>
                          <Field type="checkbox" name="Active"  className='me-4'/>
                          Account Active
                          </label>
                          {  touched.Active &&  errors.Active && <small>{errors.Active}</small>}
                       </div>
                </div>
                <Modal.Footer>
                <button type="submit" className="btn shadow-sm">Save</button>
               
                 
              </Modal.Footer>
                </Form>
              )}
           </Formik>

        </Modal.Body>
      
      </Modal>
     </>
  )
}

export default AddAccount