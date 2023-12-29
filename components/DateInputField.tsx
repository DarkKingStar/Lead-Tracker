import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { formatDate, formatTime } from '../context/formatString';
import { FontAwesome } from '@expo/vector-icons';

interface DateInputProps{
    value: Date| undefined;
    onChange: (date: Date) => void;
    mode: any;
    dateflag: boolean;
    bordercolor: string;
    placeholder: string;
    bgcolor: string;
}

const DateInputField: React.FC<DateInputProps> = ({ value, onChange, mode, dateflag, bordercolor,bgcolor, placeholder }) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  const showDatePicker = (): void => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = (): void => {
    setDatePickerVisible(false);
  };

  const handleDateChange = (event: DateTimePickerEvent, date: Date | undefined): void => {
    hideDatePicker();
    if (date) {
      onChange(date);
    }
  };
  return (
    <>
       <View style={{ borderWidth:2, backgroundColor:`${bgcolor}`, borderColor: `${bordercolor}`,display: 'flex', justifyContent:'flex-start', alignItems:'center',paddingHorizontal:10, flexDirection: 'row', borderRadius:8, marginBottom: 8}}>
      <Pressable onPress={showDatePicker} style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
        <FontAwesome name={mode=='date'?'calendar':'clock-o'} size={20} color='#0000ff'/>
        <Text style={{fontSize:18, padding:15, color:'#808080'}}>{mode=='date'?(dateflag?formatDate(value):placeholder):(dateflag?formatTime(value):placeholder)}</Text>
      </Pressable>
      {isDatePickerVisible && 
        <DateTimePicker
          value={value|| new Date()}
          mode={mode}
          display="default"
          onChange={handleDateChange}
        />
      }
      </View>
    </>
  );
};

export default DateInputField;

const styles = StyleSheet.create({});
