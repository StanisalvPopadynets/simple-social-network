import React, {useState} from 'react';
import {View, StyleSheet, Image, TextInput, Button} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Save = (props, {navigation}) => {
  const [caption, setCaption] = useState('');

  const uploadImage = async () => {
    const uri = props.route.params.imageURI;
    const res = await fetch(uri);
    const blob = await res.blob();
    const task = storage()
      .ref()
      .child(`post/${auth().currentUser.uid}/${Math.random().toString(36)}`)
      .put(blob);

    const savePostData = (downloadURL) => {
      firestore()
        .collection('posts')
        .doc(auth().currentUser.uid)
        .collection('userPosts')
        .add({
          downloadURL,
          caption,
          creation: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          props.navigation.popToTop();
        });
    };

    const taskProgress = (snapshot) => {
      console.log('Transfered' + snapshot.bytesTransfered);
    };
    const taskComplete = (snapshot) => {
      snapshot.ref.getDownloadURL().then((snpsht) => {
        console.log(snpsht);
        savePostData(snpsht);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on('state_changed', taskProgress, taskError, taskComplete);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: props.route.params.imageURI}} style={{flex: 1}} />
      <TextInput
        placeholder="Write a Caption"
        onChangeText={(text) => setCaption(text)}
      />
      <Button title="Save" onPress={uploadImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Save;
