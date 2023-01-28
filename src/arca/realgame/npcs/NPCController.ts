import { models } from 'arca/models';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { LoadController } from '../LoadController';
import { Component } from '../ecs';
import { BasicCharacterControllerProxy, CharacterFSM } from '../player/BasicCharacterController';

export class NPCController extends Component {
  animations_: any;
  bones_: any;
  camera: THREE.Camera;
  desc: any;
  group_: any;
  mixer_: any;
  queuedState_: any;
  scene: THREE.Scene;
  stateMachine_: any;
  target_: any;

  constructor(camera: THREE.Camera, scene: THREE.Scene, desc: any) {
    super();
    this.camera = camera;
    this.scene = scene;
    this.desc = desc;
    // console.log('NPCController constructed.');
  }

  Destroy() {
    this.group_.traverse((c) => {
      if (c.material) {
        let materials = c.material;
        if (!(c.material instanceof Array)) {
          materials = [c.material];
        }
        for (const m of materials) {
          m.dispose();
        }
      }

      if (c.geometry) {
        c.geometry.dispose();
      }
    });
    this.scene.remove(this.group_);
  }

  InitEntity() {
    this._Init();
  }

  _Init() {
    this.animations_ = {};
    this.group_ = new THREE.Group();

    this.scene.add(this.group_);
    this.queuedState_ = null;

    this.LoadModels_();
  }

  InitComponent() {
    this._RegisterHandler('health.death', (m) => {
      this.OnDeath_(m);
    });
    this._RegisterHandler('update.position', (m) => {
      this.OnPosition_(m);
    });
    this._RegisterHandler('update.rotation', (m) => {
      this.OnRotation_(m);
    });
  }

  SetState(s) {
    if (!this.stateMachine_) {
      this.queuedState_ = s;
      return;
    }

    // hack: should propogate attacks through the events on server
    // Right now, they're inferred from whatever animation we're running, blech
    if (s === 'attack' && this.stateMachine_._currentState.Name !== 'attack') {
      this.Broadcast({
        topic: 'action.attack',
      });
    }

    this.stateMachine_.SetState(s);
  }

  OnDeath_(msg) {
    this.SetState('death');
  }

  OnPosition_(m) {
    this.group_.position.copy(m.value);
  }

  OnRotation_(m) {
    this.group_.quaternion.copy(m.value);
  }

  async LoadModels_() {
    const loader = this.FindEntity('loader').GetComponent('LoadController') as LoadController;
    const glb = (await loader.LoadGLB(models.man)) as GLTF;
    this.target_ = glb.scene;
    this.target_.scale.setScalar(0.8);
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

    this.mixer_ = new THREE.AnimationMixer(this.target_);

    const _FindAnim = (animName) => {
      for (let i = 0; i < glb.animations.length; i++) {
        if (glb.animations[i].name.includes(animName)) {
          const clip = glb.animations[i];
          const action = this.mixer_.clipAction(clip);
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
    if (this.queuedState_) {
      this.stateMachine_.SetState(this.queuedState_);
      this.queuedState_ = null;
    } else {
      this.stateMachine_.SetState('idle');
    }
    this.Broadcast({
      topic: 'load.character',
      model: this.group_,
      bones: this.bones_,
    });
    console.log('Loaded player', this.desc.account.name);
  }

  Update(timeInSeconds) {
    if (!this.stateMachine_) {
      return;
    }
    this.stateMachine_.Update(timeInSeconds, null);

    if (this.mixer_) {
      this.mixer_.update(timeInSeconds);
    }
  }
}
