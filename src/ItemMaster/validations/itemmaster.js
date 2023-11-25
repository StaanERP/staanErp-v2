import * as  yup from "yup"

export const ItemMasterSchema = yup.object().shape({
    Item_PartCode: yup.string().required("Please Enter PartCode"),
    Item_name: yup.string().required("Please Enter Name"),
    Description: yup.string(),
    Item_Group :  yup.string().required("Please Select Group"),
    Item_type: yup.string().required("Please Select"),
    Item_UOM: yup.string().required("Please Select UOM"),
    Alternate_uom : yup.array(),
    category : yup.string().required("Please Select Category"),
    Item_Indicator: yup.string(),
    Item_Cost : yup.number(),
    Purchase_uom : yup.string(),
    Item_Safe_Stock : yup.number(),
    Item_Order_Qty : yup.number(),
    Item_Leadtime : yup.number(),
    Item_Purchase_Account : yup.string(),
    Item_Mrp : yup.number(),
    Item_min_price : yup.number(),
    Item_Sales_Account : yup.number(),
    Item_HSN:  yup.string().required("Please Enter Hsn"),
    Keep_stock: yup.boolean(),
    serial: yup.boolean(),
    Batch_number: yup.boolean(),
    serial_auto_gentrate: yup.boolean(),
    Serial_format: yup.string().when('serial_auto_gentrate', {
            is: true,
            then: (schema) => schema.required(),
            otherwise: (schema) => schema.notRequired(),
        }),
    Serial_starting: yup.number().when('serial_auto_gentrate', {
        is: true,
        then:  (schema) => schema.required(),
        otherwise:  (schema) => schema.notRequired(),
    }),
    
    Service: yup.boolean(),
    Warranty_Require : yup.boolean(),
    Item_Warranty_based: yup.string(),
    Item_Installation: yup.boolean(),
    Item_Combo: yup.boolean(),
    item_Combo_data : yup.array(),
    Item_Barcode: yup.boolean(),
    item_qc: yup.boolean(),
    Item_Active: yup.boolean(),
   
    // modified_by: ""
})


export const itemGroupSchema = yup.object().shape({
    Name:yup.string().required("Pls Enter Name"),
    Hsn: yup.string(),
    Group: yup.string(),
}) 


export const itemUOMschema = yup.object().shape({
    name:yup.string().required("Pls Enter Name"),
    E_Way_Bill_UOM :yup.string(),
    Description : yup.string()
})

export const itemHsnSchema =yup.object().shape({
    hsn_type : yup.string().required("Select any one"),
    hsn_code : yup.number().required("Pls Enter HSN Code"),
    gst_rate : yup.number(),
    cess_rate : yup.number(),
    rcm : yup.boolean(),
    itc: yup.boolean(),
    Description : yup.string().required('Pls Enter Description')

})


export const itemAccountSchema = yup.object().shape({
    Name : yup.string().required('Pls Enter Accounts Name'),
    Group : yup.string(),
    Gst : yup.boolean(),
    tds : yup.boolean(),
    Active : yup.boolean(),

})

export const AccountGroupSchema = yup.object().shape({
    Accounts_Group_Name : yup.string().required('Pls Enter Accounts Name'),
    Accounts_Type :yup.string().required('Pls  Select Type'),
    Group_Active : yup.boolean(),
})


export const  ItemComboSchema = yup.object().shape({
    itempartcode:yup.string().nullable(),
    item_name : yup.string().nullable(),
    qty: yup.number().required("Pls Enter QTY"),
    Is_Mandatory : yup.boolean(),
    item_display : yup.string()
})

export const StoreSchema = yup.object().shape({
    StoreName :yup.string().required('Pls Enter Name'),
    matained: yup.boolean(),
    Action : yup.boolean(),
    StoreAccount : yup.string().required('Pls Enter Account'),
    StoreInCharge :   yup.string().required('Pls Select InCharge')
})