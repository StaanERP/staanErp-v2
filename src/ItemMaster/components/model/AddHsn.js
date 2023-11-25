import React, {useContext, useRef, useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'; 
import {  Field, Form, Formik } from 'formik';
import Select from 'react-select';
import { itemHsnSchema } from '../../validations/itemmaster';

import DataContext from '../../../context/ItemMasterContext';
import axiosInstance from '../../../api/axoiss';
const AddHsn = ({HSNedit, setHsnEdit}) => {

 const {ItemHSNAdd , handleHSNClose, setHsnData, setToastSave,setItemHSNSelect, setTax} = useContext(DataContext)
const hsntypeRef  = useRef(null);
const gstRef =useRef(null);
const [error_, setError] = useState('')
const [selectHsnType, setselectHsnType] =useState()
const handleselectHsnType =(option)=>{
  setselectHsnType( { value: option.value , label:  option.label });
}
const [selectGstRate, setSelectGstRate ] = useState()
const handleselectGstRate = (option)=>{
  setSelectGstRate( { value: option.value , label:  option.label });
}


const [initialHsn, setInitialHsn] = useState({
  hsn_type: "",
  hsn_code: '',
  Description: "",
  gst_rate: undefined,
  cess_rate: 0,
  rcm: false,
  itc: false,
  modified_by: 1
}) 
if(HSNedit){
  initialHsn.hsn_type = HSNedit['hsn_type']
  initialHsn.hsn_code = HSNedit['hsn_code']
  initialHsn.Description = HSNedit['Description']
  initialHsn.gst_rate = HSNedit['gst_rate']
  initialHsn.cess_rate = HSNedit['cess_rate']
  initialHsn.rcm = HSNedit['rcm']
  initialHsn.itc = HSNedit['itc']
}

if(HSNedit === ""){
  initialHsn.hsn_type = ""
  initialHsn.hsn_code = ""
  initialHsn.Description = ""
  initialHsn.gst_rate =""
  initialHsn.cess_rate ="" 
  initialHsn.rcm =false
  initialHsn.itc =false
  // initialHsn.modified_by = 1
}

function reset_form(){ 
  if(HSNedit){
    setHsnEdit('')
  }
  
  initialHsn.hsn_type = ""
  initialHsn.hsn_code = ""
  initialHsn.Description = ""
  initialHsn.gst_rate =""
  initialHsn.cess_rate ="" 
  initialHsn.rcm =false
  initialHsn.itc =false
  // initialHsn.modified_by = 1
  setInitialHsn({
    hsn_type: "",
    hsn_code: '',
    Description: "",
    gst_rate: undefined,
    cess_rate: 0,
    rcm: false,
    itc: false,
    modified_by: 1
  })
  setselectHsnType( { value:  "" , label:  "" });
  setSelectGstRate( { value: "" , label:  "" });
}
 

useEffect(()=>{
   
  if(initialHsn.hsn_type){
    setselectHsnType( { value: initialHsn.hsn_type , label:  initialHsn.hsn_type });
  }
  else{
    setselectHsnType( { value: '' , label:  '' });
  }
  if(initialHsn.gst_rate){
    setSelectGstRate( { value: initialHsn.gst_rate , label:  initialHsn.gst_rate });
  }
  else{
    setSelectGstRate( { value: '' , label:  '' });
  }
 },[initialHsn.hsn_type, initialHsn.gst_rate])

    const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
        const save_hsn ={
            hsn_type: values['hsn_type'],
            hsn_code: values['hsn_code'],
            Description: values['Description'],
            gst_rate: values['gst_rate'],
            cess_rate: values['cess_rate'],
            rcm: values['rcm'],
            itc: values['itc'],
            modified_by: 1
    }

       if (HSNedit){
        const respones = await axiosInstance.put(`/itemmaster/hsn/${HSNedit.id}`, save_hsn);
        const responseData = Array.isArray(respones.data) ? respones.data : [respones.data];
        setHsnData((prevData) => {
          return prevData.map((item) => {
            return item.id === responseData[0].id ? responseData[0] : item;
          });
        })
        handleHSNClose()
        resetForm();
        reset_form()

       } else{
        try{
          const respones = await axiosInstance.post('/itemmaster/hsn', save_hsn);
          const responseData = Array.isArray(respones.data) ? respones.data : [respones.data];
          setItemHSNSelect({id:responseData[0]["id"],
          lable: responseData[0]["hsn_code"]})
          setHsnData( prevData => [ ...responseData, ...prevData])
          setToastSave(true);
          resetForm();
          reset_form()
          handleHSNClose()
          setTimeout(() => {
              setToastSave(false);
            }, 3000);
            setError()
            setTax(save_hsn.gst_rate)
         } catch(errors){
          
          if (errors.response && errors.response.status === 400) {
              // Handle validation errors
              const validationErrors = errors.response.data;
              if (validationErrors.hsn_code && validationErrors.hsn_code[0] === "hsn with this hsn code already exists.") {
                  setError('HSN with the provided code already exists. Please choose a different code');
                
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

    function hsntype(){
        const options =[
            {value : "HSN",label: "HSN"},
            {value : "SAC",label: "SAC"},
        ]
        return options;}
    function GstRate(){
        const options =[
            {value : "5",label: "5"},
            {value : "12",label: "12"},
            {value : "18",label: "18"},
            {value : "28",label: "28"},
        ]
        return options;
    }
    const hsntypeOptions = hsntype();
    const GstRateOptions = GstRate();
  return (
    <>
      <Modal show={ItemHSNAdd} onHide={()=>{
        handleHSNClose()
        setError() 
        reset_form()
      }} 
       size="lg">
        <Modal.Header closeButton>
          {/* <Modal.Title>HSN/SAC</Modal.Title> */}
        </Modal.Header>
        <Modal.Body> 
        <div className='text-danger text-center' >{error_? error_ : ""}</div>
        <Formik
            initialValues={initialHsn}
            validationSchema={itemHsnSchema}
            onSubmit={handleSubmit} 
          >
            {({errors, touched, setFieldValue})=>(
                <Form>
              <div className="row">
                <div className="col-6">
                <label htmlFor="HSN_TYPE" className='form-label    pt-2 ps-1'>HSN TYPE </label>
                <Select
                            name="hsn_type"
                            ref={hsntypeRef}
                            options={hsntypeOptions}
                            value={selectHsnType}
                            onChange={(option) => {setFieldValue('hsn_type', option ? option.value : null)
                            handleselectHsnType(option)}}
                />
                  {touched.hsn_type &&  errors.hsn_type && <small>{errors.hsn_type}</small>}
                </div>
                <div className="col-6">
                      <label htmlFor="hsn_code" className='form-label    pt-2 ps-1'>HSN Code  </label>
                      <Field type='text' name='hsn_code'  placeholder='' className='w-100 form-control '/>
              
                      {touched.hsn_code &&  errors.hsn_code && <small>{errors.hsn_code}</small>}
                </div>
                <div className="col-6">
                <label htmlFor="Gst_rate" className='form-label    pt-2 ps-1'>GST RATE </label>
                <Select
                            name="gst_rate" 
                            ref={gstRef}
                            value={selectGstRate}
                            options={GstRateOptions}
                            onChange={(option) => {setFieldValue('gst_rate', option ? option.value : null)
                            handleselectGstRate(option)}}
                />
 
                 {touched.gst_rate &&  errors.gst_rate && <small>{errors.gst_rate}</small>}
                </div>

                <div className="col-6">
                <label htmlFor="cess_rate" className='form-label    pt-2 ps-1'>CESS RATE</label>
                      <Field type='text' name='cess_rate'  placeholder='' className='w-100 form-control'/>
                
                      {  touched.cess_rate &&  errors.cess_rate && <small>{errors.cess_rate}</small>}
                </div>
                <div className="col-6 mt-3">
                         <label>
                          <Field type="checkbox" name="rcm"    className='me-4' />
                          Reverse Charge Mechanism
                         </label>
                </div>
                <div className="col-6 mt-3">
                         <label>
                          <Field type="checkbox" name="itc"    className='me-4' />
                          No ITC
                         </label>
                </div>
                <div className="col-12">
                      <label htmlFor="Description" className='form-label    pt-2 ps-1'>Description</label>
                      <Field type='text' name='Description'  placeholder='' className='w-100 form-control'/>
                      {  touched.Description &&  errors.Description && <small>{errors.Description}</small>}
                    </div>

                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn shadow-sm">
                    Save
                  </button>
                
                </div>
              </Form>
            )}
          
            </Formik>
        </Modal.Body>
      
      </Modal>
    </>
  )
}

export default AddHsn