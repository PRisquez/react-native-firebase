import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const userId = props.route.params.userId;

  const [User, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChangeText = (field, value) => {
    setUser({ ...User, [field]: value });
  };

  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({
      ...user,
      id: doc.id,
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserById(userId);
  }, []);

  const deleteUser = async () => {
    const dbRef = firebase.db.collection("users").doc(userId);
    await dbRef.delete();
    props.navigation.navigate("UserListScreen");
  };

  const openConfirmationAlert = () => {
    Alert.alert("Remove the user", "Are you sure?", [
      { text: "Yes", onPress: () => deleteUser() },
      { text: "No", onPress: () => console.log(false) },
    ]);
  };

  const updateUser = async () => {
    const dbRef = firebase.db.collection("users").doc(userId);
    console.log(User.name,User.email, User.phone);
    await dbRef.set({
      name: User.name,
      email: User.email,
      phone: User.phone,
    });
    console.log('LLLELEGO');
    setUser({
      id: "",
      name: "",
      email: "",
      phone: "",
    });
    props.navigation.navigate("UserListScreen");
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Username"
          value={User.name}
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User email"
          value={User.email}
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User phone number"
          value={User.phone}
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button
          color="skyblue"
          title="Update user"
          onPress={() => updateUser()}
        />
      </View>
      <View>
        <Button
          color="#DC143C"
          title="Delete user"
          onPress={() => openConfirmationAlert()}
        />
      </View>
    </ScrollView>
  );
};

export default UserDetailScreen;

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
