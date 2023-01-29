export class EntityManager {
  _ids: number;
  _entitiesMap: any;
  _entities: any[];

  constructor() {
    this._ids = 0;
    this._entitiesMap = {};
    this._entities = [];
  }

  _GenerateName() {
    this._ids += 1;

    return '__name__' + this._ids;
  }

  Get(n) {
    return this._entitiesMap[n];
  }

  Filter(cb) {
    return this._entities.filter(cb);
  }

  Add(e, n?: string | undefined) {
    if (!n) {
      n = this._GenerateName();
    }

    this._entitiesMap[n] = e;
    this._entities.push(e);

    e.SetParent(this);
    e.SetName(n);
    e.InitEntity();
  }

  SetActive(e, b) {
    const i = this._entities.indexOf(e);

    if (!b) {
      if (i < 0) {
        return;
      }

      this._entities.splice(i, 1);
    } else {
      if (i >= 0) {
        return;
      }

      this._entities.push(e);
    }
  }

  Update(timeElapsed) {
    const dead: any[] = [];
    const alive: any[] = [];
    // console.log('Updating entities...', this._entities.length);
    for (let i = 0; i < this._entities.length; ++i) {
      const e = this._entities[i];

      e.Update(timeElapsed);

      if (e.dead_) {
        dead.push(e);
      } else {
        alive.push(e);
      }
    }

    for (let i = 0; i < dead.length; ++i) {
      const e = dead[i];

      delete this._entitiesMap[e.Name];

      e.Destroy();
    }

    this._entities = alive;
  }
}
