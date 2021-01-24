import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, FlatList, Button} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Feed = (props) => {
  const {following} = useSelector((state) => state.usersState);
  const {users, usersFollowingLoaded, feed} = useSelector((state) => state.usersDataState);
  // debugger
  const [postsLocal, setPostsLocal] = useState([]);

  useEffect(() => {
    let feedPosts = feed;
    if (usersFollowingLoaded === following.length && following.length !== 0) {
      // for (let i = 0; i < following.length; i++) {
      //   const user = users.find((el) => el.uid === following[i]);
      //   if (user !== undefined) {
      //     posts = [...posts, ...user.posts];
      //   }
      // }
      feedPosts.sort((curr, next) => curr.creation - next.creation);
      setPostsLocal(feedPosts);
    }
  }, [usersFollowingLoaded, following, users, feed]);

  const onLikePress = (userId, postId) => {
    console.log(postsLocal)
    return
    firestore()
      .collection('posts')
      .doc(userId)
      .collection('userPosts')
      .doc(postId)
      .collection('likes')
      .doc(auth().currentUser.uid)
      .set({});
  };

  const onDislikePress = (userId, postId) => {
    firestore()
      .collection('posts')
      .doc(userId)
      .collection('userPosts')
      .doc(postId)
      .collection('likes')
      .doc(auth().currentUser.uid)
      .delete({});
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={postsLocal}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Text>{item.user?.name}</Text>
              <Image style={styles.image} source={{uri: item.downloadURL}} />
              {item.doesCurrentUserLike ? (
                <Button
                  title="Dislike"
                  onPress={() => onDislikePress(item.user.uid, item.id)}
                />
              ) : (
                <Button
                  title="Like"
                  onPress={() => onLikePress(item.user.uid, item.id)}
                />
              )}
              <Text
                onPress={() =>
                  props.navigation.navigate('Comments', {
                    postId: item.id,
                    uid: item.user.uid,
                  })
                }>
                View Comments...
              </Text>
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

export default Feed;
