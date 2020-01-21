import React from 'react';
import { Text, View, TouchableOpacity, ShadowPropTypesIOS } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';

export default class CameraScreen extends React.Component{

constructor(props){
    super(props)

this.state = {

    hasPermission: null,
    cameraType: Camera.Constants.Type.back,

}

}


  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  handleCameraType=()=>{
    const { cameraType } = this.state

    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
          quality:1,
          base64:true});
          this.props.setPhoto(photo)
          this.props.closeCamera()
    }
  }

  selectPicture = async() => {
    await this.props.pickImage();
    this.props.closeCamera()
  }


 
 render(){
    console.log(this.props)
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
       
      return (


 

    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }}  type={this.state.cameraType} ref={ref => {this.camera = ref }}>
        <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
            <TouchableOpacity
                style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',                  
                }}
                onPress={() => this.selectPicture()}
                >
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
                onPress={() => this.takePicture()}
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
                onPress={() => this.handleCameraType()}
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
}}