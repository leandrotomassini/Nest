import { Controller, Get } from '@nestjs/common';

import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) { }

  @Get()
  @Auth(validRoles.admin)
  executedSeed() {
    return this.seedService.runSeed();
  }


}
