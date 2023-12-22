import {  LOGIN,  CHECK_USERNAME,  FORGOT_PASSWORD,  RESEND_OTP,  OTP_VERIFY, RESET_PASSWORD} from './BaseConfig';
import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


interface AuthProps {
  authState: {token: string| null; authenticated: boolean | null};
  userData: {userId: string| null; degid: string| null; degname: string| null;
  fullname: string| null; contactno: string| null; email:string| null; username: string| null;
   image:string| null; imageURL:string| null;
  };
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
  const [userData, setUserData] = useState<{userId: string| null; degid: string| null; degname: string| null;
    fullname: string| null; contactno: string| null; email:string| null; username: string| null;
     image:string| null; imageURL:string| null;}>({userId:  null, degid:  null, degname: null,
    fullname:null, contactno:null, email:null, username: null, image: null, imageURL: null
    });
  
  // check whether the session persisted in memory and load the token and data from SecureStore
  useEffect(() => {
    const getSecureStoreValue = async () : Promise<void> => {
      const sessionUserData = await fetchSessionJsonData('userData');
      const sessionAuthState = await fetchSessionJsonData('authState');
      setAuthState(sessionAuthState);
      setUserData(sessionUserData);
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
      console.error('Error:', error.message);
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
          setAuthState((prev)=>({...prev,token:fetchData?.token}))
          await setSessionJsonData('userData', userDataTemp);
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
  
  const value={
    authState,
    userData,
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