import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, View, useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import FlashMessage from "react-native-flash-message";

export {ErrorBoundary} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const {authState} = useAuth();
  useEffect(() => {
    // Check if the token is not null and the user is authenticated
    if (authState.token != null && authState.authenticated != null ) {
      router.push('/(tabs)');
    } else if(authState.token != null && authState.authenticated == null){
      router.push('/otpverify');
    }else{
      router.push('/login')
    }
  }, [authState.token, authState.authenticated]); 
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
        <Stack.Screen name="Setting" options={{ presentation: 'transparentModal', headerShown: false, animation: "fade" }} />
        <Stack.Screen name="Chatpage" options={{ presentation: 'transparentModal', headerShown: false, animation: "slide_from_bottom"}} />
        <Stack.Screen name="ChangePassword" options={{ presentation: 'modal',title:"Reset Password", animation: "slide_from_left"}} />
        <Stack.Screen name="EditProfile" options={{ presentation: 'modal',title:"Edit Profile", animation: "slide_from_right"}} />
      </Stack>
      <FlashMessage position="top" /> 
      </SafeAreaView>
    </ThemeProvider>
    </>
  );
}
