import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainPageItem from './ContainPageItem'
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { LEAD_LIST } from '../context/BaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { divStyles } from '../styles/DivElement';
import { ScaledSheet } from 'react-native-size-matters';

interface ContainPageProps{
  leadId: string | string[];
  userId: string | string[];
}

const ContainPage: React.FC<ContainPageProps>  = ({leadId, userId}) => {
  const [leadlist,setLeadList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination,setPagination] = useState<number>(0);
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
  },[pagination]);
 
  if(isError){
    return(<View style={divStyles.errordiv}>
    <AntDesign name="frown" size={54} color="black" />
    <Text style={styles.title}>Oops! no record found</Text>
    <Text>Go to home screen!</Text>
</View>);
  }
  return (
    <>
      <ContainPageItem leadlist={leadlist} loading={loading} setPagination={setPagination} hasPageNext={hasPageNext}/>
    </>
  )
}

export default ContainPage

const styles = ScaledSheet.create({
  title: {
    fontSize: '20@s',
    fontWeight: 'bold',
  },
  
})