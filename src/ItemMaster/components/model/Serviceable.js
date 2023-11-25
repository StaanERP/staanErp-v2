import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import {  Field, Form } from 'formik';

import Button from 'react-bootstrap/Button';

const Serviceable = ({touched,errors ,serviceable,handleserviceableClose, setFieldValue
, values}) => {
    const WarrantyBasedOptions = [
        { value: 'Invoice date', label: 'Invoice date' },
        { value: 'Installation date', label: 'InvInstallation date' },
       
      ]
  return (
    <>
    <Form>
    <Modal show={serviceable} onHide={()=>{
            handleserviceableClose()
            values.Service = false
          }}
    size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Serviceable</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            <div className="row">
                <div className="col-6">
                   <label>
                   <Field type="checkbox" name="Warranty_Require"    className='me-4' />
                   Warranty Require
                   </label>
                </div>
                <div className="col-6">
                   <label>
                   <Field type="checkbox" name="Item_Installation"    className='me-4' />
                   Item Installation
                   </label>
                </div>
                <div className="col-6">
                   <label htmlFor="Item_Warranty_based" className='form-label    pt-2 ps-1'>Item Warranty based</label>
                           <Select
                         name="Item_Warranty_based"
                         options={WarrantyBasedOptions}
                         isSearchable={true}
                         isDisabled={!values.Warranty_Require}
                         onChange={(option) => setFieldValue('Item_Warranty_based', option ? option.value : null)}
                       />
                         {touched.Item_Warranty_based &&  errors.Item_Warranty_based && <small>{errors.Item_Warranty_based}</small>}

                </div>
            </div>


        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="primary" onClick={handleserviceableClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
    </>
  )
}

export default Serviceable