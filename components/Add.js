import React, {PureComponent, useState, useEffect, useRef} from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Permissions from 'react-native-permissions';

const Add = ({navigation}) => {
  const [flash, setFlash] = useState('off');
  const [zoom, setZoom] = useState(0);
  const [autoFocus, setAutoFocus] = useState('on');
  const [depth, setDepth] = useState(0);
  const [type, setType] = useState('back');
  const [permission, setPermission] = useState('undetermined');
  const [imageURI, setImageURI] = useState('');

  const cameraRef = useRef(null);
  useEffect(() => {
    Permissions.check('photo').then((response) => {
    // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    setPermission(response);
    });
  }, []);

  const toggleFlash = () => {
    setFlash(flashModeOrder[flash]);
  }
  const zoomOut = () => {
    setZoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1);
  }
  const zoomIn = () => {
    setZoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1);
  }
  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
      setImageURI(data.uri);
    }
  };
  if (!imageURI) {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={type}
          flashMode={flash}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (imageURI) {
    return (
      <View style={{flex: 1}}>
        <Image source={{uri: imageURI}} style={{flex: 1}} />
        <Button
          title="Save"
          onPress={() => navigation.navigate('Save', {imageURI})}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Add;
