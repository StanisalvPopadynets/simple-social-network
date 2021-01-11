import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Search = (props) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    firestore()
      .collection('users')
      .where('name', '>=', search)
      .get()
      .then((snapshot) => {
        const fetchedUsers = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });
        setUsers(fetchedUsers);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        onChangeText={(text) => fetchUsers(text)}
      />

      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Profile', {uid: item.id})
            }>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;
