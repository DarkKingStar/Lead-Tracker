import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import { ScaledSheet, scale } from 'react-native-size-matters';

interface SelectInputFieldProps {
    selectedValue: string;
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
    setSelectedValueId : React.Dispatch<React.SetStateAction<number>>;
    options: string[];
    placeholder: string;
    bordercolor: string;
    bgcolor: string;
    LeftIconName: any;
    LeftIconColor: string;
}

const SelectInputField: React.FC<SelectInputFieldProps> = ({selectedValue,setSelectedValue,setSelectedValueId, options, placeholder, bordercolor, bgcolor, LeftIconColor, LeftIconName}) => {
  return (
    <View style={[styles.inputholder,{backgroundColor:`${bgcolor}`, borderColor: `${bordercolor}`}]}>
      <View style={{width: scale(15)}}>
        <FontAwesome name={LeftIconName} size={scale(18)} color={LeftIconColor}/>
      </View>
      <View style={{flex: 1}}>
        <Picker
            style={{height:0}}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
            if (itemIndex !== 0) {
            setSelectedValue(itemValue);
            setSelectedValueId(itemIndex);
            }}}>
            <Picker.Item label={placeholder} style={{color:'#808080'}} />
            {options.map((option: string | undefined, index: React.Key | null | undefined) => (
            <Picker.Item key={index} label={option} value={option?.toLowerCase()} />
            ))}
        </Picker>
        </View>
    </View>
  )
}

export default SelectInputField

const styles = ScaledSheet.create({
  inputholder:{
    borderWidth:'2@s',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:'10@s',
    flexDirection: 'row',
    padding: '8@s',
    borderRadius:'8@s', 
    marginBottom: '10@s'
  },
})