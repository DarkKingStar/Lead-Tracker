import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainPageItem from './ContainPageItem'
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { LEAD_LIST } from '../context/BaseConfig';
interface ContainPageProps{
  leadId: string | string[];
  userId: string | string[];
}

const ContainPage: React.FC<ContainPageProps>  = ({leadId, userId}) => {
  const [leadlist,setLeadList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(()=>{
    const fetchLeadList = async()=>{
      try{
        const response = await axios.get(`${LEAD_LIST}/${userId}/${leadId}`);
        setLeadList(response?.data);
        if(response?.status){
          setLoading(false);
        }
      }catch(err:any){
        console.log(err.message);
      }
    }
    fetchLeadList();
  },[leadId,userId]);
  return (
    <ContainPageItem leadlist={leadlist} loading={loading} />
  )
}

export default ContainPage

const styles = StyleSheet.create({})