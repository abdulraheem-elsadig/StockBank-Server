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
  ManyToOne,
} from "typeorm";
import { User } from "./User.entity";

@Entity("account")
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("increment")
  iban: number;

  @Column({ type: "numeric", default: 0 })
  balance: number;

  @Column()
  accountType: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: "CASCADE" })
  user: User;
}
