/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import roodReducer from './redux/reducers';
import thunk from 'redux-thunk';

const reduxStore = createStore(roodReducer, applyMiddleware(thunk));

import LandingScreen from './components/Landing';
import RegisterScreen from './components/Register';
import LoginScreen from './components/Login';
import MainScreen from './components/Main';
import AddScreen from './components/Add';

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
    <Provider store={reduxStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Add" component={AddScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
