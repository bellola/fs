import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';

export default class Results extends React.Component{
constructor(props){
    super(props)
}



render(){
    return(
        <View>
            <TouchableHighlight
                onPress={() => this.props.startAgain()}
               >
                  <Image source={require("./assets/tryagain.png")} style={{height: 100, width:250}} />
                </TouchableHighlight>
        </View>
    )
}
}


