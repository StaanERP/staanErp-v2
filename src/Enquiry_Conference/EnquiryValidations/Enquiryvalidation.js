import * as  yup from "yup"

export const EnquirySchema = yup.object().shape({
    name: yup.string().required("Please Enter Name"),
    Hospital:  yup.string().required("Please Enter Hospital Name"),
    email: yup.string().email("Please Enter Valid Email").required("Please Enter Email"),
   Mobile: yup.string()
    .min(10, 'Mobile number must be at least 10 characters')
    .max(15, 'Mobile number must be less than or equal to 15 characters')
    .required('Please Enter Mobile'),
    locations: yup.string().required("Please Enter City"),
    message:  yup.string(),
    intrested: yup.array() 
})


export const AddConferenceSchema = yup.object().shape({
    name: yup.string().required("Please Enter Name"),
    Startdate: yup.date().required("Please Enter  Start Date"),
    enddate : yup.date().required('Please Enter end Date'),
    incharge : yup.string().required("Please Select incharge"),
    Status: yup.boolean()
   
})