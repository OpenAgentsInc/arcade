import { models } from 'arca/models';
import * as THREE from 'three';
import { Quaternion } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { FiniteStateMachine } from '../FiniteStateMachine';
import { LoadController } from '../LoadController';
import { ThirdPersonDeviceCamera } from '../cameras/ThirdPersonDeviceCamera';
import { Component } from '../ecs/Component';
import { BasicCharacterControllerInput } from './BasicCharacterControllerInput';
import { AttackState, DeathState, IdleState, WalkState } from './PlayerState';

export class BasicCharacterController extends Component {
  acceleration_: any;
  animations_: any;
  bones_: any;
  camera: ThirdPersonDeviceCamera | null;
  decceleration_: any;
  group_: any;
  lastAlpha: number = 0;
  _mixer: any;
  params_: any;
  scene: THREE.Scene;
  stateMachine_: any;
  target_: any;
  velocity_: any;

  constructor(scene: THREE.Scene) {
    super();
    this.camera = null;
    this.scene = scene;
  }

  InitEntity() {
    this.Init_();
  }

  Init_() {
    this.decceleration_ = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this.acceleration_ = new THREE.Vector3(1, 0.125, 100.0);
    this.velocity_ = new THREE.Vector3(0, 0, 0);
    this.group_ = new THREE.Group();

    this.scene.add(this.group_);

    this.animations_ = {};

    this.LoadModels_();

    // Load the ThirdPlayerDeviceCamera
    try {
      this.camera = this.GetComponent('ThirdPersonDeviceCamera') as ThirdPersonDeviceCamera;
    } catch (e) {
      console.log(e);
      console.log('No camera found');
    }
  }

  async LoadModels_() {
    const loader = this.FindEntity('loader').GetComponent('LoadController') as LoadController;
    const glb = (await loader.LoadGLB(models.man)) as GLTF;
    this.target_ = glb.scene;
    this.target_.scale.setScalar(0.8);
    // this.target_.position.set(0, -0.9, 5);
    // this.target_.rotation.y = Math.PI / 1.5;
    this.target_.visible = false;

    this.group_.add(this.target_);

    this.bones_ = {};
    this.target_.traverse((c) => {
      if (!c.skeleton) {
        return;
      }
      for (const b of c.skeleton.bones) {
        this.bones_[b.name] = b;
      }
    });

    this.target_.traverse((c) => {
      c.castShadow = true;
      if (c.material?.map) {
        c.material.map.encoding = THREE.sRGBEncoding;
      }
    });

    this._mixer = new THREE.AnimationMixer(this.target_);

    const _FindAnim = (animName) => {
      for (let i = 0; i < glb.animations.length; i++) {
        if (glb.animations[i].name.includes(animName)) {
          const clip = glb.animations[i];
          const action = this._mixer.clipAction(clip);
          return {
            clip,
            action,
          };
        }
      }
      return null;
    };

    this.animations_['clap'] = _FindAnim('Man_Clapping');
    this.animations_['death'] = _FindAnim('Man_Death');
    this.animations_['idle'] = _FindAnim('Man_Idle');
    this.animations_['jump'] = _FindAnim('Man_Jump');
    this.animations_['punch'] = _FindAnim('Man_Punch');
    this.animations_['roll'] = _FindAnim('Man_Roll');
    this.animations_['run'] = _FindAnim('Man_Run');
    this.animations_['runningjump'] = _FindAnim('Man_RunningJump');
    this.animations_['sit'] = _FindAnim('Man_Sitting');
    this.animations_['stand'] = _FindAnim('Man_Standing');
    this.animations_['slash'] = _FindAnim('Man_SwordSlash');
    this.animations_['walk'] = _FindAnim('Man_Walk');

    this.target_.visible = true;

    this.stateMachine_ = new CharacterFSM(new BasicCharacterControllerProxy(this.animations_));

    this.stateMachine_.SetState('idle');
  }

  Update(timeInSeconds) {
    if (!this.stateMachine_) {
      return;
    }

    const input = this.GetComponent(
      'BasicCharacterControllerInput'
    ) as BasicCharacterControllerInput;

    this.stateMachine_.Update(timeInSeconds, input);

    if (this._mixer) {
      this._mixer.update(timeInSeconds);
    }

    // HARDCODED
    // this.Broadcast({
    //   topic: 'player.action',
    //   action: this.stateMachine_._currentState.Name,
    // });

    const currentState = this.stateMachine_._currentState;
    if (
      currentState.Name !== 'walk' &&
      currentState.Name !== 'run' &&
      currentState.Name !== 'idle'
    ) {
      return;
    }

    const velocity = this.velocity_;
    const frameDecceleration = new THREE.Vector3(
      velocity.x * this.decceleration_.x,
      velocity.y * this.decceleration_.y,
      velocity.z * this.decceleration_.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z =
      Math.sign(frameDecceleration.z) *
      Math.min(Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this.group_;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone() as THREE.Quaternion;

    const acc = this.acceleration_.clone();
    acc.multiplyScalar(0.35);
    if (input._keys.shift) {
      acc.multiplyScalar(2.0);
    }

    if (!this.camera) return;
    const quaternion = this.camera._camera.quaternion as Quaternion;
    const cameraQuat = quaternion.clone();
    const dotProduct = controlObject.quaternion.dot(cameraQuat);

    if (input._keys.forward) {
      velocity.z += acc.z * timeInSeconds;
    }
    if (input._keys.backward) {
      velocity.z -= acc.z * timeInSeconds;
    }

    _A.set(0, 1, 0);
    _Q.setFromAxisAngle(_A, dotProduct * 40.0 * Math.PI * timeInSeconds * this.acceleration_.y);
    _R.multiply(_Q);

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    const pos = controlObject.position.clone();
    pos.add(forward);
    pos.add(sideways);

    // const collisions = this._FindIntersections(pos, oldPosition);
    // if (collisions.length > 0) {
    //   return;
    // }

    // const terrain = this.FindEntity('terrain').GetComponent('TerrainChunkManager');
    // pos.y = terrain.GetHeight(pos)[0];

    controlObject.position.copy(pos);

    this.Parent.SetPosition(controlObject.position);
    this.Parent.SetQuaternion(controlObject.quaternion);
  }
}

export class BasicCharacterControllerProxy {
  animations_: any;

  constructor(animations) {
    this.animations_ = animations;
  }

  get animations() {
    return this.animations_;
  }
}

export class CharacterFSM extends FiniteStateMachine {
  _proxy: any;

  constructor(proxy) {
    super();
    this._proxy = proxy;
    this.Init_();
  }

  Init_() {
    this._AddState('idle', IdleState);
    this._AddState('walk', WalkState);
    // this._AddState('run', RunState);
    this._AddState('attack', AttackState);
    this._AddState('death', DeathState);
    // this._AddState('dance', DanceState);
  }
}
