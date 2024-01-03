import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import NetInfo,{NetInfoState} from '@react-native-community/netinfo';
import icon from '../assets/images/icon.png';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, Unmatched, router } from 'expo-router';
import react,{ useEffect, useState} from 'react';
import { ActivityIndicator, SafeAreaView, Text, View, useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { scale } from 'react-native-size-matters';
import { Image } from 'expo-image';
import { divStyles } from '../styles/DivElement';

export {ErrorBoundary} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {

  const queryClient = new QueryClient()

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'RubikBlack': require('../assets/fonts/Rubik-Black.ttf'),
    'RubikBlackItalic': require('../assets/fonts/Rubik-BlackItalic.ttf'),
    'RubikBold': require('../assets/fonts/Rubik-Bold.ttf'),
    'RubikExtraBold': require('../assets/fonts/Rubik-ExtraBold.ttf'),
    'RubikExtraBoldItalic': require('../assets/fonts/Rubik-ExtraBoldItalic.ttf'),
    'RubikItalic': require('../assets/fonts/Rubik-Italic.ttf'),
    'RubikLight': require('../assets/fonts/Rubik-Light.ttf'),
    'RubikMedium': require('../assets/fonts/Rubik-Medium.ttf'),
    'RubikMediumItalic': require('../assets/fonts/Rubik-MediumItalic.ttf'),
    'RubikRegular': require('../assets/fonts/Rubik-Regular.ttf'),
    'RubikSemiBold': require('../assets/fonts/Rubik-SemiBold.ttf'),    
    'RubikSemiBoldItalic': require('../assets/fonts/Rubik-SemiBoldItalic.ttf'),
    ...FontAwesome.font, 
  });
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error)
    console.warn(error);
  }, [error]);

  useEffect(() => {
    if (loaded) {
    // console.log('assest loaded');
    }
  }, [loaded]);

  if (!loaded) {
    return (<SafeAreaView><View style={{flex:1, justifyContent:'center',alignItems:'center'}}><ActivityIndicator size={'large'}  color="#183399"/></View></SafeAreaView>)
  }

  return (
    <AuthProvider>
       <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  );
}

 function App(){
  const [networkState, setNetworkState] = useState<NetInfoState>();
  const [isLoading,setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const handleConnectivityChange = (state: NetInfoState) => {
      setNetworkState(state);
      setIsLoading(false);
    };
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
    return () => {
      unsubscribe();
    };
  }, []);
  if(networkState?.isInternetReachable){
    
    return(<RootLayoutNav/>)
  }
  else if(!isLoading){
    return(<View style={{flex:1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
      <Image source={icon} style={divStyles.EntryPageLogo} />
      <Text style={{fontSize:scale(20)}}>No Internet Connection</Text>
      <MaterialCommunityIcons name="access-point-network-off" size={scale(24)} color="black" />
    </View>)
  }
}





function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const {authState, sessionLoading} = useAuth();
  useEffect(() => {
    if (sessionLoading) {
      SplashScreen.hideAsync();
      return;
    }
    // Check if the token is not null and the user is authenticated
    if (authState.token != null && authState.authenticated != null ) {
      router.push('/(tabs)');
    } else if(authState.token != null && authState.authenticated == null){
      router.push('/otpverify');
    }else{
      router.push('/login')
    }
  }, [authState.token, authState.authenticated]);
  if(sessionLoading){
    return <SafeAreaView><View style={{flex:1, justifyContent:'center',alignItems:'center'}}><ActivityIndicator size={'large'}  color="#183399"/></View></SafeAreaView>
  }
  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{flex:1}}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="login" options={{ headerShown: false, animation: 'slide_from_left' }} />
        <Stack.Screen name="otpverify" options={{ headerShown: false, animation: 'slide_from_left' }} />
        <Stack.Screen name="forgotpassword" options={{ headerShown: false, animation: 'slide_from_left' }} />
        <Stack.Screen name="Notification" options={{ presentation: 'modal', animation: 'slide_from_right'}} />
        <Stack.Screen name="Search" options={{ presentation: 'transparentModal', headerShown: false, animation: "fade" }} />
        <Stack.Screen name="ChangePassword" options={{ presentation: 'modal',title:"Reset Password", animation: "slide_from_left"}} />
        <Stack.Screen name="EditProfile" options={{ presentation: 'modal',title:"Edit Profile", animation: "slide_from_right"}} />
      </Stack>
      <FlashMessage/> 
      </SafeAreaView>
    </ThemeProvider>
    </>
  );
}
