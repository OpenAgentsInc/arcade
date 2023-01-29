import { images } from 'arca/images';
import { TextureLoader } from 'expo-three';
import * as THREE from 'three';

import { Component } from '../ecs/Component';
import { ParticleSystem } from './ParticleSystem';
import { SorcerorEffectEmitter } from './SorcererEffectEmitter';

export class SorcerorEffect extends Component {
  _bones: any;
  particles_: any;

  constructor(params: any) {
    super();

    const textureLoader = new TextureLoader();
    const texture = textureLoader.load(images.bitcoin);

    this.particles_ = new ParticleSystem({
      camera: params.camera,
      parent: params.scene,
      texture,
    });
  }

  Destroy() {
    this.particles_.Destroy();
  }

  InitComponent() {
    this._RegisterHandler('action.attack', (m) => {
      this.OnAttack_();
    });
    this._RegisterHandler('load.character', (m) => this.OnCharacterLoaded_(m));
  }

  OnCharacterLoaded_(msg) {
    this._bones = msg.bones;
  }

  Trigger() {
    const h = new THREE.Object3D();

    let emitter = new SorcerorEffectEmitter(h);
    emitter.alphaSpline_.AddPoint(0.0, 0.0);
    emitter.alphaSpline_.AddPoint(0.1, 1.0);
    emitter.alphaSpline_.AddPoint(0.7, 1.0);
    emitter.alphaSpline_.AddPoint(1.0, 0.0);

    emitter.colourSpline_.AddPoint(0.0, new THREE.Color(0xf2a900));
    emitter.colourSpline_.AddPoint(0.5, new THREE.Color(0xd4af37));
    emitter.colourSpline_.AddPoint(1.0, new THREE.Color(0xf2a900));

    emitter.sizeSpline_.AddPoint(0.0, 0.5);
    emitter.sizeSpline_.AddPoint(0.5, 2.5);
    emitter.sizeSpline_.AddPoint(1.0, 0.0);
    emitter.SetLife(2.5);
    emitter.blend_ = 0.0;

    this.particles_.AddEmitter(emitter);

    emitter = new SorcerorEffectEmitter(h);
    emitter.alphaSpline_.AddPoint(0.0, 0.0);
    emitter.alphaSpline_.AddPoint(0.7, 1.0);
    emitter.alphaSpline_.AddPoint(1.0, 0.0);

    emitter.colourSpline_.AddPoint(0.0, new THREE.Color(0x202020));
    emitter.colourSpline_.AddPoint(1.0, new THREE.Color(0x101010));

    emitter.sizeSpline_.AddPoint(0.0, 0.5);
    emitter.sizeSpline_.AddPoint(1.0, 4.0);
    emitter.SetLife(2.5);
    emitter.blend_ = 1.0;

    this.particles_.AddEmitter(emitter);
  }

  OnAttack_() {
    const hands = [this._bones['RightHandIndex1'], this._bones['LeftHandIndex1']];
    for (const h of hands) {
      let emitter = new SorcerorEffectEmitter(h);
      emitter.alphaSpline_.AddPoint(0.0, 0.0);
      emitter.alphaSpline_.AddPoint(0.1, 1.0);
      emitter.alphaSpline_.AddPoint(0.7, 1.0);
      emitter.alphaSpline_.AddPoint(1.0, 0.0);

      emitter.colourSpline_.AddPoint(0.0, new THREE.Color(0x00ff00));
      emitter.colourSpline_.AddPoint(0.5, new THREE.Color(0x40c040));
      emitter.colourSpline_.AddPoint(1.0, new THREE.Color(0xff4040));

      emitter.sizeSpline_.AddPoint(0.0, 0.5);
      emitter.sizeSpline_.AddPoint(0.5, 2.5);
      emitter.sizeSpline_.AddPoint(1.0, 0.0);
      emitter.SetLife(2.5);
      emitter.blend_ = 0.0;

      this.particles_.AddEmitter(emitter);

      emitter = new SorcerorEffectEmitter(h);
      emitter.alphaSpline_.AddPoint(0.0, 0.0);
      emitter.alphaSpline_.AddPoint(0.7, 1.0);
      emitter.alphaSpline_.AddPoint(1.0, 0.0);

      emitter.colourSpline_.AddPoint(0.0, new THREE.Color(0x202020));
      emitter.colourSpline_.AddPoint(1.0, new THREE.Color(0x101010));

      emitter.sizeSpline_.AddPoint(0.0, 0.5);
      emitter.sizeSpline_.AddPoint(1.0, 4.0);
      emitter.SetLife(2.5);
      emitter.blend_ = 1.0;

      this.particles_.AddEmitter(emitter);
    }
  }

  Update(timeElapsed) {
    this.particles_.Update(timeElapsed);
  }
}
