import { StyleSheet, Text,Pressable, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';

import {Picker} from '@react-native-picker/picker';
import DateInputField from './DateInputField';
import { router } from 'expo-router';
import { ModalAnimation } from './ModalAnimation';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchMenuData } from '../context/fetchData';
import SelectInputField from './SelectInputField';

interface ModalSettingProps{
    setIsVisible:React.Dispatch<React.SetStateAction<boolean>>;
    selectedClientId: string,

}

const ModalSetting: React.FC<ModalSettingProps> = ({setIsVisible, selectedClientId}) => {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState<Date>();
    const [dateFlag,setDateFlag] = useState<boolean>(false);
    const [timeFlag,setTimeFlag] = useState<boolean>(false);
    const [feedback,setFeedback] = useState<string>("");
  
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValueId, setSelectedValueId] = useState<number>(1);

    const {userData,authState, OnLeadUpdate}=useAuth();

    const { data } = useQuery({ 
      queryKey: ['dashboard'],
      queryFn: ()=>fetchMenuData(userData.userId,authState.token),
      enabled: false, // Disable initial fetch
    })
    const options = data.map((item: { lead_status: any; }) => item.lead_status);

    const handleDateChange = (date: Date) => {
        setDateFlag(true);
        setSelectedDate(date);
      };
    
      const handleTimeChange = (date: Date) => {
        setTimeFlag(true);
        setSelectedTime(date);
      };
      const formatDate = (date : Date | undefined) => {
        if(date)
        return date.toLocaleDateString('en-GB');
      };
      const formatTime = (date: Date | undefined) =>{
        if(date)
        return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      }
  const handleSubmit = async() =>{
    const flagData = await OnLeadUpdate(selectedClientId, selectedValueId, selectedDate, selectedTime, feedback);

    (flagData.error == false)?Alert.alert("Lead Status Update Successful",`${flagData?.message}`,[{ text: 'OK', onPress: () => setIsVisible(false)}]):Alert.alert('Lead Status Update Unsuccessful',`${flagData?.message}`,);
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#00000066', justifyContent: 'flex-end'}}>
          <ModalAnimation>
            <View style={{backgroundColor: '#e9e9e9', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingHorizontal: 15}}>
            <View style={[styles.row,{marginVertical: 20, marginBottom:0, justifyContent:'space-between'}]}>
            <Text style={styles.formHeading}>Conversation Update</Text>
            <Pressable onPress={()=> setIsVisible(false)} style={styles.closeBtnHolder}>
              <Feather name="x-circle" size={20} color="black" />
            </Pressable>
            </View>
            <View style={styles.separator} />
            <View style={styles.row}>        
                <View style={styles.dateInputholder}>
                    <DateInputField 
                    mode={"date"} 
                    value={selectedDate} 
                    placeholder="Date"
                    bordercolor='transparent'
                    bgcolor='#ffffff'
                    dateflag={dateFlag} 
                    onChange={handleDateChange}/>
                    </View>
                    <View style={styles.dateInputholder}>
                      <DateInputField 
                      mode={"time"} 
                      value={selectedTime}
                      placeholder="Time"
                      bordercolor='transparent'
                      bgcolor='#ffffff'
                      dateflag={timeFlag} 
                      onChange={handleTimeChange}/>
                    </View>
                </View>
              
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
                <TextInput
                    style={styles.inputtext}
                    multiline={true}
                    placeholder="Write a Feedback"
                    value={feedback}
                    onChangeText={(inputText) => setFeedback(inputText)}
                />
                <Pressable onPress={()=>handleSubmit()} style={[styles.SubmitBtn,{backgroundColor: '#0466AC'}]}>
                  <Text style={styles.btnText}>SUBMIT</Text>
                </Pressable>
            </View>
      </ModalAnimation>
      </View>
  )
}

export default ModalSetting

const styles = StyleSheet.create({
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
        marginBottom:8,
    },
    btnText:{
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center',
    },
    inputtext:{
        fontSize:16,
        padding: 16,
        backgroundColor: 'white',
        marginBottom:16,
        textAlignVertical: 'top',
        borderRadius: 5,
      },
      separator: {
        marginVertical: 15,
        height: 1,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
      },
})