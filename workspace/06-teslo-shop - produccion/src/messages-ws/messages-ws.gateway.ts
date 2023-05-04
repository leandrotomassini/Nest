import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';

import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) { }

  async handleConnection(client: Socket) {

    const token = client.handshake.headers.authentication as string;

    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);

    } catch (error) {
      client.disconnect();
      return;
    }

    console.log({ conectados: this.messagesWsService.getConnectedClients() });
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    console.log({ conectados: this.messagesWsService.getConnectedClients() });
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {


    // // Emite solo al cliente
    // client.emit('message-from-server', {
    //   fullName: 'Soy yo!',
    //   message: payload.message || ''
    // });

    // // Emitir a todos menos al cliente inicial
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Soy yo!',
    //   message: payload.message || ''
    // });

    // Emitir a todos
    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || ''
    });

  }

}
