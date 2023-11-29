import React, { useContext, useState } from 'react' 
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'; 
import { Formik, Field, Form } from 'formik/dist';
import { StockSchema } from '../../validations/itemmaster';
import DataContext from '../../../context/ItemMasterContext';
import axiosInstance from '../../../api/axoiss';

const StockAdjusFrom = ({stockFrom, handStockCose, userId}) => {
  const {itemmasterdata, storedata, stock, setStock} =  useContext(DataContext)
  const [errorQty, setErrorQty]= useState('')
  const initialvalues =  {
    "qty": "",
    "part_no": "",
    "part_name":"",
    "store": "",
}

const handleSubmit =async (values, { setSubmitting, resetForm })=>{
  //   const SaveValue = { 
  //     "qty": values["qty"],
  //     "part_no": values["part_no"] ,
  //     "store":values["store"] ,
  //     "users": userId
  // }

  if (errorQty === ""){
    const checkQty_value = stock.filter(stockData => stockData['part_no'] === values['part_no'] ?stockData : "" ).filter(stockData => stockData['store'] === values['store'] ? stockData : "")
   
   
    if (values["qty"][0]=== "+"){
      
      if(checkQty_value.length === 0 ){
        console.log(values)
      }else{
        console.log("--->>>>");
        const oldqty = Number(checkQty_value[0]['currentStock']);
        const newqty = Number(values["qty"]);
        checkQty_value[0]['currentStock'] = oldqty + newqty;
       try{
        const respones = await axiosInstance.put(`/itemmaster/Stock/${checkQty_value[0]['id']}`, checkQty_value);
        
        const responseData = Array.isArray(respones?.data) ? respones.data : [respones?.data];
        setStock((prevData) => {
          return prevData.map((item) => { // Log the IDs for debugging
            return item.id === responseData[0].id ? responseData[0] : item;
          });
        });
        handStockCose()
       } catch(error){
        console.log(error);

       }
     
      }
      
      
    } else{
      console.log("---", values["qty"]);
    }
  
   
  }
}
  const [selectpartCode, setSelectpartCode] = useState('')
  const handleSelectpartCode = (option)=>{
    setSelectpartCode({ value: option.value , label:  option.label })
  }

  const [selectpartName, setSelectpartName] = useState('')
  const handleSelectpartName = (option)=>{
    setSelectpartName({ value: option.value , label:  option.label })
  }

  const [selectStore, setSelectStore] = useState('')
  const handleSelectStore = (option)=>{
    setSelectStore({ value: option.value , label:  option.label })
  }

  const [qty, setQty] = useState('')
  const handleSelectQty = (value)=>{
    const simbul = value[0]
    if (simbul === "+" || simbul === "-"){
      setErrorQty("")
    }
    else{
      setErrorQty("Enter -,+")
    }
    setQty(value)
  }
  
  return (
     <>
         <Modal show={stockFrom} onHide={handStockCose}>
        <Modal.Header closeButton>
          <Modal.Title>Stock Adjusment</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
             <Formik initialValues={initialvalues} 
              validationSchema={StockSchema}
              onSubmit={handleSubmit}>
              {({errors, touched, isSubmitting , setFieldValue})=>(
              <Form>
               
                    <div className="row">
                        <div className="col-6">
                        <label htmlFor="part_no" className='form-label    pt-2 ps-1'>Part Code  </label>
                          <Select
                          name="part_no" 
                          options={itemmasterdata.map((item) => ({ value: item.id, label: item.Item_PartCode, name:item.Item_name  }))}
                          isSearchable={true}
                          value={selectpartCode}
                          onChange={(option) => {setFieldValue('part_no', option ? option.value : null);
                          handleSelectpartCode(option)
                          setSelectpartName({ value: option.value , label:  option.name })
                          }}                      
                        />
              
                      {  touched.part_no &&  errors.part_no && <small>{errors.part_no}</small>}
                        </div>
                        <div className="col-6">
                            <label htmlFor="part_Name" className='form-label    pt-2 ps-1'>Part Name  </label>
                            <Select
                            name="part_name" 
                            options={itemmasterdata.map((item) => ({ value: item.id, label: item.Item_name , partCode: item.Item_PartCode}))}
                            isSearchable={true}
                            value={selectpartName}
                            onChange={(option) => {setFieldValue('part_name', option ? option.value : null);
                            handleSelectpartName(option) 
                            setSelectpartCode({ value: option.value , label:  option.partCode })}}                      
                            />
                             {  touched.part_name &&  errors.part_name && <small>{errors.part_name}</small>}
                        </div>
                        <div className="col-6">
                        <label htmlFor="qty" className='form-label    pt-2 ps-1'>Qty  </label>
                        <Field type='text' id='qty' name='qty'  value={qty} 
                         onChange={(e) => {setFieldValue('qty', e.target.value);
                          handleSelectQty(e.target.value)}}
                          className='w-100 form-control '/>
                           <small>{errorQty ?  errorQty+" ," : ""} </small>
                        {  touched.qty &&  errors.qty && <small>{errors.qty}</small>}
                        </div>
                        <div className="col-6">
                        <label htmlFor="store" className='form-label    pt-2 ps-1'>Store  </label>
                        
                        <Select
                            name="store" 
                            options={storedata.map((item) => ({ value: item.id, label: item.StoreName }))}
                            isSearchable={true}
                            value={selectStore}
                            onChange={(option) => {setFieldValue('store', option ? option.value : null);
                            handleSelectStore(option);}}                      
                            />
 
  
                        {  touched.store &&  errors.store && <small>{errors.store}</small>}
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

export default StockAdjusFrom