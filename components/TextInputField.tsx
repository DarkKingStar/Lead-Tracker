import { StyleSheet, Text, View, TextInput } from 'react-native'
import React,{ Dispatch, SetStateAction, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { divStyles } from '../styles/DivElement'
import { textStyles } from '../styles/TextElement'

interface TextInputFieldProps{
    FocusColor: string;
    NotFocusColor: string;
    LeftIconColor: string;
    RightIconColor: string;
    textValue: string;
    setTextValue: Dispatch<SetStateAction<string>>;
}

const TextInputField: React.FC<TextInputFieldProps> = ({FocusColor,NotFocusColor, LeftIconColor, RightIconColor, textValue, setTextValue}) => {
    const [InputIsFocus,setInputIsFocus] = useState<boolean>(false);
    return (
    <View style={[divStyles.EntryPageInputHolder, { borderColor: InputIsFocus?FocusColor:NotFocusColor}]}>
        <FontAwesome name="user" size={20} color={LeftIconColor}/>
        <TextInput
          style={textStyles.inputText}
          placeholder="Username"
          onChangeText={(text) => setTextValue(text)}
          value={textValue}
          onFocus={() => setInputIsFocus(true)}
          onBlur={() => setInputIsFocus(false)}
          underlineColorAndroid="transparent"
        />
        <FontAwesome name="check-circle" size={20} color={RightIconColor}/>
      </View>
  )
}

export default TextInputField

const styles = StyleSheet.create({})