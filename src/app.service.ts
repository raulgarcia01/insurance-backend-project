import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Affinity Advisors - BACKEND TEST WITH NEST JS';
  }
}
