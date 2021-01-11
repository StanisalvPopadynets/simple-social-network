import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
  userCleanUp,
} from '../redux/actions';
import FeedScreen from './Feed';
import ProfileScreen from './Profile';
import SearchScreen from './Search';

const EmptyScreen = () => null;

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userCleanUp());
    dispatch(fetchUser());
    dispatch(fetchUserPosts());
    dispatch(fetchUserFollowing());
  }, []);
  return (
    <Tab.Navigator initialRouteName="Feed" labeled={false}>
      {/* <Text>{usersState.currentUser.name}Logged In</Text>
      <Button title="Sign Out" onPress={async () => await auth().signOut()} /> */}
      <Tab.Screen
        name="Feed"
        tab
        component={FeedScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        listeners={({navigation}) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Profile', {uid: auth().currentUser.uid});
          },
        })}
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
