'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Dimensions,
  View
} from 'react-native';

import Forecast from './forecast';

class Chap3Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '94066',
      forecast: null
    };
  }

  render() {
    console.log("Rendering");

    let forecast = <Text style={[styles.infoText, {fontSize: 18, marginTop: 20, padding: 10}]}> Please enter a valid zipcode above </Text>
    if (this.state.forecast) {
      forecast = <Forecast {...this.state.forecast} />
    }

    return (
        <View style={styles.container}>
          <Image style={styles.backDrop} source={require('./weather.jpg')} resizeMode="stretch">
            <View style={styles.overlay}>
              <View style={styles.zipContainer}>
                <Text style={styles.infoText}> Current wheather in</Text>
                <TextInput style={styles.zipCode}
                           onSubmitEditing={this._handleTextChange.bind(this)} 
                           maxLength={5}
                           underlineColorAndroid="#FFFFFF"
                           keyboardType="numeric"
                           value={this.state.zip}
                           onChangeText={(text) => this.setState({zip: text})}/> 
              </View>
              {forecast}
            </View>
          </Image>
        </View>
        
    );
  }

  componentDidMount() {
     this._fetchWeather()
  }

  _handleTextChange(event) {
    this.setState({zip: event.nativeEvent.text});
    console.log("It was called");
    this._fetchWeather();
  }

  _fetchWeather() {
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},us&appid=44db6a862fba0b067b1930da0d769e98&units=imperial`
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((JSON) =>   {
        if (!JSON.cod) {
          throw "Error on response"
        }
        this.setState({
          forecast: {
            main: JSON.weather[0].main,
            description: JSON.weather[0].description,
            temp: JSON.main.temp,
            city: JSON.name
          }
        });
      })
      .catch((error) => {
        console.warn(error);
        this.setState({zip: '', forecast: null})
      });
  }

}

//Don't do this at Home! It's dangerous
let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },

  overlay: {
     backgroundColor: '#000000',
     opacity: 0.75,
  },

  zipContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },

  infoText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center'
  },

  zipCode: {
    color: '#FFFFFF',
    fontSize: 14,
    height: 40,
    width: 50,
    marginLeft: 5
  },

  backDrop: {
    flex: 1,
    width: width,
    height: height
  }
});

export default Chap3Weather