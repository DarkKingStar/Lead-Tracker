import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainPageItem from './ContainPageItem'

import { AntDesign } from '@expo/vector-icons';
import { divStyles } from '../styles/DivElement';
import { ScaledSheet } from 'react-native-size-matters';
import { fetchLeadList } from '../context/fetchData';
import { useFocusEffect } from 'expo-router';

interface ContainPageProps{
  leadId: string | string[];
  userId: string | string[];
}


const ContainPage: React.FC<ContainPageProps>  = ({leadId, userId}) => {
  const [leadList,setLeadList] = useState<any>([]);
  const [pagination,setPagination] = useState<number>(0);
  const [hasPageNext,setHasPageNext] = useState<boolean>(true);
  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ['leadList', userId, leadId, pagination],
    queryFn: () => fetchLeadList(userId, leadId, pagination),
    enabled: false,// Disable initial fetch
  });
  useFocusEffect(()=>{
    refetch();
  })
  useEffect(()=>{
    if(hasPageNext){
      refetch();
    }
  },[pagination]);

  useEffect(()=>{
    if(data){
      setLeadList((prevArray: any) => [...prevArray, ...data?.['client-list']]);
      if(data?.['client-list']?.length==0){
        setHasPageNext(false);
      }
    }
  },[data])

  if(isPending && pagination==0){
    return(<ActivityIndicator size="large" color="#183399" />)    
  }
  if(isError){
    return(<View style={divStyles.errordiv}>
    <AntDesign name="frown" size={54} color="black" />
    <Text style={styles.title}>Oops! no record found</Text>
    <Text>Go to home screen!</Text>
    </View>);
  }else{
  return (
    <>
      <ContainPageItem leadlist={leadList} setPagination={setPagination} hasPageNext={hasPageNext}/>
    </>
  )}
}

export default ContainPage

const styles = ScaledSheet.create({
  title: {
    fontSize: '20@s',
    fontFamily: 'RubikBold',
  },
  
})
