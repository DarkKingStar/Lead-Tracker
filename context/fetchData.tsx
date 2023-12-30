import axios from "axios";
import { DASHBOARD, MASTERDATALIST } from "./BaseConfig";

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

export const fetchMasterDataList = async () => {
    try{
        const response = await axios.get(`${MASTERDATALIST}`);
        return response?.data;
    }catch(err:any){
        console.log(err?.message);
        return [];
    }
}