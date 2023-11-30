import { createContext, useState, useEffect } from "react";
 
import axiosInstance from "../api/axoiss";
import {BASE_URL} from "../ApiDomain"
import {initializeMsal} from "../msalUtils"
import { useNavigate } from 'react-router-dom';

const DataContext = createContext({})
export const DataProvider = ({children})=>{
    const [itemmasterdata, setItemMasterData]= useState([])
    const [ItemGroupdata, setItemGroupData]= useState([])
    const [ItemGroupSelect, setItemGroupSelect] =useState([])
    const [ItemUOMdata, setUOMData]= useState([])
    const [ItemUOMSelect, setItemUOMSelect] = useState([])
    const [type, setType] = useState([])
    const [ItemHsndata, setHsnData]= useState([])
    const [ItemHSNSelect, setItemHSNSelect] = useState([])
    const [tax, setTax] = useState('')
    const [Accountdata, setAccountData]= useState([])
    const [ItemAccountSelect, setItemAccountSelect] = useState([])
    const [Categorydata, setCategoryData]= useState([])
    const [AccountGroupdata, setAccountGroupdata] = useState([])
    const [ItemAccountGroupSelect, setItemAccountGroupSelect] = useState([])
    const [AccountGroupType, setAccountGroupType] = useState('')
    const [storedata, setStoredata] = useState([]);
    const [userdata, setUserdata] = useState([])
    const [conferenct , setConference] = useState([])
    const [enquiry, setEnquiry] = useState('')
    const [msalInstance, setMsalInstance] = useState(null);
    const Navigate = useNavigate(); 
    const [loading, setLoading] = useState(true);
    const [userName , setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [accessToken, setAccessToken] = useState();
    const [userId, setUserId] = useState('')
    const [currentConference, setCurrentConference] = useState('')
    const [stock, setStock] = useState('')
    const [stockInventory, setStockInventory] = useState([])
    const [extractData, setExtractData] = useState('')
    const [product, setProduct] = useState([])
    
    
    useEffect(()=>{
      // item master data
        axiosInstance.get(BASE_URL + '/itemmaster/ItemMaster')
        .then((res) => {
          const posts = res.data;
          setItemMasterData(posts);;
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error fetching data:', error);
        });
      // store data
        axiosInstance.get(BASE_URL + '/itemmaster/Store')
        .then((res) => {
          const store_ = res.data;
          setStoredata(store_);
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error fetching data:', error);
        });
        // conference
        axiosInstance.get(BASE_URL + '/api/Conference')
        .then((res) => {
          const posts = res.data;
         
          setConference(posts);;
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error fetching data:', error);
        });

        //  enquiry 
        axiosInstance.get(BASE_URL + '/api/')
        .then((res) => {
          const posts = res.data;
          setEnquiry(posts);;
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error fetching data:', error);
        });
     

      },[])
      useEffect(() => {
        const initialize = async () => {
          const instance = await initializeMsal();
          setMsalInstance(instance);
          setLoading(false);
        };
        if(localStorage.getItem('Name')){
          setUserName(localStorage.getItem('Name'))
          setUserEmail(localStorage.getItem('Email'))
          setUserId(localStorage.getItem('userid'))

          
        }
     
        initialize();
      }, []); 
 
      useEffect(()=>{
        const currentDate = new Date();
       const current_conference = conferenct.filter(con=> con.incharge === Number(userId))
       .filter(con_1 => con_1.Status === true)
       .filter(con_2 => {
        const startDate = new Date(con_2.startDate);
        let endDate = new Date(con_2.endDate);
       
        endDate.setHours(23, 59, 59, 999);
      
        return startDate <= currentDate && currentDate <= endDate;
      });
      setCurrentConference(current_conference)
      //  console.log(current_conference , userId);

      },[conferenct, userId])
      const callApi = async (token) => {
      
        try {
          const response = await fetch(`${BASE_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }) 
          const req = await response.json();
 
          localStorage.setItem('userid', req.id);
          setUserId(req.id) 
          
           
         
        } catch (error) {
          console.error('API Request Error:', error);
        }
      };

      const login = async () => {
        try {
          if (msalInstance) {
            const loginResponse = await msalInstance.loginPopup({
              scopes: ['user.read', 'openid', 'profile'],
            });
       
            if (loginResponse.accessToken) {
              Navigate("/ItemMaster") 
              localStorage.setItem('access_token', loginResponse.accessToken);
              localStorage.setItem('Name', loginResponse.account.name);
              localStorage.setItem('Email', loginResponse.account.username);
              callApi(loginResponse.accessToken)
              setUserName(loginResponse.account.name)
              setUserEmail(loginResponse.account.username)
              setAccessToken(loginResponse.accessToken);
             
             
              
              // handleAuthenticatedUser()
            } else {
              console.log('No access token found in the response.');
            }
           
          }
        } catch (error) {
          // Handle login error
          console.error('Login Error:', error);
         
        }
      };
      const logout = async () => {
        try {
         
          if (msalInstance) {
            localStorage.setItem('Name', "");
            localStorage.setItem('Email', "");
            localStorage.setItem('userid', "");
            
            setUserName("")
            setUserEmail("")
            setUserId('')
            Navigate("/")
            await msalInstance.logout();
            
          }
        } catch (error) {
          // Handle logout error
          console.error('Logout Error:', error);
        }
      };


  
   
    const fetchData = async () => {
        try { 
           axiosInstance.get(BASE_URL + '/api/user').then((res) => {
            const UserResponse = res.data;
            setUserdata(UserResponse);
            })
            axiosInstance.get(BASE_URL + '/api/product').then((res) => {
              const ProductResponse = res.data;
              setProduct(ProductResponse);
              })
            axiosInstance.get(BASE_URL + '/itemmaster/InventoryApprovals').then((res) => {
              const InventoryResponse = res.data;
            
              setStockInventory(InventoryResponse);
              })
            
            axiosInstance.get(BASE_URL + '/itemmaster/Stock').then((res) => {
              const StockResponse = res.data;
              setStock(StockResponse);
              })

            axiosInstance.get(BASE_URL + '/itemmaster/itemGroup').then((res) => {
            const itemGroupResponse = res.data;
            setItemGroupData(itemGroupResponse);
            })
       
            axiosInstance.get(BASE_URL + '/itemmaster/Category').then((res) => {
                const CategoryResponse = res.data;
                setCategoryData(CategoryResponse);
                })
            axiosInstance.get(BASE_URL + '/itemmaster/UOM').then((res) => {
                const uomResponse = res.data;
                setUOMData(uomResponse);
                })
            axiosInstance.get(BASE_URL + '/itemmaster/hsn').then((res) => {
                const hsnResponse = res.data;
                setHsnData(hsnResponse);
                })
            axiosInstance.get(BASE_URL + '/itemmaster/AccountsMaster').then((res) => {
                const accountResponse = res.data;
                setAccountData(accountResponse);
                })
            axiosInstance.get(BASE_URL + '/itemmaster/AccountsGroup').then((res) => {
                const accountGroupResponse = res.data;
                setAccountGroupdata(accountGroupResponse);
                }) 
               
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      };
 
      
      // Effect to call fetchData whenever itemmasterdata changes
      useEffect(() => {
        
        fetchData(); // Call the fetchData function directly
     
         
      }, [itemmasterdata]);
      const [itemaMasterModal, setitemaMasterModal] = useState(false);

      const handleItemaMasterClose = () => setitemaMasterModal(false);
      const handlItemaMastereShow = () => setitemaMasterModal(true);
      
      
      const [itemGroupAdd, setItemGroupAdd] = useState(false)
      const handleitemGroupClose = () => setItemGroupAdd(false);
      const handlitemGroupShow = () => setItemGroupAdd(true);
      

      const [ItemUomAdd, setuomAdd] = useState(false);
      const handleUOMClose = () => setuomAdd(false);
      const handlUOMShow = () => setuomAdd(true);
      
      const [ItemHSNAdd, setHSNAdd] = useState(false);
      const handleHSNClose = () => setHSNAdd(false);
      const handlHSNShow = () => setHSNAdd(true);
      
      const [ItemAccountAdd, setAccountAdd] = useState(false);
      const handleAccountClose = () => setAccountAdd(false);
      const handlAccountShow = () => setAccountAdd(true);
      
      const [ItemAccountGroupAdd, setAccountGroupAdd] = useState(false);
      const handleAccountGroupClose = () => setAccountGroupAdd(false);
      const handlAccountGroupShow = () => setAccountGroupAdd(true);
      
      const [AlternateUomAdd, setAlternateUomAdd] = useState(false);
      const handleAlternateUomClose = () => setAlternateUomAdd(false);
      const handlAlternateUomShow = () => setAlternateUomAdd(true);
       
      const [storeAdd, setStoreAdd] = useState(false)
      const handleStoreAddClose = () => setStoreAdd(false);
      const handlStoreAddShow = () => setStoreAdd(true);

      const [toastSave, setToastSave] =useState(false)
      const toggleShowA = () => setToastSave(!toastSave);

      const [toastDeleteConfomation, setToastDeleteConfomation] = useState(false)
      const handletoastDeleteConfomationClose = () => setToastDeleteConfomation(false);
      const handltoastDeleteConfomationShow = () => setToastDeleteConfomation(true);
      
       
 
    return (

        <DataContext.Provider value={{ 
          userName,currentConference,userEmail,stock,stockInventory,extractData, setExtractData,
          login,logout,ItemGroupSelect,setItemGroupSelect,setItemUOMSelect, ItemUOMSelect,ItemHSNSelect, setItemHSNSelect,
          ItemAccountGroupSelect, setItemAccountGroupSelect,setItemAccountSelect,
          ItemAccountSelect,type, setType,tax, setTax, storedata, setStoredata,userdata,
          storeAdd, handleStoreAddClose, handlStoreAddShow,AccountGroupType, setAccountGroupType,
          itemmasterdata, setItemMasterData,  ItemGroupdata, setItemGroupData,ItemUOMdata, setUOMData ,ItemHsndata, 
          setHsnData,Accountdata,setAccountData,Categorydata,
          AccountGroupdata , setAccountGroupdata,itemaMasterModal , handlItemaMastereShow, handleItemaMasterClose,
          itemGroupAdd, handlitemGroupShow, handleitemGroupClose,setItemGroupAdd,
          ItemUomAdd,  handlUOMShow, handleUOMClose,
          ItemHSNAdd ,  handlHSNShow, handleHSNClose,
          ItemAccountAdd ,  handlAccountShow, handleAccountClose,
          ItemAccountGroupAdd ,  handlAccountGroupShow, handleAccountGroupClose,
          AlternateUomAdd, handlAlternateUomShow , handleAlternateUomClose,
          toastDeleteConfomation, handletoastDeleteConfomationClose,handltoastDeleteConfomationShow ,
          setConference,   setToastSave, toggleShowA,  Navigate , conferenct, enquiry, setEnquiry ,userId,loading , accessToken,
          product

        }}>
        
         {children}
        </DataContext.Provider>

    )
}

export default DataContext