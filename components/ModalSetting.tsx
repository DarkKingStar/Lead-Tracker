import { StyleSheet, Text,Pressable, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';

import {Picker} from '@react-native-picker/picker';
import DateInputField from './DateInputField';
import { router } from 'expo-router';
import { ModalAnimation } from './ModalAnimation';
import { timeStamp } from 'console';

interface ModalSettingProps{
    setIsVisible:React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalSetting: React.FC<ModalSettingProps> = ({setIsVisible}) => {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState<Date>();
    const [dateFlag,setDateFlag] = useState<boolean>(false);
    const [timeFlag,setTimeFlag] = useState<boolean>(false);
    const [feedback,setFeedback] = useState<string>("");
  
    const [selectedValue, setSelectedValue] = useState('');
    const options = ['Option 1', 'Option 2', 'Option 3'];

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
                    <DateInputField mode={"date"} value={selectedDate} onChange={handleDateChange}>
                        <Text style={styles.dateInput}>{dateFlag?formatDate(selectedDate):"Date"}</Text>
                    </DateInputField>
                    </View>
                    <View style={[styles.dateInputholder]}>
                      <DateInputField mode={"time"} value={selectedTime} onChange={handleTimeChange} >
                        <Text style={styles.dateInput}>{timeFlag?formatTime(selectedTime):"Time"}</Text>
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
                <TextInput
                    style={styles.inputtext}
                    multiline={true}
                    placeholder="Write a Feedback"
                    value={feedback}
                    onChangeText={(inputText) => setFeedback(inputText)}
                />
                <Pressable onPress={()=>{}} style={[styles.SubmitBtn,{backgroundColor: '#0466AC'}]}>
                  <Text style={styles.btnText}>SUBMIT</Text>
                </Pressable>
            </View>
      </ModalAnimation>
      </View>
  )
}

export default ModalSetting

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
        marginVertical: 8,
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