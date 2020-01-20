import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ShadowPropTypesIOS } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';

export default class CameraScreen extends React.Component{




  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
          quality:1,
          base64:true});
          props.setPhoto(photo)
          props.closeCamera()
    }
   
  }

 
 render(){
   return (

    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}  ref={ref => {this.camera = ref }}>
        <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
            <TouchableOpacity
                style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',                  
                }}>
                <Ionicons
                    name="ios-photos"
                    style={{ color: "#fff", fontSize: 40}}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
                }}
                onPress={takePicture()}
                >
                <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: 40}}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
                }}
                onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                <MaterialCommunityIcons
                    name="camera-switch"
                    style={{ color: "#fff", fontSize: 40}}
                />
            </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
}