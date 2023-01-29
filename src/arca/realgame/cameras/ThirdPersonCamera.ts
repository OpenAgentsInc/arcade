import * as THREE from 'three';

import { Component } from '../ecs/Component';

export class ThirdPersonCamera extends Component {
  _params: any;
  _camera: THREE.Camera;
  _currentLookat: THREE.Vector3;
  _currentPosition: THREE.Vector3;

  constructor(params) {
    super();

    this._params = params;
    this._camera = params.camera;

    this._currentPosition = new THREE.Vector3();
    this._currentLookat = new THREE.Vector3();
  }

  _CalculateIdealOffset() {
    const idealOffset = new THREE.Vector3(-0, 5, -4);
    idealOffset.applyQuaternion(this._params.target._rotation);
    idealOffset.add(this._params.target._position);

    return idealOffset;
  }

  _CalculateIdealLookat() {
    const idealLookat = new THREE.Vector3(0, 1, 20);
    idealLookat.applyQuaternion(this._params.target._rotation);
    idealLookat.add(this._params.target._position);
    return idealLookat;
  }

  Update(timeElapsed) {
    const idealOffset = this._CalculateIdealOffset();
    const idealLookat = this._CalculateIdealLookat();

    const t = 1.0 - Math.pow(0.01, timeElapsed);

    this._currentPosition.lerp(idealOffset, t);
    this._currentLookat.lerp(idealLookat, t);

    this._camera.position.copy(this._currentPosition);
    this._camera.lookAt(this._currentLookat);
  }
}
