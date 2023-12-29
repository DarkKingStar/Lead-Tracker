import { Pressable, StyleSheet,ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import TextInputField from './TextInputField';
import SelectInputField from './SelectInputField';
import DateInputField from './DateInputField';
import { divStyles } from '../styles/DivElement';
import { textStyles } from '../styles/TextElement';

const AddLeadbyUser = () => {
    const [firstName,setFirstName] = useState<string>('');
    const [middleName,setMiddleName] = useState<string>('');
    const [lastName,setLastName] = useState<string>('');
    
    const [gender,setGender] = useState<string>('');
    const [genderId,setGenderId] = useState<number>(0);
    const genderoption = ['Mr.','Ms.','Mrs.'];

    const [phone,setPhone] = useState<string>('');
    const [phoneAlt,setPhoneAlt] = useState<string>('');

    const [email,setEmail] = useState<string>('');

    const [leadSource, setLeadSource] = useState<string>('');
    const [leadSourceId,setLeadSourceId] = useState<number>(0);
    const leadSourceoption = ['option 1','option 2','option 3'];

    const [businessMode, setBusinessMode] = useState<string>('');
    const [businessModeId,setBusinessModeId] = useState<number>(0);
    const businessModeoption = ['option 1','option 2','option 3'];

    const [businessName,setBusinessName] = useState<string>('');

    const [selectedDate, setSelectedDate] = useState<Date>();
    const [dateFlag,setDateFlag] = useState<boolean>(false);

    
    const handleDateChange = (date: Date) => {
        setDateFlag(true);
        setSelectedDate(date);
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.row}>
                <View style={{flex:1}}>
                    <SelectInputField
                    selectedValue={gender}
                    setSelectedValue={setGender}
                    setSelectedValueId={setGenderId} 
                    options={genderoption}
                    placeholder='Prefix'
                    bgcolor='#ffffff'
                    bordercolor={'#c9c9c9'}
                    LeftIconName='vcard'
                    LeftIconColor={ "#ffc000"}
                    />
                </View>
                <View style={{flex:1}}>
                    <TextInputField 
                    placeholder='First Name'
                    FocusColor={ '#c9c9c9'}
                    NotFocusColor={ '#c9c9c9'}
                    LeftIconColor={ "#4aacf6"}
                    bgcolor='#ffffff'
                    RightIconColor={ "transparent"} 
                    textValue={firstName}
                    setTextValue={setFirstName}
                    LeftIconName='user'
                    RightIconName='check'
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={{flex:1}}>
                    <TextInputField 
                    placeholder='Middle Name'
                    FocusColor={ '#c9c9c9'}
                    NotFocusColor={ '#c9c9c9'}
                    LeftIconColor={ "#4aacf6"}
                    bgcolor='#ffffff'
                    RightIconColor={ "transparent"} 
                    textValue={middleName}
                    setTextValue={setMiddleName}
                    LeftIconName='user'
                    RightIconName='check'
                    />
                </View>
                <View style={{flex:1}}>
                    <TextInputField 
                    placeholder='Last Name'
                    FocusColor={ '#c9c9c9'}
                    NotFocusColor={ '#c9c9c9'}
                    LeftIconColor={ "#4aacf6"}
                    bgcolor='#ffffff'
                    RightIconColor={ "transparent"} 
                    textValue={lastName}
                    setTextValue={setLastName}
                    LeftIconName='user'
                    RightIconName='check'
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={{flex:1}}>
                    <TextInputField 
                    placeholder='Contact no.'
                    FocusColor={ '#c9c9c9'}
                    NotFocusColor={ '#c9c9c9'}
                    LeftIconColor={ "#69de35"}
                    bgcolor='#ffffff'
                    RightIconColor={ "transparent"} 
                    textValue={phone}
                    setTextValue={setPhone}
                    LeftIconName='phone'
                    RightIconName='check'
                    />
                </View>
                <View style={{flex:1}}>
                    <TextInputField 
                    placeholder='Alt Contact no.'
                    FocusColor={ '#c9c9c9'}
                    NotFocusColor={ '#c9c9c9'}
                    LeftIconColor={ "#000000"}
                    bgcolor='#ffffff'
                    RightIconColor={ "transparent"} 
                    textValue={phoneAlt}
                    setTextValue={setPhoneAlt}
                    LeftIconName='mobile-phone'
                    RightIconName='check'
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={{flex:1}}>
                    <TextInputField 
                    placeholder='Email'
                    FocusColor={ '#c9c9c9'}
                    NotFocusColor={ '#c9c9c9'}
                    LeftIconColor={ "#f44336"}
                    bgcolor='#ffffff'
                    RightIconColor={ "transparent"} 
                    textValue={email}
                    setTextValue={setEmail}
                    LeftIconName='envelope'
                    RightIconName='check'
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={{flex:1}}>
                    <SelectInputField
                    selectedValue={leadSource}
                    setSelectedValue={setLeadSource}
                    setSelectedValueId={setLeadSourceId} 
                    options={leadSourceoption}
                    placeholder='Select Lead Source'
                    bordercolor={'#c9c9c9'}
                    bgcolor='#ffffff'
                    LeftIconName='clipboard'
                    LeftIconColor={ "#fe8505"}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={{flex:1}}>
                    <SelectInputField
                    selectedValue={businessMode}
                    setSelectedValue={setBusinessMode}
                    setSelectedValueId={setBusinessModeId} 
                    options={businessModeoption}
                    placeholder='Select Mode Of Business'
                    bordercolor={'#c9c9c9'}
                    bgcolor='#ffffff'
                    LeftIconName='list'
                    LeftIconColor={ "#841ce6"}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={{flex:1}}>
                    <TextInputField 
                    placeholder='Business Name'
                    FocusColor={ '#c9c9c9'}
                    NotFocusColor={ '#c9c9c9'}
                    LeftIconColor={ "#f44336"}
                    bgcolor='#ffffff'
                    RightIconColor={ "transparent"} 
                    textValue={businessName}
                    setTextValue={setBusinessName}
                    LeftIconName='briefcase'
                    RightIconName='check'
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={{flex:1}}>
                    <SelectInputField
                    selectedValue={businessMode}
                    setSelectedValue={setBusinessMode}
                    setSelectedValueId={setBusinessModeId} 
                    options={businessModeoption}
                    placeholder='Location of the Lead'
                    bordercolor={'#c9c9c9'}
                    bgcolor='#ffffff'
                    LeftIconName='thumb-tack'
                    LeftIconColor={ "#ff0ac5"}
                    />
                </View>
                <View style={{flex:1}}>
                    <DateInputField
                    mode={"date"}
                    value={selectedDate} 
                    onChange={handleDateChange}
                    placeholder='Enquiry Date'
                    bgcolor='#ffffff'
                    dateflag={dateFlag} 
                    bordercolor='#c9c9c9'
                    />
                </View>
            </View>
            <Pressable onPress={()=>{}} style={[divStyles.submitButton,{backgroundColor: '#0466AC'}]}>
                  <Text style={textStyles.buttonText}>Add New Lead</Text>
                </Pressable>
        </ScrollView>
  )
}

export default AddLeadbyUser

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginVertical:15,
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },
})