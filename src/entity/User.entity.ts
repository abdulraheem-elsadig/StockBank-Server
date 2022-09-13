import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Generated,
  OneToMany,
} from "typeorm";
import { Account } from "./Account.entity";
import { Transaction } from "./Transaction.entity";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  @JoinColumn()
  transactions: Transaction[];

  @OneToMany(() => Account, (account) => account.user)
  @JoinColumn()
  accounts: Account[];

  //   @ManyToMany(() => Banker)
  //   bankers: Banker[];
}
