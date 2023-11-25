import React, { useState,useRef, useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'; 
import { Formik, Field, Form } from 'formik';
import Select from 'react-select';

import { itemGroupSchema } from '../../validations/itemmaster';
import DataContext from '../../../context/ItemMasterContext';
import axiosInstance from '../../../api/axoiss'


const AddItemGroup = ({itemGroupEditId,setitemGroupEditId }) => {

    const { itemGroupAdd, handleitemGroupClose, ItemHsndata, ItemGroupdata,
      setItemGroupData, setToastSave, setItemGroupSelect} = useContext(DataContext)
    const [error, setError] = useState('')
    const itemGroupRef = useRef(null);
    const ItemHsnRef = useRef(null)

    const [initialGroup, setinitialGroup] = useState({
      Name :"",
      Hsn: "",
      Group: "",
  })
  if (itemGroupEditId){ 
    initialGroup.Name = itemGroupEditId['name']
    initialGroup.Hsn = itemGroupEditId['hsn']
    initialGroup.Group = itemGroupEditId['Parent_Group']
  }
  if(itemGroupEditId === ""){
    initialGroup.Name =  ""
    initialGroup.Hsn =  ""
    initialGroup.Group =  ""
  }
  useEffect(()=>{
    if(initialGroup.Hsn){
      const defaultSelectedHsn = ItemHsndata.find(item=> item.id === initialGroup.Hsn )
      if(defaultSelectedHsn){
        setSelectHsn( { value: defaultSelectedHsn.id , label:  defaultSelectedHsn.hsn_code });
      }
    }
    if(initialGroup.Group){
      const defaultSelectedGroup = ItemGroupdata.find(item=> item.id === Number(initialGroup.Group) )
   
      setSelectParentGroup({ value: defaultSelectedGroup.id , label:  defaultSelectedGroup.name })
    }
      
  },[initialGroup.Hsn, ItemGroupdata, ItemHsndata, initialGroup.Group])

    
    function reset_form(){ 
      if (itemGroupEditId){
        setitemGroupEditId('')
      }
      
      initialGroup.Name = ""
      initialGroup.Hsn = ""
      initialGroup.Group =  ""
      setSelectHsn( { value: "" , label:"" });
      setSelectParentGroup({ value: "" , label:"" })
      
    }
    const handleSubmit =async (values, { setSubmitting, resetForm, setErrors })=>{
      const save_itemGroup ={
            "name":  values["Name"],
            "Parent_Group": values["Group"],
            "hsn":values["HSN"],
            "modified_by": 1        
      }
      if(itemGroupEditId){
          try{
            const response = await axiosInstance.put(`/itemmaster/itemGroup/${itemGroupEditId.id}` , save_itemGroup)
            const responseData = Array.isArray(response.data) ? response.data : [response.data];
            setItemGroupData((prevData) => {
              return prevData.map((item) => {
                return item.id === responseData[0].id ? responseData[0] : item;
              });
            })
            setitemGroupEditId('');
            handleitemGroupClose();
            resetForm();
            reset_form()
          }catch (error){
            console.log(error);
          }
        

      }else{
        try{
          const response = await axiosInstance.post("/itemmaster/itemGroup" , save_itemGroup)
         
          const responseData = Array.isArray(response.data) ? response.data : [response.data];
          setItemGroupSelect({id:responseData[0]["id"],
                              lable: responseData[0]["name"]})
        
          setItemGroupData(prevData => [ ...responseData, ...prevData]);
          
          resetForm();
          handleitemGroupClose();
          setToastSave(true)
          reset_form()
          setTimeout(() => {
              setToastSave(false);
            }, 3000);
            setError('')
        } catch (error){
          console.log(error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            setError(error.response.data[0]);
            console.error('Server error:', error.response.data.non_field_errors[0]);
        } else if (error.request) {
            // The request was made but no response was received
            setError('No response from server');
            console.error('No response from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            setError('Error setting up the request');
            console.error('Error setting up the request:', error.message);
        }
        }
      }
      
    }
    


    const [selectHsn , setSelectHsn] = useState('')
    const handleSelectHsn =(option)=>{
      setSelectHsn( { value: option.value , label:  option.label });
    }
    const [selectParentGroup , setSelectParentGroup] = useState('')
    const handleSelectGroup =(option)=>{
      setSelectParentGroup({ value: option.value , label:  option.label })
    } 

     
  return (
     <>
       <Modal show={itemGroupAdd} onHide={() => { setError('');
        handleitemGroupClose(); 
        reset_form()}}>
        <Modal.Header closeButton>
          <Modal.Title>Item Group</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            <div className='text-danger text-center' >{error? error : ""}</div>
            <Formik initialValues={initialGroup}
            validationSchema={itemGroupSchema}
            onSubmit={handleSubmit}
            >
              {({errors, touched, isSubmitting, values, setFieldValue})=>(
              <Form>
             <div className="row">
                   <div className="col-6">
                   <label htmlFor="Name" className='form-label    pt-2 ps-1'>Name  </label>
                   <Field type='text' id='Name' name='Name'  placeholder='' className='w-100 form-control '/>
                   {  touched.Name &&  errors.Name && <small>{errors.Name}</small>}
                   </div>
                   <div className="col-6">
                       <label htmlFor="HSN" className='form-label  pt-2 ps-1'>HSN</label>
                       <Select
                      name="Hsn"
                      ref={itemGroupRef}
                      options={ItemHsndata.map((item) => ({ value: item.id, label: item.hsn_code }))}
                      isSearchable={true}
                      value={selectHsn}
                      onChange={(option) => {setFieldValue('HSN', option ? option.value : null);
                      handleSelectHsn(option)}
                     
                       }
                    />
                    </div>
                    <div className="col-6 mb-3">
                      <label htmlFor="Group" className='form-label    pt-2 ps-1'>Parent Group</label>
                    
                      <Select
                       name="Group"
                       ref={ItemHsnRef}
                       value={selectParentGroup}
                       options={ItemGroupdata.map((item) => ({ value: item.id, label: item.name }))}
                       onChange={(option) => {setFieldValue('Group', option ? option.value : null);
                       handleSelectGroup(option)}}
                      />
                    
    
                    {touched.Group && errors.Group && <small>{errors.Group}</small>}
                    </div>

             </div>
             <Modal.Footer>
             <button type="submit" className="btn shadow-sm"  >Save</button>
         
         
           
        </Modal.Footer>
             </Form>
             )}
            </Formik>
        </Modal.Body>
       
      </Modal>
     </>
  )
}

export default AddItemGroup