import React from 'react';

import {
  Component,
	Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
	  Image,
	  Navigator,
  TouchableOpacity,
  Animation
} from 'react-native';

import FBLoginView from  './scripts/flogin';

class swipe_cards  extends React.Component {

  render() {
      return ( 
       <View>
          <FBLoginView/> 
       </View>
          )
    }
  }

  AppRegistry.registerComponent('swipe_cards', () => swipe_cards);
