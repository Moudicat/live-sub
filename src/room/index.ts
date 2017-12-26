import { EventEmitter } from "events";
import { getBaseInfo } from '../api/room';
import InfoService from './info';
import config from '../config/';

export default class Room extends EventEmitter {
  id: number;
  roomid: number;
  infoService: InfoService;

  constructor(cfg: IRoomConfig|number = 98438) {
    super();

    if (typeof cfg === 'number') {
      this.id = cfg;
    } else {
      this.id = cfg.id;
    }

    this.roomid = -1;

    this.initInfo();
  }

  private initInfo() {
    getBaseInfo(this.id)
      .then(response => JSON.parse(response))
      .then((resp: IRoomBaseInfo) => {
        if (resp.code) throw new Error(resp.msg);

        this.roomid = resp.data.room_id;

        this.infoService = new InfoService({roomid: this.roomid, interval: config.room.info.interval});

        this.handleEvent();
      })
      .catch(err => {
        throw err;
      });
  }

  private handleEvent() {
    this.handleInfoEvent();
  }

  private handleInfoEvent() {
    this.infoService.on('info', (info: IRoomInfo) => {
      this.emit('info', Object.assign({}, info, { ts: Date.now() }));
    });
  }
}