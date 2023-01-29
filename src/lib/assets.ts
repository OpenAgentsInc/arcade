import { decode } from 'base64-arraybuffer'
import { Asset } from 'expo-asset'
import { resolveAsync } from 'expo-asset-utils'
import * as FileSystem from 'expo-file-system'
import { loadObjAsync, loadTextureAsync } from 'expo-three'
import { Alert } from 'react-native'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { GLTFLoader } from './gltf/GLTFLoader'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

async function loadFileAsync({ asset, funcName }) {
  if (!asset) {
    throw new Error(`ExpoTHREE.${funcName}: Cannot parse a null asset`)
  }
  return (await resolveAsync(asset)).localUri ?? null
}

// newly added method
export async function loadFbxAsync({ asset, onAssetRequested }) {
  const asset1 = Asset.fromModule(asset)
  await asset1.downloadAsync()

  const uri = asset1.localUri

  // const uri = await loadFileAsync({
  //   asset,
  //   funcName: 'loadFbxAsync',
  // })
  if (!uri) return
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  })
  const arrayBuffer = decode(base64)
  const loader = new FBXLoader()
  return loader.parse(arrayBuffer, onAssetRequested)
}

export async function loadGLTFAsync({ asset, onAssetRequested }) {
  const uri = await loadFileAsync({
    asset,
    funcName: 'loadGLTFAsync',
  })
  if (!uri) return
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  })
  const arrayBuffer1 = decode(base64)
  const loader = new GLTFLoader()
  // console.log('ATTEMPTING PARSE')
  const gltf = await loader.parse(arrayBuffer1, onAssetRequested)
  // console.log('GOT GLTF: ', gltf)
  return gltf
  // return new Promise((resolve, reject) => {
  //   loader.parse(
  //     arrayBuffer1,
  //     onAssetRequested,
  //     (result) => {
  //       console.log('RESULT?', result)
  //       resolve(result)
  //     },
  //     (err) => {
  //       reject(err)
  //     }
  //   )
  // })
}

export async function myLoadGLTFAsync({ uri, onAssetRequested }) {
  if (!uri) return
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  })
  // console.log('base64:', base64);
  const arrayBuffer1 = decode(base64)
  // console.log('got an arraybufffer1 of length: ', arrayBuffer1.byteLength);
  const loader = new GLTFLoader()
  return new Promise((resolve, reject) => {
    loader.parse(
      arrayBuffer1,
      onAssetRequested,
      (result) => {
        // console.log('Successfully parsed GLTF');
        // console.log('GOT RESULT:', result);
        onAssetRequested(result)
        resolve(result)
      },
      (e) => {
        console.log('Error parsing asset')
        console.error(e)
        console.log(e.message)
        reject(e)
      }
    )
  })
}

export async function myLoadImageAsync({ uri, onAssetRequested }) {
  if (!uri) return
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  })
  console.log(base64)
  // const arrayBuffer1 = decode(base64);
  // console.log
  // const loader = new THREE.ImageLoader();
  // return new Promise((resolve, reject) => {
  //   loader.load(
  //     arrayBuffer1,
  //     onAssetRequested,
  //     (result) => {
  //       resolve(result);
  //     },
  //     (e) => {
  //       console.log('Error parsing asset');
  //       console.error(e);
  //       console.log(e.message);
  //       reject(e);
  //     }
  //   );
}
