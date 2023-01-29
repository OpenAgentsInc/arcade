import * as THREE from 'three';

import { Component } from '../ecs/Component';
import { DeviceOrientationControls } from './DeviceOrientationControls';

export class ThirdPersonDeviceCamera extends Component {
  controls: DeviceOrientationControls;
  _params: any;
  _camera: THREE.Camera;
  _currentLookat: THREE.Vector3;
  _currentPosition: THREE.Vector3;

  constructor(params) {
    super();

    this._params = params;
    this._camera = params.camera;

    this.controls = new DeviceOrientationControls(this._camera);
    this.controls.connect();

    this._currentPosition = new THREE.Vector3();
    this._currentLookat = new THREE.Vector3();

    const idealLookat = this._CalculateIdealLookat();
    this._camera.lookAt(idealLookat);
  }

  // Keeps the camera behind the player
  _CalculateIdealOffset() {
    const idealOffset = new THREE.Vector3(-0, 8, -10);
    idealOffset.applyQuaternion(this._params.target._rotation);
    idealOffset.add(this._params.target._position);
    return idealOffset;
  }

  // Looks forward of player - used only in constructor
  _CalculateIdealLookat() {
    const idealLookat = new THREE.Vector3(0, 1, 20);
    idealLookat.applyQuaternion(this._params.target._rotation);
    idealLookat.add(this._params.target._position);
    return idealLookat;
  }

  Update(timeElapsed) {
    const idealOffset = this._CalculateIdealOffset();
    const t = 1.0 - Math.pow(0.01, timeElapsed);
    this._currentPosition.lerp(idealOffset, t);
    this._camera.position.copy(this._currentPosition);
    this.controls.update();
  }
}
