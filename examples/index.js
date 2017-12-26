const { Room } = require('../dist/');

let room = new Room(213);

room.on('info', info => {
  console.log(info.data);
});