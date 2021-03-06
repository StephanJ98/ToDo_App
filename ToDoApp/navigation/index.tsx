import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

import SplashScreen from '../screens/SplashScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import NotFoundScreen from '../screens/NotFoundScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import ToDoScreen from '../screens/ToDoScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
      <Stack.Screen name="Home" component={ProjectsScreen} options={({ navigation }) => ({
        title: '',
        headerLeft: () => (
          <HeaderBackButton onPress={() => {
            AsyncStorage.removeItem('token')
              .then(() => {
                navigation.navigate('SignIn')
              })
          }
          } />
        ),
      })} />
      <Stack.Screen name="ToDoScreen" component={ToDoScreen} options={{ title: '' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
