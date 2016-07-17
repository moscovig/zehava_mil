/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
	Alert,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
	  Image,
	  Navigator,
  TouchableOpacity,
  Animation
} from 'react-native';





//var Sound = require('react-native-sound');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var displayText = ""
var dat = require('./ze2.json');

var max_mes_len = 600
//var err_sound = new Sound('err4.mp3', Sound.MAIN_BUNDLE);

//var ok_sound = new Sound('./sounds/ok.mp3', Sound.MAIN_BUNDLE);
//ok_sound.setVolume(100);

//ok_sound.play()
//ok_sound.setNumberOfLoops(-1);

class swipe_cards  extends React.Component {
	
  
  
  getRandForElem(prev_id){
	  		var p_rand = Math.floor(Math.random()*dat.data.length)
			while(prev_id==p_rand){
			 p_rand = Math.floor(Math.random()*dat.data.length)
		}
  		return p_rand;
  }
  getAndSetSide(random_likes){
	   if(Math.floor(Math.random()*2)==0){
			this.leftChoice=this.item1.like_count+" likes";
		   	this.rightChoice=random_likes+" likes";
			return 0;
	    }
	    else
	    {			
			this.rightChoice=this.item1.like_count +" likes";
			this.leftChoice=random_likes+" likes";
	        return  1;
	    }
  }
	
 getRandomLikes(likes){
	 		var p_likes = likes
	 		if(likes<2)
				p_likes = 3
			var ans = likes	
			while(ans == likes || ans < 0)		{
				var rand = Math.ceil(Math.random()*p_likes)
					if(Math.floor(Math.random()*2)==0)
						ans = likes - rand
					else
						ans = likes + rand
			}
	 return ans;
 		}
		

	 constructor(){
        super()
      
        this.state = {
              x:0,y: 0,
			      lastDragDirectio: displayText

        };
			    this.resetPosition = this.resetPosition.bind(this);
			    this.setPosition = this.setPosition.bind(this);

		this.drag = {
			x:0,y:0
			}


		this.score = 0
		this.image_status=require('./images/welcome_small.jpg')
		this.choosen_side = 0 //0 means left 1 means right
	
	  	var r_elem =this.getRandForElem(0)
		
		this.item1 = dat.data[r_elem]
		this.elem_id = r_elem
		var random_likes = this.getRandomLikes(this.item1.like_count)
		this.choosen_side = this.getAndSetSide(random_likes)
					
	   
	}
		


		
  playOk(){
	  this.score = this.score + 1
	  
	this.image_status=require('./images/like.png')

	/*  Alert.alert(
  'Well done!',
	this.choosen_side+'Your score: '+this.score	  
		  
  
)*/
	  
 /*   ok_sound.play((success) => {
      if (success) {
	console.log('successfully finished playing');
      } else {
	console.log('playback failed due to audio decoding errors');
    }
    });*/
  }
  
  playErr(){
	  
	  	this.image_status=require('./images/dislike.png')
	/*  Alert.alert(
  'Wrong answer',
	this.choosen_side+'Your score: '+this.score
		  )*/
    /*err_sound.play((success) => {
      if (success) {
	console.log('successfully finished playing');
      } else {
	console.log('playback failed due to audio decoding errors');
      }
});*/
  }
		
  setPosition(e) {
	      
    //Update our state with the deltaX/deltaY of the movement
	if(this.drag.x!=0)
		{
		this.setState({
		  x: this.state.x + (e.nativeEvent.pageX - this.drag.x),
		  y: this.state.y + (e.nativeEvent.pageY - this.drag.y)
		});
	}
    this.drag.x = e.nativeEvent.pageX;
    this.drag.y = e.nativeEvent.pageY;
  }
  
  
  resetPosition(e) {
    
    this.dragging = false;
    //Reset on release

	if(this.state.x>60 || this.state.x < -60)  {
	  
	  
	    var left = e.nativeEvent.pageX < (windowSize.width/2)
	    if((left &&  this.choosen_side == 0) || (this.choosen_side == 1 && !left) ){
	      this.playOk()
	    }
	    else
	    {
			this.playErr()
	    }
	  
		
	  	var r_elem =this.getRandForElem(this.elem_id)
		this.item1 = dat.data[r_elem]
		this.elem_id = r_elem
		var random_likes = this.getRandomLikes(this.item1.like_count)
		this.choosen_side = this.getAndSetSide(random_likes)
					
	}
	
   // var left = e.nativeEvent.pageX < (windowSize.width/2),
     //   displayText = left ? 'Released left' : 'Released right';
 
	      this.setState({
      x: 0,
      y: 0,
		lastDragDirectio: displayText
    })
		  this.drag = {
		x:0,y:0
		}
		  
	


  }

