import React,{useContext, useEffect, useState} from 'react'
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import {   Formik , Field, Form } from 'formik';
import axiosInstance from '../../../api/axoiss'; 
import { SideNavbar } from '../../../components/sideNavbar/SideNavbar';
import DataContext from '../../../context/ItemMasterContext';
import "./itemmasterEdit.css"
import { ItemMasterSchema } from '../../validations/itemmaster';
import AlternateUnit from '../../components/model/AlternateUnit';
 

const ItemMasterEdit = () => {
    const{ItemGroupdata, ItemUOMdata,handlAlternateUomShow,AccountGroupdata, ItemHsndata,Accountdata,Navigate,   setTax, tax,setType, type } = useContext(DataContext)

    const [ItemMasterEditDisabled, setItemMasterEditDisabled] = useState(true)
    const {id} = useParams();
    const [initialMasterData , setInitialMasterData] = useState([])
    const [purchaseAccountdata, setpurchaseAccountdata] = useState([])
    const [salesAccountdata, setsalesAccountdata] = useState([])
    

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
      const WarrantyBasedOptions = [
        { value: 'Invoice date', label: 'Invoice date' },
        { value: 'Installation date', label: 'InvInstallation date' },
       
      ]
      useEffect(()=>{
        const updatedPurchaseAccountData = [];
        for (let Accountdata_ of Accountdata) {
            const group = Accountdata_.Accounts_Group_Name
            if(group){
            const data = AccountGroupdata.find(item => item.id === group )
            if(data.Accounts_Type ==="Liabilities" || data.Accounts_Type ==="Expenses" ){
        
                updatedPurchaseAccountData.push(Accountdata_)
            }
            }
        }
        setpurchaseAccountdata(updatedPurchaseAccountData)

        const updatedSalesAccountData = [];
        for (let Accountdata_ of Accountdata) {
        const group = Accountdata_.Accounts_Group_Name
        if(group){
            const data = AccountGroupdata.find(item => item.id === group )
            if(data.Accounts_Type ==="Asset" || data.Accounts_Type ==="Income" ){
        
            updatedSalesAccountData.push(Accountdata_)
            }
        }
        }
        setsalesAccountdata(updatedSalesAccountData)


        },[Accountdata, AccountGroupdata])
         // for select elemtnt
         const [selectedItemGroup, setSelectedItemGroup] = useState();
         const handleSelectitemgroup = (option) => {
          setSelectedItemGroup( { value: option.value , label:  option.label });
           };
        const [selectedtype, setSelectedtype] = useState();
        const handleSelectType = (option) => {
            setSelectedtype( { value: option.value , label:  option.label });
            };
        const [selectedUOM, setSelectedUOM] = useState();
        const handleSelectUOM = (option) => {
            setSelectedUOM( { value: option.value , label:  option.label });
            };
        const [selectedCategory, setSelectedCategory] = useState();
        const handleSelectCategory = (option) => {
            setSelectedCategory( { value: option.value , label:  option.label });
            };
        const [selectedItem_Indicator, setSelectedItem_Indicator] = useState();
        const handleSelectItem_Indicator = (option) => {
            setSelectedItem_Indicator( { value: option.value , label:  option.label });
            };
        const [selectedHSN, setSelectedHSN] = useState();
        const handleSelectHSN = (option) => {
            setSelectedHSN( { value: option.value , label:  option.label });
            };
        const [selectedPurchaseuom, setSelectedPurchaseuom] = useState();
        const handleSelectPurchaseuom = (option) => {
            setSelectedPurchaseuom( { value: option.value , label:  option.label });
            };
        const [selectedAccount, setSelectedAccount] = useState();
        const handleSelectAccount = (option) => {
            setSelectedAccount( { value: option.value , label:  option.label });
            };
        const [selectedAccountSales, setSelectedAccountSales] = useState();
        const handleSelectAccountSales = (option) => {
            setSelectedAccountSales( { value: option.value , label:  option.label });
            };
        const [selectedWarranty_based, setSelectedWarranty_based] = useState();
        const handleSelectWarranty_based = (option) => {
            setSelectedWarranty_based( { value: option.value , label:  option.label });
            };  
           
        // for select elemtnt
    const [initialmaster , setInitialMaster] = useState(
        {
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
            Warranty_Require: false,
            Item_Warranty_based: '',
            Item_Installation: false,
            Item_Combo:false,
            item_Combo_data:[],
            Item_Barcode:false,
            Item_Active:true,
            item_qc:false, 
        }
    )
    const forter = ""
    if (forter === "forter"){
        setInitialMaster(
            {
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
                Warranty_Require: false,
                Item_Warranty_based: '',
                Item_Installation: false,
                Item_Combo:false,
                item_Combo_data:[],
                Item_Barcode:false,
                Item_Active:true,
                item_qc:false, 
            }
        )
    }
     
    useEffect(()=>{
        async function getitemmasterdata (){
            const response = await axiosInstance.get(`/itemmaster/ItemMaster/${id}`)
            setInitialMasterData(response.data)
        }
        if(id){
            getitemmasterdata()
        }  
    },[id ])

    useEffect(() => {
        // Only log and perform actions if initialMasterData has changed
        if (initialMasterData && initialMasterData['Item_PartCode']) {
            
            initialmaster.Item_PartCode =  initialMasterData['Item_PartCode'] !== null ? initialMasterData['Item_PartCode'] :""
            initialmaster.Item_name =  initialMasterData['Item_name']  !== null ? initialMasterData['Item_name'] :""
            initialmaster.Description =  initialMasterData['Description'] !== null ? initialMasterData['Description'] :""
            initialmaster.Item_Group =  initialMasterData['Item_Group'] !== null ? initialMasterData['Item_Group'] :""
            const defaultSelectedItemGroup = ItemGroupdata.find(item => item.id === initialMasterData['Item_Group']);
            if(defaultSelectedItemGroup){
                setSelectedItemGroup({ value: defaultSelectedItemGroup.id, label: defaultSelectedItemGroup.name })
            }
            initialmaster.Item_type =  initialMasterData['Item_type'] 
            setSelectedtype( { value: initialMasterData['Item_type'] , label:  initialMasterData['Item_type'] });
            initialmaster.Item_UOM =  initialMasterData['Item_UOM']
            const defaultSelectedUOM = ItemUOMdata.find(item => item.id === initialMasterData['Item_UOM']);
            if(defaultSelectedUOM){
                setSelectedUOM({ value: defaultSelectedUOM.id, label: defaultSelectedUOM.name })
            } 
            initialmaster.Alternate_uom =  initialMasterData['Alternate_uom'] !== null ? initialMasterData['Alternate_uom'] :""
            initialmaster.category =  initialMasterData['category']
            const defaultSelectedCategory = Category.find(item => item.value === initialMasterData['category']);
            if(defaultSelectedCategory){
                setSelectedCategory({ value: defaultSelectedCategory.value, label: defaultSelectedCategory.label })
            }
            
            initialmaster.Item_Indicator =  initialMasterData['Item_Indicator']
            const defaultSelectedItem_Indicator = Item_Indicator.find(item => item.value === initialMasterData['Item_Indicator']);
            console.log(defaultSelectedItem_Indicator);
            if (defaultSelectedItem_Indicator.value === 'Buyer') {
                setType("Buyer")
                // handlePurchaseShow()
            } 
                if (defaultSelectedItem_Indicator.value === 'seller') {
                setType("seller")
        
                // handleSellingShow()
            }   if (defaultSelectedItem_Indicator.value === 'both') {
                setType("both")
                // handlebothShow()
            } 
            if(defaultSelectedItem_Indicator){
                setSelectedItem_Indicator({ value: defaultSelectedItem_Indicator.value, label: defaultSelectedItem_Indicator.label })
            }
            const defaultSelectedhsn = ItemHsndata.find(item => item.id === initialMasterData['Item_HSN']);
            if(defaultSelectedhsn){
                setSelectedHSN({ value: defaultSelectedhsn.id, label: defaultSelectedhsn.hsn_code })
                setTax(defaultSelectedhsn.gst_rate)
            }
            initialmaster.Item_HSN =  initialMasterData['Item_HSN'] !== null ? initialMasterData['Item_HSN'] :""
            initialmaster.Item_Cost = initialMasterData['Item_Cost'] !== null ? initialMasterData['Item_Cost'] : '';
            initialmaster.Purchase_uom =  initialMasterData['Purchase_uom'] ?  initialMasterData['Purchase_uom'] : "";
            const defaultSelectedPurchase_uom = ItemUOMdata.find(item => item.id === initialMasterData['Purchase_uom']);
            if(defaultSelectedPurchase_uom){
                setSelectedPurchaseuom({ value: defaultSelectedPurchase_uom.id, label: defaultSelectedPurchase_uom.name })
            }
            initialmaster.Item_Safe_Stock =  initialMasterData['Item_Safe_Stock'] !== null ? initialMasterData['Item_Safe_Stock'] :""
            initialmaster.Item_Order_Qty =  initialMasterData['Item_Order_Qty'] !== null ? initialMasterData['Item_Order_Qty'] :""
            initialmaster.Item_Leadtime =  initialMasterData['Item_Leadtime'] !== null ? initialMasterData['Item_Leadtime'] :""
            initialmaster.Item_Purchase_Account =  initialMasterData['Item_Purchase_Account'] ?  initialMasterData['Item_Purchase_Account'] :""
            const defaultSelectedAccountdata = Accountdata.find(item => item.id === initialMasterData['Item_Purchase_Account']);
            if(defaultSelectedAccountdata){
                setSelectedAccount({ value: defaultSelectedAccountdata.id, label: defaultSelectedAccountdata.Accounts_Name })
            }
            initialmaster.Item_Mrp =  initialMasterData['Item_Mrp'] !== null ? initialMasterData['Item_Mrp'] :""
            initialmaster.Item_min_price =  initialMasterData['Item_min_price'] !== null ? initialMasterData['Item_min_price'] :""
            initialmaster.Item_Sales_Account =  initialMasterData['Item_Sales_Account']  ? initialMasterData['Item_Sales_Account'] :""
            const defaultSelectedAccountdataSales = Accountdata.find(item => item.id === initialMasterData['Item_Sales_Account']);
            if(defaultSelectedAccountdataSales){
                setSelectedAccountSales({ value: defaultSelectedAccountdataSales.id, label: defaultSelectedAccountdataSales.Accounts_Name })
            }
            if(initialMasterData['Item_Warranty_based']){
               initialmaster.Warranty_Require = true
            }
            initialmaster.Item_Installation =  initialMasterData['Item_Installation'] !== null ? initialMasterData['Item_Installation'] :""
            initialmaster.Item_Warranty_based =  initialMasterData['Item_Warranty_based'] ? initialMasterData['Item_Warranty_based'] : ""

            const defaultSelectedWarranty_based = WarrantyBasedOptions.find(item => item.value === initialMasterData['Item_Warranty_based']);
            console.log(defaultSelectedWarranty_based);
            if(defaultSelectedWarranty_based){
                setSelectedWarranty_based({ value: defaultSelectedWarranty_based.value, label: defaultSelectedWarranty_based.label })
            }
            initialmaster.Keep_stock =  initialMasterData['Keep_stock'] !== null ? initialMasterData['Keep_stock'] :""
            initialmaster.serial =  initialMasterData['serial'] !== null ? initialMasterData['serial'] :""
            initialmaster.serial_auto_gentrate =  initialMasterData['serial_auto_gentrate'] !== null ? initialMasterData['serial_auto_gentrate'] :""
            initialmaster.Serial_format =  initialMasterData['Serial_format'] !== null ? initialMasterData['Serial_format'] :""
            initialmaster.Serial_starting =  initialMasterData['Serial_starting'] !== null ? initialMasterData['Serial_starting'] :""
            initialmaster.Item_Combo =  initialMasterData['Item_Combo'] !== null ? initialMasterData['Item_Combo'] :""
            initialmaster.Item_Barcode =  initialMasterData['Item_Barcode'] !== null ? initialMasterData['Item_Barcode'] :""
            initialmaster.item_qc =  initialMasterData['item_qc'] !== null ? initialMasterData['item_qc'] :""
            initialmaster.Item_Active =  initialMasterData['Item_Active'] !== null ? initialMasterData['Item_Active'] :""
            initialmaster.Service =  initialMasterData['Service'] !== null ? initialMasterData['Service'] :""
        }
    }, [initialMasterData,Accountdata,ItemGroupdata  , ItemGroupdata, ItemHsndata, ItemUOMdata,setTax ,setType ]);
//  , , Category,,,,Item_Indicator  ,WarrantyBasedOptions, ,  ,  
   const handleSubmit = async (values, { setSubmitting,   setErrors }) =>{
    console.log('----->>>>>');
    console.log(values);
 
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
        const response = await axiosInstance.put(`/itemmaster/ItemMaster/${id}`, save_itemmaster)
        
        if (response && response.data) {
          const responseData = Array.isArray(response.data) ? response.data : [response.data];
          console.log(responseData);
          Navigate('/ItemMaster')
        //   setItemMasterData(prevData => [...prevData, ...responseData]`);
        } else {
          // Handle the case where response or response.data is undefined
          console.error('Invalid response:', response);
          // Optionally set an error state or show a message to the user
        }
       
        // setToastSave(true);
       
        // setError("")
        // setTimeout(() => {
        //   setToastSave(false);
        // }, 3000);

      } catch (errors) {
        // Validation failed, log errors
         console.log(errors);
        // setError(errors.response.data[0])
        // console.error('Validation errors:', errors);
      } finally {
        // Set submitting to false to enable the form submit button
        setSubmitting(false);
      }
    
   }

  return (
     <>
     <SideNavbar/>
     <div className='itemMaster_Wrap container-fluid  overflow-auto ps-0'> 
         <div className="container mt-5 itemMasterEditWrap bg-white rounded"> 
             <Formik initialValues={initialmaster}
             validationSchema={ItemMasterSchema}
             onSubmit={handleSubmit}>
                 {({errors, touched, isSubmitting, values, setFieldValue , Formik, formikProps })=>(
                    <>
                    <Form  >
                     <div className="row ">
                        <div className="col-6 fw-bold fs-4 my-2 ">
                         ItemMaster Edit
                        </div>
                         
                        <div className="col-6 text-end my-2">
                        
                        <button type='button' className="btn shadow-sm btn-outline-primary" hidden={!ItemMasterEditDisabled} onClick={()=>{setItemMasterEditDisabled(false)}}>Edit</button>
                        <button type='button' className="btn shadow-sm btn-outline-primary mx-2" hidden={!ItemMasterEditDisabled} onClick={()=>{Navigate("/ItemMaster")}}><i class='bx bx-window-close'></i></button>
                        <button type="button" className="btn shadow-sm btn-outline-primary me-1" hidden={ItemMasterEditDisabled} 
                        onClick={()=>{setItemMasterEditDisabled(true)}} >Cancle</button>
                        <button type="submit" className="btn shadow-sm btn-outline-primary" hidden={ItemMasterEditDisabled}>Submit</button>
                        </div>

                       <hr className='  split_border '/>
                        <div className="row">
                        <div className="col-6 px-5   ">
                            <div className="row">
                            <div className="col-6">
                                <label htmlFor="Part Code" className='form-label    pt-2 ps-1'>Part Code  </label>
                                <Field type='text' id='Part Code' name='Item_PartCode' disabled={ItemMasterEditDisabled}  placeholder='' className='w-100 form-control '/>
                        
                                {  touched.Item_PartCode &&  errors.Item_PartCode && <small>{errors.Item_PartCode}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Part Name" className='form-label    pt-2 ps-1'>Part Name  </label>
                                <Field type='text' id= "Part Name" name='Item_name'  disabled={ItemMasterEditDisabled} placeholder='' className='w-100 form-control'/>
                            
                                {  touched.Item_name &&  errors.Item_name && <small>{errors.Item_name}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Description" className='form-label    pt-2 ps-1'>Description</label>
                                <Field type='text' id='Description' name='Description'   disabled={ItemMasterEditDisabled} placeholder='' className='w-100 form-control'/>
                                {  touched.Description &&  errors.Description && <small>{errors.Description}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Group_" className='form-label    pt-2 ps-1'>Item Group </label>
                                
                                <Select
                                name="Item_Group"
                                id='Item_Group_'
                                // ref={itemGroupRef}  
                                value={selectedItemGroup}
                                isDisabled={ItemMasterEditDisabled}
                                options={ItemGroupdata.map((item) => ({ value: item.id, label: item.name }))}
                                onChange={(option) => {setFieldValue('Item_Group', option ? option.value : null)
                                handleSelectitemgroup(option)}}
                                />
                                
                                {touched.Item_Group && errors.Item_Group && <small>{errors.Item_Group}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="pro_ser" className='form-label    pt-2 ps-1'>Product/Service</label>
                                
                                <Select name = "Item_type"  
                                id='pro_ser'
                                // ref={ItemtypeRef}
                                value={selectedtype}
                                isDisabled={ItemMasterEditDisabled}
                                options={item_type}
                                onChange={(option) =>{ setFieldValue('Item_type', option ? option.value : null);
                                handleSelectType(option)}}
                                /> 
                                {touched.Item_type &&  errors.Item_type && <small>{errors.Item_type}</small>}
                                
            
                            </div>
                            <div className="col-3">
                                <label htmlFor="Item_UOM" className='form-label    pt-2 ps-1'>UOM  </label>
                                
                        
                                <Select
                                id='Item_UOM'
                                name="Item_UOM"
                                value={selectedUOM}
                                isDisabled={ItemMasterEditDisabled}
                                options={ItemUOMdata.map((item) => ({ value: item.id, label: item.name }))}
                                isSearchable={true}
                                onChange={(option) => {setFieldValue('Item_UOM', option ? option.value : null);
                                handleSelectUOM(option)
                                 }}
                                />
                                
            
                                {  touched.Item_UOM &&  errors.Item_UOM && <small>{errors.Item_UOM}</small>}
                            </div>
                            <div className="col-3 ">
                                <label htmlFor="Item_Alternate_UOM"  className='' hidden> Alternate UOM</label> <br/>
                                <button type="button" id='Item_Alternate_UOM' className="btn btn-outline-secondary mt-2" disabled={values.Item_UOM && ItemMasterEditDisabled ? true :  false} onClick={handlAlternateUomShow}>Alternate UOM</button>
                            </div>
                            <AlternateUnit  values ={values}/>
                            <div className="col-6">
                                <label htmlFor="category" className='form-label    pt-2 ps-1'>Category</label>
                                <Select
                                name="category"
                                // ref={ItemcategoryRef}
                                value={selectedCategory}
                                isDisabled={ItemMasterEditDisabled}
                                options={Category}
                                isSearchable={true} 
                                
                                onChange={(option) => {setFieldValue('category', option ? option.value : null);
                                handleSelectCategory(option)}}
                                />
                                {  touched.category &&  errors.category && <small>{errors.category}</small>}
                                 
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Indicator" className='form-label    pt-2 ps-1'>Buy/Sell</label>
                                
                                <Select
                                name="Item_Indicator"
                                // ref={ItemIndicatorRef}
                                options={Item_Indicator}
                                isDisabled={ItemMasterEditDisabled}
                                isSearchable={true}
                                value={selectedItem_Indicator}
            
                                
                                onChange={(option) => {setFieldValue('Item_Indicator', option ? option.value : null)
                                if (option && option.value === 'Buyer') {
                                    setType("Buyer")
                                    // handlePurchaseShow()
                                } 
                                    if (option && option.value === 'seller') {
                                    setType("seller")
                            
                                    // handleSellingShow()
                                }   if (option && option.value === 'both') {
                                    setType("both")
                                    // handlebothShow()
                                } 
                                handleSelectItem_Indicator(option)
                                
                                    }}
                                />
                                {  touched.Item_Indicator &&  errors.Item_Indicator && <small>{errors.Item_Indicator}</small>}
                            </div>
                            <div className="col-3">
                                <label htmlFor="Item_HSN" className='form-label  pt-2 ps-1'>HSN </label>
                                <Select
                                name="Item_HSN"
                                // ref={ItemHsnRef} 
                                isDisabled={ItemMasterEditDisabled}
                                options={ItemHsndata.map((item) => ({ value: item.id, label: item.hsn_code , gst_rate: item.gst_rate }))}
                                isSearchable={true}
                                // onChange={handleSelectHSN}
                                value={selectedHSN}
                                onChange ={(option) => {setFieldValue('Item_HSN', option ? option.value : null)
                                handleSelectHSN(option)
                                setTax(option ? option.gst_rate : null)}}
                                
                                
                    
                                /> 
                                {  touched.Item_HSN &&  errors.Item_HSN && <small>{errors.Item_HSN}</small>}
                                </div>
                                <div className="col-3">
                                <label htmlFor="Tax" className='form-label    pt-2 ps-1'>Tax</label>
                                    <input type="number" id='Tax' className='form-control'value={tax}  disabled />
                                
                                </div>
                            </div>
                         
                        </div>
                        <div className="col-6">
                         <div className="row" hidden = {type === "Buyer"? false : true}>
                            <div className="col-6">
                                <label htmlFor="Item_Cost" className='form-label    pt-2 ps-1'>Item Cost </label>
                                    <Field type='text' name='Item_Cost'  placeholder='' disabled={ItemMasterEditDisabled} className='w-100 form-control '/>
                                    {  touched.Item_Cost &&  errors.Item_Cost && <small>{errors.Item_Cost}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Purchase_uom" className='form-label    pt-2 ps-1'>Unit of Measurement(UOM)</label>
                                        <Select
                                    name="Purchase_uom"
                                    options={ItemUOMdata.map((item) => ({ value: item.id, label: item.name }))}
                                    isSearchable={true}
                                    value={selectedPurchaseuom}
                                    isDisabled={ItemMasterEditDisabled}
                                    onChange={(option) => {setFieldValue('Purchase_uom', option ? option.value : null);
                                    handleSelectPurchaseuom(option)}}
                                    />
                                    {  touched.Purchase_uom &&  errors.Purchase_uom && <small>{errors.Purchase_uom}</small>}
                             </div>
                            {/*  isDisabled={ItemMasterEditDisabled} */}
                            <div className="col-6">
                                <label htmlFor="Item_Safe_Stock" className='form-label    pt-2 ps-1'>Item Safe Stock </label>
                                    <Field type='text' name='Item_Safe_Stock'  placeholder='' disabled={ItemMasterEditDisabled} className='w-100 form-control '/>
                            
                                    {  touched.Item_Safe_Stock &&  errors.Item_Safe_Stock && <small>{errors.Item_Safe_Stock}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Order_Qty" className='form-label    pt-2 ps-1'>Item Order Qty </label>
                                    <Field type='text' name='Item_Order_Qty'  placeholder=''  disabled={ItemMasterEditDisabled} className='w-100 form-control '/>
                            
                                {  touched.Item_Order_Qty &&  errors.Item_Order_Qty && <small>{errors.Item_Order_Qty}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Leadtime" className='form-label    pt-2 ps-1'>Item Leadtime </label>
                                    <Field type='text' name='Item_Leadtime'  placeholder=''  disabled={ItemMasterEditDisabled} className='w-100 form-control '/>
                            
                                    {  touched.Item_Leadtime &&  errors.Item_Leadtime && <small>{errors.Item_Leadtime}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Purchase_Account" className='form-label    pt-2 ps-1'>Item Purchase Account  </label>

                                    <Select
                                    options={purchaseAccountdata.map((item) => ({ value: item.id, label: item.Accounts_Name }))}
                                    isSearchable={true}
                                    // ref={AccountRef} 
                                    isDisabled={ItemMasterEditDisabled}
                                    value={selectedAccount}
                                    onChange={(option) => {setFieldValue('Item_Purchase_Account', option ? option.value : null);
                                    handleSelectAccount(option);  }}
                                    />
                                    {  touched.Item_Purchase_Account &&  errors.Item_Purchase_Account && <small>{errors.Item_Purchase_Account}</small>}
                            </div>
                         </div>
                         <div className="row" hidden = {type === "seller"? false : true}>
                            <div className="col-6">
                                <label htmlFor="Item_Mrp" className='form-label    pt-2 ps-1'>Item Mrp </label>
                                        <Field type='text' name='Item_Mrp' disabled={ItemMasterEditDisabled} className='w-100 form-control '/>
                                
                                        {  touched.Item_Mrp &&  errors.Item_Mrp && <small>{errors.Item_Mrp}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_min_price" className='form-label    pt-2 ps-1'>Item Min Price </label>
                                    <Field type='text' name='Item_min_price' disabled={ItemMasterEditDisabled}  className='w-100 form-control '/>
                            
                                    {  touched.Item_min_price &&  errors.Item_min_price && <small>{errors.Item_min_price}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Sales_Account" className='form-label    pt-2 ps-1'>Item Sales Account 
                              </label>                                
                                
                                <Select
                                        name="Item_Sales_Account"
                                        options={salesAccountdata.map((item) => ({ value: item.id, label: item.Accounts_Name }))}
                                        isSearchable={true}
                                        isDisabled={ItemMasterEditDisabled}
                                        value={selectedAccountSales}
                                        onChange={(option) => {setFieldValue('Item_Sales_Account', option ? option.value : null);
                                        handleSelectAccountSales(option)} }
                                />
                                
            
                                        {  touched.Item_Sales_Account &&  errors.Item_Sales_Account && <small>{errors.Item_Sales_Account}</small>}
                            </div>
                      
                         </div>
                         <div className="row" hidden = {type === "both"? false : true}>
                            <div className="col-6">
                                <label htmlFor="Item_Cost" className='form-label    pt-2 ps-1'>Item Cost </label>
                                    <Field type='text' name='Item_Cost'  placeholder='' disabled={ItemMasterEditDisabled} className='w-100 form-control '/>
                            
                                    {  touched.Item_Cost &&  errors.Item_Cost && <small>{errors.Item_Cost}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Purchase_uom" className='form-label    pt-2 ps-1'>Unit of Measurement(UOM)</label>
                                        <Select
                                    name="Purchase_uom"
                                    isDisabled={ItemMasterEditDisabled}
                                    options={ItemUOMdata.map((item) => ({ value: item.id, label: item.name }))}
                                    isSearchable={true}
                                    value={selectedPurchaseuom}
                                    onChange={(option) => {setFieldValue('Purchase_uom', option ? option.value : null)
                                    handleSelectPurchaseuom(option) }}
                                    />
                                    {  touched.Purchase_uom &&  errors.Purchase_uom && <small>{errors.Purchase_uom}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Safe_Stock" className='form-label    pt-2 ps-1'>Item Safe Stock </label>
                                    <Field type='text' name='Item_Safe_Stock'disabled={ItemMasterEditDisabled} placeholder='' className='w-100 form-control '/>
                            
                                    {  touched.Item_Safe_Stock &&  errors.Item_Safe_Stock && <small>{errors.Item_Safe_Stock}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Order_Qty" className='form-label    pt-2 ps-1'>Item Order Qty </label>
                                    <Field type='text' name='Item_Order_Qty' disabled={ItemMasterEditDisabled}  placeholder='' className='w-100 form-control '/>
                            
                                    {  touched.Item_Order_Qty &&  errors.Item_Order_Qty && <small>{errors.Item_Order_Qty}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Leadtime" className='form-label    pt-2 ps-1'>Item Leadtime </label>
                                    <Field type='text' name='Item_Leadtime' disabled={ItemMasterEditDisabled} placeholder='' className='w-100 form-control '/>
                            
                                    {  touched.Item_Leadtime &&  errors.Item_Leadtime && <small>{errors.Item_Leadtime}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Purchase_Account" className='form-label    pt-2 ps-1'>Item Purchase Account  </label>
                                            
                                <Select
                                options={purchaseAccountdata.map((item) => ({ value: item.id, label: item.Accounts_Name }))}
                                isSearchable={true}
                                // ref={AccountRef} 
                                isDisabled={ItemMasterEditDisabled}
                                value={selectedAccount}
                                onChange={(option) => {setFieldValue('Item_Purchase_Account', option ? option.value : null);
                                handleSelectAccount(option);  }}
                                />
                                {  touched.Item_Purchase_Account &&  errors.Item_Purchase_Account && <small>{errors.Item_Purchase_Account}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Mrp" className='form-label    pt-2 ps-1'>Item Mrp </label>
                                        <Field type='text' name='Item_Mrp' disabled={ItemMasterEditDisabled}  className='w-100 form-control '/>
                                
                                        {  touched.Item_Mrp &&  errors.Item_Mrp && <small>{errors.Item_Mrp}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_min_price" className='form-label    pt-2 ps-1'>Item Min Price </label>
                                        <Field type='text' name='Item_min_price' disabled={ItemMasterEditDisabled} className='w-100 form-control '/>
                                
                                        {  touched.Item_min_price &&  errors.Item_min_price && <small>{errors.Item_min_price}</small>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Sales_Account" className='form-label    pt-2 ps-1'>Item Sales Account</label>
                                <Select
                                        name="Item_Sales_Account"
                                        options={salesAccountdata.map((item) => ({ value: item.id, label: item.Accounts_Name }))}
                                        isSearchable={true}
                                        isDisabled={ItemMasterEditDisabled}
                                        value={selectedAccountSales}
                                        onChange={(option) => {setFieldValue('Item_Sales_Account', option ? option.value : null);
                                        handleSelectAccountSales(option)} }
                                />
                                        {  touched.Item_Sales_Account &&  errors.Item_Sales_Account && <small>{errors.Item_Sales_Account}</small>}
                            </div>
                         </div>
                        </div>
                        <div className="col-6 px-5">
                            <div className="row">
                            <div className="col-6">
                                <label>
                                <Field type="checkbox" name="Warranty_Require"      className='me-4' />
                                Warranty Require
                                </label>
                            </div>
                            <div className="col-6">
                                <label>
                                <Field type="checkbox" name="Item_Installation"     className='me-4' />
                                Item Installation
                                </label>
                            </div>
                            <div className="col-6">
                                <label htmlFor="Item_Warranty_based" className='form-label    pt-2 ps-1' >Item Warranty based</label>
                                <Select
                                name="Item_Warranty_based"
                                options={WarrantyBasedOptions}
                                isSearchable={true}
                                value={selectedWarranty_based}
                                 
                                onChange={(option) => {setFieldValue('Item_Warranty_based', option ? option.value : null)
                                handleSelectWarranty_based()}}
                                />
                                {touched.Item_Warranty_based &&  errors.Item_Warranty_based && <small>{errors.Item_Warranty_based}</small>}
                                
            
                            </div>
                            </div>
                        </div> 
                        <div className="col-6 text-success  text-center">
                            Item Combo Coming Soon
                        </div>
                        
                        <div className="col-12  px-5">
                             <div className="row">
                                <div className="col-2  ">
                                    <label>
                                    <Field type="checkbox" name="Keep_stock" disabled={ItemMasterEditDisabled}  checked={values.Item_type=== 'Product' } className='me-4'   />
                                    Keep Stock
                                    </label>
                                    <br/>
                                    { errors.Keep_stock && <small>{errors.Keep_stock}</small>}
                                </div>
                                <div className="col-4 pt-3" >
                                    <label>
                                    <Field type="checkbox" name="serial"  disabled className='me-4'  />
                                    Serial Number
                                    </label>
                                    <br/>
                                    {  errors.serial && <small>{errors.serial}</small>}
                                    <div className="row"   hidden={!values.serial}>
                                        <label>
                                        <Field type="checkbox" name="serial_auto_gentrate" disabled className='me-4'  />
                                        Auto Generate
                                        </label>
                                        <div className="col-6">
                                        <label htmlFor="Serial_format" className='form-label    pt-2 ps-1'>Serial Format</label>
                                        <Field type='text' id="Serial_format" name='Serial_format' disabled  placeholder=''   className='w-100 form-control'/>
                                        {  errors.Serial_format && <small>{errors.Serial_format}</small>}
                                        </div>
                                        <div className="col-6">
                                        <label htmlFor="Serial_starting" className='form-label    pt-2 ps-1'>Serial Starting</label>
                                        <Field type='text' id='Serial_starting' name='Serial_starting' disabled  placeholder=''    className='w-100 form-control'/>
                                        {  errors.Serial_starting && <small>{errors.Serial_starting}</small>}
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="col-2 pt-3">
                                        <label>
                                        <Field type="checkbox" name="Batch_number" disabled   className='me-4'/>
                                        Batch Number
                                        </label>
                                        <br/>
                                        {  errors.Batch_number && <small>{errors.Batch_number}</small>}
                                </div>
                                <div className="col-2 pt-3">
                                    <label>
                                    
                                    <Field type="checkbox" name="Service" disabled onClick ={(e)=>{
                                     
                                    }} className='me-4'/>
                                    Service
                                    </label>
                                    {  errors.Service && <small>{errors.Service}</small>}
                                </div>
                                <div className="col-2 pt-3">
                                    <label>
                                    <Field type="checkbox" name="Item_Combo" disabled={ItemMasterEditDisabled} className='me-4' />
                                    Item Combo
                                    </label>
                                    {  errors.Item_Combo && <small>{errors.Item_Combo}</small>}
                                </div>
                                <div className="col-2 pt-3">
                                    <label>
                                    <Field type="checkbox" name="Item_Barcode" disabled={ItemMasterEditDisabled}  className='me-4' />
                                    Barcode
                                    </label>
                                </div>
                                <div className="col-2 pt-3">
                                    <label>
                                    <Field type="checkbox" name="item_qc"  disabled={ItemMasterEditDisabled}  className='me-4' />
                                    Item Qc
                                    </label>
                                    {  errors.item_qc && <small>{errors.item_qc}</small>}
                                </div>
                                <div className="col-2 pt-3">
                                    <label>
                                    <Field type="checkbox" name="Item_Active" disabled={ItemMasterEditDisabled}  className='me-4' />
                                    Item Active
                                    </label>
                                    {  errors.Item_Active && <small>{errors.Item_Active}</small>}
                                </div>
                                
                                
                             </div>
                            
                        </div>
                                
                        </div>
                       
                     </div>
                     </Form>
                    </>
                 )}

             </Formik>

         </div>
     </div>
     
     </>
  )
}

export default ItemMasterEdit