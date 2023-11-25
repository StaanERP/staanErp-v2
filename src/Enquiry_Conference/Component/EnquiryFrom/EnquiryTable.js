import React, { useContext, useEffect, useState } from 'react'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from 'ag-grid-react'
import DataContext from '../../../context/ItemMasterContext';
import axiosInstance from '../../../api/axoiss';
import { SideNavbar } from '../../../components/sideNavbar/SideNavbar';
import { useNavigate } from 'react-router-dom';

const EnquiryTable = () => {
    const {enquiry, userId} = useContext(DataContext)
    const navigate = useNavigate();
    const [post, setPost] =  useState('')
    useEffect(()=>{
       
        setPost(enquiry)
        console.log(enquiry);
    },[enquiry])

    // const 
    // useEffect(() => {
        // const fetchData = async () => {
        //   if (post && post.length > 0) { 
        //     const updatedData = await Promise.all(post.map(async (item) => {
        //       const con_id = item['conferencedata'];
        //       let intersted_id = item['Interesteds'];
      
        //       // Fetch data for 'conferencedata'
        //       let conferenceData;
        //       if (con_id) {
        //         try {
        //           const response = await axiosInstance.get(`api/conferenceDetails/${con_id}`);
        //           conferenceData = response.data.Name;
        //         } catch (error) {
        //           // Handle error for 'conferencedata'
        //         }
        //       }
      
              // Fetch data for 'intrested_products'
              // let intrestedProductsData = [];
              // if (intersted_id && intersted_id.length > 0) {
              //   intrestedProductsData = await Promise.all(
              //     intersted_id.map(async (productId) => {
              //       try {
              //         const response = await axiosInstance.get(`/api/product/${productId}`);
              //         return response.data.Name; // Assuming response.data contains the product data
              //       } catch (error) {
              //         // Handle error for 'intrested_products'
                      
              //       }
              //     })
              //   );
              // }
      
      //         return {
      //           ...item,
      //           con_name: conferenceData, // Update 'con_name' property with 'conferencedata' response
      //           // intrested_products: "data" // Add 'intrested_products' property with 'intrested_products' response
      //         };
      //       }));
      //       setPost(updatedData);
      //     }
      //   };
      
      //   fetchData();
      // }, [post]);
    const colums= [
        {
            headerName:'ID' , field:'id',
             editable: false ,
             filter:false,
            
        },
        {
            headerName:'Name' , field:'Name',  
        },
        {
          headerName:'Status' , 
          field:'status',editable:true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: ['Not Contacted', 'Converted', 'Junk'],
          },
      },
        {
            headerName:'OrganizationName' , 
            field:'OrganizationName',
            
        },
        {
          headerName:'Email' , 
          field:"Email",
          editable: false , 
         
      },
      {
        headerName:'Mobile Number' , 
        field:"MobileNumber",
        editable: false , 
       
    },
    {
        headerName:'Location' , 
        field:"Location",
        editable: false , 
        
    },
    {
        headerName:'message' , 
        field:"message",
        editable: false , 
        
    },
    {
        headerName:'Conference Name' , 
        field:"conferencedata",
        editable: false , 
        
    },
    {
        headerName:'Interesteds' , 
        field:"Interesteds",
        editable: false , 
    },
  
        
    ]
    const defaultColDef ={
        sortable:true, editable:false
        , filter:true, floatingFilter:true,  
        resizable: true,
        initialWidth: 200,
        wrapHeaderText: true,
        autoHeaderHeight: true,
    }
    const handleButtonClick = () => {
 
        navigate('/Enquiry');
      };

  return (
    <>
       <SideNavbar/>
       <div className='container-lg'>
            <div className="itemMaster_Top mx-3 mt-3" style={{   width: "100%" }}>
                <div className="row py-3 ps-3">
                    <div className="col-6">
                        <h3>Enquiry</h3>
                    </div>
                    <div className="col-6 text-end pe-4">
                        <button type="button" className="btn btn-outline-primary" onClick={handleButtonClick}  ><i class='bx bxs-plus-circle' ></i> New</button>
                    </div>
                </div>
            </div>
            <div className='ag-theme-alpine mx-3   ' style={{ height: "80%", width: "100%" }}>
            <AgGridReact
            rowData={post}
            columnDefs={colums}
            defaultColDef={defaultColDef} 
            pagination={true}
            />
            </div> 
            
            

      </div>
    </>
  )
}

export default EnquiryTable