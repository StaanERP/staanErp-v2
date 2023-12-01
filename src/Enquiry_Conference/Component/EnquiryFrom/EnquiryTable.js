import React, { useContext, useEffect, useState } from 'react'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from 'ag-grid-react'
import DataContext from '../../../context/ItemMasterContext';
import axiosInstance from '../../../api/axoiss';
import { SideNavbar } from '../../../components/sideNavbar/SideNavbar';
import { useNavigate } from 'react-router-dom';
import EnquiryFromEdit from './EnquiryFromEdit';
import "./Enquirystyle.css" 

const EnquiryTable = () => {
    const {enquiry,   conferenct,userdata} = useContext(DataContext)
    const navigate = useNavigate();
    const [post, setPost] =  useState('')
    const [enquiryEdit, setEnquiryEdit] = useState('')
    const [pageSize, setPageSize] = useState(10);
    
   
 
      useEffect(() => {
        const fetchData = async () => {
          if (enquiry && enquiry.length > 0) {
            const updatedData = await Promise.all(enquiry.map(async (item) => {
              const con_id = item['conferencedata'];
              const user_id = item['salesPerson'];
              let intersted_id = item['Interesteds'];
              const conference = conferenct.find((con) => Number(con.id) === Number(con_id))
              const conferenceName = conference ? conference.Name : '';
              const Sales_man =  userdata.find((useritem)=> useritem.id ===  user_id)
              let salesmana_name = ""
              try{
                salesmana_name = Sales_man['username']
         
              } catch{
                salesmana_name =""
              }
              
              let intrestedProductsData = [];
              if (intersted_id && intersted_id.length > 0) {
                intrestedProductsData = await Promise.all(
                  intersted_id.map(async (productId) => {
                    try {
                      const response = await axiosInstance.get(`/api/product/${productId}`);
                      return response.data.Name; // Assuming response.data contains the product data
                    } catch (error) {
                      // Handle error for 'intrested_products'
                      
                    }
                  })
                );
              }
        
              // Return the updated item
              return {
                ...item,
                con_name: conferenceName, // Update 'con_name' property with 'conferencedata' response
                intrested_products: intrestedProductsData, // Add 'intrested_products' property with 'intrested_products' response
                salesmana_name :salesmana_name
              };
            })); 
            setPost(updatedData)
          }
        };
      
        fetchData();
      }, [enquiry , conferenct, userdata]);
      
   
 
   
   
      const colums= [
        { headerName: "Action", cellRenderer: 'editButton', width: 100,
           },
        {
            headerName:'ID' , field:'id',
             editable: false ,
             filter:false,
             flex:1,
             hide : true,
             headerClass: 'center-header'
            
        },
        {
            headerName:'Name' , field:'Name',  
       
            width: 150,
            headerClass: 'center-header'
        },
        {
          headerName:'Status' , 
          field:'status',editable:false,
          cellEditor: 'agSelectCellEditor',
          width: 150,
          headerClass: 'center-header'
       
          // cellEditorParams: {
          //   values: ['Not Contacted', 'Converted', 'Junk'],
          // },
      },
        {
            headerName:'Organization' , 
            field:'OrganizationName',
            width: 200,
            headerClass: 'center-header'
            
        },
        {
          headerName:'Email' , 
          field:"Email",
          editable: false , 
          width: 200,
          headerClass: 'center-header'
    
         
      },
      {
        headerName:'Mobile' , 
        field:"MobileNumber",
        editable: false , 
        headerClass: 'center-header'
       
    },
    
    {
        headerName:'City' , 
        field:"Location",
        headerClass: 'center-header'
    },
    {
        headerName:'Message' , 
        field:"message",
        editable: false , 
        headerClass: 'center-header'
    },
    {
        headerName:'Conference' , 
        field:"con_name",
        editable: false , 
        headerClass: 'center-header'
    },
    {
        headerName:'Interested' , 
        field: "intrested_products",
        editable: false , 
        headerClass: 'center-header'
    },
    {
      headerName:'Sales Person' , 
      field: "salesmana_name",
      editable: false , 
      headerClass: 'center-header'
    },
    {
      headerName:'Follow up' , 
      field: "followup",
      editable: false , 
      headerClass: 'center-header',
      valueFormatter: (params) => {
        if (params.value == null || params.value === '') {
          return ''; // Return empty string for empty values
        }
  
        // Format the date using your preferred date library or JavaScript Date methods
        const formattedDate = new Date(params.value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
  
        return formattedDate;
      },
    },
    {
      headerName:'Remarks' , 
      field: "Remarks",
      editable: false , 
      headerClass: 'center-header'
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
    const editButton = ({ value, data }) => {
    
      const handleClick = () => {
        handleenquiryEditFromShow()
        setEnquiryEdit(data);
      };
      
      // const handledeleteConfomation = () => {
        
      //   handltoastDeleteConfomationShow();
      //   setdeleteData({
      //     Name:data.StoreName,
      //     id: data.id
      //   }); 
    
      // };
      
  
      return ( 
        <>
        <button className='btn btn-outline-success btn-sm px-3 mx-2' onClick={handleClick}> <i class="fa-solid fa-pen   " ></i> </button>      
        
        </>
      );
    } 
    const components = {
      editButton: editButton,
    };
    const [enquiryEditFrom, setEnquiryEditFrom] = useState(false);

    const handleenquiryEditFromClose = () => setEnquiryEditFrom(false);
    const handleenquiryEditFromShow = () => setEnquiryEditFrom(true);
    const handlePageSizeChange = (event) => {
      const newSize = parseInt(event.target.value, 10);
      setPageSize(newSize);
      // gridOptions.api.paginationSetPageSize(newSize);
    };
  return (
    <>
       <SideNavbar/>
       <div className='container-xxl sidemargin m-0 p-0'>
            <div className="itemMaster_Top mx-3 mt-3" style={{   width: "100%" }}>
                <div className="row py-3 ps-3">
                    <div className="col-6">
                        <h3>Enquiry Contacts </h3>
                    </div>
                    <div className="col-6 text-end pe-4">
                        <button type="button" className="btn btn-outline-primary" onClick={handleButtonClick}  ><i class='bx bxs-plus-circle' ></i> New</button>
                    </div>
                </div>
                
            </div>
            <div className='ag-theme-alpine mx-3 enquiryTable  ' style={{ height: "80%", width: "100%" }}>
            <AgGridReact
            rowData={post}
            columnDefs={colums}
            defaultColDef={defaultColDef} 
            pagination={true}
            paginationPageSize = {pageSize}
            components={components}
            style={{ overflowX: 'auto' }}
            />
              <div className='Rows_per_page' >
                  <label htmlFor="pageSizeSelect " className='fw-bolder'>Rows per page:</label>
                  <select id="pageSizeSelect" className='pageSizeSelect' value={pageSize} onChange={handlePageSizeChange}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    {/* Add more options as needed */}
                  </select>
              </div>
            </div> 
          
            
            

      </div>
      <EnquiryFromEdit 
      enquiryEditFrom = {enquiryEditFrom}
      handleenquiryEditFromClose = {handleenquiryEditFromClose}
      enquiryEdit = {enquiryEdit}
      />
      
      
    </>
  )
}

export default EnquiryTable