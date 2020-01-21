
import * as React from 'react';
import { Button, Image, View, Text, TouchableHighlight, Alert, Modal } from 'react-native';
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import CameraScreen from './CameraScreen'


export default class ImagePickerExample extends React.Component {
  constructor(){
    super()



    this.setPhoto =this.setPhoto.bind(this)
    this.closeCamera = this.closeCamera.bind(this)
  }



  state = {
    image: null,
    image64: null,
    ageGuess: null,
    takingPicture: false,
    modalVisible: false,
    type: Camera.Constants.Type.back,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  closeCamera = () => {
    this.setState({modalVisible:false})
  }

  render() {
    let { image } = this.state;
    let { image64 } = this.state
    let { ageGuess } = this.state

  
    return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
             {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}> */}
              
                <CameraScreen closeCamera={this.closeCamera} setPhoto={this.setPhoto}  />
              
              
             {/* </View> */}


          </Modal>
        
        <Button
        title="Take a selfie"
        onPress={()=>this.setModalVisible(!this.state.modalVisible)}
        />
        
       <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Button
        title="Analize"
        onPress={()=>this.scannerThunk(image64)}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        {ageGuess &&
        <Text>  {this.state.ageGuess}</Text>}
        <Button
        title="Reset"
        onPress={() => this.setState({image: null, image64: null, ageGuess: null, takePicture: null})}
        />
      </View>
      
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    this.getCameraPermissionAsync()
    console.log('hi');
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions');
      }
    }
  }

  getCameraPermissionAsync = async () => {
    if(Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if(status !== 'granted') {
        alert('Sorry, we need camera permissions')
      }
    }
  }

  setPhoto = (result) => {
    this.setState({ image: result.uri, 
      image64: result.base64
    });
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

  

    // console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri, 
        image64: result.base64
      });
    }

    // console.log('THIS IS REQ.BODY', this.state.image64)
  };



  scannerThunk = async image => {
    // let request = base64.toByteArray(image)
    let request = image
     await  axios.post('http://192.168.1.81:3000/test', {
    //  hey: 'there'
    request
    })

      .then(response => {
        this.setState({ageGuess: response.request.response})
        console.log(response.request.response)
        console.log('THIS IS STATE',this.state.ageGuess)
        // this.setState({ageGuess: response.request.response})
      })
    };
}