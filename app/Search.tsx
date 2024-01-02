import { StyleSheet, Text,Pressable, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';

import DateInputField from '../components/DateInputField';
import { router } from 'expo-router';
import { ModalAnimation } from '../components/ModalAnimation';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchMenuData } from '../context/fetchData';
import SelectInputField from '../components/SelectInputField';
import TextInputField from '../components/TextInputField';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { textStyles } from '../styles/TextElement';
import { divStyles } from '../styles/DivElement';


const Search = () => {

  const [name,setName] = useState<string>("");
  const [phone,setPhone] = useState<string>("");
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const [startDateFlag,setStartDateFlag] = useState<boolean>(false);
  const [endDateFlag,setEndDateFlag] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedValueId, setSelectedValueId] = useState<number>(0);

  const {userData,authState,OnSearchData}=useAuth();

  const { data } = useQuery({ 
    queryKey: ['dashboard'],
    queryFn: ()=>fetchMenuData(userData.userId,authState.token),
    enabled: false, // Disable initial fetch
  })
  const options = data.map((item: { lead_status: any; }) => item.lead_status);

  const handleSubmit = async() =>{
    await OnSearchData(name,phone,selectedValueId,selectedStartDate,selectedEndDate);
    router.push('/(tabs)/lead/search');
  }

  const handleStartDateChange = (date: Date) => {
      setStartDateFlag(true);
      setSelectedStartDate(date);
    };
  
  const handleEndDateChange = (date : Date) => {
    setEndDateFlag(true);
    setSelectedEndDate(date);
  };
  return (
        <Pressable style={{ flex: 1, backgroundColor: '#00000066', justifyContent: 'flex-end'}} onPress={()=>router.back()}>
            <ModalAnimation>
            <Pressable style={styles.container} 
              onPress={()=>{}}>
            <View style={[styles.row,{marginVertical: scale(10), marginBottom:0, justifyContent:'space-between'}]}>
            <Text style={styles.formHeading}>Search Leads</Text>
            <Pressable onPress={()=> router.back()} style={styles.closeBtnHolder}>
              <Feather name="x-circle" size={20} color="black" />
            </Pressable>
            </View>
            <View style={styles.separator} />
            <TextInputField
              placeholder='Name'
              FocusColor={ 'transparent'}
              NotFocusColor={ 'transparent'}
              LeftIconColor={ "#3081D0"}
              bgcolor='#ffffff'
              RightIconColor={ "transparent"} 
              textValue={name}
              setTextValue={setName}
              LeftIconName='user'
              RightIconName='check'
              />
              <TextInputField
              placeholder='Phone no.'
              FocusColor={ 'transparent'}
              NotFocusColor={ 'transparent'}
              LeftIconColor={ "#f44336"}
              bgcolor='#ffffff'
              RightIconColor={ "transparent"} 
              textValue={phone}
              setTextValue={setPhone}
              LeftIconName='phone'
              RightIconName='check'
              />
            <SelectInputField
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    setSelectedValueId={setSelectedValueId} 
                    options={options}
                    placeholder='Select Lead Status'
                    bordercolor={'transparent'}
                    bgcolor='#ffffff'
                    LeftIconName='clipboard'
                    LeftIconColor={ "#ffc000"}
                    />
            <View style={styles.row}>        
                <View style={styles.dateInputholder}>
                    <DateInputField 
                    mode={"date"} 
                    value={selectedStartDate} 
                    placeholder="Start Date"
                    bordercolor='transparent'
                    bgcolor='#ffffff'
                    dateflag={startDateFlag} 
                    onChange={handleStartDateChange}/>
                    </View>
                <View style={styles.dateInputholder}>
                    <DateInputField 
                    mode={"date"} 
                    value={selectedEndDate} 
                    placeholder="End Date"
                    bordercolor='transparent'
                    bgcolor='#ffffff'
                    dateflag={endDateFlag} 
                    onChange={handleEndDateChange}/>
                </View>
            </View>
              <Pressable onPress={()=>handleSubmit()} style={[divStyles.submitButton,{marginTop:scale(15)}]}>
                  <Text style={textStyles.buttonText}>SEARCH</Text>
              </Pressable>
            </Pressable>
          </ModalAnimation>
      </Pressable>
   
  )
}

export default Search

const styles = ScaledSheet.create({
    container:{
      backgroundColor: '#e9e9e9',
      borderTopLeftRadius: '15@s',
      borderTopRightRadius: '15@s',
      paddingHorizontal: '15@s'
    },
    formHeading: {
        fontSize: '18@s',
        fontWeight: '800',
        textAlign: 'left',
    },
    closeBtnHolder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        gap:'8@s',
        display: 'flex',
        flexDirection: 'row',
    },
    dateInputholder: { 
        flex: 1,
        borderRadius: '5@s',
    },     
    separator: {
      marginVertical: '8@s',
      height: '1@s',
      width: '90%',
      alignSelf: 'center',
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
})