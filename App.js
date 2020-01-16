
import * as React from 'react';
import { Button, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios'


export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    image64: null,
    ageGuess: null
  };

  render() {
    let { image } = this.state;
    let { image64 } = this.state
    let { ageGuess } = this.state
    


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Button
        title="Take a selfie"
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
        onPress={() => this.setState({image: null, image64: null, ageGuess: null})}
        />
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
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
     await  axios.post('http://10.13.46.56:3000/test', {
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