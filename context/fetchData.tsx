import axios from "axios";
import { DASHBOARD } from "./BaseConfig";

export const fetchMenuData = async(userId:string|null,token:string|null)=>{
    if(userId && token){
        const response = await axios.get(`${DASHBOARD}/${userId}/${token}`); //${userId}/${token}
        return response?.data?.dashboard;
    }
    else{
        return [];
    }
}
