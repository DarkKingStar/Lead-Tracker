import { StyleSheet, Text,Pressable, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';

import {Picker} from '@react-native-picker/picker';
import DateInputField from '../components/DateInputField';
import { router } from 'expo-router';
import { ModalAnimation } from '../components/ModalAnimation';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchMenuData } from '../context/fetchData';
import SelectInputField from '../components/SelectInputField';
import TextInputField from '../components/TextInputField';


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
    router.back();
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
            <Pressable style={{backgroundColor: '#e9e9e9', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingHorizontal: 15}} 
              onPress={()=>{}}>
            <View style={[styles.row,{marginVertical: 20, marginBottom:0, justifyContent:'space-between'}]}>
            <Text style={styles.formHeading}>Search Date-wise Leads</Text>
            <Pressable onPress={()=> router.back()} style={styles.closeBtnHolder}>
              <Feather name="x-circle" size={20} color="black" />
            </Pressable>
            </View>
            <View style={styles.separator} />
            <TextInputField
              placeholder='Name'
              FocusColor={ 'transparent'}
              NotFocusColor={ 'transparent'}
              LeftIconColor={ "#0000fe"}
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
              <Pressable onPress={()=>handleSubmit()} style={[styles.SubmitBtn,{backgroundColor: '#0466AC'}]}>
                  <Text style={styles.btnText}>SUBMIT</Text>
              </Pressable>
            </Pressable>
          </ModalAnimation>
      </Pressable>
   
  )
}

export default Search

const styles = StyleSheet.create({
    select: {
        fontSize: 11,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 8,
    },
    textinput:{
      backgroundColor: 'white',
      fontSize: 16,
      borderRadius: 5,
      marginBottom: 8,
      paddingVertical: 10,
      paddingHorizontal:16,
      
    },
    formHeading: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'left',
    },
    closeBtnHolder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        gap:8,
        marginBottom:8,
        display: 'flex',
        flexDirection: 'row',
    },
    dateInputholder: { 
        flex: 1,
        borderRadius: 5,
    },
    dateInput: {
        fontSize: 16,
    },    
    SubmitBtn:{
        padding: 14,
        width: '100%',
        borderRadius: 5,
        alignSelf: 'center',
        marginVertical: 12,
    },
  btnText:{
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center',
    },
    separator: {
      marginVertical: 15,
      height: 1,
      width: '90%',
      alignSelf: 'center',
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
})