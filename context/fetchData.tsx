import axios from "axios";
import { DASHBOARD, LEAD_LIST, MASTERDATALIST } from "./BaseConfig";

export const fetchMenuData = async(userId:string|null,token:string|null)=>{
    try{
        if(userId && token){
            const response = await axios.get(`${DASHBOARD}/${userId}/${token}`); //${userId}/${token}
            return response?.data?.dashboard;
        }
        else{
            return [];
        }
    }catch(err:any){
        console.log(err?.message);
        return [];
    }
}

export const fetchLeadList = async(userId: string| string[], leadId: string | string[], pagination:number)=>{
    try{
        const response = await axios.get(`${LEAD_LIST}/${userId}/${leadId}/${pagination}`);
        let jsonData = response?.data;
        return jsonData
    }catch(err:any){
        console.error(err.message);
        return [];
    }
} 

export const fetchMasterDataList = async () => {
    try{
        const response = await axios.get(`${MASTERDATALIST}`);
        return response?.data;
    }catch(err:any){
        console.log(err?.message);
        return [];
    }
}