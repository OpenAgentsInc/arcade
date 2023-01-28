import { models } from 'arca/models';
import { Asset } from 'expo-asset';
import { myLoadGLTFAsync } from 'lib/assets';
import * as THREE from 'three';

export class Ground extends THREE.Object3D {
  scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    super();
    this.scene = scene;
    this.LoadGroundTile();
    this.LoadGrass();
  }

  async LoadGroundTile() {
    const asset = models.grass.platform;
    const model = Asset.fromModule(asset);
    await model.downloadAsync();
    const uri = model.localUri;

    const onAssetRequested = (glb) => {
      const glbScene = glb.scene;
      glbScene.scale.setScalar(20);
      glbScene.position.y = -14;
      this.scene.add(glbScene);
    };

    myLoadGLTFAsync({ uri, onAssetRequested });
  }

  async LoadGrass() {
    const asset = models.grass.tile;
    const model = Asset.fromModule(asset);
    await model.downloadAsync();
    const uri = model.localUri;

    const onAssetRequested = (glb) => {
      const glbScene = glb.scene;
      // glbScene.scale.setScalar(0.6);
      glbScene.position.y = -1;

      for (let i = 0; i < 500; i++) {
        const clone = glbScene.clone();
        clone.position.x = Math.random() * 100 - 80;
        clone.position.z = Math.random() * 100 - 80;
        clone.rotation.y = Math.random() * Math.PI * 2;
        this.scene.add(clone);
      }
    };

    myLoadGLTFAsync({ uri, onAssetRequested });
  }
}
