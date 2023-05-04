import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) { }

  @Get()
  // @Auth(validRoles.admin)
  executedSeed() {
    return this.seedService.runSeed();
  }


}
