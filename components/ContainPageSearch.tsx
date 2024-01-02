import {  StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import ContainPageItem from './ContainPageItem'
import { useAuth } from '../context/AuthContext';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ScaledSheet } from 'react-native-size-matters';

const ContainPageSearch  = () => {
  const [pagination,setPagination] = useState<number>(0);
  const {searchDataValue} = useAuth();  
  return (
    <>{searchDataValue.length>0?
      <ContainPageItem leadlist={searchDataValue} setPagination={setPagination} hasPageNext={false}/>:
      <View style={{flex:1, justifyContent: 'center',alignSelf:'center', alignItems: 'center'}}>
        <AntDesign name="frown" size={54} color="black" />
        <Text style={styles.title}>Oops! no record found</Text>
        <Text>Go to home screen!</Text>
      </View>
    }</>
  )
}

export default ContainPageSearch

const styles = ScaledSheet.create({
  title: {
    fontSize: '20@s',
    fontWeight: 'bold',
},
})