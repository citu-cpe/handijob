import { Module } from '@nestjs/common';
import { WebSocketsGateway } from './web-sockets.gateway';

@Module({ providers: [WebSocketsGateway], exports: [WebSocketsGateway] })
export class WebSocketsModule {}
