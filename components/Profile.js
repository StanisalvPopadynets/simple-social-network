import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const Profile = () => {
  const {posts, currentUser} = useSelector((state) => state.usersState);
  return (
    <View style={styles.container}>
      <Text>{currentUser.name}</Text>
      <Text>{currentUser.email}</Text>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
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
    backgroundColor: 'tomato',
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
