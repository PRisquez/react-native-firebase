import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserDetailScreen from './screens/UserDetailScreen';
import UserListScreen from './screens/UserListScreen';
import CreateUserScreen from './screens/CreateUserScreen';


const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserListScreen" component={UserListScreen} options={{title: 'Users List'}}/>
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{title: 'Create a new user'}}/>
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{title: 'User detail'}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
