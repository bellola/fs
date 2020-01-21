import React from 'react';
import { View, Image, TouchableHighlight, Text } from 'react-native';



export default class Results extends React.Component{
constructor(props){
    super(props)

    this.images = [
            require('./assets/num1.png'),
            require('./assets/num2.png'),
            require('./assets/num3.png'),
            require('./assets/num4.png'),
            require('./assets/num5.png'),
            require('./assets/num6.png'),
            require('./assets/num7.png'),
            require('./assets/num8.png'),
            require('./assets/num9.png'),
            require('./assets/num10.png'),
            require('./assets/num11.png')
    ]
    this.next = this.next.bind(this)
    this.state = {index: 0}
}

componentDidMount() {
    this.next();
}


next(){
    setTimeout(() =>{
        this.setState({index:(this.state.index+1)%11})
        this.next()
    }, 60)
}


render(){

    
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            {!this.props.ageGuess &&
            <Image
            source={this.images[this.state.index]}
            style={{height:150, width:150}}
            />
            }
            {this.props.ageGuess &&
            <View>
                <Text>    {this.props.ageGuess}</Text>
               <TouchableHighlight
                    onPress={() => this.props.startAgain()}
                    >
                    <Image source={require("./assets/tryagain.png")} style={{height: 100, width:250}} />
                </TouchableHighlight>
            </View>
            }
        </View>
    )
}
}


