import * as rp from 'request-promise';

function getBaseInfo(roomid) {
  return rp(`http://api.live.bilibili.com/room/v1/Room/room_init?id=${roomid}`);
}

function getInfo(roomid) {
  return rp(`https://api.live.bilibili.com/room/v1/Room/get_info?room_id=${roomid}&from=room`);
}

export {
  getBaseInfo,
  getInfo
}