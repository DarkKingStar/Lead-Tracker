import { StyleSheet, Text,Pressable, View } from 'react-native';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';

import {Picker} from '@react-native-picker/picker';
import DateInputField from '../components/DateInputField';
import { router } from 'expo-router';


const Search = () => {
    const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
    const [startDateFlag,setStartDateFlag] = useState<boolean>(false);
    const [endDateFlag,setEndDateFlag] = useState<boolean>(false);
  
    const [selectedValue, setSelectedValue] = useState('');
    const options = ['Option 1', 'Option 2', 'Option 3'];

    const handleStartDateChange = (date: Date) => {
        setStartDateFlag(true);
        setSelectedStartDate(date);
      };
    
      const handleEndDateChange = (date : Date) => {
        setEndDateFlag(true);
        setSelectedEndDate(date);
      };
      const formatDate = (date : Date) => {
        return date.toLocaleDateString('en-GB');
      };
  return (
        <View style={{ flex: 1, backgroundColor: '#00000066', justifyContent: 'flex-end'}}>
            <View style={{backgroundColor: '#cecece', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingHorizontal: 15}}>
            <View style={[styles.row,{margin: 10,marginBottom: 30, justifyContent:'space-between'}]}>
            <Text style={styles.formHeading}>Search Date-wise Leads</Text>
            <Pressable onPress={()=> router.back()} style={styles.closeBtnHolder}>
              <Feather name="x-circle" size={20} color="black" />
            </Pressable>
            </View>
            <View style={styles.row}>        
                <View style={styles.dateInputholder}>
                    <DateInputField value={selectedStartDate} onChange={handleStartDateChange}>
                        <Text style={styles.dateInput}>{startDateFlag?formatDate(selectedStartDate):"Start Date"}</Text>
                    </DateInputField>
                    </View>
                    <View style={[styles.dateInputholder]}>
                      <DateInputField value={selectedEndDate} onChange={handleEndDateChange} >
                        <Text style={styles.dateInput}>{endDateFlag?formatDate(selectedEndDate):"End Date"}</Text>
                      </DateInputField>
                    </View>
                </View>
                <View style={styles.select}>
                  <Picker

                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemIndex !== 0) {
                      setSelectedValue(itemValue);
                    }
                  }}
                  >
                  <Picker.Item label="Select" value={''} enabled={false} />
                  {options.map((option, index) => (
                    <Picker.Item key={index} label={option} value={option.toLowerCase()} />
                  ))}
                  </Picker>
                </View>
                <Pressable onPress={()=>{}} style={[styles.SubmitBtn,{backgroundColor: '#0466AC'}]}>
                  <Text style={styles.btnText}>SUBMIT</Text>
                </Pressable>
            </View>
      </View>
   
  )
}

export default Search

const styles = StyleSheet.create({
    select: {
        fontSize: 11,
        backgroundColor: 'white',
        borderRadius: 5,
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
})