 _onStartShouldSetResponder(e) {
    this.dragging = true;
    this.rotateTop = e.nativeEvent.locationY <= 150;
    this.drag = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY
    }
    return true;
  }
  getRotationDegree(rotateTop, x) {
    var rotation = ( (x/windowSize.width) * 100)/3;
    var rotate = rotateTop ? 1 : -1,
        rotateString = (rotation * rotate) + 'deg';
    return rotateString;
  }
  getCardStyle() {
    var transform = [{translateX: this.state.x}, {translateY: this.state.y}];
    if (this.dragging) {
        transform.push({rotate: this.getRotationDegree(this.rotateTop, this.state.x)})
    }
    return {transform: transform};
  }
	  
render() {
    return (
      <View style={styles.container}>
      
            <View >
      	    <Image style={styles.head_image1} source={this.image_status} />

      </View>
      
      
      <View >
<Text>Your score: {this.score} </Text>
      </View>
      
      
          <View
		    onStartShouldSetResponder={this._onStartShouldSetResponder}
            onResponderMove={this.setPosition}
            onResponderRelease={this.resetPosition}
            onMoveShouldSetResponder={this._onMoveShouldSetResponder}
            style={[styles.card,this.getCardStyle()]}
          >
			  <Text style={styles.comment}>
				  {this.item1.message.substr(0,max_mes_len)}
			  </Text>
			 
    
      </View>   
      <View style={styles.likes_num}>
      	<View style={styles.likes_view_left}>	 

            <Text style={styles.like_text_left}>{this.leftChoice}</Text>
         </View>
	<View style={styles.likes_view_right}>	 

	    <Text style={styles.like_text_right}>{this.rightChoice} </Text>
         
         </View>
      
      </View>
  
         
<View style={styles.likes}>
      	<View style={styles.likes_left}>	 
	    <Image style={styles.like_icon} source={require('./images/like.png')} >
         </Image>
         </View>
	<View style={styles.likes_right}>	 
	<Image style={styles.like_icon} source={require('./images/like.png')} >
         </Image>
         
         </View>
      
      </View>
      <View style={styles.direction}>
      
            <Text>{this.state.lastDragDirectio}</Text>
         </View>
         
      </View>
    );
  }
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
 
  dragText: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
   likes: {
     width:320,
     position:'relative',
      flexDirection:'row',
          justifyContent: 'flex-end',
	  alignItems:'flex-end'},
likes_num: {
     width:320,
     position:'relative',
      flexDirection:'row',
          justifyContent: 'flex-end',
	  alignItems:'flex-end'},

likes_view_left: {
 width:310},
likes_left: {
 width:270},
likes_right: {
  },
rightText: {
  textAlign:'right'
},
like_icon: {
	    width: 40,
            height: 40,
            backgroundColor: 'transparent',
	      marginLeft: 0
},
 like_text: {
	 textAlign:'center',
	  color:'black'
},

 like_text_left: {
	textAlign:'left',
	  color:'black',
	 left:50
},
 like_text_right: {
	 textAlign:'right',
	  color:'black'
},
head_image: {
  width:400,
  height:90,
  marginBottom:30
  
},
head_image1: {

  
},
 leftChoice: {
   alignSelf:'auto',
	  justifyContent: 'flex-end',
   right:0
   },
rightChoice: {
  alignSelf:'auto' 
	},
	
	
direction: {
      position:'relative',
      bottom:0
   },
card: {
  padding: 4,
  marginRight: 5,
  borderWidth: 1,
  borderColor: '#48BBEC'},
  cardImage: {
    height: 500,
	   width: 280
  },
  textLeft: {
    position: 'absolute',
    left:0,
    top:0
  },
  textRight: {
    position: 'absolute',
    right: 0,
    top: 0
  },
   comment: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC',
	textAlign:'right',
	   height:130,
	   width: 260
  }
});

AppRegistry.registerComponent('swipe_cards', () => swipe_cards);
