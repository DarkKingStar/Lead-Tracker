import {  LOGIN,  CHECK_USERNAME,  FORGOT_PASSWORD,  RESEND_OTP,  OTP_VERIFY, RESET_PASSWORD, SEARCH, PROFILEUPDATE, LEADUPDATE, PROFILEIMAGEUPDATE, ADDNEWLEAD} from './BaseConfig';
import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import FormData from 'form-data';


interface AuthProps {
  authState: {token: string| null; authenticated: boolean | null};
  userData: {userId: string| null; degid: string| null; degname: string| null;
  fullname: string| null; contactno: string| null; email:string| null; username: string| null;
   image:string| null; imageURL:string| null;
  };
  searchDataValue: [];
  sessionLoading: boolean;
  OnAddNewLead : (leadSourceId:string|undefined,prefixId:string|undefined,firstName:string,middleName:string,lastName:string,phone:string,altPhone:string,
    email:string,modeOfBusinessId:string|undefined,leadLocationId:string|undefined,businessName:string,remarks:string,enquiryDate:Date|undefined) => Promise<{error:boolean; message: string}>;
  OnLeadUpdate: (clientId:string, leadStatusId:number, date:Date|undefined,time:Date|undefined,remark:string)=> Promise<{error:boolean; message: string}>;
  OnSearchData: (name: string,phone:string,selectedValueId:number,selectedStartDate:Date|undefined,selectedEndDate:Date|undefined) => Promise<void>;
  OnProfileUpdate: (name: string, email:string,phone: string) => Promise<{error:boolean; message: string}>;
  OnProfileImageUpdate: (imageUri: string,filename: string) => Promise<{error:boolean; message: string}>;
  OnValidateUsername: (username: string) => Promise<boolean>;
  OnLogin: (username: string, password: string) => Promise<boolean>;
  OnLogout: () => Promise<void>;
  OnSendPassword: (username: string) => Promise<{error: boolean; message: string;}>
  OnCheckOTP: (k1: string, k2: string, k3: string, k4: string) => Promise<{error: boolean; message: string;}>
  OnResendOTP: () => Promise<{error: boolean; message: string;}>
  OnResetPassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<{error: boolean; message: string;}>
}


const AuthContext = createContext<AuthProps>({
  authState: { token: null, authenticated: null },
  userData: {userId:  null, degid:  null, degname: null,
    fullname:null, contactno:null, email:null, username: null, image: null, imageURL: null
    },
  searchDataValue: [],
  sessionLoading: true,
  OnAddNewLead : async(leadSourceId:string|undefined,prefixId:string|undefined,firstName:string,middleName:string,lastName:string,phone:string,altPhone:string,
    email:string,modeOfBusinessId:string|undefined,leadLocationId:string|undefined,businessName:string,remarks:string,enquiryDate:Date|undefined) => ({error:false, message: ''}),
  OnLeadUpdate: async(clientId:string, leadStatusId:number, date:Date|undefined,time:Date|undefined,remark:string)=> ({error: false, message: ''}),
  OnProfileUpdate: async(name: string, email:string,phone: string) => ({error:false, message: ''}),
  OnProfileImageUpdate: async( imageUri: string,filename: string) => ({error:false, message: ''}),
  OnSearchData: async(name: string,phone:string,selectedValueId:number,selectedStartDate:Date|undefined,selectedEndDate:Date|undefined) => {},
  OnValidateUsername: async (username: string) => false,
  OnLogin: async (username: string, password: string) => false,
  OnLogout: async () => {},
  OnSendPassword: async (username: string) =>  ({error: false,message: '',}),
  OnCheckOTP: async (k1: string, k2: string, k3: string, k4: string) => ({error: false,message: '',}),
  OnResendOTP: async () => ({error: false,message: '',}),
  OnResetPassword: async (currentPassword: string, newPassword: string, confirmPassword: string) => ({error: false,message: '',}),
});

export const useAuth = () =>{
  return useContext(AuthContext);
}


