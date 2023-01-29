import { images } from 'arca/images';
import { models } from 'arca/models';
import { TextureLoader } from 'expo-three';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { LoadController } from '../LoadController';
import { ThreeJSController } from '../ThreeJSController';
import { NPC } from './NPC';
import { NPCFSM } from './NPCFSM';

export class Wizard extends NPC {
  constructor() {
    super();
    setTimeout(() => {
      this.LoadModel();
    }, 145);
  }

  async LoadModel() {
    const loader = this.FindEntity('loader').GetComponent('LoadController') as LoadController;
    this.glb = (await loader.LoadGLB(models.druid)) as GLTF;
    this.glb.scene.visible = false;

    const threejs = this.FindEntity('threejs').GetComponent(
      'ThreeJSController'
    ) as ThreeJSController;
    const scene = threejs.scene;

    const textureLoader = new TextureLoader();
    const texture = textureLoader.load(images.druid);

    this.glb.scene.traverse(function (object) {
      if (object instanceof THREE.Mesh) {
        if (object.material) {
          object.material.map = texture;
        }
      }
    });

    this.glb.scene.scale.setScalar(2.3);
    this.glb.scene.position.x += 0.05;

    scene.add(this.glb.scene);

    this.bones = {};
    this.glb.scene.traverse((c: any) => {
      if (!c.skeleton) {
        return;
      }
      for (const b of c.skeleton.bones) {
        this.bones[b.name] = b;
      }
    });

    this.glb.scene.traverse((c: any) => {
      c.castShadow = true;
      if (c.material?.map) {
        c.material.map.encoding = THREE.sRGBEncoding;
      }
    });

    this.mixer = new THREE.AnimationMixer(this.glb.scene);

    const glb = this.glb;
    const mixer = this.mixer;

    const _FindAnim = (animName) => {
      for (let i = 0; i < glb.animations.length; i++) {
        if (glb.animations[i].name.includes(animName)) {
          const clip = glb.animations[i];
          const action = mixer.clipAction(clip);
          return {
            clip,
            action,
          };
        }
      }
      return null;
    };

    this.animations['idle'] = _FindAnim('Still');
    this.animations['open'] = _FindAnim('PortalOpen');
    this.animations['waiting'] = _FindAnim('Waiting');

    this.glb.scene.visible = true;

    this.stateMachine = new NPCFSM(new WizardProxy(this.animations));
    this.stateMachine.SetState('idle');
  }
}

export class WizardProxy {
  animations_: any;

  constructor(animations) {
    this.animations_ = animations;
  }

  get animations() {
    return this.animations_;
  }
}
