"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const room_1 = require("../api/room");
const info_1 = require("./info");
const _1 = require("../config/");
class Room extends events_1.EventEmitter {
    constructor(cfg = 98438) {
        super();
        if (typeof cfg === 'number') {
            this.id = cfg;
        }
        else {
            this.id = cfg.id;
        }
        this.roomid = -1;
        this.initInfo();
    }
    initInfo() {
        room_1.getBaseInfo(this.id)
            .then(response => JSON.parse(response))
            .then((resp) => {
            if (resp.code)
                throw new Error(resp.msg);
            this.roomid = resp.data.room_id;
            this.infoService = new info_1.default({ roomid: this.roomid, interval: _1.default.room.info.interval });
            this.handleEvent();
        })
            .catch(err => {
            throw err;
        });
    }
    handleEvent() {
        this.handleInfoEvent();
    }
    handleInfoEvent() {
        this.infoService.on('info', (info) => {
            this.emit('info', Object.assign({}, info, { ts: Date.now() }));
        });
    }
}
exports.default = Room;
//# sourceMappingURL=index.js.map