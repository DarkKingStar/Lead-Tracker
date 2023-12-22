import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';

export {ErrorBoundary} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)',
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
    if (authState.token == null && authState.authenticated == null ) {
      router.replace('/(auth)/');
    } else if(authState.token != null && authState.authenticated == null){
      router.replace('/(auth)/otpverify');
    }else{
      router.replace('/(tabs)/');
    }
  }, [authState]); 
  return (
    
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="Notification" options={{ presentation: 'modal' }} />
        <Stack.Screen name="Search" options={{ presentation: 'transparentModal', headerShown: false, animation: "fade" }} />
        <Stack.Screen name="Setting" options={{ presentation: 'transparentModal', headerShown: false, animation: "fade" }} />
        <Stack.Screen name="Chatpage" options={{ presentation: 'transparentModal', headerShown: false, animation: "slide_from_bottom"}} />
        <Stack.Screen name="ChangePassword" options={{ presentation: 'modal',title:"Reset Password", animation: "slide_from_bottom"}} />
      </Stack>
    </ThemeProvider>
  );
}
