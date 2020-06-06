import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import List from "../screens/todo/list/List";
import Create from "../screens/todo/create/Create";
import {AuthContext} from "../contexts/AuthContext";
import {ThemeContext} from "../contexts/ThemeContext";
import {Button, StyleSheet} from 'react-native';
import AboutUs from "../screens/about/AboutUs";

const MainStack = createStackNavigator();


export function MainStackNavigator() {
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'TodoList'}
        component={List}
        options={{
          title: 'Todo List',
          headerRight: () => (
            <Button style={styles.container}
                    title={"Logout"}
                    onPress={logout}/>
          )
        }}
      />
      <MainStack.Screen
        name={'Create'}
        component={Create}
        options={{
          title: 'Todo Create',
          headerRight: () => (
            <Button style={styles.container}
                    title={"Logout"}
                    onPress={logout}/>
          )
        }}
      />
      <MainStack.Screen
        name={'AboutUs'}
        component={AboutUs}
        options={{
          title: 'About Us',
        }}
      />
    </MainStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  },
  button: {
    width: 50
  }
});
