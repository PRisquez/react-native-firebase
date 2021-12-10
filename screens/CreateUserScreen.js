import React, { useState } from "react";
import { StyleSheet, Button, TextInput, ScrollView, View, Alert } from "react-native";
import firebase from '../database/firebase';

const CreateUserScreen = (props) => {
  const [User, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleChangeText = (field, value) => {
    setUser({ ...User, [field]: value });
  };

  const saveNewUser = async () => {
    if (User.name === '') {
      Alert.alert('Please provide a name');
      // alert('Please provide a name simple JS alert');
    } else {
      try {
        await firebase.db.collection('users').add({
          name: User.name,
          email: User.email,
          phone: User.phoneNumber
        });
        props.navigation.navigate('UserListScreen');
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Username"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User email"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User phone number"
          onChangeText={(value) => handleChangeText("phoneNumber", value)}
        />
      </View>
      <View>
        <Button title="Save user" onPress={() => saveNewUser()}/>
      </View>
    </ScrollView>
  );
};

export default CreateUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
