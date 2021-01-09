import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {USER_STATE_CHANGE} from '../constants';

export const fetchUser = () => {
  return (dispatch) => {
    console.log('here');
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()});
        } else {
          console.log('does not exist');
        }
      })
      .catch((err) => console.log(err.message));
  };
};
