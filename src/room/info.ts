import { EventEmitter } from "events";
import { getInfo } from '../api/room';
import * as isEqual from 'lodash.isequal';
import { setInterval } from "timers";

export default class InfoService extends EventEmitter {
  roomid: number;
  interval: number;
  timer: NodeJS.Timer
  lastInfo: IRoomInfo;

  constructor(cfg: IInfoServiceConfig) {
    super();
    this.roomid = cfg.roomid || 98438;
    this.interval = cfg.interval || 30000;

    this.fetchInfo();

    this.timer = setInterval(() => {
      this.fetchInfo();
    }, this.interval);
  }

  fetchInfo() {
    getInfo(this.roomid)
      .then(response => JSON.parse(response))
      .then((resp: IRoomInfo) => {
        if (resp.code) throw new Error(resp.msg);
        if (!isEqual(this.lastInfo, resp)) {
          this.emit('info', resp);
        }
        this.lastInfo = resp;
      })
      .catch(err => {
        throw err;
      });
  }
}