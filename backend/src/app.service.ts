import { Injectable } from '@nestjs/common';
// import { Request } from 'express';

@Injectable()
export class AppService {
  public getHello(): string {
    return 'Hello World!';
  }
}
