import React, { useState } from 'react';
import { Modal, TextInput, FlatList, Text, View, Button, StyleSheet, Pressable } from 'react-native';
import { textStyles } from '../styles/TextElement';
import { FontAwesome } from '@expo/vector-icons';
import { divStyles } from '../styles/DivElement';

interface DataItem {
  key: string;
  value: string;
}
interface SearchListModalProps{
  data: DataItem[];
  placeholder: string;
  bordercolor: string;
  bgcolor: string;
  LeftIconName: any;
  LeftIconColor: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<DataItem | undefined>>;
  selectedValue : DataItem | undefined;
}

const SearchListModal:React.FC<SearchListModalProps> = 
({data,placeholder,bordercolor,bgcolor,LeftIconName,LeftIconColor,setSelectedValue,selectedValue}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState<DataItem[]>(data);

  const search = (text: string) => {
    setSearchText(text);
    if (text === '') {
      setFilteredList(data);
    } else {
      let filteredData = data.filter(item => {
        return item.value.toLowerCase().includes(text.toLowerCase());
      });
      setFilteredList(filteredData);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => search(text)}
              value={searchText}
              placeholder={placeholder}
            />
            <FlatList
              data={filteredList}
              renderItem={({ item }) => 
                <Pressable onPress={()=>{setSelectedValue(item);setSearchText(item.value);setModalVisible(!modalVisible)}}>
                    <Text style={styles.itemtext}>{item.value}</Text>
                </Pressable>
                }
              initialNumToRender={15}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.key}
            />
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
      
      <Pressable onPress={() => setModalVisible(true)} style={[divStyles.EntryPageInputHolder, { borderColor: bordercolor, backgroundColor: bgcolor}]}>
          <FontAwesome name={LeftIconName} color={LeftIconColor} size={18}/>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={[textStyles.inputText,{color:'#808080',paddingVertical:14}]}>{searchText || placeholder}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000088',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
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
  textInput: {
    borderColor: 'gray',
    paddingVertical:10,
    paddingHorizontal:15,
    fontSize:16,
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
  },
  itemtext:{
    borderBottomWidth:1,
    borderColor: '#e9e9e9',
    padding:12,
    width: '100%',
  },
});

export default SearchListModal;
