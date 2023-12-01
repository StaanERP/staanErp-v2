import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'; 
import DataContext from '../../../context/ItemMasterContext';
import axiosInstance from '../../../api/axoiss';

const EnquiryFromEdit = ({enquiryEditFrom, handleenquiryEditFromClose, enquiryEdit}) => {
   const {userdata, product, setEnquiry} = useContext(DataContext)
   const [remark, setRemark] = useState('')
   const [selectStatus, setSelectStatus] = useState('')
   const [followup, setFollpwup] = useState('')
   const [salesMan, setSalesMan] = useState()
   const [Interesteds, setInteresteds] = useState([])
   useEffect(() => {
    if(enquiryEdit.Interesteds){
         const interested = enquiryEdit.Interesteds;
    const newInteresteds = [];
  
    interested.forEach((item) => {
      const productoptions =  product.filter((pro) => pro.id ===item )
      
      newInteresteds.push( { value: productoptions[0]['id'] , label:  productoptions[0]['Name'] });
    });
  
    setInteresteds(newInteresteds);
    }
    if (enquiryEdit.salesPerson){
        const selectuser =  userdata.filter((pro) => pro.id === Number(enquiryEdit.salesPerson) ) 
        console.log(selectuser); 
        setSalesMan( { value: selectuser[0]['id'] , label:  selectuser[0]['username'] })
    } 
    if(enquiryEdit.status){
        setSelectStatus({ value: enquiryEdit.status , label:  enquiryEdit.status })
    }
    if(enquiryEdit.followup){
        setFollpwup(enquiryEdit.followup)
    }
    if(enquiryEdit.Remarks){
        setRemark(enquiryEdit.Remarks)
    }
   
  }, [enquiryEdit.Interesteds,  enquiryEdit.salesPerson, enquiryEdit.status, enquiryEdit.followup,enquiryEdit.Remarks,
    product,userdata]);
  
   function resetData(){
    setRemark('')
    setSelectStatus('')
    setFollpwup('')
    setSalesMan('')
   }
   const handleSelectStatus = (option)=>{
    setSelectStatus( { value: option.value , label:  option.label })
   }
   
   const handleChangefollowup = (value)=>{
    setFollpwup(value)
   }
   const handleSelectsalesMan = (option)=>{
    setSalesMan( { value: option.value , label:  option.label })
   }
   const handleSubmit=async()=>{
    let followupStartdate = null
    if (followup){
        const Datefollowup = new Date(followup)
    const day = Datefollowup.getDate();
    const month = Datefollowup.getMonth() + 1;
    const year = Datefollowup.getFullYear();
       followupStartdate = `${year}-${month}-${day}`;
    }else{
     followupStartdate =  null
    }
   
    console.log(followupStartdate);
    const save_enquiry_from = {
        "Name": enquiryEdit['Name'],
        "OrganizationName": enquiryEdit["OrganizationName"],
        "Email": enquiryEdit['Email'],
        "status":  selectStatus.value,
        "MobileNumber":  enquiryEdit['MobileNumber'],
        "Location":   enquiryEdit['Location'],
        "message": enquiryEdit['message'],
        "conferencedata":enquiryEdit['conferencedata'],
        "Interesteds":  enquiryEdit['Interesteds'],
        "Remarks": remark,
        "followup": followupStartdate,
        "salesPerson":salesMan.value,
     }  
     try{
        const respones = await  axiosInstance.put(`/api/${enquiryEdit.id}`, save_enquiry_from);
        const responseData = Array.isArray(respones.data) ? respones.data : [respones.data];
        setEnquiry((prevData) => {
            return prevData.map((item) => { // Log the IDs for debugging
              return item.id === responseData[0].id ? responseData[0] : item;
            });
     
          });
        //   console.log(save_enquiry_from);
     resetData()
     handleenquiryEditFromClose()
     toast('Successfully Saved', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
     
     } catch (error){
            console.log(error);

     }
     
   }

   const option = [
    { value: "Not Contacted" , label:   "Not Contacted"  },
    { value: "Converted" , label:   "Converted"  },
    { value: "Junk" , label:   "Junk"  },
   ]
  return (
    <>
     <ToastContainer/>
     <Modal show={enquiryEditFrom}  size="xl" onHide={()=>{
        handleenquiryEditFromClose()
        resetData()
     }}>
        <Modal.Header closeButton>
          <Modal.Title>Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
       
              <div className="row">
                  <div className="col-6">
                  <label for="exampleFormControlInput1" class="form-label">Name</label>
                  <input type="text" className="form-control" value={enquiryEdit.Name}   id="exampleFormControlInput1" disabled/>
                  </div>
                  <div className="col-6">
                  <label for="exampleFormControlInput2" class="form-label">Hospital/Company</label>
                  <input type="text" className="form-control" value={enquiryEdit.OrganizationName} id="exampleFormControlInput1" disabled/>
                  </div>
                  <div className="col-6">
                  <label for="exampleFormControlInput2" class="form-label">Email</label>
                  <input type="email" className="form-control" value={enquiryEdit.Email} id="exampleFormControlInput1" disabled/>
                  </div>
                  <div className="col-6">
                  <label for="exampleFormControlInput2" class="form-label">Mobile Number</label>
                  <input type="text" className="form-control" value={enquiryEdit.MobileNumber} id="exampleFormControlInput1" disabled/>
                  </div>
                  <div className="col-6">
                  <label for="exampleFormControlInput2" class="form-label">City</label>
                  <input type="text" className="form-control" value={enquiryEdit.Location} id="exampleFormControlInput1" disabled/>
                  </div>
                  <div className="col-6">
                  <label for="exampleFormControlInput2" class="form-label">Alternate Number</label>
                  <input type="text" className="form-control" value={enquiryEdit.alternateMobileNumber} id="exampleFormControlInput1" disabled/>
                  </div>
                  <div className="col-6">
                  <label for="exampleFormControlInput2" class="form-label">Interesteds</label>
                  <Select
                     
                    isMulti
                    name="colors"
                    value={Interesteds}
                    options={product.map(product_data=>({value : product_data.id,  label: product_data.Name}))}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    disabled = {true}
                />
                  </div>
                <div className="col-6">
                    <label htmlFor="Sales" className='form-label   lable-sub  ps-1 '>Sales Person</label>
                    <Select
                    name="Sales" 
                    value={salesMan}
                    options={userdata.map(user=>({value : user.id,  label: user.username}))} 
                        onChange={(option)=>{handleSelectsalesMan(option)}}
                    />
                </div>
                
                <div className="col-6">
                <label htmlFor="Status" className='form-label   lable-sub  ps-1 '>Status</label>
                <Select
                    name="Status" 
                    value={selectStatus}
                    options={option} 
                    onChange={(option)=>{handleSelectStatus(option)}}
                    />
                </div>
                <div className="col-6">
                    <label htmlFor="Sales" className='form-label   lable-sub  ps-1 '>Follow up</label>
                    <input
                    type="date" 
                    name="Followup"
                    className='input-trenprant w-100'
                    min={new Date().toISOString().split("T")[0]} // set the minimum date to today
                    value={followup}
                    onChange={(e)=>{handleChangefollowup(e.target.value)}}
                  />
                </div>
               
   
                

                  <div className="col-6">
                  <label for="exampleFormControlInput2" class="form-label">Message</label>
                  <textarea class="form-control" value={enquiryEdit.message} disabled></textarea>
                  </div>
                  <div className="col-6">
                <label htmlFor="Sales" className='form-label   lable-sub  ps-1 '>Remarks</label>
                  <textarea class="form-control" value={remark} onChange={(e)=>{setRemark(e.target.value)}}  ></textarea>
                  </div>

                 

              </div>
          


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{
        handleenquiryEditFromClose()
        resetData()
     }}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EnquiryFromEdit