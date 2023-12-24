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
  const [pagination,setPagination] = useState<number>(1);
  const [hasPageNext, setHasPageNext] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(()=>{
    setPagination(0);
  },[leadId, userId])
  useEffect(()=>{
    const fetchLeadList = async()=>{
      try{
        const response = await axios.get(`${LEAD_LIST}/${userId}/${leadId}/${pagination}`);
        let jsonData = response?.data;
        if(jsonData?.['client-list']?.length==0){
          setHasPageNext(false);
          setLoading(false);
        }
        else{
          setLeadList((prevArray: any) => [...prevArray, ...jsonData?.['client-list']]);
          if(response?.status){
            setLoading(false);
          }
        }
      }catch(err:any){
        console.error(err.message);
        setIsError(true);
      }
    }
    fetchLeadList();
  },[pagination,leadId,userId]);
  return (
    <ContainPageItem leadlist={leadlist} loading={loading} setPagination={setPagination} hasPageNext={hasPageNext}/>
  )
}

export default ContainPage

const styles = StyleSheet.create({})