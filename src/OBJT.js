import React, { useRef, useState, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three';
import { useTexture, OrbitControls } from "@react-three/drei";

function OBJ(props) {
  const mesh = useRef()

  const pngString = props.png;
  const texture = useTexture(`data:image/png;base64,${pngString}`);

  //      <meshBasicMaterial attachArray="material" map={texture} />

  const objString = atob(props.obj);
  const obj_loader = new OBJLoader();
  let obj = obj_loader.parse(objString)

  return (
    <mesh
      {...props}
      ref={mesh}
    >
      <primitive attach="geometry" object={obj} position={[0, 0, 0]} />
    </mesh>
  )
}

export default function OBJT(properties) {
  if (!properties.data) {
    return null;
  }

  let media_json = JSON.parse(atob(properties.data));
  let media_obj = media_json ? media_json.media_obj : undefined;
  let media_png = media_json ? media_json.media_png : undefined;

  return (<Canvas style={{"height": "500px"}}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.2} />
              <directionalLight />
              <OBJ obj={media_obj} png={media_png} />
              <OrbitControls autoRotate />
            </Suspense>
          </Canvas>);
}
