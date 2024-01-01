import { ScaledSheet } from "react-native-size-matters";

export const divStyles = ScaledSheet.create({
    EntryPageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '40@s',
        borderColor: 'black',
    },
    EntryPageLogo: {
        width: '120@s',
        height: '100@s', 
        marginBottom: '20@s',
    },
    
    EntryPageInputHolder: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderWidth: '2@s',
        borderRadius: '8@s',
        marginBottom: '10@s',
        paddingHorizontal:'10@s',
    },
    submitButton:{
        padding: '8@s',
        borderRadius: '8@s',
        backgroundColor: '#0466AC',
        width: '100%',
        alignSelf: 'center',
        marginVertical: '20@s',
    },
    errordiv:{
        flex:1,
        marginTop: '50%',
        justifyContent: 'center',
        alignSelf:'center',
        alignItems: 'center'
    }
}) 