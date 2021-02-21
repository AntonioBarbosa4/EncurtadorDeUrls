/* eslint-disable camelcase */
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

@Entity('shortenerurls')
class Shortener {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  shortener_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'shortenerUrl' })
  getShortenerUrl(): string {
    return `${process.env.APP_API_URL}/${this.shortener_url}`;
  }
}
export default Shortener;
