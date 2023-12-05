import React, { useState, useRef, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { AgGridReact } from 'ag-grid-react';
import Modal from 'react-bootstrap/Modal';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Select from 'react-select'; 
import DataContext from '../../../context/ItemMasterContext';
import axiosInstance from '../../../api/axoiss';
 


  

const AlternateUnit = ({  values }) => {
  
  const {AlternateUomAdd, handleAlternateUomClose,ItemUOMdata } = useContext(DataContext)
  const [unitSelectListed , setUnitSelectListed] = useState([values.Item_UOM])
 
  useEffect(()=>{
    setUnitSelectListed(prevList => [...prevList, values.Item_UOM])
  },[values.Item_UOM])

 
  const gridApiRef = useRef(null);
  const [post, setPost] = useState([
    
  ]);
  const handleDelete = async (rowData) => {
    
    try{
        await  axiosInstance.delete(`/itemmaster/Alternate/${rowData.id}`);
      
  
     } catch(error){
       console.log(error);
     }
     setPost(post.filter(item => item.id !== rowData.id));
    // Or if you're using Redux, you can dispatch an action to remove the row from the store.
  };
 
const columnDefs = [
  {
    headerName: 'Id', 
    field: 'id', 
    hide: true
    
  },
  { 
    headerName: 'Addtional Unit', 
    field: 'Addtional_Unit', 
  },
  { 
    headerName: ' ', 
    field: 'show_data', 
    
   
  },
  { 
    headerName: 'Conversion Factor', 
    field: 'Conversion_Factor', 
    editable: true, 
     
   
  },
  {
    headerName: 'Delete', // Column header text is set to 'Delete'
    cellRenderer: (param) => ( // Cell renderer function, takes a parameter (possibly the data for the current row)
      <div>
        <i className='bx bx-trash' onClick={() => handleDelete(param.data)} style={{ color: '#ef0c0c' }}></i> {/* Trash icon with a specific style (red color) */}
      </div>
    )
  }
  
];


const defaultColDef ={
  sortable:true, editable:false
  , filter:true, floatingFilter:true,  
  resizable: true,
}


 const [ConversionUnit, setConversionUnit] = useState('')
 const [ConversionFactor, setConversionFactor] = useState('')
 const [Conversion , setConversion] =useState({
   unit:'',
   Factor :' '
 }) 
   

 const onSubmitToDatabase = async (datas) => {
  try {
    const response = await axiosInstance.post('/itemmaster/Alternate', datas);
    const responseData = Array.isArray(response.data) ? response.data : [response.data];
    // console.log(responseData[0].addtional_unit);
   const uom_data =    ItemUOMdata
   .filter((uomname) => uomname.id === Number(responseData[0].addtional_unit))
   .map((filteredUOM) => String(filteredUOM.name))
    setPost(prevState => [
      ...prevState,
      {
        id : Number(responseData[0].id),
        Addtional_Unit: ( uom_data),
        show_data:  `1 ${uom_data} =` ,
        Conversion_Factor: Number(responseData[0].conversion_Factor),
      }
    ]
  );
    
    setConversionUnit('')
    setConversionFactor("")
  } catch (error) {
    // Handle error here
    console.error(error);
  //   if (error.response) {
  //     // The request was made and the server responded with a status code
  //     // that falls out of the range of 2xx
  //     setError(error.response.data.non_field_errors[0]);
  //     console.error('Server error:', error.response.data.non_field_errors[0]);
  // } else if (error.request) {
  //     // The request was made but no response was received
  //     setError('No response from server');
  //     console.error('No response from server');
  // } else {
  //     // Something happened in setting up the request that triggered an Error
  //     setError('Error setting up the request');
  //     console.error('Error setting up the request:', error.message);
  // }
  }
};
const onRowValueChanged =async (event)=>{
  const data = event.data
  const additionalUnitId = ItemUOMdata
  .filter((uomname) => uomname.name === data.Addtional_Unit[0])
  .map((filteredUOM) => String(filteredUOM.id))[0];
 
  const datas =
    {
      "id" : (data.id),
      "conversion_Factor": data.Conversion_Factor ,
      "addtional_unit":  additionalUnitId,
      "modified_by": 2
    }
   
   try{
    const response = await axiosInstance.put(`/itemmaster/Alternate/${data.id}`, datas);
    console.log(response);

   } catch(error){

   }
}

 function onsubmitvalue(){ 

  if (ConversionUnit){
    setConversion( {
      unit: ""
  });
  
  
  
  setUnitSelectListed(prevList => [...prevList, ConversionUnit.value])
  console.log(unitSelectListed);
    if(ConversionFactor){
 
     const saveAternateUnit =  
      {
        "conversion_Factor": ConversionFactor ,
        "addtional_unit": ConversionUnit.value,
        "modified_by": 2
     }
     
     onSubmitToDatabase(saveAternateUnit)
      setConversion( {
        Factor: ""
    });
 
    }else{
       
      setConversion(prevState => ({
         
        Factor: "Fill Factor"
      }));
    }
            
  } else{ 
     
    setConversion(prevState => ({
      unit: "Fill Unit"
    }));
  }
}
const ResetValue = ()=>{
  setConversionUnit('')
  setConversionFactor("")
  setConversion( {
    Factor: "",
    unit :""
});
}
const getAlterUOMData= async(alteruom)=>{
  const response = await axiosInstance.get(`/itemmaster/Alternate/${alteruom}`);
  const responseData = Array.isArray(response.data) ? response.data : [response.data];
  const uom_data =    ItemUOMdata
  .filter((uomname) => uomname.id === Number(responseData[0].addtional_unit))
  .map((filteredUOM) => String(filteredUOM.name))
   setPost(prevState => [
     ...prevState,
     {
       id : Number(responseData[0].id),
       Addtional_Unit: ( uom_data),
       show_data:  `1 ${uom_data} =` ,
       Conversion_Factor: Number(responseData[0].conversion_Factor),
     }
   ]
 );

}
// edit functions
useEffect( ()=>{
  if((values.Alternate_uom && AlternateUomAdd === true )){
    
    const alteruoms = values.Alternate_uom
    for (let alteruom of alteruoms) {
       console.log(alteruom);
       getAlterUOMData(alteruom)
       

    }
  }
},[AlternateUomAdd, values.Alternate_uom])
 



  return (
    <>
       <Modal show={AlternateUomAdd} onHide={() => {
                    // Deselect all rows using the grid API
                    setPost([])

                    // Close the modal or perform other actions as needed
                    handleAlternateUomClose();
                }} 
        size="lg"
 >
        <Modal.Header closeButton>
          {/* <Modal.Title>Alternate UOM</Modal.Title> */}
        </Modal.Header>
        <Modal.Body> 
           <div className="row">
             <div className="col-6">
             Base Unit
             </div>
             <div className="col-6">
             <input
                    type="text" className="form-control"
                    value={
                        ItemUOMdata
                        .filter((uomname) => uomname.id === values.Item_UOM)
                        .map((filteredUOM) => filteredUOM.name)  
                    }  disabled/> 
             </div>
             <div className="row">
             <div className='ag-theme-alpine  mx-3'    > 
             <AgGridReact  
                ref={gridApiRef}
               columnDefs={columnDefs}
               rowData={post}
               editType={'fullRow'}
               domLayout='autoHeight' 
               defaultColDef = {defaultColDef} 
               onRowValueChanged={onRowValueChanged}/>
              </div>
             </div>
           </div>
          <div className="row">
              <div className="col-3">
              <label htmlFor="uom" className='form-label    pt-2 ps-1'>UOM</label>
              
              <Select
                name="uom" 
                options={ItemUOMdata.filter(uomname => !unitSelectListed.includes(uomname.id))
                  .map((item) => ({ value: item.id, label: item.name }))}  
                value={ConversionUnit}
                onChange={(selectedOption) => {setConversionUnit(selectedOption);
                 }}
              />
               {Conversion.unit}
              </div>
              <div className="col-3">
                <label htmlFor="uom" className='form-label pt-2 ps-1'>Conversion Factor</label>
                <input  type='number' className='form-control'
                value={ConversionFactor}
                onChange={(event)=>setConversionFactor(event.target.value)} />
                {Conversion.Factor}
              </div>
              <div className="col-3 mt-4">
              <button type="button" class="btn btn-outline-secondary mt-3" onClick={onsubmitvalue}>Add</button>
              </div>
              <div className="col-3 mt-4">
              <button type="button" class="btn btn-outline-secondary mt-3" onClick={ResetValue}>Reset</button>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => {
                    // Deselect all rows using the grid API
                    setPost([])

                    // Close the modal or perform other actions as needed
                    handleAlternateUomClose();
                }}>
                    Close
                </Button>
          <Button variant="primary" onClick={() => {
                    // Select all rows using the grid API
                    if (gridApiRef.current) {
                     
                        gridApiRef.current.api.selectAll();
                    }
                    const Alternate_uomData = gridApiRef.current.api.getSelectedRows().map(row => row.id);
                    values.Alternate_uom = Alternate_uomData;
                    // Close the modal or perform other actions as needed
                    handleAlternateUomClose();
                }}>
            Save  
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AlternateUnit;
