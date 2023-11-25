import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./Date.css"

const Dateinput = ({  field, form: { touched, errors, setFieldValue }, ...props }) => {
  return (
    <div >
    <DatePicker
      {...field}
      {...props}
      selected={field.value} // set the selected date
      onChange={(date) => setFieldValue(field.name, date)}
      minDate={new Date()} // Disable past dates
      style={{ width: '100%' }}
      autoComplete='off'
      styles={{
        control: (provided, state) => ({
          ...provided,
          border: "none",
          outline: "none",
          borderRadius: '0px',
          borderBottom: '1px solid black',
          zIndex:1000,
          backgroundColor: "#ffffff",
        
        }),
        menu: (provided, state) => ({
          ...provided,
          zIndex: 2000, // Set a higher z-index value for the dropdown menu
        }),
      }}
    />
    {touched[field.name] && errors[field.name] && <small className="error">{errors[field.name]}</small>}
  </div>
  )
}

export default Dateinput