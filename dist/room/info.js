"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const room_1 = require("../api/room");
const isEqual = require("lodash.isequal");
const timers_1 = require("timers");
class InfoService extends events_1.EventEmitter {
    constructor(cfg) {
        super();
        this.roomid = cfg.roomid || 98438;
        this.interval = cfg.interval || 30000;
        this.fetchInfo();
        this.timer = timers_1.setInterval(() => {
            this.fetchInfo();
        }, this.interval);
    }
    fetchInfo() {
        room_1.getInfo(this.roomid)
            .then(response => JSON.parse(response))
            .then((resp) => {
            if (resp.code)
                throw new Error(resp.msg);
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
exports.default = InfoService;
//# sourceMappingURL=info.js.map