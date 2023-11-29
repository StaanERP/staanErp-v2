import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'; 
import {Formik , Field, Form} from 'formik';
import { AddConferenceSchema } from '../../EnquiryValidations/Enquiryvalidation';
import DataContext from '../../../context/ItemMasterContext';
import axiosInstance from '../../../api/axoiss';
// import DatePicker from 'react-datepicker';


const ConferenceFrom = ({handleConferenceFromClose,AddConference, conferenceEdit, setConferenceEdit}) => {
 
    const {userdata, setConference} =  useContext(DataContext)
    const [InchargeSelect, setInchargeSelect] = useState('')
    const handleselectIncharge = (option)=>{
      setInchargeSelect({ value: option.value , label:  option.label })
    }
    
    const [initialConferenceValues, setInitialConferenceValues] = useState( {
      name:"",
      Startdate: "",
      enddate: "",
      incharge: "",
      Status : false,
  })
  if (conferenceEdit){
    initialConferenceValues.name = conferenceEdit['Name']
    initialConferenceValues.incharge = conferenceEdit['incharge']
    initialConferenceValues.Startdate = conferenceEdit['startDate']
    initialConferenceValues.enddate = conferenceEdit['endDate']
    initialConferenceValues.Status = conferenceEdit['Status']
  } 

  if(conferenceEdit === ""){
    initialConferenceValues.name =  ""
    initialConferenceValues.incharge =  ""
    initialConferenceValues.Startdate =  ""
    initialConferenceValues.enddate = ""
    initialConferenceValues.Status = false
  }

  useEffect(()=>{
    if(initialConferenceValues.incharge){
      const defaultSelectedinchanrge = userdata.find(item => item.id === initialConferenceValues.incharge);
      setInchargeSelect({ value: defaultSelectedinchanrge.id  , label:  defaultSelectedinchanrge.username })

    }
  },[initialConferenceValues.incharge, userdata])

  const reset_From=()=>{
    setConferenceEdit('')
    setInchargeSelect('')
  }
   
    const handlesubmit =async (values, { setSubmitting, resetForm, setErrors })=>{
      const startDateObject = new Date(values['Startdate'])
      const day = startDateObject.getDate();
      const month = startDateObject.getMonth() + 1;
      const year = startDateObject.getFullYear();
      const formattedStartdate = `${year}/${month}/${day}`;
      const endDateObject = new Date(values['enddate'])
      const day_ = endDateObject.getDate();
      const month_ = endDateObject.getMonth() + 1;
      const year_ = endDateObject.getFullYear();
      const formattedEndtdate = `${year_}/${month_}/${day_}`;
    
        const saveConference ={
          Name:values['name'],
          startDate: formattedStartdate,
          endDate: formattedEndtdate,
          incharge: values['incharge'],
          Status : values['Status'], 
          createdBy : 2,
      } 
       if (conferenceEdit){
        const respones = await axiosInstance.put(`/api/Conference/${conferenceEdit.id}`, saveConference);
        const responseData = Array.isArray(respones.data) ? respones.data : [respones.data];
        setConference((prevData) => {
          return prevData.map((item) => { // Log the IDs for debugging
            return item.id === responseData[0].id ? responseData[0] : item;
          });
   
        });
        resetForm();
        reset_From()
        handleConferenceFromClose()

       } else{
        const respones = await axiosInstance.post('/api/Conference', saveConference);
        const responseData = Array.isArray(respones.data) ? respones.data : [respones.data];
        
        setConference(prevData => [ ...responseData, ...prevData])
        resetForm();
        reset_From()
        handleConferenceFromClose()
       }
     
    }

    

  return (
     <>
      <Modal   size="lg" show={AddConference} onHide={()=>{handleConferenceFromClose();
      reset_From() }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Conference</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
            <Formik
          initialValues={initialConferenceValues}
          validationSchema={AddConferenceSchema}
          onSubmit={handlesubmit}
        >
          {(formikProps) => (
            <Form>
              <div className="row">
                <div className="col-6 text-start mt-md-2">
                  <label htmlFor="name" className='form-label lable-sub pt-2 ps-1'>Name</label>
                  <Field type='text' name='name' placeholder=' ' className='w-100 mt-2 input-trenprant' />
                  {formikProps.touched.name && formikProps.errors.name && (
                    <small>{formikProps.errors.name}</small>
                  )}
                </div>
                <div className="col-6 mt-md-2">
                  <label className='my-1 pb-1'>Incharge</label>
                  <Select
                    name="incharge"
                    id='incharge_'
                    value={InchargeSelect}
                    options={userdata.map((item) => ({ value: item.id, label: item.username }))}
                    onChange={(option) =>{ formikProps.setFieldValue('incharge', option ? option.value : null)
                    handleselectIncharge(option)  }}
                  />
                  
    
                  {formikProps.touched.incharge && formikProps.errors.incharge && (
                    <small>{formikProps.errors.incharge}</small>
                  )}
                </div>
                <div className="col-6 mt-md-2">
                  <label className='me-2 mb-2'>Start Date</label>
                  <br/>
                  <input
                    type="date"
                    id="Startdate"
                    name="Startdate"
                    className='input-trenprant w-100'
                    // min={new Date().toISOString().split("T")[0]} // set the minimum date to today
                    value={formikProps.values.Startdate}
                    onChange={formikProps.handleChange}
                  />
                  {formikProps.touched.Startdate && formikProps.errors.Startdate && (
                    <small>{formikProps.errors.Startdate}</small>
                  )}
                </div>
                <div className="col-6 mt-md-2">
                  <label className='me-2 mb-2'>End Date</label>
                  <br/>
                  <input
                    type="date"
                    id="enddate"
                    name="enddate"
                    className='input-trenprant w-100'
                    // min={new Date().toISOString().split("T")[0]} // set the minimum date to today
                    value={formikProps.values.enddate}
                    onChange={formikProps.handleChange}
                  />
                  {formikProps.touched.enddate && formikProps.errors.enddate && (
                    <small>{formikProps.errors.enddate}</small>
                  )}
                </div>
                <div className="col-md-6 col-12 mt-md-2">
                  <label>
                    Active
                    <Field type="checkbox" name="Status"   className='ms-2 me-4' />
                  </label>
                  {formikProps.touched.Status && formikProps.errors.Status && (
                    <small>{formikProps.errors.Status}</small>
                  )}
                </div>
              
              </div>
              <Modal.Footer>
     
          <button type="submit" className="btn btn-successshadow-sm">
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

export default ConferenceFrom