import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'

import * as THREE from '../build/three.module.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';

import React, {useEffect, useState} from 'react';
import {Apis} from "bitsharesjs-ws";

function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 250;

  // scene

  scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
  scene.add( ambientLight );

  const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
  camera.add( pointLight );
  scene.add( camera );

  // manager

  function loadModel() {

    object.traverse( function ( child ) {

      if ( child.isMesh ) child.material.map = texture;

    } );

    object.position.y = - 95;
    scene.add( object );

  }

  const manager = new THREE.LoadingManager( loadModel );

  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };

  // texture
  let objTexture = //
  const textureLoader = new THREE.TextureLoader( manager );
  const texture = textureLoader.parse( objTexture );

  // model

  function onProgress( xhr ) {
    if ( xhr.lengthComputable ) {
      const percentComplete = xhr.loaded / xhr.total * 100;
      //console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
    }
  }

  function onError() {}

  let objString = //
  const loader = new OBJLoader( manager );
  loader.parse(objString);

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove );

  //

  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) / 2;
  mouseY = ( event.clientY - windowHalfY ) / 2;

}

function Loader(properties) {
  let container;

  let camera, scene, renderer;

  let mouseX = 0, mouseY = 0;

  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  let object;

  init();
  animate();
}

export default function OBJT(properties) {

  const loader = new OBJLoader();

  loader.parse('');


  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;

  let loader = new THREE.OBJLoader();

  // obj string below represents a cube
  var objString = `
  v 0.000000 2.000000 2.000000
  v 0.000000 0.000000 2.000000
  v 2.000000 0.000000 2.000000
  v 2.000000 2.000000 2.000000
  v 0.000000 2.000000 0.000000
  v 0.000000 0.000000 0.000000
  v 2.000000 0.000000 0.000000
  v 2.000000 2.000000 0.000000
  f 1 2 3 4
  f 8 7 6 5
  f 4 3 7 8
  f 5 1 4 8
  f 5 6 2 1
  f 2 6 7 3
  `;

  var cube = loader.parse(objString);
  scene.add( cube );


  return (
    <Loader {...properties} />
  );
}