export const AuthProvider = ({children}: any) =>{
  const  [authState,setAuthState] = useState<{token: string | null;authenticated: boolean | null;}>({token: null,authenticated: null});
  const [userData, setUserData] = useState<{userId: string| null; degid: string| null; degname: string| null;fullname: string| null; contactno: string| null; email:string| null; username: string| null;image:string| null; imageURL:string| null;}>({userId:  null, degid:  null, degname: null,fullname:null, contactno:null, email:null, username: null, image: null, imageURL: null});
  const [searchDataValue,setSearchDataValue] = useState<[]>([]);
  const [sessionLoading,setSessionLoading] = useState<boolean>(true);

  // check whether the session persisted in memory and load the token and data from SecureStore
  useEffect(() => {
    const getSecureStoreValue = async () : Promise<void> => {
      const sessionUserData = await fetchSessionJsonData('userData');
      const sessionAuthState = await fetchSessionJsonData('authState');
      setAuthState(sessionAuthState);
      setUserData(sessionUserData);
      // Set loading to false once data is fetched
      setSessionLoading(false);
    };
    getSecureStoreValue();
  }, []);

  const fetchSessionJsonData = async (key: string) : Promise<any> => {
    try{
    const jsonStringData = await SecureStore.getItemAsync(key) 
    return JSON.parse(jsonStringData || '{}');
    }catch(err:any){
      console.log(err);
    }
  };
  const setSessionJsonData = async (key: string, value: Record<string, any>) : Promise<void> => {
   try{
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }catch(err:any){
    console.log(err);
  }
  };

  // Set up for fetching data from API using Axios POST Method
  const fetchAPIPostData = async (postURL: string, formData: FormData) : Promise<any> => {
    try {
      const response = await axios.post(postURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log(response.data);
      return response.data;

    } catch (error: any) {
      console.warn('Error:', error.message);
      return { error: true, message: error.message };
    }
  };


  const  ValidateUsername = async (username: string): Promise<boolean> => {
    const formData: FormData = new FormData();
    formData.append('txt_username', username);
    const fetchData = await fetchAPIPostData(CHECK_USERNAME, formData);
    return fetchData?.username === username ? true : false;
  };
  const Login = async (username: string, password: string): Promise<boolean> => {
        const formData: FormData = new FormData();
        formData.append('txt_username', username);
        formData.append('txt_password', password);
        const fetchData = await fetchAPIPostData(LOGIN, formData);
        if (!fetchData.error) {
          const userDataTemp = {userId: fetchData?.user_details_id,
            degid: fetchData?.designation_id,
            degname: fetchData?.designation,
            fullname: fetchData?.name,
            contactno: fetchData?.contact_no,
            email: fetchData?.email,
            username: fetchData?.user_name,
            image: fetchData?.image,
            imageURL: fetchData?.image_path};
          setUserData(userDataTemp);
          await setSessionJsonData('userData', userDataTemp);
          setAuthState((prev)=>({...prev,token:fetchData?.token}))
          await setSessionJsonData('authState', {...authState,token:fetchData?.token});
          return true;
        } else {
          return false;
        }
  };
  const Logout = async (): Promise<void> => {
    setAuthState({token: null, authenticated: null});
    setUserData({userId:  null, degid:  null, degname: null,
      fullname:null, contactno:null, email:null, username: null, image: null, imageURL: null});
    await SecureStore.deleteItemAsync('authState');
    await SecureStore.deleteItemAsync('userData');
  };
  const SendPassword = async (username: string): Promise<{error: boolean;message: string;}> => {
    const formData: FormData = new FormData();
    formData.append('txt_username', username);
    const fetchData = await fetchAPIPostData(FORGOT_PASSWORD, formData);
    return {error:  fetchData?.error || false , message : fetchData?.message || ''};
  };
  const CheckOTP = async (k1: string, k2: string, k3: string, k4: string): Promise<{error: boolean;message: string;}> => {
    const formData: FormData = new FormData();
    formData.append('txt_otp1', k1);
    formData.append('txt_otp2', k2);
    formData.append('txt_otp3', k3);
    formData.append('txt_otp4', k4);
    formData.append('txt_token', authState.token || '');
    const fetchData = await fetchAPIPostData(OTP_VERIFY, formData);
    if (!fetchData?.error) {
      setAuthState((prev)=>({...prev, authenticated:true}));
      await setSessionJsonData('authState', {...authState, authenticated:true});
    }
    return {error:  fetchData?.error || false , message : fetchData?.message || ''};
  };
  const ResendOTP = async (): Promise<{error: boolean;message: string;}>  => {
    const formData: FormData = new FormData();
    formData.append('txt_token', authState.token || '');
    const fetchData = await fetchAPIPostData(RESEND_OTP, formData);
    return {error:  fetchData?.error || false , message : fetchData?.message || ''};
  };
  const ResetPassword = async(currentPassword: string, newPassword: string, confirmPassword: string): Promise<{error: boolean;message: string;}>  =>{
    const formData = new FormData();
    formData.append('txt_current_password', currentPassword);
    formData.append("txt_new_password", newPassword);
    formData.append("txt_confirm_password", confirmPassword);
    formData.append('txt_user_details_id', userData?.userId || '');
    formData.append('txt_token', authState?.token || '');
    const fetchData = await fetchAPIPostData(RESET_PASSWORD, formData);
    return {error:  fetchData?.error || false , message : fetchData?.message || 'Unable to Change Password'};
  }
  
  const searchData = async(name: string,phone:string,selectedValueId:number,selectedStartDate:Date|undefined,selectedEndDate:Date|undefined):Promise<void> =>{
    const formData: FormData = new FormData();
    formData.append('txt_name', name);
    formData.append('txt_contact_no', phone);
    if(selectedValueId)
    formData.append('ddl_lead_status_id', selectedValueId.toString());
    selectedStartDate?formData.append('txt_from_date', selectedStartDate.toLocaleDateString()):formData.append('txt_from_date', '');
    selectedEndDate?formData.append('txt_to_date', selectedEndDate.toLocaleDateString()):formData.append('txt_to_date', '');
    formData.append('txt_user_details_id', userData?.userId || '');
    const fetchData = await fetchAPIPostData(SEARCH, formData);
    setSearchDataValue(fetchData);
  }
  const profileUpdate = async(name: string,email:string,phone:string) =>{
    const formData: FormData = new FormData();
    formData.append('txt_name', name);
    formData.append('txt_contact_no', phone);
    formData.append('txt_email', email);
    formData.append('txt_user_details_id', userData?.userId || '');
    formData.append('txt_token', authState?.token || '');
    const fetchData = await fetchAPIPostData(PROFILEUPDATE, formData);
    if(!fetchData.error){
      const userDataUpdate = {
        fullname: name,
        contactno: phone,
        email: email,
      }
      setUserData((prev)=>({...prev,...userDataUpdate}))
      await setSessionJsonData('userData', {...userData,...userDataUpdate});
    }
    return {error:  fetchData?.error || false , message : fetchData?.message || 'Unable to Update Your details'};
  }
  const leadUpdate = async(clientId:string, leadStatusId:number, date:Date|undefined,time:Date|undefined,remark:string)=>{
    const formData: FormData = new FormData();
    formData.append('txt_client_details_id', clientId);
    formData.append('txt_lead_status_id', leadStatusId?.toString());
    date?formData.append('txt_lead_status_date', date?.toLocaleDateString()):formData.append('txt_lead_status_date', '');
    time?formData.append('txt_lead_status_time', time?.toLocaleTimeString()):formData.append('txt_lead_status_time', '');
    formData.append('txt_remarks', remark);
    formData.append('txt_user_details_id', userData.userId || '' );
    formData.append('txt_name', userData.fullname || '');
    const fetchData = await fetchAPIPostData(LEADUPDATE, formData);
    return {error:  fetchData?.error || false , message : fetchData?.message || 'Unable to Update Your Lead'};
  }

  const ProfileImageUpdate = async( imageUri: string,filename: string) =>{
    const formData: FormData = new FormData();
    formData.append('txt_user_details_id', userData.userId || '' );
    formData.append('txt_token', authState?.token || '');
    let filenametemp;
    let file: File;
    if(userData?.username && userData?.userId){
      filenametemp = userData?.username + userData?.userId + "."+filename
    }
    // console.log('blob:', blob);
    // console.log('filename:', filenametemp);
    if(filenametemp){
      const response = await fetch(imageUri);
      const blob = await response.blob();
      file = new File([blob], filenametemp, { type: 'image/png' || 'image/jpg' || 'image/jpeg' });
      // console.log('file:', JSON.stringify(file,null,3));
      formData.append("txt_image", file, filenametemp);
      setUserData((prev)=>({...prev,imageURL: imageUri}))
    }
    // console.log(formData);
    
    const fetchData = await fetchAPIPostData(PROFILEIMAGEUPDATE, formData);
    return {error:  fetchData?.error || false , message : fetchData?.message || 'Unable to Update Your Profile Image'};
  }

  const AddNewLead =async (leadSourceId:string|undefined,prefixId:string|undefined,firstName:string,middleName:string,lastName:string,phone:string,altPhone:string,
    email:string,modeOfBusinessId:string|undefined,leadLocationId:string|undefined,businessName:string,remarks:string,enquiryDate:Date|undefined) => {
    const formData: FormData = new FormData();
    formData.append("ddl_lead_source_id", leadSourceId||'');
    formData.append("ddl_name_prefix_id", prefixId||'');
    formData.append("txt_f_name", firstName);
    formData.append("txt_m_name", middleName);
    formData.append("txt_l_name", lastName);
    formData.append("txt_contact_no", phone);
    formData.append("txt_contact_no2", altPhone);
    formData.append("txt_email", email);
    formData.append("ddl_mode_of_business_id", modeOfBusinessId||'');
    formData.append("ddl_lead_location_id", leadLocationId||'');
    formData.append("txt_business_name", businessName);
    formData.append("txt_remarks", remarks);
    formData.append("txt_enq_date", enquiryDate?.toLocaleDateString()||'');
    formData.append("txt_user_details_id", userData?.userId || '');
    const fetchData = await fetchAPIPostData(ADDNEWLEAD, formData);
    return {error:  fetchData?.error || false , message : fetchData?.message || 'Unable to Add new Lead'};
  }
  const value={
    authState,
    userData,
    searchDataValue,
    sessionLoading,
    OnAddNewLead:AddNewLead,
    OnLeadUpdate: leadUpdate,
    OnProfileUpdate:profileUpdate,
    OnProfileImageUpdate:ProfileImageUpdate,
    OnSearchData: searchData,
    OnLogin: Login,
    OnValidateUsername: ValidateUsername,
    OnLogout: Logout,
    OnSendPassword: SendPassword,
    OnCheckOTP : CheckOTP,
    OnResendOTP : ResendOTP,
    OnResetPassword: ResetPassword
  }


  return <AuthContext.Provider 
  value={value}>
    {children}
  </AuthContext.Provider>
}