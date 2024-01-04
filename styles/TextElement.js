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
        fontSize: '15@s',
        fontFamily: 'RubikMedium',
        textAlign: 'center',
    },
    PageHeading: {
        fontSize: '25@s',
        marginBottom: '10@s',
        color: '#0466AC',
        fontFamily: 'RubikExtraBold',
      },
    PageSubHeading: {
        fontSize: '16@s',
        marginBottom:'30@s',
        textAlign: 'center',
        fontFamily: 'RubikExtraBold',
    },
    errormessage:{
        margin: '10@s',
        color: '#FF007F', 
        fontSize: '11@s',
        fontFamily: 'RubikMedium',
    }
}) 