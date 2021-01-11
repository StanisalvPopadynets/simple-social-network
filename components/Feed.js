import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const Feed = (props) => {
  const {posts: postsFromState, following} = useSelector((state) => state.usersState);
  const {users, usersLoaded} = useSelector((state) => state.usersDataState);

  const [postsLocal, setPostsLocal] = useState([]);

  useEffect(() => {
    let posts = [];
    if (usersLoaded === following.length) {
      for (let i = 0; i < following.length; i++) {
        const user = users.find((el) => el.uid === following[i]);
        if (user !== undefined) {
          posts = [...posts, ...user.posts];
        }
      }
      posts.sort((curr, next) => curr.creation - next.creatin);
      setPostsLocal(posts);
    }
  }, [usersLoaded, following, users]);

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
