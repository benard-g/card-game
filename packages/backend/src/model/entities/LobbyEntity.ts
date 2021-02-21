import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Lobby } from '../../core/types/Lobby';

import { LobbyEventEntity } from './LobbyEventEntity';

@Entity('lobbies')
export class LobbyEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Index({ unique: true })
  @Column()
  public code!: string;

  @Column()
  public version!: number;

  @Column({ type: 'jsonb' })
  public cache!: Lobby;

  @Index()
  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt?: Date;

  @OneToMany(() => LobbyEventEntity, (lobbyEvent) => lobbyEvent.lobby, {
    onDelete: 'CASCADE',
  })
  public lobbyEvents?: LobbyEventEntity[];
}
