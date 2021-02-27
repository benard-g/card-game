import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { LobbyEntity } from './LobbyEntity';

@Entity('lobbies_events')
export class LobbyEventEntity {
  @PrimaryColumn()
  public lobbyId!: number;

  @PrimaryColumn()
  public id!: number;

  @Column()
  public eventName!: string;

  @Column({ type: 'jsonb' })
  public eventPayload!: unknown;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt?: Date;

  @ManyToOne(() => LobbyEntity, (lobby) => lobby.lobbyEvents)
  @JoinColumn({ name: 'lobbyId' })
  public lobby?: LobbyEntity;
}
