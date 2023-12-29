import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { divStyles } from '../styles/DivElement';
import { FontAwesome } from '@expo/vector-icons';

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
    <View style={{ borderWidth:2, backgroundColor:`${bgcolor}`, borderColor: `${bordercolor}`,display: 'flex', justifyContent:'center', alignItems:'center',paddingHorizontal:10, flexDirection: 'row', borderRadius:8, marginBottom:10}}>
      <View>
        <FontAwesome name={LeftIconName} size={20} color={LeftIconColor}/>
      </View>
      <View style={{flex: 1}}>
        <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
            if (itemIndex !== 0) {
            setSelectedValue(itemValue);
            setSelectedValueId(itemIndex);
            }}}>
            <Picker.Item label={placeholder} style={{color:'#808080', fontSize: 18}} />
            {options.map((option: string | undefined, index: React.Key | null | undefined) => (
            <Picker.Item key={index} label={option} value={option?.toLowerCase()} />
            ))}
        </Picker>
        </View>
    </View>
  )
}

export default SelectInputField

const styles = StyleSheet.create({})