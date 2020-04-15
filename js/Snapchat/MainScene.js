'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroSceneNavigator,
  ViroARScene,
  ViroMaterials,
  ViroAmbientLight,
  ViroSpotLight,
  ViroDirectionalLight,
  ViroAnimations,
  ViroParticleEmitter,
  ViroSurface,
  Viro3DObject,
  ViroNode,
} from 'react-viro';

var createReactClass = require('create-react-class');
var MainScene = createReactClass({
  getInitialState() {
    return {
      runAnimation:true,
    }
  },

  render: function() {
    return (
      <ViroARScene>
      <ViroAmbientLight color="#ffffff" intensity={200}/>

      <ViroNode position={[0, -1, -2]} dragType="FixedToWorld" onDrag={()=>{}}>
      <ViroSpotLight
          innerAngle={5}
          outerAngle={25}
          direction={[0,-1,0]}
          position={[0, 5, 0]}
          color="#ffffff"
          castsShadow={true}
          shadowMapSize={2048}
          shadowNearZ={2}
          shadowFarZ={7}
          shadowOpacity={.7}
      />

      <Viro3DObject
        source={require('./Church/ju-87.obj')}
        resources={[require('./Church/diff.jpg'),
                    require('./Church/bump.jpg')]}
        position={[0, 0, 0]}
        scale={[.1, .1, .1]}
        type="OBJ"
        onClick={this._onTappedIcecream}
        animation={{name:"02", run:this.state.runAnimation, loop:true,}}
      />

      <ViroSurface
        rotation={[-90, 0, 0]}
        position={[0, 0, 0]}
        width={2.5} height={2.5}
        arShadowReceiver={true}
      />
      </ViroNode>

      </ViroARScene>
    );
  },

  _onTappedIcecream() {
    this.setState({
      runAnimation : !this.state.runAnimation,
    })
  },
});

module.exports = MainScene;