import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { RoomRepository } from './room.repository';
import { RoomService } from './room.service';

// TODO: improve chat
@Module({
  imports: [
    TypeOrmModule.forFeature([RoomRepository, MessageRepository]),
    UserModule,
  ],
  providers: [ChatGateway, RoomService, MessageService],
  exports: [RoomService, MessageService],
  controllers: [ChatController],
})
export class ChatModule {}
