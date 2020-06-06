import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import List from "../screens/todo/list/List";
import Create from "../screens/todo/create/Create";
import AboutUs from "../screens/about/AboutUs";

const AdminStack = createStackNavigator();

export function AdminStackNavigator() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name={'TodoList'}
        component={List}
        options={{
          title: 'Todo List',
        }}
      />
      <AdminStack.Screen
        name={'Create'}
        component={Create}
        options={{
          title: 'Todo Create',
        }}
      />
      <AdminStack.Screen
        name={'About Us'}
        component={AboutUs}
        options={{
          title: 'Admin Page',
        }}
      />
    </AdminStack.Navigator>
  );
}
