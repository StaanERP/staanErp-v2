import React,{useEffect} from 'react' 
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import {   Formik , Field, Form } from 'formik';
import { ItemMasterSchema } from '../../validations/itemmaster';
import { useContext, useRef, useState } from 'react';
import DataContext from '../../../context/ItemMasterContext';
import axiosInstance from '../../../api/axoiss';
import AddItemGroup from './AddItemGroup'
import AddUom from "./AddUom"
import PurchaseModal from "./PurchaseModal"
import PurchaseSellingModal from "./PurchaseSellingModal"
import SellingPrice from "./SellingPrice"
import AddAccount from './AddAccount'
import AddAccountGroup from './AddAccountGroup'
import AddHsn from './AddHsn'
import Serviceable from "./Serviceable"
// import ItemCombo from "./ItemCombo"
import AlternateUnit from "./AlternateUnit"



const ItemaMasterModal = () => {
    const {ItemGroupdata,ItemUOMdata ,ItemHsndata , Accountdata,   setItemMasterData  ,
        itemaMasterModal, handleItemaMasterClose, handlitemGroupShow, 
        handlUOMShow,handlAlternateUomShow,handlHSNShow,  ItemGroupSelect , ItemUOMSelect,
        ItemHSNSelect,setType,tax, setTax,
        setToastSave , AccountGroupType, setAccountGroupType} = useContext(DataContext)
        
        const [error, setError] = useState('')
         
        const itemGroupRef = useRef(null);
        const ItemtypeRef = useRef(null)
        const ItemUomRef = useRef(null)
        const ItemcategoryRef =useRef(null);
        const ItemIndicatorRef = useRef(null)
        const ItemHsnRef = useRef(null)
     
        const [Purchase , setPurchase] = useState(false) 

       
           // for select elemtnt
           const [selectedItemGroup, setSelectedItemGroup] = useState();
           const handleSelectitemgroup = (option) => {
            setSelectedItemGroup( { value: option.value , label:  option.label });
          
             };
            const [selectUOM, setSelectUOM] = useState()
            const handleSelectUOM = (option) => {
              setSelectUOM( { value: option.value , label:  option.label });
            
              // Your other logic here
               };
             const [selectHSN, setSelectHSN] = useState()
            const handleSelectHSN = (option) => {
              setSelectHSN( { value: option.value , label:  option.label });
          
              // setFieldValue('Item_HSN', option ? option.value : null);
              // Your other logic here
               };
          useEffect(() => {
          const selectedItemID = ItemHSNSelect.id;
          const selectedItemlable = ItemHSNSelect.lable;
            setSelectHSN({ value: selectedItemID, label:  selectedItemlable })
            if (selectedItemID){
              ItemHsnRef.current.setValue({ value: selectedItemID , label:  selectedItemlable })
            } 
           
            
        }, [ItemHSNSelect]);
        useEffect(() => {
          const selectedItemID = ItemUOMSelect.id;
          const selectedItemlable = ItemUOMSelect.lable;
          console.log(ItemUOMSelect,"-->>>>");
          if (selectedItemID) {
            setSelectUOM({ value: selectedItemID, label:  selectedItemlable })
            ItemUomRef.current.setValue({ value: selectedItemID , label:  selectedItemlable })
          }
        }, [ItemUOMSelect]);
        useEffect(() => {
          const selectedItemID = ItemGroupSelect.id;
          const selectedItemlable = ItemGroupSelect.lable;
          if (selectedItemID) {
            setSelectedItemGroup({ value: selectedItemID, label:  selectedItemlable })
            itemGroupRef.current.setValue({ value: selectedItemID , label:  selectedItemlable })
          }
        }, [ItemGroupSelect]);
      
        const handlePurchaseClose = () =>{
          setPurchase(false)
        }
        const handlePurchaseShow = () =>{
          setPurchase(true)
        }
        const [Selling , setSelling] = useState(false)
        const handleSellingClose = () =>{
          setSelling(false)
        }
        const handleSellingShow = () =>{
          setSelling(true)
        }
        const [Both , setBoth] = useState(false)
        const handlebothClose = () =>{
          setBoth(false)
        }
        const handlebothShow = () =>{
          setBoth(true)
        }
        const [serviceable , setServiceable] = useState(false)
        const handleserviceableClose = () =>{
          setServiceable(false)
        }
        const handleserviceableShow = () =>{
          setServiceable(true)
        }
         
       
      
      
 
        
     
      
        
      
        function reset_form(){ 
          setSelectedItemGroup( { value: "" , label:  "" });
          setSelectHSN({ value: "", label:  "" });
          setSelectUOM({ value: "", label:  "" })
          // itemGroupRef.current.clearValue();
          // ItemtypeRef.current.clearValue();
          // ItemUomRef.current.clearValue();
          // ItemcategoryRef.current.clearValue(); 
          // ItemIndicatorRef.current.clearValue(); 
          // ItemHsnRef.current.clearValue(); 
          
        }
        const initialmaster=   {
              Item_PartCode: "",
              Item_name: "",
              Description: "",
              Item_Group: null,
              Item_type: null,
              Item_UOM: null ,
              Alternate_uom: [],
              category: null,
              Item_Indicator: null,
              Item_Cost: "0",
              Purchase_uom:"",
              Item_Safe_Stock:0,
              Item_Order_Qty: 0,
              Item_Leadtime: 0,
              Item_Purchase_Account: "",
              Item_Mrp:0,
              Item_min_price:0,
              Item_Sales_Account:"",
              Item_HSN: null,
              Keep_stock:false,
              serial:false ,
              serial_auto_gentrate:false,
              Serial_format:"",
              Serial_starting:0  ,
              Batch_number:false,
              Service:false ,
              Item_Combo:false,
              item_Combo_data:[],
              Item_Barcode:false,
              Item_Active:true,
              item_qc:false, 
          }
          const item_type = [
            { value: 'Product', label: 'Product' },
            { value: 'Service', label: 'Service' }
          ]
          const Category = [
            { value: '1', label: 'finished goods' },
            { value: '2', label: 'raw materials' },
            { value: '3', label: 'semi-finished goods' },
            { value: '4', label: 'consumables' },
            { value: '5', label: 'bought-out parts' },
            { value: '6', label: 'trading goods' },
          ]
      
          const Item_Indicator =[
            { value: 'Buyer', label: 'Buy' },
            { value: 'seller', label: 'Sell' },
            { value: 'both', label: 'Both' },
          ]
          const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
          
            // if (!values.serial && !values.Batch_number) {
            //   setErrors({
            //     serial: 'Pls select Serial or Batch Number',
            //     Batch_number: 'Pls select Serial or Batch Number',
            //   });
             
            //   return;
            // }
            const save_itemmaster =  {
              "Item_PartCode":values['Item_PartCode'],
              "Item_name": values['Item_name'],
              "Description": values['Description'],
              "Item_type": values['Item_type'],
              "Alternate_uom": values['Alternate_uom'],
              "Item_Indicator": values['Item_Indicator'],
              "Item_Cost": values['Item_Cost'],
              "Item_Safe_Stock": values['Item_Safe_Stock'],
              "Item_Order_Qty": values['Item_Order_Qty'],
              "Item_Leadtime": values['Item_Leadtime'],
              "Item_Mrp": values['Item_Mrp'],
              "Item_min_price": values['Item_min_price'],
              "Keep_stock": values['Keep_stock'],
              "serial": values['serial'],
              "serial_auto_gentrate": values['serial_auto_gentrate'],
              "Serial_format": values['Serial_format'],
              "Serial_starting": values['Serial_starting'],
              "Batch_number": values['Batch_number'],
              "Service": values['Service'],
              "Item_Warranty_based": values['Item_Warranty_based'],
              "Item_Installation": values['Item_Installation'],
              "Invoicedate": values['Invoicedate'],
              "installation_data": values['installation_data'],
              "Item_Combo": values['Item_Combo'],
              "Item_Barcode": values['Item_Barcode'],
              "Item_Active": values['Item_Active'],
              "item_qc": values['item_qc'],
              "Item_UOM": values['Item_UOM'],
              "Item_Group": values['Item_Group'],
              "category": values['category'],
              "Purchase_uom": values['Purchase_uom'],
              "Item_Sales_Account": values['Item_Sales_Account'],
              "Item_Purchase_Account": values['Item_Purchase_Account'],
              "Item_HSN":values['Item_HSN'],
              "modified_by": 1
          } 
      
            try {
              const response = await axiosInstance.post("/itemmaster/ItemMaster", save_itemmaster)
              
              if (response && response.data) {
                const responseData = Array.isArray(response.data) ? response.data : [response.data];
                setItemMasterData(prevData => [ ...responseData,...prevData]);
              } else {
                // Handle the case where response or response.data is undefined
                console.error('Invalid response:', response);
                // Optionally set an error state or show a message to the user
              }
             
              setToastSave(true);
             
              handleItemaMasterClose()
              setError("")
              setTimeout(() => {
                setToastSave(false);
              }, 3000);
              resetForm();
             try{
              reset_form();
             }catch(errors){
              console.log(errors);
             }
             
            
             
            } catch (errors) {
              // Validation failed, log errors
               console.log(errors);
              setError(errors.response.data[0])
              // console.error('Validation errors:', errors);
            } finally {
              // Set submitting to false to enable the form submit button
              setSubmitting(false);
            }
          };
  return (
    <>
         <Modal show={itemaMasterModal} 
             size="xl"  onHide={() => { setError(''); handleItemaMasterClose(); }} >
          
          <Modal.Header closeButton>
           
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
          <div className='text-danger text-center' >{error? error : ""}</div>
          <Formik initialValues={initialmaster}
           validationSchema={ItemMasterSchema} 
           onSubmit={handleSubmit} >
              {({errors, touched, isSubmitting, values, setFieldValue , Formik, formikProps })=>(
            <>
            <Form>
                <div className="row">
                    <div className="col-6">
                      <label htmlFor="Part Code" className='form-label    pt-2 ps-1'>Part Code  </label>
                      <Field type='text' id='Part Code' name='Item_PartCode'  placeholder='' className='w-100 form-control '/>
              
                      {  touched.Item_PartCode &&  errors.Item_PartCode && <small>{errors.Item_PartCode}</small>}
                    </div>

                    <div className="col-6">
                      <label htmlFor="Part Name" className='form-label    pt-2 ps-1'>Part Name  </label>
                      <Field type='text' id= "Part Name" name='Item_name'  placeholder='' className='w-100 form-control'/>
                
                      {  touched.Item_name &&  errors.Item_name && <small>{errors.Item_name}</small>}
                    </div>

                    <div className="col-6">
                      <label htmlFor="Description" className='form-label    pt-2 ps-1'>Description</label>
                      <Field type='text' id='Description' name='Description'  placeholder='' className='w-100 form-control'/>
                      {  touched.Description &&  errors.Description && <small>{errors.Description}</small>}
                    </div>

                    <div className="col-6">
                      <label htmlFor="Item_Group_" className='form-label    pt-2 ps-1'>Item Group <i className='bx bx-plus-circle' onClick={handlitemGroupShow} ></i></label>
                    
                              <Select
                            name="Item_Group"
                            id='Item_Group_'
                            ref={itemGroupRef}  
                            value={selectedItemGroup}
                            options={ItemGroupdata.map((item) => ({ value: item.id, label: item.name }))}
                            onChange={(option) => {setFieldValue('Item_Group', option ? option.value : null);
                            handleSelectitemgroup(option)}}

                          />
                    
                    {touched.Item_Group && errors.Item_Group && <small>{errors.Item_Group}</small>}
                    </div>
                    <div className="col-6">
                      <label htmlFor="pro_ser" className='form-label    pt-2 ps-1'>Product/Service</label>
                    
                      <Select name = "Item_type"  
                      id='pro_ser'
                       ref={ItemtypeRef}
                      options={item_type}
                       onChange={(option) => setFieldValue('Item_type', option ? option.value : null)}
                      /> 
                      {touched.Item_type &&  errors.Item_type && <small>{errors.Item_type}</small>}
                    </div>
                    <div className="col-3">
                      <label htmlFor="Item_UOM" className='form-label    pt-2 ps-1'>Unit of Measurement <i className='bx bx-plus-circle' onClick={handlUOMShow} ></i></label>
                      
               
                      <Select
                      id='Item_UOM'
                      name="Item_UOM"
                      ref={ItemUomRef}
                      value={selectUOM}
                      options={ItemUOMdata.map((item) => ({ value: item.id, label: item.name }))}
                      isSearchable={true}
                      onChange={(option) => {setFieldValue('Item_UOM', option ? option.value : null);
                      handleSelectUOM(option)}}
                    />
                      {  touched.Item_UOM &&  errors.Item_UOM && <small>{errors.Item_UOM}</small>}
                    </div>
                    <div className="col-3 ">
                      <label htmlFor="Item_Alternate_UOM"  className='' hidden> Alternate UOM</label> <br/>
                    <button type="button" id='Item_Alternate_UOM' className="btn btn-outline-secondary mt-2" disabled={values.Item_UOM? false: true} onClick={handlAlternateUomShow}>Alternate UOM</button>
                    </div>
                    <div className="col-6">
                      <label htmlFor="category" className='form-label    pt-2 ps-1'>Category</label>
                      <Select
                      name="category"
                      ref={ItemcategoryRef}
                      options={Category}
                      isSearchable={true}
                      ItemUOMdata ={ItemUOMdata}
                     
                      onChange={(option) => setFieldValue('category', option ? option.value : null)}
                    />
                      {  touched.category &&  errors.category && <small>{errors.category}</small>}
                    </div>
                    <div className="col-6">
                      <label htmlFor="Item_Indicator" className='form-label    pt-2 ps-1'>Buy/Sell</label>
                     
                      <Select
                      name="Item_Indicator"
                      ref={ItemIndicatorRef}
                      options={Item_Indicator}
                      isSearchable={true}
                     
                      onChange={(option) => {setFieldValue('Item_Indicator', option ? option.value : null)
                      if (option && option.value === 'Buyer') {
                        setType("Buyer")
                        handlePurchaseShow()
                      } 
                         if (option && option.value === 'seller') {
                          setType("seller")
                
                          handleSellingShow()
                      }   if (option && option.value === 'both') {
                        setType("both")
                        handlebothShow()
                    } 
                     
                     
                         }}
                    />
                      {  touched.Item_Indicator &&  errors.Item_Indicator && <small>{errors.Item_Indicator}</small>}
                    </div>
                    <div className="col-3">
                       <label htmlFor="Item_HSN" className='form-label  pt-2 ps-1'>HSN <i className='bx bx-plus-circle' onClick={handlHSNShow} ></i></label>
                       <Select
                      name="Item_HSN"
                      ref={ItemHsnRef} 
                      value={selectHSN}
                      options={ItemHsndata.map((item) => ({ value: item.id, label: item.hsn_code , gst_rate: item.gst_rate }))}
                      isSearchable={true}
                      // onChange={handleSelectHSN}
                      onChange ={(option) => {setFieldValue('Item_HSN', option ? option.value : null)
                      handleSelectHSN(option);
                      setTax(option ? option.gst_rate : null)}}
                      //tax, setTax 
                    /> 
                       {  touched.Item_HSN &&  errors.Item_HSN && <small>{errors.Item_HSN}</small>}
                    </div>
                    <div className="col-3">
                       <label htmlFor="Tax" className='form-label    pt-2 ps-1'>Tax</label>
                        <input type="number" id='Tax' className='form-control'value={tax}  disabled />
                     
                    </div>
                    <div className="col-6"></div>
                    <div className="col-4 pt-3">
                        <label>
                        <Field type="checkbox" name="Keep_stock"  checked={values.Item_type=== 'Product' } className='me-4'   />
                        Keep Stock
                        </label>
                        <br/>
                        { errors.Keep_stock && <small>{errors.Keep_stock}</small>}
                    </div>
                    <div className="col-4 pt-3">
                        <label>
                        <Field type="checkbox" name="serial"  disabled={!!values.Batch_number} className='me-4'  />
                        Serial Number
                        </label>
                        <br/>
                        {  errors.serial && <small>{errors.serial}</small>}
                        <div className="row"   hidden={!values.serial}>
                            <label>
                            <Field type="checkbox" name="serial_auto_gentrate" className='me-4'  />
                            Auto Generate
                            </label>
                            <div className="col-6">
                               <label htmlFor="Serial_format" className='form-label    pt-2 ps-1'>Serial Format</label>
                               <Field type='text' id="Serial_format" name='Serial_format'  placeholder='' disabled={!values.serial_auto_gentrate} className='w-100 form-control'/>
                               {  errors.Serial_format && <small>{errors.Serial_format}</small>}
                            </div>
                            <div className="col-6">
                               <label htmlFor="Serial_starting" className='form-label    pt-2 ps-1'>Serial Starting</label>
                               <Field type='text' id='Serial_starting' name='Serial_starting'  placeholder=''  disabled={!values.serial_auto_gentrate} className='w-100 form-control'/>
                               {  errors.Serial_starting && <small>{errors.Serial_starting}</small>}
                            </div>
                        </div>
                        
                    </div>

                    <div className="col-4 pt-3">
                          <label>
                          <Field type="checkbox" name="Batch_number" disabled={!!values.serial} className='me-4'/>
                          Batch Number
                          </label>
                          <br/>
                          {  errors.Batch_number && <small>{errors.Batch_number}</small>}
                    </div>
                    <div className="col-4 pt-3">
                          <label>
                          
                          <Field type="checkbox" name="Service" onClick ={(e)=>{
                            if (e.target.checked) {
                              handleserviceableShow();
                            }
                          }} className='me-4'/>
                          Service
                          </label>
                          {  errors.Service && <small>{errors.Service}</small>}
                    </div>
                    <div className="col-4 pt-3">
                          <label>
                          <Field type="checkbox" name="Item_Combo" onClick ={(e)=>{
                            if (e.target.checked) { 
                            }
                          }}    className='me-4' />
                          Item Combo
                     
                          </label>
                          {  errors.Item_Combo && <small>{errors.Item_Combo}</small>}
                    </div>
                    <div className="col-4 pt-3">
                          <label>
                          <Field type="checkbox" name="Item_Barcode"   className='me-4' />
                          Barcode
                          </label>
                    </div>
                    <div className="col-4 pt-3">
                          <label>
                          <Field type="checkbox" name="item_qc"    className='me-4' />
                          Item Qc
                          </label>
                          {  errors.item_qc && <small>{errors.item_qc}</small>}
                    </div>
                    <div className="col-4 pt-3">
                          <label>
                          <Field type="checkbox" name="Item_Active"   className='me-4' />
                          Item Active
                          </label>
                          {  errors.Item_Active && <small>{errors.Item_Active}</small>}
                    </div>
                   
                </div>
                
            <Modal.Footer>
            <button type="submit" className="btn shadow-sm">Save</button>
             
          
          </Modal.Footer>
          
            </Form>
            <AddItemGroup/>
            <AddUom/>
            <PurchaseModal 
             touched={touched}
             errors={errors}
             handlePurchaseClose={handlePurchaseClose}
             Purchase={Purchase} 
             setFieldValue = {setFieldValue} 
            
            />
             <SellingPrice 
            touched={touched}
             errors={errors} 
             handleSellingClose ={handleSellingClose}
             Selling ={Selling}
             setFieldValue = {setFieldValue} 
             setAccountGroupType ={setAccountGroupType}
            />
             <PurchaseSellingModal
             touched={touched}
             errors={errors}
             ItemUOMdata ={ItemUOMdata}
             Accountdata ={Accountdata}
             handlebothClose = {handlebothClose}
             Both = {Both}
             setFieldValue = {setFieldValue}
             setAccountGroupType ={setAccountGroupType}
           
            />
             <AddAccount  
               AccountGroupType ={AccountGroupType}
               setAccountGroupType = {setAccountGroupType}
             />
              <AddAccountGroup    
             AccountGroupType ={AccountGroupType}
             />
             <AddHsn/>
             <Serviceable
              serviceable ={serviceable}
              handleserviceableClose = {handleserviceableClose}
              touched={touched}
              errors={errors}
              setFieldValue ={setFieldValue}
              values ={values}
              />
               {/* <ItemCombo 
            itemCombo = {itemCombo}
            handleitemComboClose ={handleitemComboClose}
            values ={values}
            handlItemComboformShow= {handlItemComboformShow}
            
            /> */}
            <AlternateUnit 
             values ={values}
             />

          
            
            </>
          
            
              )}
           
          </Formik>
          </Modal.Body>
         
         
        </Modal>

    </>
  )
}

export default ItemaMasterModal