import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen} from '../screens/auth/LoginScreen';
import AboutUs from "../screens/about/AboutUs";
import CallLog from "../screens/callLog/CallLog";
import Privacy from "../screens/privacy/Privacy";

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

export function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      mode={'modal'}
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name={'LoginStack'}>
        {() => (
          <LoginStack.Navigator
            mode={'card'}
            screenOptions={{
              headerShown: false,
            }}>
            <LoginStack.Screen name={'Login'} component={LoginScreen}/>
          </LoginStack.Navigator>
        )}
      </AuthStack.Screen>
      <AuthStack.Screen
        name={'AboutUs'}
        options={{
          headerShown: true,
          title: 'About Us',
        }}
        component={AboutUs}/>
      <AuthStack.Screen
        name={'CallLog'}
        options={{
          headerShown: true,
          title: 'Call Log',
        }}
        component={CallLog}/>
      <AuthStack.Screen
        name={'Privacy'}
        options={{
          headerShown: true,
          title: 'Privacy',
        }}
        component={Privacy}/>
    </AuthStack.Navigator>
  );
}
