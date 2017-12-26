"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
function getBaseInfo(roomid) {
    return rp(`http://api.live.bilibili.com/room/v1/Room/room_init?id=${roomid}`);
}
exports.getBaseInfo = getBaseInfo;
function getInfo(roomid) {
    return rp(`https://api.live.bilibili.com/room/v1/Room/get_info?room_id=${roomid}&from=room`);
}
exports.getInfo = getInfo;
//# sourceMappingURL=room.js.map