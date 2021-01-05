/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import LandingScreen from './components/Landing';
import RegisterScreen from './components/Register';
import LoginScreen from './components/Login';

const Stack = createStackNavigator();

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (!user) {
        setLogged(false);
        setLoaded(true);
      } else {
        setLogged(true);
        setLoaded(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!logged) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRoutName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Logged In</Text>
      <Button title="Sign Out" onPress={async () => await auth().signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
