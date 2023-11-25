import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from '../../api/axoiss';
import DataContext from '../../context/ItemMasterContext';

const DeleteConformation = ({deleteData, url}) => {
    const {toastDeleteConfomation, handletoastDeleteConfomationClose,Accountdata,
        storedata, setStoredata, ItemUOMdata, setUOMData, ItemHsndata, setHsnData,setAccountData, AccountGroupdata,setAccountGroupdata,
        conferenct, setConference} = useContext(DataContext)
const Detele= async ()=>{

    try{
       
        if(url === "/itemmaster/Store"){
          const response = await axiosInstance.delete(`${url}/${deleteData.id}`)
          console.log(response);
          const remove_delete_data = storedata.filter(data=> data.id !== deleteData.id)
          setStoredata(remove_delete_data)
          handletoastDeleteConfomationClose()
        } else if(url === "/itemmaster/UOM"){
          const response = await axiosInstance.delete(`${url}/${deleteData.id}`)
          console.log(response);
          const remove_delete_data = ItemUOMdata.filter(data=> data.id !== deleteData.id)
          setUOMData(remove_delete_data)
          handletoastDeleteConfomationClose()

        }  else if(url === "/itemmaster/hsn"){
          const response = await axiosInstance.delete(`${url}/${deleteData.id}`)
         
          const remove_delete_data = ItemHsndata.filter(data=> data.id !== deleteData.id)
          setHsnData(remove_delete_data)
          handletoastDeleteConfomationClose()

        } else if(url === "/itemmaster/AccountsMaster"){
          const response = await axiosInstance.delete(`${url}/${deleteData.id}`)
          console.log(response);
          const remove_delete_data = Accountdata.filter(data=> data.id !== deleteData.id)
          setAccountData(remove_delete_data)
          handletoastDeleteConfomationClose()

        } else if(url === "/itemmaster/AccountsGroup"){
          const response = await axiosInstance.delete(`${url}/${deleteData.id}`)
          console.log(response);
          const remove_delete_data = AccountGroupdata.filter(data=> data.id !== deleteData.id)
          setAccountGroupdata(remove_delete_data)
          handletoastDeleteConfomationClose()

        } else if(url === "/api/Conference"){
          const response = await axiosInstance.delete(`${url}/${deleteData.id}`)
          console.log(response);
          const remove_delete_data = conferenct.filter(data=> data.id !== deleteData.id)
          setConference(remove_delete_data)
          handletoastDeleteConfomationClose()
        }
        
      
    }catch(error){
        console.log(error);
    }
}
  return (
     <>
 
        <Modal
        show={toastDeleteConfomation} 
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Conformation Detele</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row fs-5 ms-2 text-danger">
          Are you Confirm To Delete {deleteData.Name}.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handletoastDeleteConfomationClose}>
            Close
          </Button>
          <Button variant="primary" onClick={Detele}>Delete</Button>
        </Modal.Footer>
      </Modal>
        
     </>
  )
}

export default DeleteConformation