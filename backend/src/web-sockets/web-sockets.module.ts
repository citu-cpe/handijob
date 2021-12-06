import { Module } from '@nestjs/common';
import { WebSocketsGateway } from './web-sockets.gateway';

@Module({ providers: [WebSocketsGateway] })
export class WebSocketsModule {}
