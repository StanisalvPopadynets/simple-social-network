import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, FlatList, Button, TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {fetchUsersData} from '../redux/actions';

const Comments = (props) => {
  const {users, usersFollowingLoaded} = useSelector((state) => state.usersDataState);
  const dispatch = useDispatch();

  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const matchUserToComment = (comments) => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].hasOwnProperty('user')) {
          continue;
        }
        const user = users.find((x) => x.uid === comments[i].creator);
        if (user === undefined) {
          dispatch(fetchUsersData(comments[i].creator, false));
        } else {
          comments[i].user = user;
        }
      }
      setComments(comments);
    };
    if (props.route.params.postId !== postId) {
      firestore()
        .collection('posts')
        .doc(props.route.params.uid)
        .collection('userPosts')
        .doc(props.route.params.postId)
        .collection('comments')
        .get()
        .then((snapshot) => {
          let fetchedComments = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          });
          matchUserToComment(fetchedComments);
          setPostId(props.route.params.postId);
        });
    } else {
      matchUserToComment(comments);
    }
  }, [props.route.params.postId, users]);

  const onCommentSubmit = () => {
    firestore()
      .collection('posts')
      .doc(props.route.params.uid)
      .collection('userPosts')
      .doc(props.route.params.postId)
      .collection('comments')
      .add({
        creator: auth().currentUser.uid,
        text,
      });
  };

  return (
    <View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({item}) => (
          <View>
            <Text>{item.text}</Text>
            <Text style={{textAlign: 'right'}}>{item.user?.name}</Text>
          </View>
        )}
      />
      <View>
        <TextInput
          placeholder="Enter your comment..."
          onChangeText={(textValue) => setText(textValue)}
        />
        <Button onPress={onCommentSubmit} title="Submit" />
      </View>
    </View>
  );
};

export default Comments;
