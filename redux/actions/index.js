import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA,
  USERS_LIKES_STATE_CHANGE,
} from '../constants';

export const userCleanUp = () => {
  return (dispatch) => {
    dispatch({type: CLEAR_DATA});
  };
};

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

export const fetchUserFollowing = () => {
  return (dispatch) => {
    firestore()
      .collection('following')
      .doc(auth().currentUser.uid)
      .collection('userFollowing')
      .onSnapshot((snapshot) => {
        const following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        dispatch({type: USER_FOLLOWING_STATE_CHANGE, following});
        for (let i = 0; i < following.length; i++) {
          dispatch(fetchUsersData(following[i], true));
        }
      });
  };
};

export const fetchUsersData = (uid, shouldGetPosts) => {
  return (dispatch, getState) => {
    const found = getState().usersDataState.users.some((el) => el.uid === uid);
    if (!found) {
      firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = uid;
            dispatch({
              type: USERS_DATA_STATE_CHANGE,
              user,
            });
            // dispatch(fetchUsersFollowingPosts(user.uid));
          } else {
            console.log('does not exist');
          }
          if (shouldGetPosts) {
            dispatch(fetchUsersFollowingPosts(uid));
          }
        })
        .catch((err) => console.log(err.message));
    }
  };
};

export const fetchUsersFollowingPosts = (uid) => {
  return (dispatch, getState) => {
    firestore()
      .collection('posts')
      .doc(uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
      .then((snapshot) => {
        console.log({snapshot, uid});
        const user = getState().usersDataState.users.find((el) => el.uid === uid);
        const posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data, user};
        });
        for (let i = 0; i < posts.length; i++) {
          dispatch(fetchUsersFollowingLikes(uid, posts[i].id));
        }
        dispatch({type: USERS_POSTS_STATE_CHANGE, posts, uid});
      })
      .catch((err) => console.log(err.message));
  };
};

export const fetchUsersFollowingLikes = (uid, postId) => {
  return (dispatch) => {
    firestore()
      .collection('posts')
      .doc(uid)
      .collection('userPosts')
      .doc(postId)
      .collection('likes')
      .doc(auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        let doesCurrentUserLike = false;
        if (snapshot.exists) {
          doesCurrentUserLike = true;
        }
        dispatch({type: USERS_LIKES_STATE_CHANGE, postId, doesCurrentUserLike});
      });
  };
};
