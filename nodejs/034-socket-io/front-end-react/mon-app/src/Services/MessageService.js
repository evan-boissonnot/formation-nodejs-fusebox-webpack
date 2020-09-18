import io from 'socket.io-client';

const ENDPOINT = "http://127.0.0.1:3000";

class MessageService {
    socket;

    constructor(url) {
        this.url = url;
    }

    init() {
        this.socket = io(this.url);

        console.log('this.socket :>> ', this.socket);
    }

    close() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    onReceiveMessage(callback) {
        this.socket.on('chat:message', (message) => {
            callback(this, message);
        });
    }

    onReceiveTyping(callback) {
        this.socket.on('chat:typing', () => {
            callback(this, null);
        });
    }

    onReceiveEndTyping(callback) {
        this.socket.on('chat:endtyping', () => {
            callback(this, null);
        });
    }

    send(message) {
        this.socket.emit('chat:message', message);
    }

    sendTyping(isTyping = false) {
        let key = 'end';
            
        if (isTyping) {
            key = ''
        } 

        this.socket.emit(`chat:${key}typing`);
    }
}

export default new MessageService(ENDPOINT);