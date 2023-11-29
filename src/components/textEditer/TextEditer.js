import React, { useState ,useRef, useContext, useEffect } from 'react'
import JoditEditor from 'jodit-react';
import DataContext from '../../context/ItemMasterContext';

const TextEditer = () => {
    const {extractData} = useContext(DataContext)
    const editor = useRef(null);
	const [content, setContent] = useState("hiii");
 
  useEffect(()=>{
    setContent(extractData) 
  },[extractData])
  return (
   <>
     <JoditEditor
			 
			value={content}
            ref={editor}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			// onChange={newContent => {}}
		/>
   
   
   </>
  )
}

export default TextEditer