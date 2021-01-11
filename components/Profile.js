import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, FlatList, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Profile = (props) => {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isFollowing, setFollowing] = useState(false);
  const {posts, currentUser, following} = useSelector((state) => state.usersState);
  useEffect(() => {
    if (props.route.params.uid === auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firestore()
        .collection('users')
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log('does not exist');
          }
        })
        .catch((err) => console.log(err.message));
      firestore()
        .collection('posts')
        .doc(props.route.params.uid)
        .collection('userPosts')
        .orderBy('creation', 'asc')
        .get()
        .then((snapshot) => {
          const fetchedPosts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          });
          setUserPosts(fetchedPosts);
        })
        .catch((err) => console.log(err.message));
    }
    setFollowing(following.indexOf(props.route.params.uid) > -1); // check if a user is following the profile he is currently viewing
  }, [props.route.params.uid, currentUser, posts, following]);

  const follow = () => {
    firestore()
      .collection('following')
      .doc(auth().currentUser.uid)
      .collection('userFollowing')
      .doc(props.route.params.uid)
      .set({});
  };

  const unfollow = () => {
    firestore()
      .collection('following')
      .doc(auth().currentUser.uid)
      .collection('userFollowing')
      .doc(props.route.params.uid)
      .delete();
  };

  const onLogout = () => {
    auth().signOut();
  };

  if (!user) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>

      {props.route.params.uid !== auth().currentUser.uid ? (
        <View>
          {isFollowing ? (
            <Button title="Unfollow" onPress={() => unfollow()} />
          ) : (
            <Button title="Follow" onPress={() => follow()} />
          )}
        </View>
      ) : (
        <Button title="Logout" onPress={onLogout} />
      )}
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: item.downloadURL}} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
  },
  containerGallery: {
    flex: 1,
  },
  imageContainer: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

export default Profile;
