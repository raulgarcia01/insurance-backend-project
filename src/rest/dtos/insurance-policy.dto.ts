import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsurancePolicyInputDto {
  @IsString()
  @IsNotEmpty()
  policyNumber: string;

  @IsString()
  @IsNotEmpty()
  policyHolder: string;

  @IsString()
  @IsNotEmpty()
  policyType: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsNumber()
  @IsNotEmpty()
  premiumAmount: number;
}

export class InsurancePolicyUpdateDto {
  @IsString()
  @IsNotEmpty()
  policyNumber: string;

  @IsString()
  @IsNotEmpty()
  policyHolder: string;

  @IsString()
  @IsNotEmpty()
  policyType: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsNumber()
  @IsNotEmpty()
  premiumAmount: number;
}

export class InsurancePolicyDeleteDto {
  @IsString()
  @IsNotEmpty()
  policyNumber: string;
}

export class InsurancePolicySearchDto {
  policyNumber: string;
  policyHolder: string;
}

export class InsurancePolicyDeleteResponse {
  policyNumber: string;
  message: string;
}
