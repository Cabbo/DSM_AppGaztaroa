import * as Firebase from "firebase";
//import "firebase/firestore";
import { Alert } from "react-native";


export async function signIn(email, password) {
    try {
        await Firebase
            .auth()
            .signInWithEmailAndPassword(email.trim(), password);
    } catch (err) {
        Alert.alert("Login error!", err.message);
    }
}

export async function loggingOut() {
    try {
        await Firebase.auth().signOut();
    } catch (err) {
        Alert.alert('There is something wrong!', err.message);
    }
}