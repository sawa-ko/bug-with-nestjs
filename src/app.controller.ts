import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/setup')
  async setup() {
    return await this.appService.setup();
  }

  @Get('/test')
  async test() {
    return await this.appService.test();
  }
}
