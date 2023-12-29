import { StyleSheet } from "react-native";

export const divStyles = StyleSheet.create({
    EntryPageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        borderColor: 'black',
    },
    EntryPageLogo: {
        width: 120,
        height: 100, 
        marginBottom: 20,
    },
    
    EntryPageInputHolder: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal:10,
    },
    submitButton:{
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#0466AC',
        width: '100%',
        alignSelf: 'center',
        marginVertical: 20,
    }
}) 