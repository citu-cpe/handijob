import { Module } from '@nestjs/common';
import { AppController } from '../../../src/app.controller';
import { AppService } from '../../../src/app.service';
import { MockAccountTypeModule } from './account-type.module';
import { MockAuthenticationModule } from './authentication.mock.module';
import { MockAuthorizationModule } from './authorization.mock.module';
import { MockEmployerModule } from './employer.mock.module';
import { MockFreelancerModule } from './freelancer.mock.module';
import { MockUserModule } from './user.mock.module';

@Module({
  imports: [
    MockAuthenticationModule,
    MockAuthorizationModule,
    MockUserModule,
    MockFreelancerModule,
    MockEmployerModule,
    MockAccountTypeModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class MockAppModule {}
