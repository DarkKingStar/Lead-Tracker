import {  StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import ContainPageItem from './ContainPageItem'
import { useAuth } from '../context/AuthContext';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ContainPageSearch  = () => {
  const [pagination,setPagination] = useState<number>(1);
  const {searchDataValue} = useAuth();  
  return (
    <>{searchDataValue.length>0?
      <ContainPageItem leadlist={searchDataValue} loading={false} setPagination={setPagination} hasPageNext={false}/>:
      <View style={{flex:1, justifyContent: 'center',alignSelf:'center', alignItems: 'center'}}>
        <AntDesign name="frown" size={54} color="black" />
        <Text style={styles.title}>Oops! no record found</Text>
        <Text>Go to home screen!</Text>
      </View>
    }</>
  )
}

export default ContainPageSearch

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
},
})