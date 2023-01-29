import * as THREE from 'three';

export class ParticleEmitter {
  alphaSpline_: LinearSpline;
  colourSpline_: LinearSpline;
  sizeSpline_: LinearSpline;
  emissionRate_: number;
  emissionAccumulator_: number;
  particles_: any[];
  emitterLife_: any;

  constructor() {
    this.alphaSpline_ = new LinearSpline((t, a, b) => {
      return a + t * (b - a);
    });

    this.colourSpline_ = new LinearSpline((t, a, b) => {
      const c = a.clone();
      return c.lerp(b, t);
    });

    this.sizeSpline_ = new LinearSpline((t, a, b) => {
      return a + t * (b - a);
    });

    this.emissionRate_ = 0.0;
    this.emissionAccumulator_ = 0.0;
    this.particles_ = [];
    this.emitterLife_ = null;
  }

  UpdateParticles_(timeElapsed) {
    for (const p of this.particles_) {
      p.life -= timeElapsed;
    }

    this.particles_ = this.particles_.filter((p) => {
      return p.life > 0.0;
    });

    for (let i = 0; i < this.particles_.length; ++i) {
      const p = this.particles_[i];
      const t = 1.0 - p.life / p.maxLife;

      // ??
      // if (t < 0 || t > 1) {
      //   const a = 0;
      // }

      p.rotation += timeElapsed * 0.5;
      p.alpha = this.alphaSpline_.Get(t);
      p.currentSize = p.size * this.sizeSpline_.Get(t);
      p.colour.copy(this.colourSpline_.Get(t));

      p.position.add(p.velocity.clone().multiplyScalar(timeElapsed));

      const drag = p.velocity.clone();
      drag.multiplyScalar(timeElapsed * 0.1);
      drag.x = Math.sign(p.velocity.x) * Math.min(Math.abs(drag.x), Math.abs(p.velocity.x));
      drag.y = Math.sign(p.velocity.y) * Math.min(Math.abs(drag.y), Math.abs(p.velocity.y));
      drag.z = Math.sign(p.velocity.z) * Math.min(Math.abs(drag.z), Math.abs(p.velocity.z));
      p.velocity.sub(drag);
    }
  }

  CreateParticle_() {
    const life = (Math.random() * 0.75 + 0.25) * 5.0;
    return {
      position: new THREE.Vector3(
        (Math.random() * 2 - 1) * 4.0 + -44,
        (Math.random() * 2 - 1) * 4.0 + 0,
        (Math.random() * 2 - 1) * 4.0 + 12
      ),
      size: (Math.random() * 0.5 + 0.5) * 2.0,
      colour: new THREE.Color(),
      alpha: 1.0,
      life,
      maxLife: life,
      rotation: Math.random() * 2.0 * Math.PI,
      velocity: new THREE.Vector3(0, 1, 0),
      blend: 0.0,
    };
  }

  get IsAlive() {
    if (this.emitterLife_ === null) {
      return this.particles_.length > 0;
    } else {
      return this.emitterLife_ > 0.0 || this.particles_.length > 0;
    }
  }

  SetLife(life) {
    this.emitterLife_ = life;
  }

  SetEmissionRate(rate) {
    this.emissionRate_ = rate;
  }

  OnUpdate_(_) {}

  Update(timeElapsed) {
    this.OnUpdate_(timeElapsed);

    if (this.emitterLife_ !== null) {
      this.emitterLife_ -= timeElapsed;
    }

    if (this.emissionRate_ > 0.0) {
      this.emissionAccumulator_ += timeElapsed;
      const n = Math.floor(this.emissionAccumulator_ * this.emissionRate_);
      this.emissionAccumulator_ -= n / this.emissionRate_;

      for (let i = 0; i < n; i++) {
        const p = this.CreateParticle_();
        this.particles_.push(p);
      }
    }

    this.UpdateParticles_(timeElapsed);
  }
}

class LinearSpline {
  points_: any[];
  _lerp: any;

  constructor(lerp) {
    this.points_ = [];
    this._lerp = lerp;
  }

  AddPoint(t, d) {
    this.points_.push([t, d]);
  }

  Get(t) {
    let p1 = 0;

    for (let i = 0; i < this.points_.length; i++) {
      if (this.points_[i][0] >= t) {
        break;
      }
      p1 = i;
    }

    const p2 = Math.min(this.points_.length - 1, p1 + 1);

    if (p1 === p2) {
      return this.points_[p1][1];
    }

    return this._lerp(
      (t - this.points_[p1][0]) / (this.points_[p2][0] - this.points_[p1][0]),
      this.points_[p1][1],
      this.points_[p2][1]
    );
  }
}
