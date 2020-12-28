// with ES6 import
import io from 'socket.io-client';

const socket = io('http://localhost:4000', {
    transports: ['websocket'],
    upgrade: false
});

// socket.emit('connection', () => {
//     console.log(socket.id); // 'G5p5...'
//   });

socket.emit('join', 'Toto ROOM')

export default socket