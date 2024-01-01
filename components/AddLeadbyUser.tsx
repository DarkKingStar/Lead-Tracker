import { Pressable, StyleSheet,ScrollView, Text, View, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextInputField from './TextInputField';
import SelectInputField from './SelectInputField';
import DateInputField from './DateInputField';
import { divStyles } from '../styles/DivElement';
import { textStyles } from '../styles/TextElement';
import SearchListModal from './SearchListModal';
import { useQuery } from '@tanstack/react-query';
import { fetchMasterDataList } from '../context/fetchData';
import { router, useFocusEffect } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { showMessage } from 'react-native-flash-message';
import { FontAwesome } from '@expo/vector-icons';
import { ScaledSheet, scale } from 'react-native-size-matters';

interface DataItem {
    key: string;
    value: string;
}

interface LeadLocation{
    lead_location_id: string;
    lead_location: string;
}
interface modeOfBusiness{
    mode_of_business_id: string;
    mode_of_business: string;
}
interface leadSource{
    lead_source_id: string;
    lead_source: string
}
interface namePrefix{
    name_prefix_details_id: string;
    name_prefix: string;
}

const AddLeadbyUser = () => {
    const {OnAddNewLead} = useAuth()
    const { data, isLoading, isError, refetch } = useQuery({ 
        queryKey: ['marsterlist'],
        queryFn: ()=>fetchMasterDataList(),
        enabled: true
    });
    const [modalVisible, setModalVisible] = useState(false);

    const [firstName,setFirstName] = useState<string>('');
    const [middleName,setMiddleName] = useState<string>('');
    const [lastName,setLastName] = useState<string>('');
    

    const [phone,setPhone] = useState<string>('');
    const [phoneAlt,setPhoneAlt] = useState<string>('');

    const [email,setEmail] = useState<string>('');

    const [selectedLeadSource,setSelectedLeadSource] = useState<DataItem>();


    const [selectedModeOfBusiness,setSelectedModeOfBusiness] = useState<DataItem>();


    const [businessName,setBusinessName] = useState<string>('');


    const [selectedLocation, setSelectedLocation] = useState<DataItem>();

    const [selectedDate, setSelectedDate] = useState<Date>();
    const [dateFlag,setDateFlag] = useState<boolean>(false);

    const [remarks,setRemarks] = useState<string>('');

    const [prefix,setPrefix] = useState<string>('');
    const [prefixId,setPrefixId] = useState<number>(0);
    const prefixOptions = data?.name_prefix?.sort((a:any, b:any) => a.name_prefix_details_id - b.name_prefix_details_id)
                        ?.map((item: namePrefix) => item.name_prefix);

    const handleDateChange = (date: Date) => {
        setDateFlag(true);
        setSelectedDate(date);
    };

    const handleSubmit = async() =>{
        const flagData = await OnAddNewLead(selectedLeadSource?.key,prefixId.toString(),firstName,middleName,lastName,
            phone,phoneAlt,email,selectedModeOfBusiness?.key,selectedLocation?.key,businessName,remarks,selectedDate);
        showMessage({
            message: `   ${flagData?.message}`,
            type: flagData?.error?"danger":"success",
            position:"bottom",
            icon: props => flagData?.error?<FontAwesome name="close" size={17} color="#fff" {...props}/>:<FontAwesome name="check" size={17} color="#fff" {...props}/>,
        })
        if(!flagData?.error){
            setModalVisible(false);
            setFirstName('');
            setMiddleName('');
            setLastName('');
            setPhone('');
            setPhoneAlt('');
            setEmail('');
            setSelectedLeadSource(undefined);
            setSelectedModeOfBusiness(undefined);
            setBusinessName('');
            setSelectedLocation(undefined);
            setSelectedDate(undefined);
            setDateFlag(false);
            setRemarks('');
            setPrefix('');
            setPrefixId(0);
            setModalVisible(false);
            router.push('/(tabs)')
        }
    }
    return (<>
        {!isLoading &&
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.row}>
                <View style={{flex:1}}>
                    <SelectInputField
                    selectedValue={prefix}
                    setSelectedValue={setPrefix}
                    setSelectedValueId={setPrefixId} 
                    options={prefixOptions}
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
                <SearchListModal
                    data={data?.lead_source?.map((item: leadSource) => ({ key: item.lead_source_id, value: item.lead_source }))}
                    setSelectedValue={setSelectedLeadSource}
                    selectedValue = {selectedLeadSource}
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
                <SearchListModal
                    data={data?.mode_of_business?.map((item: modeOfBusiness) => ({ key: item.mode_of_business_id, value: item.mode_of_business }))}
                    setSelectedValue={setSelectedModeOfBusiness}
                    selectedValue = {selectedModeOfBusiness}
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
                    <SearchListModal
                    data={data?.lead_location?.map((item: LeadLocation) => ({ key: item.lead_location_id, value: item.lead_location }))}
                    setSelectedValue={setSelectedLocation}
                    selectedValue = {selectedLocation}
                    placeholder='Select Location of the Lead'
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
            <View style={styles.row}>
                <View style={{flex:1}}>
                    <TextInputField 
                    placeholder='Remarks'
                    FocusColor={ '#c9c9c9'}
                    NotFocusColor={ '#c9c9c9'}
                    LeftIconColor={ "#8fce00"}
                    bgcolor='#ffffff'
                    RightIconColor={ "transparent"} 
                    textValue={remarks}
                    setTextValue={setRemarks}
                    LeftIconName='info-circle'
                    RightIconName='check'
                    />
                </View>
            </View>
            <Pressable onPress={()=>setModalVisible(true)} style={[divStyles.submitButton,{backgroundColor: '#0466AC'}]}>
                  <Text style={textStyles.buttonText}>Add New Lead</Text>
            </Pressable>
            <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={[styles.row,styles.detailslabel]}>
                            <Text style={{fontWeight: '800'}}>Full Name:</Text>
                            <Text>{prefix} {firstName} {middleName} {lastName}</Text>
                        </View>    
                        <View style={[styles.row,styles.detailslabel]}>
                            <Text style={{fontWeight: '800'}}>Contact no.:</Text>
                            <Text>{phone}</Text>    
                        </View>
                        <View style={[styles.row,styles.detailslabel]}>
                            <Text style={{fontWeight: '800'}}>Contact no. 2:</Text>
                            <Text>{phoneAlt}</Text>    
                        </View>
                        <View style={[styles.row,styles.detailslabel]}>
                            <Text style={{fontWeight: '800'}}>Email:</Text>
                            <Text>{email}</Text>    
                        </View>
                        <View style={[styles.row,styles.detailslabel]}>
                            <Text style={{fontWeight: '800'}}>Lead Source:</Text>
                            <Text>{selectedLeadSource?.value}</Text>    
                        </View>
                        <View style={[styles.row,styles.detailslabel]}>
                            <Text style={{fontWeight: '800'}}>Mode of Business:</Text>
                            <Text>{selectedModeOfBusiness?.value}</Text>    
                        </View>
                        <View style={[styles.row,styles.detailslabel]}>
                            <Text style={{fontWeight: '800'}}>Business Name:</Text>
                            <Text>{businessName}</Text>    
                        </View>
                        <View style={[styles.row,styles.detailslabel]}>
                            <Text style={{fontWeight: '800'}}>Location of the Lead:</Text>
                            <Text>{selectedLocation?.value}</Text>
                        </View>
                        <View style={[styles.row,styles.detailslabel]}>
                            <Text style={{fontWeight: '800'}}>Enquiry Date:</Text>
                            <Text>{selectedDate?.toLocaleDateString()}</Text>
                        </View>
                        <View style={[styles.row,styles.detailslabel]}>
                            <Text style={{fontWeight: '800'}}>Remarks:</Text>
                            <Text>{remarks}</Text>
                        </View>
                        <View style={[styles.row,{marginTop: scale(20)}]}>
                            <View style={{flex:1}}>
                                <Button title='Edit' color={'#bcbcbc'} onPress={()=>setModalVisible(false)}/>
                            </View>
                            <View style={{flex:1}}>
                                <Button title='Submit' color={'#2986cc'} onPress={()=>handleSubmit()}/>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    }</>
  )
}

export default AddLeadbyUser

const styles = ScaledSheet.create({
    container:{
        paddingHorizontal:'10@s',
        marginVertical:'15@s',
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
        gap: '5@s',
    },
    centeredView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000088',
      },
      modalView: {
        margin: '20@s',
        backgroundColor: '#fff',
        borderRadius: '20@s',
        padding: '25@s',
        flex:1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      detailslabel:{
        marginTop: '10@s',
        justifyContent:'space-between', 
        borderBottomWidth: 1,
        borderColor : '#eeeeee',
        paddingVertical: '4@s'
      },
})