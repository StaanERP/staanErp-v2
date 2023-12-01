import React,{useContext, useEffect, useState} from 'react' 
import Modal from 'react-bootstrap/Modal';
import { AccountGroupSchema } from '../../validations/itemmaster';
import {  Field, Form, Formik } from 'formik';
import Select from 'react-select';

import DataContext from '../../../context/ItemMasterContext';
import axiosInstance from '../../../api/axoiss';

const AddAccountGroup = ({AccountEdit, setAccountEdit}) => {
    const {ItemAccountGroupAdd,handleAccountGroupClose, setAccountGroupdata,
      setToastSave ,AccountGroupType,   setItemAccountGroupSelect} = useContext(DataContext)
        const [error , setError] = useState('')
        const [initialgroup, setinitialgroup]= useState({
          Accounts_Group_Name : "",
          Accounts_Type : "",
          Group_Active : true,
          modified_by : 10
      }) 
      if(AccountEdit){
        initialgroup.Accounts_Group_Name = AccountEdit['Accounts_Group_Name']
        initialgroup.Accounts_Type = AccountEdit['Accounts_Type']
        initialgroup.Group_Active = AccountEdit['Group_Active']
        initialgroup.modified_by = AccountEdit['modified_by']
          
      }  
      if(AccountEdit === ""){
        // initialgroup.Accounts_Group_Name =  ''
        // initialgroup.Accounts_Type = ""
        // initialgroup.Group_Active = false
        // initialgroup.modified_by = ""
        setinitialgroup({
          Accounts_Group_Name : "",
          Accounts_Type : "",
          Group_Active : true,
          modified_by : 10
      }) 
      }
      function reset_form(){ 
        if (AccountEdit){
          setAccountEdit()
        }
       
        initialgroup.Accounts_Group_Name =  ''
        initialgroup.Accounts_Type = ""
        initialgroup.Group_Active = false
        initialgroup.modified_by = ""  
    
       }
      useEffect(()=>{
        setSelectaccountgroupType({value: initialgroup.Accounts_Type, label :initialgroup.Accounts_Type})
      },[initialgroup.Accounts_Type])


    
const handleSubmit= async (values, {setSubmitting, resetForm})=>{
     const save_AccountGroup ={
        Accounts_Group_Name: values['Accounts_Group_Name'],
        Accounts_Type: values['Accounts_Type'],
        Group_Active: values['Group_Active'],
        modified_by: 1
     } 
     if(AccountEdit){
      const respones = await  axiosInstance.put(`/itemmaster/AccountsGroup/${AccountEdit.id}`, save_AccountGroup);
      const responseData = Array.isArray(respones.data) ? respones.data : [respones.data];
      setAccountGroupdata((prevData) => {
        return prevData.map((item) => {
          return item.id === responseData[0].id ? responseData[0] : item;
        });
      });
      setAccountEdit('')
      handleAccountGroupClose()
      resetForm()
      reset_form()
     }else{
      try{
        const respones = await  axiosInstance.post('/itemmaster/AccountsGroup', save_AccountGroup);
        const responseData = Array.isArray(respones.data) ? respones.data : [respones.data];
        setItemAccountGroupSelect({id:responseData[0]["id"],
        lable: responseData[0]["Accounts_Group_Name"]})
        setAccountGroupdata(prevData => {
            const updatedData = [ ...responseData, ...prevData];
            return updatedData;
          })
        setToastSave(true)
        resetForm()
        handleAccountGroupClose()
        setTimeout(() => {
            setToastSave(false);
          }, 3000);
          setError('')
          reset_form()
     } catch(errors){
      
        if (errors.response && errors.response.status === 400) {
            // Handle validation errors
            const validationErrors = errors.response.data;
            if (validationErrors.Accounts_Group_Name && validationErrors.Accounts_Group_Name[0] === "accounts group with this Accounts Group Name already exists.") {
                setError('Accounts group with this Accounts Group Name already exists.');
              
            } else {
              // Handle other validation errors or generic error messages
              setError(validationErrors)
              console.error('Validation errors:', validationErrors);
            }
          } else {
            // Handle other types of errors (network, server, etc.)
            setError(errors.data)
            console.error('API request failed:', errors);
          }
     }

     }

}

const OptionDataSell = [
  { value: 'Asset', label: 'Asset' },
  { value: 'Income', label: 'Income' },
];
const  OptionDataPurchase = [
  { value: 'Liabilities', label: 'Liabilities' },
  { value: 'Expenses', label: 'Expenses' },
];

const OptionDataAll = [
  { value: 'Asset', label: 'Asset' },
  { value: 'Income', label: 'Income' },
  { value: 'Liabilities', label: 'Liabilities' },
  { value: 'Expenses', label: 'Expenses' },
] 
 
  const [selectaccountgroupType, setSelectaccountgroupType] = useState()
  const handleSelectType=(option)=>{
    setSelectaccountgroupType({value: option.value, label :option.label})
  }
  

  return (
    <>
    <Modal show={ItemAccountGroupAdd} onHide={()=>{
        handleAccountGroupClose(); setError()
        reset_form()
    }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Account Group</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <div className='text-danger text-center' >{error ? error  : ""}</div>
        <Formik initialValues={initialgroup}
        validationSchema={AccountGroupSchema}
        onSubmit={handleSubmit}>
               {({errors, touched, isSubmitting, setFieldValue })=>(
                <Form>
                <div className="row mt-3">
                    <div className="col-6">
                    <label htmlFor="Name" className='form-label    pt-2 ps-1'>Accounts Group Name</label>
                      <Field type='text' name='Accounts_Group_Name'  placeholder='' className='w-100 form-control '/>
              
                      {  touched.Accounts_Group_Name &&  errors.Accounts_Group_Name && <small className='text-danger' >{errors.Accounts_Group_Name}</small>}
                    </div>
                    <div className="col-6">
                      <label htmlFor="Accounts_Type" className='form-label    pt-2 ps-1'> Type </label>
                    
                              <Select
                            name="Accounts_Type" 
                            value={selectaccountgroupType}
                            options={AccountGroupType === "sell" ? OptionDataSell :AccountGroupType === "purchase" ?  OptionDataPurchase: OptionDataAll}
                            onChange={(option) =>{ setFieldValue('Accounts_Type', option ? option.value : null);
                            handleSelectType(option)}}
                         
                            />
                    
  
                    {touched.Accounts_Type && errors.Accounts_Type && <small>{errors.Accounts_Type}</small>}
                    </div>
                    <div className="col-6 my-5">
                    <label>
                          <Field type="checkbox" name="Group_Active"   className='me-4' />
                          Group Active
                          </label>
                          {touched.Group_Active && errors.Group_Active && <small>{errors.Group_Active}</small>}
                    </div>
                </div>
                <Modal.Footer>
                <button type="submit" className="btn shadow-sm">
                    Save
                  </button>
                    
                  
                </Modal.Footer>
                </Form>
               )}
        </Formik>
        </Modal.Body>
       
      </Modal>
    </>
  )
}

export default AddAccountGroup