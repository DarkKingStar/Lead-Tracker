import { StyleSheet, Text,Pressable, View, TextInput } from 'react-native'
import React,{ Dispatch, SetStateAction, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { divStyles } from '../styles/DivElement'
import { textStyles } from '../styles/TextElement'
import { scale } from 'react-native-size-matters';

interface PasswordInputFieldProps{
    FocusColor: string;
    NotFocusColor: string;
    LeftIconColor: string;
    RightIconColor: string;
    textValue: string;
    placeholdertext: string;
    setTextValue: Dispatch<SetStateAction<string>>;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({FocusColor,NotFocusColor, LeftIconColor, RightIconColor, textValue, placeholdertext, setTextValue}) => {
    const [InputIsFocus,setInputIsFocus] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    return (
        <View style={[divStyles.EntryPageInputHolder, { borderColor: InputIsFocus?FocusColor:NotFocusColor }]}>
          <View style={{width:scale(18)}}>
            <FontAwesome name="lock" size={20} color={LeftIconColor} />
          </View>
        <TextInput
          style={textStyles.inputText}
          placeholder={placeholdertext}
          secureTextEntry={!isShowPassword}
          onChangeText={(text) => setTextValue(text)}
          value={textValue}
          onFocus={() => setInputIsFocus(true)}
          onBlur={() => setInputIsFocus(false)}
          underlineColorAndroid="transparent" 
        />
        <Pressable onPress={()=>setIsShowPassword(prev=>!prev)}>
          <FontAwesome name={isShowPassword?"eye": "eye-slash"} size={20} color={RightIconColor}/>
        </Pressable>
      </View>
  )
}

export default PasswordInputField

const styles = StyleSheet.create({})