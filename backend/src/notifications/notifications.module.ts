import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOpeningModule } from '../job-opening/job-opening.module';
import { UserModule } from '../user/user.module';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationRepository]),
    UserModule,
    JobOpeningModule,
  ],
  providers: [NotificationsGateway, NotificationService],
  exports: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationsModule {}
