import {io} from 'socket.io-client';

function socketConfigure() {
    
    
    const socket=io(process.env.REACT_APP_SOCKET_URL);

    return socket

}

export default socketConfigure

