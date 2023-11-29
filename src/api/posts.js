import axios from "axios"; 
import {BASE_URL} from '../ApiDomain'

export default axios.create({
    baseURL :BASE_URL
})