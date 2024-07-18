import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class InsurancePolicy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  policyNumber: string;

  @Column({ length: 255 })
  policyHolder: string;

  @Column({ length: 255 })
  policyType: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column('decimal')
  premiumAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
