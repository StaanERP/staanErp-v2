import React from 'react';
import Webcam from 'react-webcam';

const CameraComponent = ({webcamRef,capture,setIsCameraStarted }) => {
  


  return (
    <div>
       <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored={true} // Add this line to mirror the camera feed (optional)
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100000000 }}
        />
     
        <i class="fa-solid fa-circle fa-2xl "  onClick={()=>{
            capture()
            setIsCameraStarted(false)
        }} style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', zIndex: 100000000 , color: "#fffffff"}}></i>
        
       
 
    </div>
  );
};

export default CameraComponent;
