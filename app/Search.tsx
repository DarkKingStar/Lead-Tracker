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
      const formatDate = (date : Date| undefined) => {
        if(date)
        return date.toLocaleDateString('en-GB');
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
            <View>
              <TextInput 
              style={styles.textinput}
              placeholder='Name'
              placeholderTextColor="#000"
              value={name}
              onChangeText={(text)=>setName(text)}
              />
            </View>
            <View>
              <TextInput 
              style={styles.textinput}
              placeholder='Phone No.'
              placeholderTextColor="#000"
              value={phone}
              onChangeText={(text)=>setPhone(text)}
              />
            </View>
            <View style={styles.select}>
                  <Picker

                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemIndex !== 0) {
                      setSelectedValue(itemValue);
                      setSelectedValueId(itemIndex);
                    }
                  }}
                  >
                  <Picker.Item label="Select" value={''} enabled={false} />
                  {options.map((option: string | undefined, index: React.Key | null | undefined) => (
                    <Picker.Item key={index} label={option} value={option?.toLowerCase()} />
                  ))}
                  </Picker>
            </View>
            <View style={styles.row}>        
                <View style={styles.dateInputholder}>
                    <DateInputField mode={"date"} value={selectedStartDate} onChange={handleStartDateChange}>
                        <Text style={styles.dateInput}>{startDateFlag?formatDate(selectedStartDate):"Start Date"}</Text>
                    </DateInputField>
                    </View>
                    <View style={[styles.dateInputholder]}>
                      <DateInputField mode={"date"} value={selectedEndDate} onChange={handleEndDateChange} >
                        <Text style={styles.dateInput}>{endDateFlag?formatDate(selectedEndDate):"End Date"}</Text>
                      </DateInputField>
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
        padding: 16,
        backgroundColor: 'white',
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