import {useState} from 'react';
import React from 'react';
import {View, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSignUp = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <Button title="SIGN IN" onPress={() => onSignUp()} />
    </View>
  );
};

export default Login;
