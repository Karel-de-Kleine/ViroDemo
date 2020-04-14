/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"API_KEY_HERE",
}

console.disableYellowBox = true;
// Sets the default scene you want for AR and VR
var InitialDemo1Scene = require('./js/ARPortals/MainPScene.js');
var InitialDemo2Scene = require('./js/Snapchat/MainScene.js');
var InitialDemo3Scene = require('./js/HelloWorldScene.js');

var UNSET = "UNSET";
var DEMO1_NAVIGATOR_TYPE = "Demo 1";
var DEMO2_NAVIGATOR_TYPE = "Demo 2";
var DEMO3_NAVIGATOR_TYPE = "Demo 3";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getDemoNavigator = this._getDemo1Navigator.bind(this);
    this._getDemo2Navigator = this._getDemo2Navigator.bind(this);
    this._getDemo3Navigator = this._getDemo3Navigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getDemo3Navigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == DEMO1_NAVIGATOR_TYPE) {
      return this._getDemo1Navigator();
    } else if (this.state.navigatorType == DEMO2_NAVIGATOR_TYPE) {
      return this._getDemo2Navigator();
    } else if (this.state.navigatorType == DEMO3_NAVIGATOR_TYPE) {
      return this._getDemo3Navigator();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>

          <TouchableHighlight style={localStyles.buttons}
          onPress={this._getExperienceButtonOnPress(DEMO1_NAVIGATOR_TYPE)}
          underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText} > Demo 1 </Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(DEMO2_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>Demo 2</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(DEMO3_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>Demo 3</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

_getDemo1Navigator() {
  return(
    <ViroARSceneNavigator {...this.state.sharedProps}
    initialScene={{scene: InitialDemo1Scene}} onExitViro={this._exitViro}/>
  );
}
  // Returns the ViroARSceneNavigator which will start the AR experience

_getDemo2Navigator() {
  return (
    <ViroARSceneNavigator {...this.state.sharedProps}
      initialScene={{scene: InitialDemo2Scene}} />
  );
}

_getDemo3Navigator() {
  return (
    <ViroVRSceneNavigator {...this.state.sharedProps}
      initialScene={{scene: InitialDemo3Scene}} onExitViro={this._exitViro}/>
  );
}
  // Returns the ViroSceneNavigator which will start the VR experience


  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = ViroSample
