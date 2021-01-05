import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC1G96K5-yKYQxBp1GYa2X7sW4Mdb8JWpk',
  authDomain: 'reactnativenew-64873.firebaseapp.com',
  projectId: 'reactnativenew-64873',
  storageBucket: 'reactnativenew-64873.appspot.com',
  messagingSenderId: '358755183059',
  appId: '1:358755183059:web:6cdbae67f17aa7d014e726',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
