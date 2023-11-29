import React ,{useContext, useEffect, useState, useRef, useCallback} from 'react' 
import {   Formik , Field, Form} from 'formik';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EnquirySchema } from '../../EnquiryValidations/Enquiryvalidation';
import staanlogo from "../../../img/logo-final.png"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pagination } from 'swiper/modules';
import Select from 'react-select';
import "./Enquirystyle.css" 
import axiosInstance from '../../../api/axoiss';
import DataContext from '../../../context/ItemMasterContext'; 
import TextEditer from '../../../components/textEditer/TextEditer';
import Tesseract from 'tesseract.js';
import compromise from 'compromise'; 
import CameraComponent from '../../../components/cameraComponent/CameraComponent';

const EnquiryFrom = () => {
  
    const {setEnquiry,     currentConference, userName,   setExtractData} = useContext(DataContext)
     
    const [textEditer_, settextEditer_] = useState(true)
    const [selectedFile, setSelectedFile] = useState(null);
    
    
    const webcamRef = useRef(null);

    const [isCameraStarted, setIsCameraStarted] = useState(false);

    const startCamera = () => {
      setIsCameraStarted(true);
    };
    const extractInfoFromImage = async (image) => {
  
      try {
        // if (!selectedFile) {
        //   console.error('No file selected');
        //   return;
        // }
        const { data: { text } } = await Tesseract.recognize(
          selectedFile,
          'eng', // Language code for English
          { logger: (info) => console.log(info) } // Optional logger
        );
        setExtractData(text)
        const lines = text.split(/\n+/);
        const doc = compromise(text);
  
        const extractedInfo = {
          name: '',
          phone: '',
          email: '',
          address: '',
          organizations : "",
          city:""
        };
    
        // Define regular expressions for phone, email, and address
        // const phoneRegex = /(\+?\d{1,4}[-.\s]?)?\(?\d{1,}\)?[-.\s]?\d{1,}[-.\s]?\d{1,}[-.\s]?\d{1,}/;
        const phoneRegex_1 =/\+?9?1?\s?-?\d{5}\s?\d{5}/;
     
        const emailRegex = /\S+@\S+\.\S+/;
        const addressRegex = /\d+[-.\s]?\d+\s*,\s*\S+.*\d{5}/;
   
    
        // Iterate through lines and extract information
        lines.forEach((line) => {
          extractedInfo.name = doc.people().out('array').join(' ');
          // extractedInfo.email = doc.emails() 
          // extractedInfo.phone =  doc.phoneNumbers() 
          extractedInfo.organizations = doc.organizations().out('array').join(' ');
       
          if (!extractedInfo.phone) {
            const phoneMatch = line.match(phoneRegex_1);
            console.log(phoneMatch);
            if (phoneMatch) {
              extractedInfo.phone = phoneMatch[0].trim();
            }
          }
          options.forEach((keyword) => {
            if (line.includes(keyword.value)) {
              extractedInfo.city = keyword.value;
            }
          });
        
    
          if (!extractedInfo.email) {
            const emailMatch = line.match(emailRegex);
            if (emailMatch) {
              extractedInfo.email = emailMatch[0].trim();
            }
          }
    
          if (!extractedInfo.address) {
            const addressMatch = line.match(addressRegex);
            if (addressMatch) {
              extractedInfo.address = addressMatch[0].trim();
            }
          }
        });
      
        handlenameChange(extractedInfo.name)
        handlemailChange(extractedInfo.email)
        handlphoneChange(extractedInfo.phone)
        
        handlOrgChange(extractedInfo.organizations)
        setSelectLocations( { value: extractedInfo.city , label:  extractedInfo.city });
        initialValues.name = extractedInfo.name
        initialValues.Hospital = extractedInfo.organizations
        initialValues.email = extractedInfo.email
        initialValues.Mobile = extractedInfo.phone
        initialValues.locations = extractedInfo.city
        
        console.log('Extracted Information:', extractedInfo)
        console.log(text);
        
        
        
    
         
        // }
      } catch (error) {
        console.error('Error processing business card image:', error);
      }
    };


    const capture = useCallback(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        // Do something with the captured image
        // console.log(imageSrc);
        extractInfoFromImage(imageSrc)
      }
    },[webcamRef, extractInfoFromImage]);

    const handletextedtier = ()=>{
      settextEditer_(!textEditer_)
    }
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };
    const [initialValues, setinitialValues]  = useState({
      name:"",
      Hospital :"",
      email :"",
      Mobile :"",
      locations :"",
      message :"",
      intrested: []
  })
     
 

 
  const options =[
    {value : "Achalpur",  label: "Achalpur"},
{value : "Achhnera",  label: "Achhnera"},
{value : "Adalaj",  label: "Adalaj"}, 
{value : "Adilabad",  label: "Adilabad"}, 
{value : "Adityapur",  label: "Adityapur"},
{value : "Adoni",  label: "Adoni"},
{value : "Adoor",  label: "Adoor"}, 
{value : "Adra",  label: "Adra"}, 
{value : "Adyar",  label: "Adyar"}, 
{value : "Afzalpur",  label: "Afzalpur"},
{value : "Agartala",  label: "Agartala"}, 
{value : "Agra",  label: "Agra"}, 
{value : "Ahmedabad",  label: "Ahmedabad"}, 
{value : "Ahmednagar",  label: "Ahmednagar"},
{value : "Aizawl",  label: "Aizawl"},
{value : "Ajmer",  label: "Ajmer"},
{value : "Akola",  label: "Akola"},
{value : "Akot",  label: "Akot"},
{value : "Alappuzha",  label: "Alappuzha"},
{value : "Aligarh",  label: "Aligarh"},
{value : "Alipurduar",  label: "Alipurduar"},
{value : "Alirajpur",  label: "Alirajpur"},
{value : "Allahabad",  label: "Allahabad"},
{value : "Alwar",  label: "Alwar"},
{value : "Amalapuram",  label: "Amalapuram"},
{value : "Amalner",  label: "Amalner"},
{value : "Ambejogai",  label: "Ambejogai"},
{value : "Ambikapur",  label: "Ambikapur"},
{value : "Amravati",  label: "Amravati"},
{value : "Amreli",  label: "Amreli"},
{value : "Amritsar",  label: "Amritsar"},
{value : "Amroha",  label: "Amroha"},
{value : "Anakapalle",  label: "Anakapalle"},
{value : "Anand",  label: "Anand"},
{value : "Anantapur",  label: "Anantapur"},
{value : "Anantnag",  label: "Anantnag"},
{value : "Anjangaon",  label: "Anjangaon"},
{value : "Anjar",  label: "Anjar"},
{value : "Ankleshwar",  label: "Ankleshwar"},
{value : "Arakkonam",  label: "Arakkonam"},
{value : "Arambagh",  label: "Arambagh"},
{value : "Araria",  label: "Araria"},
{value : "Arrah",  label: "Arrah"},
{value : "Arsikere",  label: "Arsikere"},
{value : "Aruppukkottai",  label: "Aruppukkottai"},
{value : "Arvi",  label: "Arvi"},
{value : "Arwal",  label: "Arwal"},
{value : "Asansol",  label: "Asansol"},
{value : "Asarganj",  label: "Asarganj"},
{value : "Ashok-Nagar",  label: "Ashok-Nagar"},
{value : "Athni",  label: "Athni"},
{value : "Attingal",  label: "Attingal"},
{value : "Aurangabad",  label: "Aurangabad"},
{value : "Azamgarh",  label: "Azamgarh"},
{value : "Bagaha",  label: "Bagaha"},
{value : "Bageshwar",  label: "Bageshwar"},
{value : "Bahadurgarh",  label: "Bahadurgarh"},
{value : "Baharampur",  label: "Baharampur"},
{value : "Bahraich",  label: "Bahraich"},
{value : "Balaghat",  label: "Balaghat"},
{value : "Balangir",  label: "Balangir"},
{value : "Baleshwar-Town",  label: "Baleshwar-Town"},
{value : "Balurghat",  label: "Balurghat"},
{value : "Bankura",  label: "Bankura"},
{value : "Bapatla",  label: "Bapatla"},
{value : "Baramula",  label: "Baramula"},
{value : "Barbil",  label: "Barbil"},
{value : "Bargarh",  label: "Bargarh"},
{value : "Barh",  label: "Barh"},
{value : "Baripada-Town",  label: "Baripada-Town"},
{value : "Barmer",  label: "Barmer"},
{value : "Barnala",  label: "Barnala"},
{value : "Barpeta",  label: "Barpeta"},
{value : "Batala",  label: "Batala"},
{value : "Bathinda",  label: "Bathinda"},
{value : "Begusarai",  label: "Begusarai"},
{value : "Belagavi",  label: "Belagavi"},
{value : "Bellampalle",  label: "Bellampalle"},
{value : "Belonia",  label: "Belonia"},
{value : "Bengaluru",  label: "Bengaluru"},
{value : "Bettiah",  label: "Bettiah"},
{value : "Bhadrachalam",  label: "Bhadrachalam"},
{value : "Bhadrak",  label: "Bhadrak"},
{value : "Bhagalpur",  label: "Bhagalpur"},
{value : "Bhainsa",  label: "Bhainsa"},
{value : "Bharatpur",  label: "Bharatpur"},
{value : "Bharuch",  label: "Bharuch"},
{value : "Bhatapara",  label: "Bhatapara"},
{value : "Bhavnagar",  label: "Bhavnagar"},
{value : "Bhawanipatna",  label: "Bhawanipatna"},
{value : "Bheemunipatnam",  label: "Bheemunipatnam"},
{value : "Bhilai-Nagar",  label: "Bhilai-Nagar"},
{value : "Bhilwara",  label: "Bhilwara"},
{value : "Bhimavaram",  label: "Bhimavaram"},
{value : "Bhiwandi",  label: "Bhiwandi"},
{value : "Bhiwani",  label: "Bhiwani"},
{value : "Bhongir",  label: "Bhongir"},
{value : "Bhopal",  label: "Bhopal"},
{value : "Bhubaneswar",  label: "Bhubaneswar"},
{value : "Bhuj",  label: "Bhuj"},
{value : "Bikaner",  label: "Bikaner"},
{value : "Bilaspur",  label: "Bilaspur"},
{value : "Bobbili",  label: "Bobbili"},
{value : "Bodhan",  label: "Bodhan"},
{value : "Bokaro-Steel-City" , label: "Bokaro-Steel-City"},
{value : "Brahmapur",  label: "Brahmapur"},
{value : "Buxar",  label: "Buxar"},
{value : "Chaibasa",  label: "Chaibasa"},
{value : "Chalakudy",  label: "Chalakudy"},
{value : "Chandausi",  label: "Chandausi"},
{value : "Chandigarh",  label: "Chandigarh"},
{value : "Changanassery",  label: "Changanassery"},
{value : "Charkhi-Dadri",  label: "Charkhi-Dadri"},
{value : "Chatra",  label: "Chatra"},
{value : "Chennai",  label: "Chennai"},
{value : "Cherthala",  label: "Cherthala"},
{value : "Chhapra",  label: "Chhapra"},
{value : "Chhattisgarh",  label: "Chhattisgarh"},
{value : "Chikkamagaluru",  label: "Chikkamagaluru"},
{value : "Chilakaluripet",  label: "Chilakaluripet"},
{value : "Chirala",  label: "Chirala"},
{value : "Chirimiri-Colly",  label: "Chirimiri-Colly"},
{value : "Chirkunda",  label: "Chirkunda"},
{value : "Chittoor",  label: "Chittoor"},
{value : "Chittur-Thathamangalam",  label: "Chittur-Thathamangalam"},
{value : "Coimbatore",  label: "Coimbatore"},
{value : "Cuttack",  label: "Cuttack"},
{value : "Dalli-Rajhara",  label: "Dalli-Rajhara"},
{value : "Darbhanga",  label: "Darbhanga"},
{value : "Darjiling",  label: "Darjiling"},
{value : "Davanagere",  label: "Davanagere"},
{value : "Deesa",  label: "Deesa"},
{value : "Dehradun",  label: "Dehradun"},
{value : "Dehri-on-Sone"  ,label: "Dehri-on-Sone"},
{value : "Delhi",  label: "Delhi"},
{value : "Deoghar",  label: "Deoghar"},
{value : "Dhamtari",  label: "Dhamtari"},
{value : "Dhanbad",  label: "Dhanbad"},
{value : "Dharmanagar",  label: "Dharmanagar"},
{value : "Dharmavaram",  label: "Dharmavaram"},
{value : "Dhenkanal",  label: "Dhenkanal"},
{value : "Dhoraji",  label: "Dhoraji"},
{value : "Dhubri",  label: "Dhubri"},
{value : "Dhule",  label: "Dhule"},
{value : "Dhuri",  label: "Dhuri"},
{value : "Dibrugarh",  label: "Dibrugarh"},
{value : "Dimapur",  label: "Dimapur"},
{value : "Diphu",  label: "Diphu"},
{value : "Dumka",  label: "Dumka"},
{value : "Dumraon",  label: "Dumraon"},
{value : "Durg",  label: "Durg"},
{value : "Eluru",  label: "Eluru"},
{value : "English-Bazar",  label: "English-Bazar"},
{value : "Erode",  label: "Erode"},
{value : "Etawah",  label: "Etawah"},
{value : "Faridabad",  label: "Faridabad"},
{value : "Faridkot",  label: "Faridkot"},
{value : "Farooqnagar",  label: "Farooqnagar"},
{value : "Fatehabad",  label: "Fatehabad"},
{value : "Fatehpur-Sikri",  label: "Fatehpur-Sikri"},
{value : "Fazilka",  label: "Fazilka"},
{value : "Firozabad",  label: "Firozabad"},
{value : "Firozpur",  label: "Firozpur"},
{value : "Forbesganj",  label: "Forbesganj"},
{value : "Gadwal",  label: "Gadwal"},
{value : "Gangarampur",  label: "Gangarampur"},
{value : "Gaya",  label: "Gaya"},
{value : "Giridih",  label: "Giridih"},
{value : "Goalpara",  label: "Goalpara"},
{value : "Gobichettipalayam",  label: "Gobichettipalayam"},
{value : "Gobindgarh",  label: "Gobindgarh"},
{value : "Godhra",  label: "Godhra"},
{value : "Gohana",  label: "Gohana"},
{value : "Gokak",  label: "Gokak"},
{value : "Gooty",  label: "Gooty"},
{value : "Gopalganj",  label: "Gopalganj"},
{value : "Gudivada",  label: "Gudivada"},
{value : "Gudur",  label: "Gudur"},
{value : "Gumia",  label: "Gumia"},
{value : "Guntakal",  label: "Guntakal"},
{value : "Guntur",  label: "Guntur"},
{value : "Gurdaspur",  label: "Gurdaspur"},
{value : "Gurgaon",  label: "Gurgaon"},
{value : "Guruvayoor",  label: "Guruvayoor"},
{value : "Guwahati",  label: "Guwahati"},
{value : "Gwalior",  label: "Gwalior"},
{value : "Habra",  label: "Habra"},
{value : "Hajipur",  label: "Hajipur"},
{value : "Haldwani-cum-Kathgodam" , label: "Haldwani-cum-Kathgodam"},
{value : "Hansi",  label: "Hansi"},
{value : "Hapur",  label: "Hapur"},
{value : "Haridwar",  label: "Haridwar"},
{value : "Hazaribag",  label: "Hazaribag"},
{value : "Hindupur",  label: "Hindupur"},
{value : "Hisar",  label: "Hisar"},
{value : "Hoshiarpur",  label: "Hoshiarpur"},
{value : "Hubli-Dharwad",  label: "Hubli-Dharwad"},
{value : "Hugli-Chinsurah",  label: "Hugli-Chinsurah"},
{value : "Hyderabad",  label: "Hyderabad"},
{value : "Ichalkaranji",  label: "Ichalkaranji"},
{value : "Imphal",  label: "Imphal"},
{value : "Indore",  label: "Indore"},
{value : "Itarsi",  label: "Itarsi"},
{value : "Jabalpur",  label: "Jabalpur"},
{value : "Jagdalpur",  label: "Jagdalpur"},
{value : "Jaggaiahpet",  label: "Jaggaiahpet"},
{value : "Jagraon",  label: "Jagraon"},
{value : "Jagtial",  label: "Jagtial"},
{value : "Jaipur",  label: "Jaipur"},
{value : "Jalandhar",  label: "Jalandhar"},
{value : "Jalpaiguri",  label: "Jalpaiguri"},
{value : "Jamalpur",  label: "Jamalpur"},
{value : "Jammalamadugu",  label: "Jammalamadugu"},
{value : "Jammu",  label: "Jammu"},
{value : "Jamnagar",  label: "Jamnagar"},
{value : "Jamshedpur",  label: "Jamshedpur"},
{value : "Jamui",  label: "Jamui"},
{value : "Jangaon",  label: "Jangaon"},
{value : "Jatani",  label: "Jatani"},
{value : "Jehanabad",  label: "Jehanabad"},
{value : "Jhansi",  label: "Jhansi"},
{value : "Jhargram",  label: "Jhargram"},
{value : "Jharsuguda",  label: "Jharsuguda"},
{value : "Jhumri-Tilaiya",  label: "Jhumri-Tilaiya"},
{value : "Jind",  label: "Jind"},
{value : "Jodhpur",  label: "Jodhpur"},
{value : "Jorhat",  label: "Jorhat"},
{value : "Kadapa",  label: "Kadapa"},
{value : "Kadi",  label: "Kadi"},
{value : "Kadiri",  label: "Kadiri"},
{value : "Kagaznagar",  label: "Kagaznagar"},
{value : "Kailasahar",  label: "Kailasahar"},
{value : "Kaithal",  label: "Kaithal"},
{value : "Kakinada",  label: "Kakinada"},
{value : "Kalimpong",  label: "Kalimpong"},
{value : "Kalpi",  label: "Kalpi"},
{value : "Kalyan-Dombivali",  label: "Kalyan-Dombivali"},
{value : "Kamareddy",  label: "Kamareddy"},
{value : "Kancheepuram",  label: "Kancheepuram"},
{value : "Kandukur",  label: "Kandukur"},
{value : "Kanhangad",  label: "Kanhangad"},
{value : "Kannur",  label: "Kannur"},
{value : "Kanpur",  label: "Kanpur"},
{value : "Kapadvanj",  label: "Kapadvanj"},
{value : "Kapurthala",  label: "Kapurthala"},
{value : "Karaikal",  label: "Karaikal"},
{value : "Karimganj",  label: "Karimganj"},
{value : "Karimnagar",  label: "Karimnagar"},
{value : "Karjat",  label: "Karjat"},
{value : "Karnal",  label: "Karnal"},
{value : "Karur",  label: "Karur"},
{value : "Karwar",  label: "Karwar"},
{value : "Kasaragod",  label: "Kasaragod"},
{value : "Kashipur",  label: "Kashipur"},
{value : "Katihar",  label: "Katihar"},
{value : "Katni",  label: "Katni"},
{value : "Kavali",  label: "Kavali"},
{value : "Kayamkulam",  label: "Kayamkulam"},
{value : "Kendrapara",  label: "Kendrapara"},
{value : "Keshod",  label: "Keshod"},
{value : "Khair",  label: "Khair"},
{value : "Khambhat",  label: "Khambhat"},
{value : "Khammam",  label: "Khammam"},
{value : "Khanna",  label: "Khanna"},
{value : "Kharagpur",  label: "Kharagpur"},
{value : "Kharar",  label: "Kharar"},
{value : "Khowai",  label: "Khowai"},
{value : "Kishanganj",  label: "Kishanganj"},
{value : "Kochi",  label: "Kochi"},
{value : "Kodungallur",  label: "Kodungallur"},
{value : "Kohima",  label: "Kohima"},
{value : "Kolar",  label: "Kolar"},
{value : "Kolkata",  label: "Kolkata"},
{value : "Kollam",  label: "Kollam"},
{value : "Koratla",  label: "Koratla"},
{value : "Korba",  label: "Korba"},
{value : "Kot-Kapura",  label: "Kot-Kapura"},
{value : "Kothagudem",  label: "Kothagudem"},
{value : "Kottayam",  label: "Kottayam"},
{value : "Kovvur",  label: "Kovvur"},
{value : "Koyilandy",  label: "Koyilandy"},
{value : "Kozhikode",  label: "Kozhikode"},
{value : "Kunnamkulam",  label: "Kunnamkulam"},
{value : "Kurnool",  label: "Kurnool"},
{value : "Lachhmangarh",  label: "Lachhmangarh"},
{value : "Ladnu",  label: "Ladnu"},
{value : "Ladwa",  label: "Ladwa"},
{value : "Lahar",  label: "Lahar"},
{value : "Laharpur",  label: "Laharpur"},
{value : "Lakheri",  label: "Lakheri"},
{value : "Lakhimpur",  label: "Lakhimpur"},
{value : "Lakhisarai",  label: "Lakhisarai"},
{value : "Lakshmeshwar",  label: "Lakshmeshwar"},
{value : "Lal-Gopalganj-Nindaura" , label: "Lal-Gopalganj-Nindaura"},
{value : "Lalganj",  label: "Lalganj"},
{value : "Lalgudi",  label: "Lalgudi"},
{value : "Lalitpur",  label: "Lalitpur"},
{value : "Lalsot",  label: "Lalsot"},
{value : "Lanka",  label: "Lanka"},
{value : "Lar",  label: "Lar"},
{value : "Lathi",  label: "Lathi"},
{value : "Latur",  label: "Latur"},
{value : "Lilong",  label: "Lilong"},
{value : "Limbdi",  label: "Limbdi"},
{value : "Loha",  label: "Loha"},
{value : "Lohardaga",  label: "Lohardaga"},
{value : "Lonavla",  label: "Lonavla"},
{value : "Longowal",  label: "Longowal"},
{value : "Loni",  label: "Loni"},
{value : "Losal",  label: "Losal"},
{value : "Lucknow",  label: "Lucknow"},
{value : "Ludhiana",  label: "Ludhiana"},
{value : "Lumding",  label: "Lumding"},
{value : "Lunglei",  label: "Lunglei"},
{value : "Macherla",  label: "Macherla"},
{value : "Machilipatnam",  label: "Machilipatnam"},
{value : "Madanapalle",  label: "Madanapalle"},
{value : "Maddur",  label: "Maddur"},
{value : "Madhepura",  label: "Madhepura"},
{value : "Madhubani",  label: "Madhubani"},
{value : "Madhugiri",  label: "Madhugiri"},
{value : "Madhupur",  label: "Madhupur"},
{value : "Madikeri",  label: "Madikeri"},
{value : "Madurai",  label: "Madurai"},
{value : "Magadi",  label: "Magadi"},
{value : "Mahad",  label: "Mahad"},
{value : "Mahalingapura",  label: "Mahalingapura"},
{value : "Maharajganj",  label: "Maharajganj"},
{value : "Maharajpur",  label: "Maharajpur"},
{value : "Mahasamund",  label: "Mahasamund"},
{value : "Mahemdabad",  label: "Mahemdabad"},
{value : "Mahendragarh",  label: "Mahendragarh"},
{value : "Mahesana",  label: "Mahesana"},
{value : "Mahidpur",  label: "Mahidpur"},
{value : "Mahnar-Bazar",  label: "Mahnar-Bazar"},
{value : "Mahuva",  label: "Mahuva"},
{value : "Maihar",  label: "Maihar"},
{value : "Mainaguri",  label: "Mainaguri"},
{value : "Makhdumpur",  label: "Makhdumpur"},
{value : "Makrana",  label: "Makrana"},
{value : "Malappuram",  label: "Malappuram"},
{value : "Malavalli",  label: "Malavalli"},
{value : "Malda",  label: "Malda"},
{value : "Malegaon",  label: "Malegaon"},
{value : "Malerkotla",  label: "Malerkotla"},
{value : "Malkangiri",  label: "Malkangiri"},
{value : "Malkapur",  label: "Malkapur"},
{value : "Malout",  label: "Malout"},
{value : "Malpura",  label: "Malpura"},
{value : "Malur",  label: "Malur"},
{value : "Manachanallur",  label: "Manachanallur"},
{value : "Manasa",  label: "Manasa"},
{value : "Manavadar",  label: "Manavadar"},
{value : "Manawar",  label: "Manawar"},
{value : "Mancherial",  label: "Mancherial"},
{value : "Mandalgarh",  label: "Mandalgarh"},
{value : "Mandamarri",  label: "Mandamarri"},
{value : "Mandapeta",  label: "Mandapeta"},
{value : "Mandawa",  label: "Mandawa"},
{value : "Mandi",  label: "Mandi"},
{value : "Mandi-Dabwali",  label: "Mandi-Dabwali"},
{value : "Mandideep",  label: "Mandideep"},
{value : "Mandla",  label: "Mandla"},
{value : "Mandsaur",  label: "Mandsaur"},
{value : "Mandvi",  label: "Mandvi"},
{value : "Mandya",  label: "Mandya"},
{value : "Manendragarh",  label: "Manendragarh"},
{value : "Mangaldoi",  label: "Mangaldoi"},
{value : "Mangaluru",  label: "Mangaluru"},
{value : "Mangalvedhe",  label: "Mangalvedhe"},
{value : "Manglaur",  label: "Manglaur"},
{value : "Mangrol",  label: "Mangrol"},
{value : "Mangrulpir",  label: "Mangrulpir"},
{value : "Manihari",  label: "Manihari"},
{value : "Manjlegaon",  label: "Manjlegaon"},
{value : "Mankachar",  label: "Mankachar"},
{value : "Manmad",  label: "Manmad"},
{value : "Mansa",  label: "Mansa"},
{value : "Manuguru",  label: "Manuguru"},
{value : "Manvi",  label: "Manvi"},
{value : "Manwath",  label: "Manwath"},
{value : "Mapusa",  label: "Mapusa"},
{value : "Margao",  label: "Margao"},
{value : "Margherita",  label: "Margherita"},
{value : "Marhaura",  label: "Marhaura"},
{value : "Mariani",  label: "Mariani"},
{value : "Marigaon",  label: "Marigaon"},
{value : "Markapur",  label: "Markapur"},
{value : "Masaurhi",  label: "Masaurhi"},
{value : "Mathabhanga",  label: "Mathabhanga"},
{value : "Mathura",  label: "Mathura"},
{value : "Mattannur",  label: "Mattannur"},
{value : "Mavelikkara",  label: "Mavelikkara"},
{value : "Mavoor",  label: "Mavoor"},
{value : "Mayang-Imphal",  label: "Mayang-Imphal"},
{value : "Medak",  label: "Medak"},
{value : "Medinipur",  label: "Medinipur"},
{value : "Meerut",  label: "Meerut"},
{value : "Mehkar",  label: "Mehkar"},
{value : "Memari",  label: "Memari"},
{value : "Merta-City",  label: "Merta-City"},
{value : "Mhaswad",  label: "Mhaswad"},
{value : "Mira-Bhayandar",  label: "Mira-Bhayandar"},
{value : "Mirganj",  label: "Mirganj"},
{value : "Miryalaguda",  label: "Miryalaguda"},
{value : "Modasa",  label: "Modasa"},
{value : "Modinagar",  label: "Modinagar"},
{value : "Moga",  label: "Moga"},
{value : "Mohali",  label: "Mohali"},
{value : "Mokameh",  label: "Mokameh"},
{value : "Mokokchung",  label: "Mokokchung"},
{value : "Moradabad",  label: "Moradabad"},
{value : "Morena",  label: "Morena"},
{value : "Mormugao",  label: "Mormugao"},
{value : "Morshi",  label: "Morshi"},
{value : "Motihari",  label: "Motihari"},
{value : "Motipur",  label: "Motipur"},
{value : "Mount-Abu",  label: "Mount-Abu"},
{value : "Mudabidri",  label: "Mudabidri"},
{value : "Mudalagi",  label: "Mudalagi"},
{value : "Muddebihal",  label: "Muddebihal"},
{value : "Mudhol",  label: "Mudhol"},
{value : "Mukerian",  label: "Mukerian"},
{value : "Mukhed",  label: "Mukhed"},
{value : "Muktsar",  label: "Muktsar"},
{value : "Mulbagal",  label: "Mulbagal"},
{value : "Multai",  label: "Multai"},
{value : "Mumbai",  label: "Mumbai"},
{value : "Mundargi",  label: "Mundargi"},
{value : "Mundi",  label: "Mundi"},
{value : "Mungeli",  label: "Mungeli"},
{value : "Munger",  label: "Munger"},
{value : "Murshidabad",  label: "Murshidabad"},
{value : "Murtijapur",  label: "Murtijapur"},
{value : "Musabani",  label: "Musabani"},
{value : "Mussoorie",  label: "Mussoorie"},
{value : "Muvattupuzha",  label: "Muvattupuzha"},
{value : "Muzaffarpur",  label: "Muzaffarpur"},
{value : "Mysore",  label: "Mysore"},
{value : "Nabadwip",  label: "Nabadwip"},
{value : "Nabarangapur",  label: "Nabarangapur"},
{value : "Nabha",  label: "Nabha"},
{value : "Nadbai",  label: "Nadbai"},
{value : "Nadiad",  label: "Nadiad"},
{value : "Nagaon",  label: "Nagaon"},
{value : "Nagapattinam",  label: "Nagapattinam"},
{value : "Nagari",  label: "Nagari"},
{value : "Nagarkurnool",  label: "Nagarkurnool"},
{value : "Nagaur",  label: "Nagaur"},
{value : "Nagda",  label: "Nagda"},
{value : "Nagercoil",  label: "Nagercoil"},
{value : "Nagina",  label: "Nagina"},
{value : "Nagla",  label: "Nagla"},
{value : "Nagpur",  label: "Nagpur"},
{value : "Nahan",  label: "Nahan"},
{value : "Naharlagun",  label: "Naharlagun"},
{value : "Naidupet",  label: "Naidupet"},
{value : "Naihati",  label: "Naihati"},
{value : "Naila-Janjgir",  label: "Naila-Janjgir"},
{value : "Nainital",  label: "Nainital"},
{value : "Nainpur",  label: "Nainpur"},
{value : "Najibabad",  label: "Najibabad"},
{value : "Nakodar",  label: "Nakodar"},
{value : "Nakur",  label: "Nakur"},
{value : "Nalbari",  label: "Nalbari"},
{value : "Namagiripettai",  label: "Namagiripettai"},
{value : "Namakkal",  label: "Namakkal"},
{value : "Nanded-Waghala",  label: "Nanded-Waghala"},
{value : "Nandgaon",  label: "Nandgaon"},
{value : "Nandivaram-Guduvancheri",  label: "Nandivaram-Guduvancheri"},
{value : "Nandura",  label: "Nandura"},
{value : "Nandurbar",  label: "Nandurbar"},
{value : "Nandyal",  label: "Nandyal"},
{value : "Nanjangud",  label: "Nanjangud"},
{value : "Nanjikottai",  label: "Nanjikottai"},
{value : "Nanpara",  label: "Nanpara"},
{value : "Narasapuram",  label: "Narasapuram"},
{value : "Narasaraopet",  label: "Narasaraopet"},
{value : "Naraura",  label: "Naraura"},
{value : "Narayanpet",  label: "Narayanpet"},
{value : "Nargund",  label: "Nargund"},
{value : "Narkhed",  label: "Narkhed"},
{value : "Narnaul",  label: "Narnaul"},
{value : "Narsinghgarh",  label: "Narsinghgarh"},
{value : "Narsipatnam",  label: "Narsipatnam"},
{value : "Narwana",  label: "Narwana"},
{value : "Nashik",  label: "Nashik"},
{value : "Nasirabad",  label: "Nasirabad"},
{value : "Natham",  label: "Natham"},
{value : "Nathdwara",  label: "Nathdwara"},
{value : "Naugachhia",  label: "Naugachhia"},
{value : "Naugawan-Sadat",  label: "Naugawan-Sadat"},
{value : "Nautanwa",  label: "Nautanwa"},
{value : "Navsari",  label: "Navsari"},
{value : "Nawabganj",  label: "Nawabganj"},
{value : "Nawada",  label: "Nawada"},
{value : "Nawanshahr",  label: "Nawanshahr"},
{value : "Nedumangad",  label: "Nedumangad"},
{value : "Neem-Ka-Thana" , label: "Neem-Ka-Thana"},
{value : "Neemuch",  label: "Neemuch"},
{value : "Nehtaur",  label: "Nehtaur"},
{value : "Nelamangala",  label: "Nelamangala"},
{value : "Nellikuppam",  label: "Nellikuppam"},
{value : "Nellore",  label: "Nellore"},
{value : "Nepanagar",  label: "Nepanagar"},
{value : "New-Delhi",  label: "New-Delhi"},
{value : "Neyveli "},
{value : "Neyyattinkara",  label: "Neyyattinkara"},
{value : "Nidadavole",  label: "Nidadavole"},
{value : "Nilambur",  label: "Nilambur"},
{value : "Nilanga",  label: "Nilanga"},
{value : "Nimbahera",  label: "Nimbahera"},
{value : "Nirmal",  label: "Nirmal"},
{value : "Niwai",  label: "Niwai"},
{value : "Niwari",  label: "Niwari"},
{value : "Nizamabad",  label: "Nizamabad"},
{value : "Nohar",  label: "Nohar"},
{value : "Noida",  label: "Noida"},
{value : "Nokha",  label: "Nokha"},
{value : "Nongstoin",  label: "Nongstoin"},
{value : "Noorpur",  label: "Noorpur"},
{value : "North-Lakhimpur",  label: "North-Lakhimpur"},
{value : "Nowgong",  label: "Nowgong"},
{value : "Nuzvid",  label: "Nuzvid"},
{value : "Obra",  label: "Obra"},
{value : "Oddanchatram",  label: "Oddanchatram"},
{value : "Ongole",  label: "Ongole"},
{value : "Orai",  label: "Orai"},
{value : "Osmanabad",  label: "Osmanabad"},
{value : "Ottappalam",  label: "Ottappalam"},
{value : "Pachora",  label: "Pachora"},
{value : "Pachore",  label: "Pachore"},
{value : "Padmanabhapuram",  label: "Padmanabhapuram"},
{value : "Padra",  label: "Padra"},
{value : "Padrauna",  label: "Padrauna"},
{value : "Paithan",  label: "Paithan"},
{value : "Pakaur",  label: "Pakaur"},
{value : "Palacole",  label: "Palacole"},
{value : "Palai",  label: "Palai"},
{value : "Palakkad",  label: "Palakkad"},
{value : "Palampur",  label: "Palampur"},
{value : "Palani",  label: "Palani"},
{value : "Palanpur",  label: "Palanpur"},
{value : "Palasa-Kasibugga",  label: "Palasa-Kasibugga"},
{value : "Palghar",  label: "Palghar"},
{value : "Pali",  label: "Pali"},
{value : "Palia-Kalan",  label: "Palia-Kalan"},
{value : "Palitana",  label: "Palitana"},
{value : "Palladam",  label: "Palladam"},
{value : "Pallapatti",  label: "Pallapatti"},
{value : "Pallikonda",  label: "Pallikonda"},
{value : "Palwal",  label: "Palwal"},
{value : "Palwancha",  label: "Palwancha"},
{value : "Panagar",  label: "Panagar"},
{value : "Panagudi",  label: "Panagudi"},
{value : "Panaji",  label: "Panaji"},
{value : "Panamattom",  label: "Panamattom"},
{value : "Panchkula",  label: "Panchkula"},
{value : "Pandharkaoda",  label: "Pandharkaoda"},
{value : "Pandharpur",  label: "Pandharpur"},
{value : "Pandhurna",  label: "Pandhurna"},
{value : "Panipat",  label: "Panipat"},
{value : "Panna",  label: "Panna"},
{value : "Panniyannur",  label: "Panniyannur"},
{value : "Panruti",  label: "Panruti"},
{value : "Panvel",  label: "Panvel"},
{value : "Pappinisseri",  label: "Pappinisseri"},
{value : "Paradip",  label: "Paradip"},
{value : "Paramakudi",  label: "Paramakudi"},
{value : "Parangipettai",  label: "Parangipettai"},
{value : "Parasi",  label: "Parasi"},
{value : "Parbhani",  label: "Parbhani"},
{value : "Pardi",  label: "Pardi"},
{value : "Parlakhemundi",  label: "Parlakhemundi"},
{value : "Parli",  label: "Parli"},
{value : "Partur",  label: "Partur"},
{value : "Parvathipuram",  label: "Parvathipuram"},
{value : "Paschim-Punropara",  label: "Paschim-Punropara"},
{value : "Pasighat",  label: "Pasighat"},
{value : "Patan",  label: "Patan"},
{value : "Pathanamthitta",  label: "Pathanamthitta"},
{value : "Pathankot",  label: "Pathankot"},
{value : "Pathardi",  label: "Pathardi"},
{value : "Pathri",  label: "Pathri"},
{value : "Patiala",  label: "Patiala"},
{value : "Patna",  label: "Patna"},
{value : "Patratu",  label: "Patratu"},
{value : "Pattamundai",  label: "Pattamundai"},
{value : "Patti",  label: "Patti"},
{value : "Pattukkottai",  label: "Pattukkottai"},
{value : "Patur",  label: "Patur"},
{value : "Pauni",  label: "Pauni"},
{value : "Pauri",  label: "Pauri"},
{value : "Pavagada",  label: "Pavagada"},
{value : "Pedana",  label: "Pedana"},
{value : "Peddapuram",  label: "Peddapuram"},
{value : "Pehowa",  label: "Pehowa"},
{value : "Pen",  label: "Pen"},
{value : "Perambalur",  label: "Perambalur"},
{value : "Peravurani",  label: "Peravurani"},
{value : "Peringathur",  label: "Peringathur"},
{value : "Perinthalmanna",  label: "Perinthalmanna"},
{value : "Periyakulam",  label: "Periyakulam"},
{value : "Periyasemur",  label: "Periyasemur"},
{value : "Perumbavoor",  label: "Perumbavoor"},
{value : "Petlad",  label: "Petlad"},
{value : "Phagwara",  label: "Phagwara"},
{value : "Phalodi",  label: "Phalodi"},
{value : "Phaltan",  label: "Phaltan"},
{value : "Phillaur",  label: "Phillaur"},
{value : "Phulabani",  label: "Phulabani"},
{value : "Phulera",  label: "Phulera"},
{value : "Phulpur",  label: "Phulpur"},
{value : "Phusro",  label: "Phusro"},
{value : "Pihani",  label: "Pihani"},
{value : "Pilani",  label: "Pilani"},
{value : "Pilibanga",  label: "Pilibanga"},
{value : "Pilibhit",  label: "Pilibhit"},
{value : "Pilkhuwa",  label: "Pilkhuwa"},
{value : "Pindwara",  label: "Pindwara"},
{value : "Pinjore",  label: "Pinjore"},
{value : "Pipar-City",  label: "Pipar-City"},
{value : "Pipariya",  label: "Pipariya"},
{value : "Piriyapatna",  label: "Piriyapatna"},
{value : "Piro",  label: "Piro"},
{value : "Pithampur",  label: "Pithampur"},
{value : "Pithapuram",  label: "Pithapuram"},
{value : "Pithoragarh",  label: "Pithoragarh"},
{value : "Pollachi",  label: "Pollachi"},
{value : "Polur",  label: "Polur"},
{value : "Pondicherry",  label: "Pondicherry"},
{value : "Ponnani",  label: "Ponnani"},
{value : "Ponneri",  label: "Ponneri"},
{value : "Ponnur",  label: "Ponnur"},
{value : "Porbandar",  label: "Porbandar"},
{value : "Porsa",  label: "Porsa"},
{value : "Port-Blair",  label: "Port-Blair"},
{value : "Powayan",  label: "Powayan"},
{value : "Prantij",  label: "Prantij"},
{value : "Pratapgarh",  label: "Pratapgarh"},
{value : "Proddatur",  label: "Proddatur"},
{value : "Pudukkottai",  label: "Pudukkottai"},
{value : "Pudupattinam",  label: "Pudupattinam"},
{value : "Pukhrayan",  label: "Pukhrayan"},
{value : "Pulgaon",  label: "Pulgaon"},
{value : "Punalur",  label: "Punalur"},
{value : "Pune",  label: "Pune"},
{value : "Punganur",  label: "Punganur"},
{value : "Punjaipugalur",  label: "Punjaipugalur"},
{value : "Puranpur",  label: "Puranpur"},
{value : "Puri",  label: "Puri"},
{value : "Purna",  label: "Purna"},
{value : "Purnia",  label: "Purnia"},
{value : "Purulia",  label: "Purulia"},
{value : "Pusad",  label: "Pusad"},
{value : "Puthuppally",  label: "Puthuppally"},
{value : "Puttur",  label: "Puttur"},
{value : "Qadian",  label: "Qadian"},
{value : "Rabkavi-Banhatti",  label: "Rabkavi-Banhatti"},
{value : "Radhanpur",  label: "Radhanpur"},
{value : "Rae-Bareli",  label: "Rae-Bareli"},
{value : "Raghogarh-Vijaypur",  label: "Raghogarh-Vijaypur"},
{value : "Raghunathganj",  label: "Raghunathganj"},
{value : "Raghunathpur",  label: "Raghunathpur"},
{value : "Rahatgarh",  label: "Rahatgarh"},
{value : "Rahuri",  label: "Rahuri"},
{value : "Raiganj",  label: "Raiganj"},
{value : "Raigarh",  label: "Raigarh"},
{value : "Raikot",  label: "Raikot"},
{value : "Raipur",  label: "Raipur"},
{value : "Rairangpur",  label: "Rairangpur"},
{value : "Raisen",  label: "Raisen"},
{value : "Raisinghnagar",  label: "Raisinghnagar"},
{value : "Rajagangapur",  label: "Rajagangapur"},
{value : "Rajahmundry",  label: "Rajahmundry"},
{value : "Rajakhera",  label: "Rajakhera"},
{value : "Rajaldesar",  label: "Rajaldesar"},
{value : "Rajam",  label: "Rajam"},
{value : "Rajampet",  label: "Rajampet"},
{value : "Rajapalayam",  label: "Rajapalayam"},
{value : "Rajauri",  label: "Rajauri"},
{value : "Rajgarh",  label: "Rajgarh"},
{value : "Rajgir",  label: "Rajgir"},
{value : "Rajkot",  label: "Rajkot"},
{value : "Rajnandgaon",  label: "Rajnandgaon"},
{value : "Rajpipla",  label: "Rajpipla"},
{value : "Rajpura",  label: "Rajpura"},
{value : "Rajsamand",  label: "Rajsamand"},
{value : "Rajula",  label: "Rajula"},
{value : "Rajura",  label: "Rajura"},
{value : "Ramachandrapuram",  label: "Ramachandrapuram"},
{value : "Ramagundam",  label: "Ramagundam"},
{value : "Ramanagaram",  label: "Ramanagaram"},
{value : "Ramanathapuram",  label: "Ramanathapuram"},
{value : "Ramdurg",  label: "Ramdurg"},
{value : "Rameshwaram",  label: "Rameshwaram"},
{value : "Ramganj-Mandi",  label: "Ramganj-Mandi"},
{value : "Ramgarh",  label: "Ramgarh"},
{value : "Ramnagar",  label: "Ramnagar"},
{value : "Ramngarh",  label: "Ramngarh"},
{value : "Rampur",  label: "Rampur"},
{value : "Rampur-Maniharan",  label: "Rampur-Maniharan"},
{value : "Rampura-Phul",  label: "Rampura-Phul"},
{value : "Rampurhat",  label: "Rampurhat"},
{value : "Ramtek",  label: "Ramtek"},
{value : "Ranaghat",  label: "Ranaghat"},
{value : "Ranavav",  label: "Ranavav"},
{value : "Ranchi",  label: "Ranchi"},
{value : "Rangia",  label: "Rangia"},
{value : "Rania",  label: "Rania"},
{value : "Ranibennur",  label: "Ranibennur"},
{value : "Ranipet",  label: "Ranipet"},
{value : "Rapar",  label: "Rapar"},
{value : "Rasipuram",  label: "Rasipuram"},
{value : "Ratangarh",  label: "Ratangarh"},
{value : "Rath",  label: "Rath"},
{value : "Ratia",  label: "Ratia"},
{value : "Ratlam",  label: "Ratlam"},
{value : "Ratnagiri",  label: "Ratnagiri"},
{value : "Rau",  label: "Rau"},
{value : "Raurkela",  label: "Raurkela"},
{value : "Rawatbhata",  label: "Rawatbhata"},
{value : "Raxaul-Bazar",  label: "Raxaul-Bazar"},
{value : "Rayachoti",  label: "Rayachoti"},
{value : "Rayagada",  label: "Rayagada"},
{value : "Reengus",  label: "Reengus"},
{value : "Rehli",  label: "Rehli"},
{value : "Renigunta",  label: "Renigunta"},
{value : "Renukoot",  label: "Renukoot"},
{value : "Reoti",  label: "Reoti"},
{value : "Repalle",  label: "Repalle"},
{value : "Revelganj",  label: "Revelganj"},
{value : "Rewa",  label: "Rewa"},
{value : "Rewari",  label: "Rewari"},
{value : "Rishikesh",  label: "Rishikesh"},
{value : "Risod",  label: "Risod"},
{value : "Robertsganj",  label: "Robertsganj"},
{value : "Robertson-Pet",  label: "Robertson-Pet"},
{value : "Rohtak",  label: "Rohtak"},
{value : "Ron",  label: "Ron"},
{value : "Roorkee",  label: "Roorkee"},
{value : "Rosera",  label: "Rosera"},
{value : "Rudauli",  label: "Rudauli"},
{value : "Rudrapur",  label: "Rudrapur"},
{value : "Rupnagar",  label: "Rupnagar"},
{value : "Sadabad",  label: "Sadabad"},
{value : "Sadasivpet",  label: "Sadasivpet"},
{value : "Sadri",  label: "Sadri"},
{value : "Sadulpur",  label: "Sadulpur"},
{value : "Sadulshahar",  label: "Sadulshahar"},
{value : "Safidon",  label: "Safidon"},
{value : "Safipur",  label: "Safipur"},
{value : "Sagar",  label: "Sagar"},
{value : "Sagara",  label: "Sagara"},
{value : "Sagwara",  label: "Sagwara"},
{value : "Saharanpur",  label: "Saharanpur"},
{value : "Saharsa",  label: "Saharsa"},
{value : "Sahaspur",  label: "Sahaspur"},
{value : "Sahaswan",  label: "Sahaswan"},
{value : "Sahawar",  label: "Sahawar"},
{value : "Sahibganj",  label: "Sahibganj"},
{value : "Sahjanwa",  label: "Sahjanwa"},
{value : "Saidpur",  label: "Saidpur"},
{value : "Saiha",  label: "Saiha"},
{value : "Sailu",  label: "Sailu"},
{value : "Sainthia",  label: "Sainthia"},
{value : "Sakaleshapura",  label: "Sakaleshapura"},
{value : "Sakti",  label: "Sakti"},
{value : "Salaya",  label: "Salaya"},
{value : "Salem",  label: "Salem"},
{value : "Salur",  label: "Salur"},
{value : "Samalkha",  label: "Samalkha"},
{value : "Samalkot",  label: "Samalkot"},
{value : "Samana",  label: "Samana"},
{value : "Samastipur",  label: "Samastipur"},
{value : "Sambalpur",  label: "Sambalpur"},
{value : "Sambhal",  label: "Sambhal"},
{value : "Sambhar",  label: "Sambhar"},
{value : "Samdhan",  label: "Samdhan"},
{value : "Samthar",  label: "Samthar"},
{value : "Sanand",  label: "Sanand"},
{value : "Sanawad",  label: "Sanawad"},
{value : "Sanchore",  label: "Sanchore"},
{value : "Sandi",  label: "Sandi"},
{value : "Sandila",  label: "Sandila"},
{value : "Sangamner",  label: "Sangamner"},
{value : "Sangareddy",  label: "Sangareddy"},
{value : "Sangaria",  label: "Sangaria"},
{value : "Sangli",  label: "Sangli"},
{value : "Sangole",  label: "Sangole"},
{value : "Sangrur",  label: "Sangrur"},
{value : "Sankarankovil",  label: "Sankarankovil"},
{value : "Sankari",  label: "Sankari"},
{value : "Sankeshwara",  label: "Sankeshwara"},
{value : "Santipur",  label: "Santipur"},
{value : "Sarangpur",  label: "Sarangpur"},
{value : "Sardarshahar",  label: "Sardarshahar"},
{value : "Sardhana",  label: "Sardhana"},
{value : "Sarni",  label: "Sarni"},
{value : "Sarsod",  label: "Sarsod"},
{value : "Sasaram",  label: "Sasaram"},
{value : "Sasvad",  label: "Sasvad"},
{value : "Satana",  label: "Satana"},
{value : "Satara",  label: "Satara"},
{value : "Sathyamangalam",  label: "Sathyamangalam"},
{value : "Satna",  label: "Satna"},
{value : "Sattenapalle",  label: "Sattenapalle"},
{value : "Sattur",  label: "Sattur"},
{value : "Saunda",  label: "Saunda"},
{value : "Saundatti-Yellamma",  label: "Saundatti-Yellamma"},
{value : "Sausar",  label: "Sausar"},
{value : "Savanur",  label: "Savanur"},
{value : "Savarkundla",  label: "Savarkundla"},
{value : "Sawai-Madhopur",  label: "Sawai-Madhopur"},
{value : "Sawantwadi",  label: "Sawantwadi"},
{value : "Sedam",  label: "Sedam"},
{value : "Sehore",  label: "Sehore"},
{value : "Sendhwa",  label: "Sendhwa"},
{value : "Seohara",  label: "Seohara"},
{value : "Seoni",  label: "Seoni"},
{value : "Seoni-Malwa",  label: "Seoni-Malwa"},
{value : "Shahabad",  label: "Shahabad"},
{value : "Shahade",  label: "Shahade"},
{value : "Shahbad",  label: "Shahbad"},
{value : "Shahdol",  label: "Shahdol"},
{value : "Shahganj",  label: "Shahganj"},
{value : "Shahjahanpur",  label: "Shahjahanpur"},
{value : "Shahpur",  label: "Shahpur"},
{value : "Shahpura",  label: "Shahpura"},
{value : "Shajapur",  label: "Shajapur"},
{value : "Shamgarh",  label: "Shamgarh"},
{value : "Shamli",  label: "Shamli"},
{value : "Shegaon",  label: "Shegaon"},
{value : "Sheikhpura",  label: "Sheikhpura"},
{value : "Shenkottai",  label: "Shenkottai"},
{value : "Sheoganj",  label: "Sheoganj"},
{value : "Sheohar",  label: "Sheohar"},
{value : "Sherghati",  label: "Sherghati"},
{value : "Sherkot",  label: "Sherkot"},
{value : "Shikaripur",  label: "Shikaripur"},
{value : "Shikohabad",  label: "Shikohabad"},
{value : "Shillong",  label: "Shillong"},
{value : "Shimla",  label: "Shimla"},
{value : "Shirdi",  label: "Shirdi"},
{value : "Shirpur-Warwade",  label: "Shirpur-Warwade"},
{value : "Shirur",  label: "Shirur"},
{value : "Shishgarh",  label: "Shishgarh"},
{value : "Shivamogga",  label: "Shivamogga"},
{value : "Shivpuri",  label: "Shivpuri"},
{value : "Sholavandan",  label: "Sholavandan"},
{value : "Sholingur",  label: "Sholingur"},
{value : "Shoranur",  label: "Shoranur"},
{value : "Shrigonda",  label: "Shrigonda"},
{value : "Shrirampur",  label: "Shrirampur"},
{value : "Shrirangapattana",  label: "Shrirangapattana"},
{value : "Shujalpur",  label: "Shujalpur"},
{value : "Sibsagar",  label: "Sibsagar"},
{value : "Siddipet",  label: "Siddipet"},
{value : "Sidhi",  label: "Sidhi"},
{value : "Sidhpur",  label: "Sidhpur"},
{value : "Sidlaghatta",  label: "Sidlaghatta"},
{value : "Sihora",  label: "Sihora"},
{value : "Sikanderpur",  label: "Sikanderpur"},
{value : "Sikandra-Rao",  label: "Sikandra-Rao"},
{value : "Sikandrabad",  label: "Sikandrabad"},
{value : "Sikar",  label: "Sikar"},
{value : "Silao",  label: "Silao"},
{value : "Silapathar",  label: "Silapathar"},
{value : "Silchar",  label: "Silchar"},
{value : "Siliguri",  label: "Siliguri"},
{value : "Sillod",  label: "Sillod"},
{value : "Silvassa",  label: "Silvassa"},
{value : "Simdega",  label: "Simdega"},
{value : "Sindagi",  label: "Sindagi"},
{value : "Sindhnur",  label: "Sindhnur"},
{value : "Singrauli",  label: "Singrauli"},
{value : "Sinnar",  label: "Sinnar"},
{value : "Sira",  label: "Sira"},
{value : "Sircilla",  label: "Sircilla"},
{value : "Sirhind-Fatehgarh-Sahib" , label: "Sirhind-Fatehgarh-Sahib"},
{value : "Sirkali",  label: "Sirkali"},
{value : "Sirohi",  label: "Sirohi"},
{value : "Sironj",  label: "Sironj"},
{value : "Sirsa",  label: "Sirsa"},
{value : "Sirsi",  label: "Sirsi"},
{value : "Siruguppa",  label: "Siruguppa"},
{value : "Sitamarhi",  label: "Sitamarhi"},
{value : "Sitapur",  label: "Sitapur"},
{value : "Sitarganj",  label: "Sitarganj"},
{value : "Sivaganga",  label: "Sivaganga"},
{value : "Sivagiri",  label: "Sivagiri"},
{value : "Sivakasi",  label: "Sivakasi"},
{value : "Siwan",  label: "Siwan"},
{value : "Sohagpur",  label: "Sohagpur"},
{value : "Sohna",  label: "Sohna"},
{value : "Sojat",  label: "Sojat"},
{value : "Solan",  label: "Solan"},
{value : "Solapur",  label: "Solapur"},
{value : "Sonamukhi",  label: "Sonamukhi"},
{value : "Sonepur",  label: "Sonepur"},
{value : "Songadh",  label: "Songadh"},
{value : "Sonipat",  label: "Sonipat"},
{value : "Sopore",  label: "Sopore"},
{value : "Soro",  label: "Soro"},
{value : "Soron",  label: "Soron"},
{value : "Soyagaon",  label: "Soyagaon"},
{value : "Sri-Madhopur",  label: "Sri-Madhopur"},
{value : "Srikakulam",  label: "Srikakulam"},
{value : "Srikalahasti",  label: "Srikalahasti"},
{value : "Srinagar",  label: "Srinagar"},
{value : "Srinivaspur",  label: "Srinivaspur"},
{value : "Srirampore",  label: "Srirampore"},
{value : "Srivilliputhur",  label: "Srivilliputhur"},
{value : "Sugauli",  label: "Sugauli"},
{value : "Sujangarh",  label: "Sujangarh"},
{value : "Sujanpur",  label: "Sujanpur"},
{value : "Sullurpeta",  label: "Sullurpeta"},
{value : "Sultanpur",  label: "Sultanpur"},
{value : "Sumerpur",  label: "Sumerpur"},
{value : "Sunabeda",  label: "Sunabeda"},
{value : "Sunam",  label: "Sunam"},
{value : "Sundargarh",  label: "Sundargarh"},
{value : "Sundarnagar",  label: "Sundarnagar"},
{value : "Supaul",  label: "Supaul"},
{value : "Surandai",  label: "Surandai"},
{value : "Surat",  label: "Surat"},
{value : "Suratgarh",  label: "Suratgarh"},
{value : "Suri",  label: "Suri"},
{value : "Suriyampalayam",  label: "Suriyampalayam"},
{value : "Suryapet",  label: "Suryapet"},
{value : "Tadepalligudem",  label: "Tadepalligudem"},
{value : "Tadpatri",  label: "Tadpatri"},
{value : "Takhatgarh",  label: "Takhatgarh"},
{value : "Taki",  label: "Taki"},
{value : "Talaja",  label: "Talaja"},
{value : "Talcher",  label: "Talcher"},
{value : "Talegaon-Dabhade",  label: "Talegaon-Dabhade"},
{value : "Talikota",  label: "Talikota"},
{value : "Taliparamba",  label: "Taliparamba"},
{value : "Talode",  label: "Talode"},
{value : "Talwara",  label: "Talwara"},
{value : "Tamluk",  label: "Tamluk"},
{value : "Tanda",  label: "Tanda"},
{value : "Tandur",  label: "Tandur"},
{value : "Tanuku",  label: "Tanuku"},
{value : "Tarakeswar",  label: "Tarakeswar"},
{value : "Tarana",  label: "Tarana"},
{value : "Taranagar",  label: "Taranagar"},
{value : "Tarbha",  label: "Tarbha"},
{value : "Tarikere",  label: "Tarikere"},
{value : "Tarn-Taran",  label: "Tarn-Taran"},
{value : "Tasgaon",  label: "Tasgaon"},
{value : "Tehri",  label: "Tehri"},
{value : "Tenali",  label: "Tenali"},
{value : "Tenkasi",  label: "Tenkasi"},
{value : "Terdal",  label: "Terdal"},
{value : "Tezpur",  label: "Tezpur"},
{value : "Thammampatti",  label: "Thammampatti"},
{value : "Thana-Bhawan",  label: "Thana-Bhawan"},
{value : "Thane",  label: "Thane"},
{value : "Thanesar",  label: "Thanesar"},
{value : "Thangadh",  label: "Thangadh"},
{value : "Thanjavur",  label: "Thanjavur"},
{value : "Tharad",  label: "Tharad"},
{value : "Tharamangalam",  label: "Tharamangalam"},
{value : "Theni-Allinagaram",  label: "Theni-Allinagaram"},
{value : "Thirumangalam",  label: "Thirumangalam"},
{value : "Thirupuvanam",  label: "Thirupuvanam"},
{value : "Thiruvalla",  label: "Thiruvalla"},
{value : "Thiruvallur",  label: "Thiruvallur"},
{value : "Thiruvananthapuram",  label: "Thiruvananthapuram"},
{value : "Thiruvarur",  label: "Thiruvarur"},
{value : "Thodupuzha",  label: "Thodupuzha"},
{value : "Thoubal",  label: "Thoubal"},
{value : "Thrissur",  label: "Thrissur"},
{value : "Thuraiyur",  label: "Thuraiyur"},
{value : "Tikamgarh",  label: "Tikamgarh"},
{value : "Tilhar",  label: "Tilhar"},
{value : "Tindivanam",  label: "Tindivanam"},
{value : "Tinsukia",  label: "Tinsukia"},
{value : "Tiptur",  label: "Tiptur"},
{value : "Tirora",  label: "Tirora"},
{value : "Tiruchendur",  label: "Tiruchendur"},
{value : "Tiruchengode",  label: "Tiruchengode"},
{value : "Tiruchirappalli",  label: "Tiruchirappalli"},
{value : "Tirukalukundram",  label: "Tirukalukundram"},
{value : "Tirukkoyilur",  label: "Tirukkoyilur"},
{value : "Tirunelveli",  label: "Tirunelveli"},
{value : "Tirupathur",  label: "Tirupathur"},
{value : "Tirupati",  label: "Tirupati"},
{value : "Tiruppur",  label: "Tiruppur"},
{value : "Tirur",  label: "Tirur"},
{value : "Tiruttani",  label: "Tiruttani"},
{value : "Tiruvannamalai",  label: "Tiruvannamalai"},
{value : "Tiruvethipuram",  label: "Tiruvethipuram"},
{value : "Tiruvuru",  label: "Tiruvuru"},
{value : "Tirwaganj",  label: "Tirwaganj"},
{value : "Titlagarh",  label: "Titlagarh"},
{value : "Tittakudi",  label: "Tittakudi"},
{value : "Todabhim",  label: "Todabhim"},
{value : "Todaraisingh",  label: "Todaraisingh"},
{value : "Tohana",  label: "Tohana"},
{value : "Tonk",  label: "Tonk"},
{value : "Tuensang",  label: "Tuensang"},
{value : "Tulsipur",  label: "Tulsipur"},
{value : "Tumkur",  label: "Tumkur"},
{value : "Tumsar",  label: "Tumsar"},
{value : "Tundla",  label: "Tundla"},
{value : "Tuni",  label: "Tuni"},
{value : "Tura",  label: "Tura"},
{value : "Udaipur",  label: "Udaipur"},
{value : "Udaipurwati",  label: "Udaipurwati"},
{value : "Udgir",  label: "Udgir"},
{value : "Udhagamandalam",  label: "Udhagamandalam"},
{value : "Udhampur",  label: "Udhampur"},
{value : "Udumalaipettai",  label: "Udumalaipettai"},
{value : "Udupi",  label: "Udupi"},
{value : "Ujjain",  label: "Ujjain"},
{value : "Umarga",  label: "Umarga"},
{value : "Umaria",  label: "Umaria"},
{value : "Umarkhed",  label: "Umarkhed"},
{value : "Umbergaon",  label: "Umbergaon"},
{value : "Umred",  label: "Umred"},
{value : "Umreth",  label: "Umreth"},
{value : "Una",  label: "Una"},
{value : "Unjha",  label: "Unjha"},
{value : "Unnamalaikadai",  label: "Unnamalaikadai"},
{value : "Unnao",  label: "Unnao"},
{value : "Upleta",  label: "Upleta"},
{value : "Uran",  label: "Uran"},
{value : "Uran-Islampur",  label: "Uran-Islampur"},
{value : "Uravakonda",  label: "Uravakonda"},
{value : "Urmar-Tanda",  label: "Urmar-Tanda"},
{value : "Usilampatti",  label: "Usilampatti"},
{value : "Uthamapalayam",  label: "Uthamapalayam"},
{value : "Uthiramerur",  label: "Uthiramerur"},
{value : "Utraula",  label: "Utraula"},
{value : "Vadalur",  label: "Vadalur"},
{value : "Vadgaon-Kasba",  label: "Vadgaon-Kasba"},
{value : "Vadipatti",  label: "Vadipatti"},
{value : "Vadnagar",  label: "Vadnagar"},
{value : "Vadodara",  label: "Vadodara"},
{value : "Vaijapur",  label: "Vaijapur"},
{value : "Vaikom",  label: "Vaikom"},
{value : "Valparai",  label: "Valparai"},
{value : "Valsad",  label: "Valsad"},
{value : "Vandavasi",  label: "Vandavasi"},
{value : "Vaniyambadi",  label: "Vaniyambadi"},
{value : "Vapi",  label: "Vapi"},
{value : "Varanasi",  label: "Varanasi"},
{value : "Varkala",  label: "Varkala"},
{value : "Vasai-Virar",  label: "Vasai-Virar"},
{value : "Vatakara",  label: "Vatakara"},
{value : "Vedaranyam",  label: "Vedaranyam"},
{value : "Vellore",  label: "Vellore"},
{value : "Venkatagiri",  label: "Venkatagiri"},
{value : "Veraval",  label: "Veraval"},
{value : "Vidisha",  label: "Vidisha"},
{value : "Vijapur",  label: "Vijapur"},
{value : "Vijayapura",  label: "Vijayapura"},
{value : "Vijayawada",  label: "Vijayawada"},
{value : "Vijaypur",  label: "Vijaypur"},
{value : "Vikarabad",  label: "Vikarabad"},
{value : "Vikramasingapuram",  label: "Vikramasingapuram"},
{value : "Viluppuram",  label: "Viluppuram"},
{value : "Vinukonda",  label: "Vinukonda"},
{value : "Viramgam",  label: "Viramgam"},
{value : "Virudhachalam",  label: "Virudhachalam"},
{value : "Virudhunagar",  label: "Virudhunagar"},
{value : "Visakhapatnam",  label: "Visakhapatnam"},
{value : "Visnagar",  label: "Visnagar"},
{value : "Viswanatham",  label: "Viswanatham"},
{value : "Vizianagaram",  label: "Vizianagaram"},
{value : "Vrindavan",  label: "Vrindavan"},
{value : "Vyara",  label: "Vyara"},
{value : "Wadgaon-Road",  label: "Wadgaon-Road"},
{value : "Wadhwan",  label: "Wadhwan"},
{value : "Wadi",  label: "Wadi"},
{value : "Wai",  label: "Wai"},
{value : "Wanaparthy",  label: "Wanaparthy"},
{value : "Wara-Seoni",  label: "Wara-Seoni"},
{value : "Warangal",  label: "Warangal"},
{value : "Wardha",  label: "Wardha"},
{value : "Warisaliganj",  label: "Warisaliganj"},
{value : "Warora",  label: "Warora"},
{value : "Washim",  label: "Washim"},
{value : "Wokha",  label: "Wokha"},
{value : "Yadgir",  label: "Yadgir"},
{value : "Yamunanagar",  label: "Yamunanagar"},
{value : "Yanam",  label: "Yanam"},
{value : "Yavatmal",  label: "Yavatmal"},
{value : "Yawal",  label: "Yawal"},
{value : "Yellandu",  label: "Yellandu"},
{value : "Yemmiganur",  label: "Yemmiganur"},
{value : "Yerraguntla",  label: "Yerraguntla"},
{value : "Yevla",  label: "Yevla"},
{value : "Zaidpur",  label: "Zaidpur"},
{value : "Zamania",  label: "Zamania"},
{value : "Zira",  label: "Zira"},
{value : "Zirakpur",  label: "Zirakpur"},
{value : "Zunheboto" ,  label : "Zunheboto"} 
  ]
  function reset_From(){
    initialValues.name =  ""
    initialValues.Hospital =  ""
    initialValues.email =  ""
    initialValues.Mobile =  ""
    initialValues.locations =   ""
    handlenameChange("")
    handlemailChange("")
    handlphoneChange("")
    handlOrgChange("")
    handlOrgChange("")
    setSelectLocations(  );


  }

   const [Conferenceid, setConferenceid] = useState("");
   const [ConferenceName, setConferenceName] = useState("");
 
   useEffect(() => {
     try {
       setConferenceid(currentConference[0]['id']);
       setConferenceName(currentConference[0]['Name'])
     } catch {
       setConferenceid("");
     }
   }, [currentConference]);
 
 
  const handlesubmit = async (values, {setSubmitting, resetForm})=>{
   
    const save_enquiry_from = {
      "Name": values['name'],
      "OrganizationName": values["Hospital"],
      "Email": values['email'],
      "status": "Not Contacted",
      "MobileNumber":  values['Mobile'],
      "Location":   values['locations'],
      "message": values['message'],
      "conferencedata":Conferenceid,
      "Interesteds":  values['intrested'],
   }  
   try{
    const respones = await  axiosInstance.post('/api/', save_enquiry_from);
    const responseData = Array.isArray(respones.data) ? respones.data : [respones.data];
    setEnquiry(responseData)
    setExtractData("")
    reset_From()
   
    resetForm()

    toast('Thank you so much for your enquiry. Our salesperson will be in touch with you shortly.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "light",
      className: 'custom-toast'
      });
   } catch (error){
    console.log(`Error: ${error.message}`);
    toast.error(`${error.message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      
   }
  
  }
  const [name, setName] = useState('')
  const handlenameChange = (value)=>{
    setName(value) 
  }

  const [email, setEmail] = useState('')
  const handlemailChange = (value)=>{
    setEmail(value)
  }
  const [phone, setPhone] = useState('')
  const handlphoneChange = (value)=>{
    setPhone(value)
  }
  const [org, setOrg] = useState('')
  const handlOrgChange = (value)=>{
    setOrg(value)
  }
  

  const [selectLocations , setSelectLocations] = useState('')
  const handleSelectLocations =(option)=>{
    setSelectLocations( { value: option.value , label:  option.label });
  }
  const videoConstraints = {
    facingMode: 'environment', // Use 'environment' for the rear camera
  };
    return (
        <>
         {isCameraStarted ? <CameraComponent webcamRef ={webcamRef} capture ={capture}  videoConstraints={videoConstraints} setIsCameraStarted={setIsCameraStarted}/>: ""}
           <div className="wrap   container-md mt-4 ">
    
            <div className='top_div shadow-lg px-4    container-sm   bg-white  container        '>
            
            <div className='header'>
             <img src={staanlogo} className="img-thumbnail" alt="staan logo"/>
             <h3 className="title  ">{ConferenceName ? ConferenceName :"ENQUIRY FORM" } </h3>
             <i className ="fa-solid fa-camera me-2" onClick={startCamera}></i>
             <i className ="fa-regular fa-pen-to-square" onClick={handletextedtier}></i>
             </div>
           
               <Formik   initialValues=  {initialValues}
               onSubmit={handlesubmit}
               
               validationSchema={EnquirySchema}   >
                   {({errors, touched, isSubmitting, setFieldValue })=>
                   
                   (  
                      <Form className='' >
                      <ToastContainer/>
                   <div className="row  ">
                       
                       <div className="col-12 col-md-6 text-start mt-md-3">
                       <label htmlFor="Name" className='form-label lable-sub   '>Name  </label>
                       <Field type='text' name='name' value={name}  placeholder=' ' onChange={(e)=>{
                          handlenameChange(e.target.value); setFieldValue("name", e.target.value) }}  className='w-100  input-trenprant'/>
                       <br/>
                       { touched.name && errors.name && <small>{errors.name}</small>}
                       
                       </div>
                      
                       <div className="col-12   col-md-6    text-start   mt-md-3  ">
                         <label htmlFor="addHospital" className='form-label   ps-1 lable-sub   '>Hospital/Company</label>
                         <Field type='text' name='Hospital' value={org} onChange={(e)=>{
                          handlOrgChange(e.target.value) ;
                          setFieldValue("Hospital", e.target.value)
                         }}  placeholder=' ' className='w-100 input-trenprant'/>
                         
  
                         <br/>
                         {  touched.Hospital && errors.Hospital && <small>{errors.Hospital}</small>}
                       </div>
                      
                       <div className="col-12  col-md-6  text-start  mt-md-3  ">
                       <label htmlFor="email" className='form-label  text-start ps-1 lable-sub'>Email </label>
                        <Field type='email' name='email' value={email}  onChange={(e)=>{
                          setFieldValue("email", e.target.value)
                          handlemailChange(e.target.value)
                        }} placeholder=' ' className='w-100 input-trenprant'/>
                        
                     
                        <br/>
                       {  touched.email && errors.email && <small>{errors.email}</small>}
                       </div>
                       
                       <div className="col-12  col-md-6  text-start mt-md-3 ">
                       <label htmlFor="MobileNumber" className='form-label  text-start d-flex flex-nowrap lable-sub ps-1'>Mobile Number</label>
                       <Field type='text' name='Mobile' value={phone} onChange={(e)=>{
                          setFieldValue("Mobile" ,e.target.value )
                          handlphoneChange(e.target.value)
                       }}  placeholder=' ' className='w-100 input-trenprant no-spinners'    />
                       
  
                       <br/>
                       {  touched.Mobile && errors.Mobile && <small>{errors.Mobile}</small>}
                       </div>
                      
                       <div className="col-12  col-md-6 text-start mt-md-3 ">
                       <label htmlFor="Location" className='form-label   lable-sub  ps-1 '>City</label>
 
                         <Select
                              name="locations"
                              className="input-trenprant"
                             options={options}
                             isSearchable={true}
                             styles={{
                               control: (provided, state) => ({
                                 ...provided,
                                 border: "none",
                                 outline: "none",
                              
                                 zIndex:1000,
                                 backgroundColor: "#ffffff",
                               
                               }),
                               menu: (provided, state) => ({
                                 ...provided,
                                 zIndex: 2000, // Set a higher z-index value for the dropdown menu
                               }),
                             }}
                             value={selectLocations}
                             onChange={(option) => {setFieldValue("locations", option ? option.value : null)
                              handleSelectLocations(option)}}
                              
                           />
                        
                       <br/>

                       
                       {  touched.locations && errors.locations && <small>{errors.locations}</small>}
                       </div>
                      
                       <div className="col-12 col-md-6   text-start mt-md-3 ">
                       <label htmlFor="Message" className='form-label   text-start   ps-1 lable-sub '>Message</label>
                       <Field type='text' name='message'  placeholder=' ' className='w-100 mt-md-2  input-trenprant'/>
                      
                       <br/>
                       
                       { touched.message && errors.message && <small>{errors.message}</small>}
                       </div>

                       <div className="row icons_of_product  mt-1 ">
                       <Swiper
                           slidesPerView={3}
                           spaceBetween={30}
                           pagination={{
                             clickable: true,
                             
                           }}
                            
                           modules={[Pagination]}
                           className="mySwiper custom-swiper"
                         >
   
                           <SwiperSlide className='SwiperSlideComman_circle'> 
                               <label className= {`comman_circle   shadow-lg img_1`}>
                                   <Field type="checkbox" name="intrested" value="1"    hidden />
                                   <p className={`product_name flex-nowrap`}>OT<span className='invisible'>#</span>Table</p>
                               </label>
                              
                            </SwiperSlide>
                           <SwiperSlide 
                           className='SwiperSlideComman_circle'> 
                                 <label className= {`comman_circle shadow-lg img_2  `}>
                                         <Field type="checkbox" name="intrested" value="2"  hidden />
                                         <p className={`product_name flex-nowrap  `}>OT<span className='invisible'>#</span>Light</p>
                                 </label>
                                
                             </SwiperSlide>
                               <SwiperSlide className='SwiperSlideComman_circle'> 
                                 <label className= {`comman_circle shadow-lg img_3 `}>
                                         <Field type="checkbox" name="intrested" value="3"    hidden />
                                         <p className={`product_name flex-nowrap  `}>Anesthesia</p>
                                     </label>
                                     
                             </SwiperSlide> 
  
                               <SwiperSlide className='SwiperSlideComman_circle'> 
                               <label className= {`comman_circle shadow-lg img_4  `}>
                                   <Field type="checkbox" name="intrested" value="4"   hidden />
                                   <p className={`product_name flex-nowrap  `}>Critical<span className='invisible'>#</span>Care</p>
                               </label>
                               
                               </SwiperSlide>
                               
  
                            
                               <SwiperSlide className='SwiperSlideComman_circle'> 
                                   <label className= {`comman_circle shadow-lg img_6 `}>
                                         <Field type="checkbox" name="intrested" value="5"   hidden  />
                                         <p className={`product_name flex-nowrap  `}>Surgical </p> 
                                     </label>
                                     
                               </SwiperSlide> 
  
                               <SwiperSlide className='SwiperSlideComman_circle'> 
                                   <label className= {`comman_circle shadow-lg img_7 `}>
                                         <Field type="checkbox" name="intrested" value="6"  hidden  />
                                         <p className= {`product_name flex-nowrap `}>Others</p>
                                     </label>
                                     
                               </SwiperSlide>
                               
  
                              
                           </Swiper>
                            
                           
                               
                      </div>
                   </div>
                      
                   <div className="submit_button_wrao">
       
                   <button type="submit" className="btn shadow-sm  enquiry_submit_button"   >Submit</button>
                    
                   </div>
                   <div className='text-end text-secondary fs-6 fw-bold'>
                   {userName}
                   </div>
                  
                   </Form>) }
               
               </Formik>
               </div>
               <input type="file" onChange={handleFileChange} />
               <button onClick={()=>{extractInfoFromImage()}}>get data </button>
           
           </div>
           <div className='textEdit ' hidden={textEditer_}>
           <TextEditer/>
           </div>
           
        </>
     )
}

export default EnquiryFrom