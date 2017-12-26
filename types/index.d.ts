interface IRoomConfig {
  id: number
}

interface IRoomBaseInfo {
  code: number
  msg: string
  message: string
  data: IRoomBaseInfoData
}

interface IRoomBaseInfoData {
  room_id: number  // 标准roomid
  short_id: number // 短号id
  uid: number      // 用户id
  need_p2p: number
  is_hidden: boolean
  is_locked: boolean
  hidden_till: number
  lock_till: number
  encrypted: boolean
  pwd_verified: boolean
}

interface IInfoServiceConfig {
  roomid: number
  interval: number
}


// room - info 
interface IRoomInfo {
  code: number
  msg: string
  message: string
  data: IRoomInfoData
}

interface IRoomInfoData {
  uid: number
  description: string
  live_status: number
  area_id: number,        // 分区
  parent_area_id: number  // 父分区
  parent_area_name: string
  old_area_id: number     // 老分区
  background: string      // 房间背景
  title: string           // 标题
  user_cover: string      // 封面
  live_time: string       // 直播时间
  tags: string
  is_anchor: number
  room_silent_type: string
  room_silent_level: number
  room_silent_second: number
  area_name: string       // 子分区名
  pendants: string
  area_pendants: string
  hot_words: string[]
  verify: string
  new_pendants: {
    frame: any,
    badge: any
  }
}