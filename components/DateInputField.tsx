import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface DateInputProps{
    value: Date| undefined;
    onChange: (date: Date) => void;
    mode: any;
    children: JSX.Element;

}

const DateInputField: React.FC<DateInputProps> = ({ value, onChange, mode, children }) => {
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

      <Pressable onPress={showDatePicker}>
        {children}
      </Pressable>
      {isDatePickerVisible && 
        <DateTimePicker
          value={value|| new Date()}
          mode={mode}
          display="default"
          onChange={handleDateChange}
        />
      }
    </>
  );
};

export default DateInputField;

const styles = StyleSheet.create({});
