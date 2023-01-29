import { images } from 'arca/images';
import { loadCubeTextureAsync } from 'expo-three';
import * as THREE from 'three';

export class Sky extends THREE.Object3D {
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    super();
    this.scene = scene;
    this.LoadSky_();
  }

  async LoadSky_() {
    const hemiLight = new THREE.HemisphereLight(0x424a75, 0x6a88b5, 0.7);

    this.scene.add(hemiLight);

    const SkyboxImages = {
      nx: images.skybox.negx,
      ny: images.skybox.negy,
      nz: images.skybox.negz,
      px: images.skybox.posx,
      py: images.skybox.posy,
      pz: images.skybox.posz,
    };

    const texture = await loadCubeTextureAsync({
      assetForDirection: SkyboxImages,
    });
    this.scene.background = texture;

    const uniforms = {
      topColor: { value: new THREE.Color(0x000000) },
      bottomColor: { value: new THREE.Color(0x5d679e) },
      offset: { value: -500 },
      exponent: { value: 0.3 },
      background: { value: texture },
    };
    uniforms['topColor'].value.copy(hemiLight.color);

    this.scene.fog = new THREE.FogExp2(0x5d679e, 0.001);
    this.scene.fog?.color.copy(uniforms['bottomColor'].value);

    const skyGeo = new THREE.SphereBufferGeometry(5000, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: _VS,
      fragmentShader: _FS,
      side: THREE.BackSide,
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(sky);
  }
}

const _VS = `
varying vec3 vWorldPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vWorldPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;

const _FS = `
uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;
uniform samplerCube background;

varying vec3 vWorldPosition;

void main() {
  vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
  vec3 stars = textureCube(background, viewDirection).xyz;

  float h = normalize(vWorldPosition + offset).y;
  float t = max(pow(max(h, 0.0), exponent), 0.0);

  float f = exp(min(0.0, -vWorldPosition.y * 0.00125));

  vec3 sky = mix(stars, bottomColor, f);
  gl_FragColor = vec4(sky, 1.0);
}`;
