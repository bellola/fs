
import * as React from 'react';
import {Image, View, Text, StyleSheet, Alert, Modal, TouchableHighlight } from 'react-native';
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import CameraScreen from './CameraScreen'
import Results from './Results'


export default class ImagePickerExample extends React.Component {
  constructor(){
    super()


    this._pickImage = this._pickImage.bind(this)
    this.setPhoto =this.setPhoto.bind(this)
    this.closeCamera = this.closeCamera.bind(this)
    this.startAgain = this.startAgain.bind(this)
  }



  state = {
    image: null,
    image64: null,
    ageGuess: null,
    takingPicture: false,
    modal1Visible: false,
    modal2Visible: false,
    type: Camera.Constants.Type.back,
  };

  setModalVisible(visible) {
    this.setState({modal1Visible: visible});
  }


  closeCamera = () => {
    this.setState({modal1Visible:false})
  }

  resultHandler = (image64) => {
    this.scannerThunk(image64)
    this.setState({modal2Visible: !this.state.modal2Visible})

  }

  startAgain = () =>{
    this.setState({image: null, 
      image64: null, 
      ageGuess: null, 
      takePicture: null,
      modal2Visible: false
    })
    
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
          visible={this.state.modal1Visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          
                <CameraScreen closeCamera={this.closeCamera} setPhoto={this.setPhoto} pickImage={this._pickImage} />
          </Modal>
        <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modal2Visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
            <Results startAgain={this.startAgain} ageGuess={this.state.ageGuess} />
        </Modal>
        <Image source={require("./assets/wmaa.png")} style={{width:250,height:125}} />
          {!image &&
        <TouchableHighlight
        onPress={()=>this.setModalVisible(!this.state.modal1Visible)}
        >
          <Image
          source={require("./assets/camera.png")}
          style={{height:250, width: 125}}
          />
        </TouchableHighlight>
          }
    

        {image &&
          <View>
               <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius:100 }} />
               <TouchableHighlight
               onPress={()=>this.resultHandler(image64)}

               >
                  <Image source={require('./assets/tellme.png')} style={{height: 100, width:200}} />
               </TouchableHighlight>
            
          </View>
          }
        {ageGuess &&
        <Text>  {this.state.ageGuess}</Text>}
     
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  }
});