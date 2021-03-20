import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Lobby } from '../../core/types/Lobby';

import { LobbyEventEntity } from './LobbyEventEntity';

export const LobbyEntityIndex = {
  updatedAt: 'Index_updatedAt',
} as const;

@Entity('lobbies')
export class LobbyEntity {
  @PrimaryColumn()
  public id!: string;

  @Column()
  public version!: number;

  @Column({ type: 'jsonb' })
  public cache!: Lobby;

  @Index(LobbyEntityIndex.updatedAt)
  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt?: Date;

  @OneToMany(() => LobbyEventEntity, (lobbyEvent) => lobbyEvent.lobby)
  public lobbyEvents?: LobbyEventEntity[];
}
