import { decode } from 'base64-arraybuffer'
import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'
import { GLTFLoader } from 'lib/gltf/GLTFLoader'

import { Component } from './ecs/Component'

export class LoadController extends Component {
  models_: any
  textures_: any

  constructor() {
    super()

    this.textures_ = {}
    this.models_ = {}
  }

  async LoadGLB(asset: string | number) {
    const model = Asset.fromModule(asset)
    await model.downloadAsync()
    const uri = model.localUri
    if (!uri) return

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    })

    const arrayBuffer1 = decode(base64)
    const loader = new GLTFLoader()

    return new Promise((resolve, reject) => {
      loader.parse(
        arrayBuffer1,
        () => {},
        (result) => resolve(result),
        (e) => reject(e)
      )
    })
  }
}
