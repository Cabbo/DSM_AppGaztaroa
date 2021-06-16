import React, { useEffect, useState } from 'react';
import { Text, Linking, Button, TextInput, ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';
import * as Firebase from 'firebase';
import { signIn, loggingOut } from '../API/firebaseMethods';


const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        let isMounted = true;
        const authListener = Firebase.auth().onAuthStateChanged(user => {
            if (isMounted && user) {
                navigation.navigate('Campo base');
                setAuth(true);
                setName(user.email);
                ToastAndroid.show('Usuario loggeado', ToastAndroid.SHORT);

            } else {
                navigation.navigate('Login');
                setAuth(false);
                //ToastAndroid.show('Log out', ToastAndroid.SHORT);
            }
        });
        return () => { isMounted = false };
    });

    handlePress = () => {
        if (!email) {
            ToastAndroid.show('Email field is required', ToastAndroid.SHORT);
        } else if (!password) {
            ToastAndroid.show('Password field is required', ToastAndroid.SHORT);
        } else {
            signIn(email, password);
            setEmail('');
            setPassword('');
        }
    }



    return (
        <Card>
            <Card.Title>Entra en tu cuenta:</Card.Title>
            <Card.Divider />
            {!auth && <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                autoCapitalize="none"
            />}
            {!auth && <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
            />}
            {!auth && <Button onPress={() => handlePress()}
                title="Entrar" />}
            {auth && <Text>Hola {name} </Text>}
            {auth && <Button
                onPress={() => loggingOut()}
                title="Salir" />}
        </Card>
    )
}


export default Login;