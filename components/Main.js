import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {fetchUser, fetchUserPosts} from '../redux/actions';
import FeedScreen from './Feed';
import ProfileScreen from './Profile';

const EmptyScreen = () => null;

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.usersState);
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchUserPosts());
    // fetchUserPosts();
  }, []);
  return (
    <Tab.Navigator initialRouteName="Feed">
      {/* <Text>{usersState.currentUser.name}Logged In</Text>
      <Button title="Sign Out" onPress={async () => await auth().signOut()} /> */}
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddContainer"
        component={EmptyScreen}
        listeners={({navigation}) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Add');
          },
        })}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
