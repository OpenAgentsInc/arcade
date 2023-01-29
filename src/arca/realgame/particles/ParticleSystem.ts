import * as THREE from 'three';

interface Params {
  camera: THREE.Camera;
  parent: THREE.Scene;
  texture: any;
}

export class ParticleSystem {
  camera_: THREE.Camera;
  emitters_: any[];
  geometry_: THREE.BufferGeometry;
  material_: THREE.ShaderMaterial;
  particles_: any[];
  points_: THREE.Points;

  constructor(params: Params) {
    const uniforms = {
      diffuseTexture: {
        value: params.texture,
      },
      pointMultiplier: {
        value: window.innerHeight / (2.0 * Math.tan((0.5 * 60.0 * Math.PI) / 180.0)),
      },
    };

    this.material_ = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: _VS,
      fragmentShader: _FS,
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
    });

    this.camera_ = params.camera;
    this.particles_ = [];

    this.geometry_ = new THREE.BufferGeometry();
    this.geometry_.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
    this.geometry_.setAttribute('size', new THREE.Float32BufferAttribute([], 1));
    this.geometry_.setAttribute('colour', new THREE.Float32BufferAttribute([], 4));
    this.geometry_.setAttribute('angle', new THREE.Float32BufferAttribute([], 1));
    this.geometry_.setAttribute('blend', new THREE.Float32BufferAttribute([], 1));

    this.points_ = new THREE.Points(this.geometry_, this.material_);

    params.parent.add(this.points_);

    this.emitters_ = [];
    this.particles_ = [];

    this.UpdateGeometry_();
  }

  Destroy() {
    this.material_.dispose();
    this.geometry_.dispose();
    if (this.points_.parent) {
      this.points_.parent.remove(this.points_);
    }
  }

  AddEmitter(e) {
    this.emitters_.push(e);
  }

  UpdateGeometry_() {
    const positions: any[] = [];
    const sizes: any[] = [];
    const colours: any[] = [];
    const angles: any[] = [];
    const blends: any[] = [];

    const box = new THREE.Box3();
    for (const p of this.particles_) {
      positions.push(p.position.x, p.position.y, p.position.z);
      colours.push(p.colour.r, p.colour.g, p.colour.b, p.alpha);
      sizes.push(p.currentSize);
      angles.push(p.rotation);
      blends.push(p.blend);

      box.expandByPoint(p.position);
    }

    this.geometry_.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    this.geometry_.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    this.geometry_.setAttribute('colour', new THREE.Float32BufferAttribute(colours, 4));
    this.geometry_.setAttribute('angle', new THREE.Float32BufferAttribute(angles, 1));
    this.geometry_.setAttribute('blend', new THREE.Float32BufferAttribute(blends, 1));

    this.geometry_.attributes.position.needsUpdate = true;
    this.geometry_.attributes.size.needsUpdate = true;
    this.geometry_.attributes.colour.needsUpdate = true;
    this.geometry_.attributes.angle.needsUpdate = true;
    this.geometry_.attributes.blend.needsUpdate = true;
    this.geometry_.boundingBox = box;
    this.geometry_.boundingSphere = new THREE.Sphere();

    box.getBoundingSphere(this.geometry_.boundingSphere);
  }

  UpdateEmitters_(timeElapsed) {
    for (let i = 0; i < this.emitters_.length; ++i) {
      this.emitters_[i].Update(timeElapsed);
    }

    // this.emitters_ = this.emitters_.filter((e) => e.IsAlive);
  }

  UpdateParticles_(timeElapsed) {
    this.particles_ = this.emitters_.map((e) => e.particles_);
    this.particles_ = this.particles_.flat();
    this.particles_.sort((a, b) => {
      const d1 = this.camera_.position.distanceTo(a.position);
      const d2 = this.camera_.position.distanceTo(b.position);

      if (d1 > d2) {
        return -1;
      }

      if (d1 < d2) {
        return 1;
      }

      return 0;
    });
  }

  Update(timeElapsed) {
    this.UpdateEmitters_(timeElapsed);
    this.UpdateParticles_(timeElapsed);
    this.UpdateGeometry_();
  }
}

const _VS = `
uniform float pointMultiplier;

attribute float size;
attribute float angle;
attribute float blend;
attribute vec4 colour;

varying vec4 vColour;
varying vec2 vAngle;
varying float vBlend;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * pointMultiplier / gl_Position.w;

  vAngle = vec2(cos(angle), sin(angle));
  vColour = colour;
  vBlend = blend;
}`;

const _FS = `

uniform sampler2D diffuseTexture;

varying vec4 vColour;
varying vec2 vAngle;
varying float vBlend;

void main() {
  vec2 coords = (gl_PointCoord - 0.5) * mat2(vAngle.x, vAngle.y, -vAngle.y, vAngle.x) + 0.5;
  gl_FragColor = texture2D(diffuseTexture, coords) * vColour;
  gl_FragColor.xyz *= gl_FragColor.w;
  gl_FragColor.w *= vBlend;
}`;
