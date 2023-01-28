import { Component } from './ecs/Component';

interface ThreeJSProps {
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
}

export class ThreeJSController extends Component {
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;

  constructor(props: ThreeJSProps) {
    super();
    this.camera = props.camera;
    this.renderer = props.renderer;
    this.scene = props.scene;
  }
}
