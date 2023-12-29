import { StyleSheet, Text, View, TextInput } from 'react-native'
import React,{ Dispatch, SetStateAction, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { divStyles } from '../styles/DivElement'
import { textStyles } from '../styles/TextElement'

interface TextInputFieldProps{
    FocusColor: string;
    NotFocusColor: string;
    LeftIconColor: string;
    LeftIconName: any;
    RightIconColor: string;
    RightIconName: any;
    textValue: string;
    bgcolor: string;
    placeholder: string;
    setTextValue: Dispatch<SetStateAction<string>>;
}

const TextInputField: React.FC<TextInputFieldProps> = ({FocusColor,NotFocusColor, bgcolor, LeftIconColor, RightIconColor,LeftIconName, RightIconName, textValue, placeholder, setTextValue}) => {
    const [InputIsFocus,setInputIsFocus] = useState<boolean>(false);
    return (
    <View style={[divStyles.EntryPageInputHolder, { borderColor: InputIsFocus?FocusColor:NotFocusColor, backgroundColor: bgcolor}]}>
        <FontAwesome name={LeftIconName} size={20} color={LeftIconColor}/>
        <TextInput
          style={textStyles.inputText}
          placeholder={placeholder}
          onChangeText={(text) => setTextValue(text)}
          value={textValue}
          onFocus={() => setInputIsFocus(true)}
          onBlur={() => setInputIsFocus(false)}
          underlineColorAndroid="transparent"
        />
        {RightIconColor != 'transparent' && <FontAwesome name={RightIconName} size={20} color={RightIconColor}/>}
      </View>
  )
}

export default TextInputField

const styles = StyleSheet.create({})