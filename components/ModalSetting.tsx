import { Text,Pressable, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import DateInputField from './DateInputField';
import { ModalAnimation } from './ModalAnimation';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchMenuData } from '../context/fetchData';
import SelectInputField from './SelectInputField';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { textStyles } from '../styles/TextElement';
import { divStyles } from '../styles/DivElement';

interface ModalSettingProps{
    setIsVisible:React.Dispatch<React.SetStateAction<boolean>>;
    selectedClientId: string,

}

const ModalSetting: React.FC<ModalSettingProps> = ({setIsVisible, selectedClientId}) => {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [dateFlag,setDateFlag] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState<Date>();
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
     
  const handleSubmit = async() =>{
    const flagData = await OnLeadUpdate(selectedClientId, selectedValueId, selectedDate, selectedTime, feedback);

    (flagData.error == false)?Alert.alert("Lead Status Update Successful",`${flagData?.message}`,[{ text: 'OK', onPress: () => setIsVisible(false)}]):Alert.alert('Lead Status Update Unsuccessful',`${flagData?.message}`,);
  }
  return (
    <Pressable style={{ flex: 1, backgroundColor: '#00000066', justifyContent: 'flex-end'}} onPress={()=>setIsVisible(false)}>
          <ModalAnimation>
            <Pressable style={styles.container} onPress={()=>{}}>
            <View style={[styles.row,styles.outercontainer]}>
            <Text style={styles.formHeading}>Conversation Update</Text>
            <Pressable onPress={()=> setIsVisible(false)} style={styles.closeBtnHolder}>
              <Feather name="x-circle" size={20} color="black" />
            </Pressable>
            </View>
            <View style={styles.separator} />
            <View style={styles.row}>        
                <View style={{flex:1}}>
                    <DateInputField 
                    mode={"date"} 
                    value={selectedDate} 
                    placeholder="Date"
                    bordercolor='transparent'
                    bgcolor='#ffffff'
                    dateflag={dateFlag} 
                    onChange={handleDateChange}/>
                    </View>
                    <View style={{flex:1}}>
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
                    placeholder="Details of Lead Update"
                    value={feedback}
                    onChangeText={(inputText) => setFeedback(inputText)}
                />
                <Pressable onPress={()=>handleSubmit()} style={[divStyles.submitButton,{marginTop: scale(8)}]}>
                  <Text style={textStyles.buttonText}>UPDATE</Text>
                </Pressable>
            </Pressable>
      </ModalAnimation>
      </Pressable>
  )
}

export default ModalSetting

const styles = ScaledSheet.create({
    container:{
      backgroundColor: '#e9e9e9',
      borderTopLeftRadius: '25@s',
      borderTopRightRadius: '25@s',
      paddingHorizontal: '15@s'
    },
    formHeading: {
        fontSize: '18@s',
        fontFamily: 'RubikBold',
        textAlign: 'left',
    },
    outercontainer:{
      margin: '10@s',
      marginBottom:0,
      justifyContent:'space-between'
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
    
    inputtext:{
        fontSize:'16@s',
        padding: '16@s',
        backgroundColor: 'white',
        marginBottom:'16@s',
        textAlignVertical: 'top',
        borderRadius: '8@s',
      },
      separator: {
        marginVertical: '10@s',
        height: '1@s',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
      },
})