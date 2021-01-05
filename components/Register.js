import {useState} from 'react';
import React from 'react';
import {View, Button, TextInput, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Register = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const onSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      // debugger;
      console.log(auth().currentUser.uid);
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .set({name, email});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="name" onChangeText={(text) => setName(text)} />
      <TextInput placeholder="email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <Button title="SIGN UP" onPress={() => onSignUp()} />
    </View>
  );
};

export default Register;
