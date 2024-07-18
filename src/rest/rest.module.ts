import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { InsurancePolicyController } from './controllers/insurance-policy.controller';
import { InsurancePolicy } from './entities/insurance-policy.entity';
import { InsurancePolicyService } from './services/insurance-policy.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, InsurancePolicy])],
  controllers: [UsersController, InsurancePolicyController],
  providers: [UsersService, InsurancePolicyService],
})
export class RestModule {}
