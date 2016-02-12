/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  ToastAndroid,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback, 
  Text,
  View
} from 'react-native';

class TouchableHighLightTest extends Component {
  render() {
    return (
      <View style={styles.container}>
       <TouchableHighlight style={styles.button} underlayColor="#FF0000" onPress={()=> {ToastAndroid.show('TouchableHighlight', ToastAndroid.SHORT)}}>
          <Text style={{fontSize: 20}}>TouchableHighlight</Text>
        </TouchableHighlight>

        {/* For some reason we have to wrap <Text> in <View> otherwise it can't see <Text>*/}
        <TouchableNativeFeedback 
          underlayColor="#FF0000"
          background={TouchableNativeFeedback.Ripple('#FF0000')}
          onPress={()=> {ToastAndroid.show('TouchableNativeFeedback', ToastAndroid.SHORT)}}>
          <View style={styles.button}><Text style={{fontSize: 20}}>TouchableNativeFeedback</Text></View>
        </TouchableNativeFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=> {ToastAndroid.show('TouchableWithoutFeedback', ToastAndroid.SHORT)}}>
          <Text style={{fontSize: 20}}>TouchableWithoutFeedback</Text>
        </TouchableWithoutFeedback>

        <TouchableOpacity style={styles.button} onPress={()=> {ToastAndroid.show('TouchableOpacity', ToastAndroid.SHORT)}}>
          <Text style={{fontSize: 20}}>TouchableOpacity</Text>
        </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  button: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: "blue",
    padding: 10,
    margin: 10
  }

});


AppRegistry.registerComponent('TouchableHighLightTest', () => TouchableHighLightTest);
