import { StyleSheet, Text, View, TextInput, KeyboardType } from 'react-native'
import React,{ Dispatch, SetStateAction, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { divStyles } from '../styles/DivElement'
import { textStyles } from '../styles/TextElement'
import { scale } from 'react-native-size-matters';

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
    keyboardType: KeyboardType;
    setTextValue: Dispatch<SetStateAction<string>>;
}

const TextInputField: React.FC<TextInputFieldProps> = ({FocusColor,NotFocusColor, bgcolor, LeftIconColor, RightIconColor,LeftIconName, RightIconName, textValue, keyboardType, placeholder, setTextValue}) => {
    const [InputIsFocus,setInputIsFocus] = useState<boolean>(false);
    return (
    <View style={[divStyles.EntryPageInputHolder, { borderColor: InputIsFocus?FocusColor:NotFocusColor, backgroundColor: bgcolor}]}>
        <View style={{width:scale(18)}}>
          <FontAwesome name={LeftIconName} size={20} color={LeftIconColor}/>
        </View>
        <TextInput
          style={textStyles.inputText}
          placeholder={placeholder}
          onChangeText={(text) => setTextValue(text)}
          value={textValue}
          onFocus={() => setInputIsFocus(true)}
          onBlur={() => setInputIsFocus(false)}
          underlineColorAndroid="transparent"
          keyboardType={keyboardType}
        />
        {RightIconColor != 'transparent' && <FontAwesome name={RightIconName} size={20} color={RightIconColor}/>}
      </View>
  )
}

export default TextInputField

const styles = StyleSheet.create({})