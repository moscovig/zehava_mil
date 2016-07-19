import  {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import Swiper from '../scripts/swiper.js';
/**
  eg.
  Please note:
  - if buttonView is not set then a default view will be shown
  - this is not meant to be a full example but highlights what you have access to
**/

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome';

/**
  Example FBLoginView class
  Please note:
  - this is not meant to be a full example but highlights what you have access to
  - If you use a touchable component, you will need to set the onPress event like below
**/
var FB_PHOTO_WIDTH = 200;


class FBLoginView extends React.Component {



  
  constructor(props) {
      super(props);
      this.state =  { user : null }
    }
    render(){
        var _this = this;
        var user = this.state.user;
        return (
          <View >



              <FBLogin style={{ marginBottom: 0, }}
        permissions={["email"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data){
          console.log("Logged in!");
          console.log(data);
          _this.setState({ user : data.credentials });
        }}
        onLogout={function(){
          console.log("Logged out.");
          _this.setState({ user : null });
        }}
        onLoginFound={function(data){
          console.log("Existing login found.");
          console.log(data);
          _this.setState({ user : data.credentials });
        }}
        onLoginNotFound={function(){
          console.log("No user logged in.");
          _this.setState({ user : null });
        }}
        onError={function(data){
          console.log("ERROR");
          console.log(data);
        }}
        onCancel={function(){
          console.log("User cancelled.");
        }}
        onPermissionsMissing={function(data){
          console.log("Check permissions!");
          console.log(data);
        }}
      />
        { user && <Photo user={user} /> }
        { user && <Info user={user} /> }
        <View>
       {//  <Text>Footer: { user ? user.token : "N/A" }</Text>  
        }
        </View>
          </View>
      )   
    }
}
module.exports = FBLoginView;


 class Photo extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
       photo: null
    }
  }

 componentWillMount(){
  var user = this.props.user;
  var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;
  fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          photo : {
            url : responseData.data.url,
            height: responseData.data.height,
            width: responseData.data.width
          }
        })
      })
  
 }


  
 //https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`
//10153450139109678

  render(){
    if(this.state.photo == null) return this.renderLoading();

    var photo = this.state.photo;

    return (
      <View style={styles.bottomBump}>

        <Image
          style={photo &&
            {
              height: photo.height,
              width: photo.width,
            }
          }
          source={{uri: photo && photo.url}}
        />
      </View>
    );
  }
  renderLoading(){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}

class Info extends React.Component {
 

  constructor(props) {
      super(props);
      this.state =  { info : null }
    }

  componentWillMount(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState ( {
          info : {
            name : responseData.name,
            email: responseData.email
          }
        })
      })
  }

  render(){
    var info = this.state.info;

    return (
      <View style={styles.bottomBump}>
      <Text>INFO:</Text>
        <Text>{ info && this.props.user.userId }</Text>
        <Text>{ info && info.name }</Text>
        <Text>{ info && info.email }</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  loginContainer: {
    marginTop: 150,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBump: {
    marginBottom: 15,
  },
});
