import { Module } from '@nestjs/common';
import { EmployerController } from '../../../src/employer/employer.controller';
import { EmployerRepository } from '../../../src/employer/employer.repository';
import { EmployerService } from '../../../src/employer/employer.service';
import { mockEmployerRepositoryFactory } from '../repositories/employer.mock.repository';

@Module({
  providers: [
    {
      provide: EmployerRepository,
      useFactory: mockEmployerRepositoryFactory,
    },
    EmployerService,
  ],
  controllers: [EmployerController],
  exports: [EmployerService],
})
export class MockEmployerModule {}
