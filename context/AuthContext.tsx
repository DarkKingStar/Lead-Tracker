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


export const AuthContext = createContext<AuthProps>({
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


