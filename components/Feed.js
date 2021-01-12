import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const Feed = (props) => {
  const {posts: postsFromState, following} = useSelector((state) => state.usersState);
  const {users, usersFollowingLoaded} = useSelector((state) => state.usersDataState);
  // debugger
  const [postsLocal, setPostsLocal] = useState([]);

  useEffect(() => {
    let posts = [];
    if (usersFollowingLoaded === following.length) {
      for (let i = 0; i < following.length; i++) {
        const user = users.find((el) => el.uid === following[i]);
        if (user !== undefined) {
          posts = [...posts, ...user.posts];
        }
      }
      posts.sort((curr, next) => curr.creation - next.creation);
      setPostsLocal(posts);
    }
  }, [usersFollowingLoaded, following, users]);

  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={postsLocal}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Text>{item.user.name}</Text>
              <Image style={styles.image} source={{uri: item.downloadURL}} />
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
