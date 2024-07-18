import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  InsurancePolicyDeleteDto,
  InsurancePolicyDeleteResponse,
  InsurancePolicyInputDto,
  InsurancePolicySearchDto,
  InsurancePolicyUpdateDto,
} from '../dtos/insurance-policy.dto';
import { InsurancePolicy } from '../entities/insurance-policy.entity';

@Injectable()
export class InsurancePolicyService {
  constructor(
    @InjectRepository(InsurancePolicy)
    private insurancePolicysRepository: Repository<InsurancePolicy>,
  ) {}

  async createInsurancePolicy(
    InsurancePolicyInputDto: InsurancePolicyInputDto,
  ): Promise<InsurancePolicy> {
    try {
      const insurancePolicy = this.insurancePolicysRepository.create(
        InsurancePolicyInputDto,
      );
      return await this.insurancePolicysRepository.save(insurancePolicy);
    } catch (error) {
      console.error(`Èrror message: ${error}`);
      throw new HttpException(
        `Error message: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateInsurancePolicy(
    insurancePolicyId: number,
    insurancePolicyUpdateDto: InsurancePolicyUpdateDto,
  ): Promise<InsurancePolicy> {
    try {
      let insurancePolicy = await this.insurancePolicysRepository.findOne({
        where: { id: insurancePolicyId },
      });
      if (!insurancePolicy) {
        throw new NotFoundException('Error to find a Insurance Policy ID');
      } else {
        insurancePolicy.policyNumber = insurancePolicyUpdateDto.policyNumber;
        insurancePolicy.policyHolder = insurancePolicyUpdateDto.policyHolder;
        insurancePolicy.policyType = insurancePolicyUpdateDto.policyType;
        insurancePolicy.startDate = insurancePolicyUpdateDto.startDate;
        insurancePolicy.endDate = insurancePolicyUpdateDto.endDate;
        insurancePolicy.premiumAmount = insurancePolicyUpdateDto.premiumAmount;
        return await this.insurancePolicysRepository.save(insurancePolicy);
      }
    } catch (error) {
      console.error(`Error message: ${error}`);
      throw new HttpException(
        `Error message: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteInsurancePolicy(
    insurancePolicyDeleteDto: InsurancePolicyDeleteDto,
  ): Promise<InsurancePolicyDeleteResponse> {
    try {
      const insurancePolicy = await this.insurancePolicysRepository.findOne({
        where: { policyNumber: insurancePolicyDeleteDto.policyNumber },
      });
      if (!insurancePolicy) {
        throw new NotFoundException('Error to find a Insurance Policy ID');
      } else {
        await this.insurancePolicysRepository.delete({
          id: insurancePolicy.id,
        });
        return {
          policyNumber: insurancePolicyDeleteDto.policyNumber,
          message: 'POLICY HAS BEE DELETED',
        };
      }
    } catch (error) {
      console.error(`Error message: ${error}`);
      throw new HttpException(
        `Error message: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<InsurancePolicy[]> {
    return await this.insurancePolicysRepository.find();
  }

  async findOne(insurancePolicyId: number): Promise<InsurancePolicy> {
    const insurancePolicy = await this.insurancePolicysRepository.findOne({
      where: { id: insurancePolicyId },
    });
    if (!insurancePolicy)
      throw new NotFoundException('Error to find a InsurancePolicy ID');
    return insurancePolicy;
  }

  async findByInsurancePolicySearch(
    insurancePolicySearchDto: InsurancePolicySearchDto,
  ): Promise<any> {
    let insurance = null;
    if (insurancePolicySearchDto.policyNumber) {
      insurance = await this.insurancePolicysRepository.findOne({
        where: { policyNumber: insurancePolicySearchDto.policyNumber },
      });
      if (!insurance)
        throw new NotFoundException('Error to find a Insurance Policy Number');
    } else {
      insurance = await this.insurancePolicysRepository.findBy({
        policyHolder: Like(`%${insurancePolicySearchDto.policyHolder}%`),
      });
      if (!insurance)
        throw new NotFoundException(
          'Error to find a Insurance Policy Holder Name',
        );
    }
    return insurance;
  }
}
