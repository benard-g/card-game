import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lobbies')
export class LobbyEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Index({ unique: true })
  @Column()
  public code!: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt?: Date;
}
