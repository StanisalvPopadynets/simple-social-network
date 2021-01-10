import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE} from '../constants';

export const fetchUser = () => {
  return (dispatch) => {
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

export const fetchUserPosts = () => {
  return (dispatch) => {
    firestore()
      .collection('posts')
      .doc(auth().currentUser.uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });
        dispatch({type: USER_POSTS_STATE_CHANGE, posts});
      })
      .catch((err) => console.log(err.message));
  };
};
