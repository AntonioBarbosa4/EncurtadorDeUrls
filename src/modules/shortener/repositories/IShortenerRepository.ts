/* eslint-disable camelcase */
import Shortener from '../infra/typeorm/entities/Shortener';
import ICreateShortenerDTO from '../dtos/ICreateShortenerDTO';

export default interface IShortenerRepository {
  findByShortenerUrl(shortener_url: string): Promise<Shortener | undefined>;
  findByURL(url: string): Promise<Shortener | undefined>;
  create(data: ICreateShortenerDTO): Promise<Shortener>;
  save(shortener_url: Shortener): Promise<Shortener>;
}
