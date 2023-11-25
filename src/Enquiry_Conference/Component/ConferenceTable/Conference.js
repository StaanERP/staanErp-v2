import React, { useEffect , useContext, useState} from 'react'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from 'ag-grid-react'
import DataContext from '../../../context/ItemMasterContext';
import { SideNavbar } from '../../../components/sideNavbar/SideNavbar';
import ConferenceFrom from './ConferenceFrom';
import DeleteConformation from '../../../components/deleteConformations.js/DeleteConformation';
 
 

const Conference = () => {
    const {conferenct, handltoastDeleteConfomationShow} = useContext(DataContext)
    useEffect(()=>{
        console.log(conferenct);
    },[conferenct])
    const [conferenceEdit, setConferenceEdit] = useState('')
    const [deleteData, setDeleteData] = useState('')
    const url = "/api/Conference"
    
    const deleteButton = ({ value, data }) => {
        
      const handleClick = () => { 
        setConferenceEdit(data);
        handleConferenceFormshow()
 
      };
      
      const handledeleteConfomation = () => {
        
        handltoastDeleteConfomationShow();
        setDeleteData({
         Name:data.Name,
         id: data.id
        }); 
    
      };
     
 
     return ( 
       <>
       <button className='btn btn-outline-danger btn-sm px-3 mx-2' onClick={handledeleteConfomation}><i class="fa-solid fa-trash " ></i> </button>
       <button className='btn btn-outline-success btn-sm px-3 mx-2' onClick={handleClick}> <i class="fa-solid fa-pen   " ></i> </button>      
       
       </>
     );
   } 
    const colums= [
        {
            headerName:'ID' , field:'id',  flex:1 
        },
        {
            headerName:'Name' , field:'Name', flex:3,
        },
        {
          headerName:'Start Date ' , field:'startDate', flex:3,
       },
       {
        headerName:'End Date' , field:'endDate', flex:3,
       },
        {
          headerName:'Incharge' , 
          field:"incharge", 
          flex:3
      },
      {
        headerName: 'Active',
        field: 'Status',   
        flex: 2,
      },
      {
        headerName:'user' , 
        field:"createdBy",
        hide: true,
      },
      { headerName: "Action", cellRenderer: 'deleteButton'},
    ]
    const components = {
        deleteButton: deleteButton,
      };

    const defaultColDef ={
        sortable:true, editable:false
        , filter:true, floatingFilter:true,  
        resizable: true,
        initialWidth: 200,
        wrapHeaderText: true,
        autoHeaderHeight: true,
    }
    const [AddConference, setAddConference] = useState(false)
    const handleConferenceFormshow = ()=>{
        setAddConference(true)
        
    }
    const handleConferenceFromClose = ()=>{
        setAddConference(false)
    }



    return (
    <>
    <SideNavbar/>
    <div className='container-lg'>
            <div className="itemMaster_Top mx-3 mt-3" style={{   width: "100%" }}>
                <div className="row py-3 ps-3">
                    <div className="col-6">
                        <h3>Conference</h3>
                    </div>
                    <div className="col-6 text-end pe-4">
                        <button type="button" className="btn btn-outline-primary" onClick={handleConferenceFormshow} ><i class='bx bxs-plus-circle' ></i> New</button>
                    </div>
                </div>
            </div>
            <div className='ag-theme-alpine mx-3   ' style={{ height: "80%", width: "100%" }}>
            <AgGridReact
            rowData={conferenct}
            columnDefs={colums}
            defaultColDef={defaultColDef}
            components={components}
            pagination={true}
            />
            </div> 
            <ConferenceFrom 
             handleConferenceFromClose = {handleConferenceFromClose}
              AddConference = {AddConference} 
              conferenceEdit= {conferenceEdit}
              setConferenceEdit ={setConferenceEdit}/>
            <DeleteConformation deleteData = {deleteData}
             url = {url}/>
            

      </div>

    
     
    </>
  )
}

export default Conference