import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { formatDate, formatTime } from '../context/formatString';
import { FontAwesome } from '@expo/vector-icons';
import { ScaledSheet } from 'react-native-size-matters';

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
       <View style={[styles.inputholder,{ backgroundColor:`${bgcolor}`, borderColor: `${bordercolor}`}]}>
      <Pressable onPress={showDatePicker} style={styles.pickerholder}>
        <FontAwesome name={mode=='date'?'calendar':'clock-o'} size={20} color='#0000ff'/>
        <Text style={styles.datetext}>{mode=='date'?(dateflag?formatDate(value):placeholder):(dateflag?formatTime(value):placeholder)}</Text>
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

const styles = ScaledSheet.create({
  inputholder:{
    borderWidth:'1@s',
    display: 'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingHorizontal:'10@s',
    flexDirection: 'row',
    borderRadius:'8@s', 
    marginBottom: '8@s'
  },
  pickerholder:{
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  datetext:{
    fontSize:'15@s',
    padding:'10@s',
    color:'#808080'
  }
});
