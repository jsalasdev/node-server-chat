import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const connectedUsers = new UserList();

export const connectClient = (client: Socket) =>{
    const user = new User(client.id);
    connectedUsers.add(user);
}

export const disconnect = (client: Socket) => { 
    client.on('disconnect', () => {
        console.log('Cliente desconectado.');
        connectedUsers.deleteUser(client.id);
        console.log(connectedUsers.getList());
    });
}

export const message = (client:Socket, io: socketIO.Server) =>{
    client.on('mensaje', (payload: {from:string, body:string}) => {
        console.log('Mensaje recibido ',payload); 
        
        io.emit('mensaje-nuevo',payload);
    });
};

export const login = (client:Socket) => {
    client.on('configure-user', (payload :{name:string}, callback:Function) => {
        connectedUsers.updateName(client.id, payload.name);
        callback({
            ok:true,
            message: `Usuario ${payload.name} configurado.`
        })
    });
};