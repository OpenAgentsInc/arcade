import { Component } from '../ecs/Component';
import { PlayerSpawner } from '../player/PlayerSpawner';
import { GenerateRandomName } from '../utils';
import { NetworkEntitySpawner } from './NetworkEntitySpawner';

/**
 * Set up WebSocket connection and listeners.
 */
export class NetworkController extends Component {
  playerID_: number;
  socket_: WebSocket;
  playerSpawner: PlayerSpawner | undefined;
  networkEntitySpawner: NetworkEntitySpawner | undefined;

  constructor() {
    super();

    this.playerID_ = -1;
    this.socket_ = new WebSocket('wss://verse.arcade.city');
    this.SetupSocket_();
  }

  InitEntity(): void {
    this.playerSpawner = this.FindEntity('spawners').GetComponent('PlayerSpawner') as PlayerSpawner;
    this.networkEntitySpawner = this.FindEntity('spawners').GetComponent(
      'NetworkEntitySpawner'
    ) as NetworkEntitySpawner;
  }

  SetupSocket_() {
    this.socket_.onopen = () => {
      const randomName = GenerateRandomName();
      this.Emit('login.commit', randomName);
    };

    this.socket_.onmessage = (e) => {
      const payload = JSON.parse(e.data);
      this.OnMessage_(payload.event, payload.data);
    };

    this.socket_.onclose = () => {
      console.log('SOCKET CLOSED');
    };

    this.socket_.onerror = (e) => {
      console.log('SOCKET ERROR', e);
    };
  }

  Emit(e, d) {
    if (!this.socket_) return;
    this.socket_.send(JSON.stringify({ event: e, data: d }));
  }

  SendChat(txt) {
    this.Emit('chat.msg', txt);
  }

  SendTransformUpdate(transform) {
    this.Emit('world.update', transform);
  }

  SendActionAttack_() {
    this.Emit('action.attack', {});
  }

  SendInventoryChange_(packet) {
    this.Emit('world.inventory', packet);
  }

  GetEntityID_(serverID) {
    if (serverID === this.playerID_) {
      return 'player';
    } else {
      return '__npc__' + serverID;
    }
  }

  OnMessage_(e, d) {
    if (e === 'world.player') {
      if (!this.playerSpawner) return;
      const player = this.playerSpawner.Spawn(d.desc);

      player.Broadcast({
        topic: 'network.update',
        transform: d.transform,
      });

      this.playerID_ = d.id;
    } else if (e === 'world.update') {
      if (!this.networkEntitySpawner) return;

      const updates = d;

      for (const u of updates) {
        const id = this.GetEntityID_(u.id);

        let npc: any = null;
        if ('desc' in u) {
          npc = this.networkEntitySpawner.Spawn(id, u.desc);
          if (!npc) return;
        } else {
          npc = this.FindEntity(id);
        }

        if (npc && id !== 'player') {
          // console.log(`ID: ${id} has transform:`, u.transform[1]);
          npc.Broadcast({
            topic: 'network.update',
            transform: u.transform,
            stats: u.stats,
            events: [],
          });
        }
      }
    } else if (e === 'chat.message') {
      console.log(`*** ${d.text} ***`);
    }
  }
}
