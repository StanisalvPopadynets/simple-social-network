/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Config from "react-native-config";
import App from './App';
import {name as appName} from './app.json';

import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: Config.REACT_NATIVE_APP_FIREBASE_API_KEY,
  authDomain: Config.REACT_NATIVE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: Config.REACT_NATIVE_APP_FIREBASE_POJECT_ID,
  storageBucket: Config.REACT_NATIVE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.REACT_NATIVE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: Config.REACT_NATIVE_APP_FIREBASE_APP_ID,
  databaseURL: Config.REACT_NATIVE_APP_FIREBASE_DATABASE_URL,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

AppRegistry.registerComponent(appName, () => App);
