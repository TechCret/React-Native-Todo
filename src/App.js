import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthStackNavigator} from './navigators/AuthStackNavigator';
import {lightTheme} from './themes/light';
import {AuthContext} from './contexts/AuthContext';
import {MainStackNavigator} from './navigators/MainStackNavigator';
import {useAuth} from './hooks/useAuth';
import {UserContext} from './contexts/UserContext';
import {SplashScreen} from './screens/splash/SplashScreen';
import {darkTheme} from './themes/dark';
import {ThemeContext} from './contexts/ThemeContext';
import {AppState, StatusBar} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import {AdminStackNavigator} from "./navigators/AdminStackNavigator";
// import {useDarkMode} from 'react-native-dark-mode';
const RootStack = createStackNavigator();

export default function () {
  const {auth, state} = useAuth();
  // const isDarkMode = useDarkMode();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [userRole, setUserRole] = React.useState("ROLE_EMPLOYEE");

  const switchTheme = React.useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  async function getUserRole() {
    console.log("---------------------APPP-----------------")
    const role = await AsyncStorage.getItem('@roleList')
    await setUserRole(role);
    console.log(role)
    console.log(AppState.currentState)
  }

  function renderScreens() {
    getUserRole().then(() => {
      console.log("UserRole Set to state")
    }).catch(() => {
      console.log("User Role Not Set To State Successfully")
    });

    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen}/>;
    }
    if (userRole === "ROLE_ADMIN") {
      return ((state.user)) ? (
        <RootStack.Screen name={'MainStack'}>
          {() => (
            <UserContext.Provider value={state.user}>
              <MainStackNavigator/>
            </UserContext.Provider>
          )}
        </RootStack.Screen>
      ) : (
        <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator}/>
      );
    } else {
      return ((state.user)) ? (
        <RootStack.Screen name={'AdminStack'}>
          {() => (
            <UserContext.Provider value={state.user}>
              <AdminStackNavigator/>
            </UserContext.Provider>
          )}
        </RootStack.Screen>
      ) : (
        <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator}/>
      );
    }

  }


  return (
    <ThemeContext.Provider value={switchTheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
      <AuthContext.Provider value={auth}>
        <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: false,
            }}>
            {renderScreens()}
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
