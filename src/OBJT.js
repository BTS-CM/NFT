import React, { useRef, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
//import { TextureLoader } from 'three/src/loaders/TextureLoader'
//import * as THREE from 'three';
import { useTexture, OrbitControls } from "@react-three/drei";

function OBJ(props) {
  const pngString = props.png;
  const texture = useTexture(`data:image/png;base64,${pngString}`);

  const objString = atob(props.obj);
  let obj_loader = new OBJLoader();
  let obj = obj_loader.parse(objString)

  obj.traverse((o) => {
    if (o.isMesh) {
      o.material.map = texture;
    }
  });

  return (
    <mesh>
      <primitive attach="geometry" object={obj} />
      <meshStandardMaterial attach="material" map={texture} />
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

  if (!media_obj || !media_png) {
    return null;
  }

  return (<Canvas style={{"height": "500px"}}>
            <Suspense fallback={null}>
              <ambientLight intensity={1} />
              <directionalLight />
              <OBJ obj={media_obj} png={media_png} />
              <OrbitControls autoRotate />
            </Suspense>
          </Canvas>);
}
