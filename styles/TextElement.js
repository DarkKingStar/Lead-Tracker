import { ScaledSheet } from "react-native-size-matters";

export const textStyles = ScaledSheet.create({
    inputText:{
        padding: '5@s',
        fontSize: '15@s',
        flex:1,
        borderWidth: 0,        
    },
    buttonText:{
        color: 'white',
        fontSize: '18@s',
        textAlign: 'center',
    },
    labelText:{
        fontSize: '18@s',
        fontWeight: '700',
        lineHeight: '28@s',
        marginLeft:'5@s',
        marginBottom:'5@s',
    },
    PageHeading: {
        fontWeight: '800',
        fontSize: '25@s',
        marginBottom: '10@s',
        color: '#0466AC',
      },
    PageSubHeading: {
        fontSize: '16@s',
        textAlign: 'center',
        marginBottom:'30@s',
    },
    errormessage:{
        margin: '10@s',
        color: '#FF007F',
        fontSize: '16@s'
    }
}) 