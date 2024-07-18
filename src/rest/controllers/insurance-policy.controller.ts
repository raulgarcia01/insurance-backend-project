import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import {
  InsurancePolicyDeleteDto,
  InsurancePolicyDeleteResponse,
  InsurancePolicyInputDto,
  InsurancePolicySearchDto,
  InsurancePolicyUpdateDto,
} from '../dtos/insurance-policy.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { InsurancePolicy } from '../entities/insurance-policy.entity';

@Controller('insurance-policies')
export class InsurancePolicyController {
  constructor(
    private readonly insurancePolicyService: InsurancePolicyService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllInsurancePolicys(): Promise<InsurancePolicy[]> {
    return this.insurancePolicyService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':insurancePolicyId')
  getOneInsurancePolicy(
    @Param('insurancePolicyId') insurancePolicyId: number,
  ): Promise<InsurancePolicy> {
    return this.insurancePolicyService.findOne(insurancePolicyId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createInsurancePolicy(
    @Body() createInsurancePolicyDto: InsurancePolicyInputDto,
  ): Promise<InsurancePolicy> {
    return this.insurancePolicyService.createInsurancePolicy(
      createInsurancePolicyDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':insurancePolicyId')
  updateInsurancePolicy(
    @Param('insurancePolicyId') insurancePolicyId: number,
    @Body() updateInsurancePolicyDto: InsurancePolicyUpdateDto,
  ): Promise<InsurancePolicy> {
    return this.insurancePolicyService.updateInsurancePolicy(
      insurancePolicyId,
      updateInsurancePolicyDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteInsurancePolicy(
    @Body() deleteInsurancePolicy: InsurancePolicyDeleteDto,
  ): Promise<InsurancePolicyDeleteResponse> {
    return this.insurancePolicyService.deleteInsurancePolicy(
      deleteInsurancePolicy,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/search')
  searchInsurancePolicy(
    @Body() insurancePolicySearchDto: InsurancePolicySearchDto,
  ): Promise<any> {
    return this.insurancePolicyService.findByInsurancePolicySearch(
      insurancePolicySearchDto,
    );
  }
}
