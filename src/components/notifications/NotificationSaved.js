import React, { useContext } from 'react' 
import Toast from 'react-bootstrap/Toast';
import "./NotificationSaved.css"
import DataContext from '../../context/ItemMasterContext';



const NotificationSaved  = () => {
  
  const {toastSave, toggleShowA} = useContext(DataContext)
    
  return (
     <>
        <Toast show={toastSave} onClose={toggleShowA} className="center-top-toast bottom-0 end-0 ">
          <Toast.Header>
            <strong className="me-auto">Status</strong>
       
          </Toast.Header>
          <Toast.Body>Saved successfully</Toast.Body>
        </Toast>
     
     </>
  )
}

export default NotificationSaved 




 