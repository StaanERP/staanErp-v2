import React, { useContext, useEffect, useState }  from 'react'
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import {Formik , Field, Form } from 'formik'; 

import { itemUOMschema } from '../../validations/itemmaster';
import DataContext from '../../../context/ItemMasterContext';
import axiosInstance from '../../../api/axoiss';
 
const AddUom = ({uomEditId, setuomEditId}) => {
  const {ItemUomAdd,  handleUOMClose, setUOMData,  setToastSave, setItemUOMSelect} 
  = useContext(DataContext)
  const [error, setError] = useState('')
  const [ewaybillUOM, setEwaybillUOM] = useState()
  const handleSelectewaybillUOM =(option)=>{
    setEwaybillUOM( { value: option.value , label:  option.label });
}

  const [initialUom, setInitialUom] = useState(
    {
      "name": "",
      "e_way_bill_uom": "",
      "Description": "",
      "modified_by": 1
    }
  )
  if(uomEditId){
    // const selectuom = ItemUOMdata.find(uom=>ItemUOMdata.id === uomEditId.id  )
 
    initialUom.name = uomEditId['name']
    initialUom.e_way_bill_uom = uomEditId['e_way_bill_uom']
    
  
    initialUom.Description = uomEditId['Description']
    initialUom.modified_by = uomEditId['modified_by']  
  }
 
  function reset_form(){ 

    setEwaybillUOM( { value: "" , label:  "" });
    initialUom.name = ''
    initialUom.e_way_bill_uom = ''
    initialUom.Description = ''
    initialUom.modified_by = 1  


}

 useEffect(()=>{
  const defaultSelectede_way_bill_uom =  initialUom.e_way_bill_uom
  if(defaultSelectede_way_bill_uom){
    setEwaybillUOM( { value: defaultSelectede_way_bill_uom , label:  defaultSelectede_way_bill_uom })
  }
 },[uomEditId, initialUom.e_way_bill_uom])
   
 const handleSubmit = async (values, { setSubmitting, resetForm })=>{
    const save_uom = {
        "name": values["name"],
        "e_way_bill_uom": values["e_way_bill_uom"],
        "Description": values["Description"],
        "modified_by": 1
      } 
      if (uomEditId){
         try{
          const response = await axiosInstance.put(`/itemmaster/UOM/${uomEditId.id}`, save_uom)
          const responseData = Array.isArray(response.data) ? response.data : [response.data];
       
          setUOMData((prevData) => {
            return prevData.map((item) => {
              return item.id === responseData[0].id ? responseData[0] : item;
            });
          });
          setuomEditId('')
          handleUOMClose();
          resetForm();
           
         try{
          reset_form()
         }catch(error){
          console.log(error);

         }

         } catch(error){
          console.log(error);

         }

      }else{
        try {
          const response = await axiosInstance.post("/itemmaster/UOM", save_uom);
          const responseData = Array.isArray(response.data) ? response.data : [response.data];
          setItemUOMSelect({id:responseData[0]["id"],
          lable: responseData[0]["name"]})
          setUOMData(prevData => [ ...responseData, ...prevData]);
          resetForm();
          handleUOMClose(); 
          setToastSave(true);
          
          setTimeout(() => {
              setToastSave(false);
          }, 3000);
          setError('')
      } catch (error) {
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              setError(error.response.data.non_field_errors[0]);
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

 function E_Way_BillUOM(){
    const options =[
        {value : "BAGS",label: "BAGS"},
        {value : "BALE" ,  label: "BALE"}, 
        {value : "BUNDLES" ,  label: "BUNDLES"}, 
        {value : "BUCKLES" ,  label: "BUCKLES "}, 
        {value : "BILLION OF UNITS" ,  label: "BILLION OF UNITS"}, 
        {value : "BOX" ,  label: "BOX"}, 
        {value : "BOTTLES" ,  label: "BOTTLES"}, 
        {value : "BUNCHES" ,  label: "BUNCHES"}, 
        {value : "CANS" ,  label: "CANS"}, 
        {value : "CUBIC METERS" ,  label: "CUBIC METERS"}, 
        {value : "CUBIC CENTIMETERS" ,  label: "CUBIC CENTIMETERS"}, 
        {value : "CENTIMETERS" ,  label: "CENTIMETERS"}, 
        {value : "CARTONS" ,  label: "CARTONS"}, 
        {value : "DOZENS" ,  label: "DOZENS"}, 
        {value : "DRUMS" ,  label: "DRUMS"}, 
        {value : "GREAT GROSS" ,  label: "GREAT GROSS"}, 
        {value : "GRAMMES" ,  label: "GRAMMES"}, 
        {value : "GROSS" ,  label: "GROSS"}, 
        {value : "GROSS YARDS" ,  label: "GROSS YARDS"}, 
        {value : "KILOGRAMS" ,  label: "KILOGRAMS"}, 
        {value : "KILOLITRE" ,  label: "KILOLITRE"}, 
        {value : "KILOMETRE" ,  label: "KILOMETRE"}, 
        {value : "LITRES" ,  label: "LITRES"}, 
        {value : "MILILITRE" ,  label: "MILILITRE"}, 
        {value : "METERS" ,  label: "METERS"}, 
        {value : "METRIC TON" ,  label: "METRIC TON"}, 
        {value : "NUMBERS" ,  label: "NUMBERS"}, 
        {value : "OTHERS" ,  label: "OTHERS"}, 
        {value : "PACKS" ,  label: "PACKS"}, 
        {value : "PIECES" ,  label: "PIECES"}, 
        {value : "PAIRS" ,  label: "PAIRS"}, 
        {value : "QUINTAL" ,  label: "QUINTAL"}, 
        {value : "ROLLS" ,  label: "ROLLS"}, 
        {value : "SETS" ,  label: "SETS"}, 
        {value : "SQUARE FEET" ,  label: "SQUARE FEET"}, 
        {value : "SQUARE METERS" ,  label: "SQUARE METERS"}, 
        {value : "SQUARE YARDS" ,  label: "SQUARE YARDS"}, 
        {value : "TABLETS" ,  label: "TABLETS"}, 
        {value : "TEN GROSS" ,  label: "TEN GROSS"}, 
        {value : "THOUSANDS" ,  label: "THOUSANDS"}, 
        {value : "TONNES" ,  label: "TONNES"}, 
        {value : "TUBES" ,  label: "TUBES"}, 
        {value : "US GALLONS" ,  label: "US GALLONS"}, 
        {value : "UNITS" ,  label: "UNITS"}, 
        {value : "YARDS" ,  label: "YARDS"}
 
    ]
    return options;
  }
  const E_Way_BillUOMOptions = E_Way_BillUOM();

  return (
     <>
     <Modal show={ItemUomAdd} onHide={()=>{
        setError();
        handleUOMClose();
        if (uomEditId){
          setuomEditId()
        }
        
        reset_form()
     }}>
        <Modal.Header closeButton>
          <Modal.Title>Unit of measurement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='text-danger text-center' >{error? error : ""}</div>
            <Formik initialValues={initialUom}
            validationSchema={itemUOMschema}
            onSubmit={handleSubmit}>
                {({errors, touched, isSubmitting, setFieldValue })=>(
            <Form>
                <div className="row">
                    <div className="col-6">
                    <label htmlFor="Name" className='form-label    pt-2 ps-1'>Name</label>
                      <Field type='text' name='name'  placeholder='' className='w-100 form-control '/>
              
                      {  touched.name &&  errors.name && <small className='text-danger' >{errors.name}</small>}
                    </div>
                    <div className="col-6">
                      <label htmlFor="E_Way_Bill_UOM" className='form-label    pt-2 ps-1'>E Way Bill UOM </label>
                    
                              <Select
                            name="E_Way_Bill_UOM" 
                            value={ewaybillUOM}
                            options={E_Way_BillUOMOptions}
                             onChange={(option)=>{setFieldValue('e_way_bill_uom', option ? option.value : null);
                             handleSelectewaybillUOM(option)}}
                            />
                    

                    {touched.Item_Group && errors.Item_Group && <small>{errors.Item_Group}</small>}
                    </div>
                    <div className="col-6">
                    <label htmlFor="Description" className='form-label  pt-2 ps-1'>Description</label>
                      <Field type='text' name='Description'  placeholder='' className='  mb-3 w-100 form-control '/>
              
                      {  touched.Description &&  errors.Description && <small className='text-danger' >{errors.Description}</small>}
                    </div>
                    
                </div>
                <Modal.Footer>
                <button type="submit" className="btn shadow-sm"> Save</button>
         
  
        </Modal.Footer>
            </Form>
                )}
            </Formik>

        </Modal.Body>
        
      </Modal>
     </>
  )
}

export default AddUom