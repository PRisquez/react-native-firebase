import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements'

const UserListScreen = (props) => {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc => {
                const { name, email, phone } = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone,

                });
            });
            setUsers(users);
        });
    },[]);

    return (
        <ScrollView>
            <Button title="Create User" onPress={() => props.navigation.navigate('CreateUserScreen')}/>
            {
                users.map(user => {
                    return(
                        <ListItem key={user.id} bottomDivider onPress={() => props.navigation.navigate('UserDetailScreen', {
                            userId: user.id
                        })}>
                            <ListItem.Chevron />
                            <Avatar rounded source={{uri:'https://reactnativeelements.com/img/avatar/avatar--photo.jpg'}}/>
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

export default UserListScreen

const styles = StyleSheet.create({})
