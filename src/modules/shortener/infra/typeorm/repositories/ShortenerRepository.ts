/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';
import IShortenerRepository from '@modules/shortener/repositories/IShortenerRepository';
import ICreateShortenerDTO from '@modules/shortener/dtos/ICreateShortenerDTO';
import Shortener from '../entities/Shortener';

class ShortenerRepository implements IShortenerRepository {
  private ormRepository: Repository<Shortener>;

  constructor() {
    this.ormRepository = getRepository(Shortener);
  }

  public async findByShortenerUrl(
    shortener_url: string,
  ): Promise<Shortener | undefined> {
    const url = await this.ormRepository.findOne({
      where: { shortener_url },
    });
    return url;
  }

  public async findByURL(url: string): Promise<Shortener | undefined> {
    const findUrl = await this.ormRepository.findOne({
      where: { url },
      order: { id: 'DESC' },
    });
    return findUrl;
  }

  public async create(data: ICreateShortenerDTO): Promise<Shortener> {
    const shortener = await this.ormRepository.create(data);
    await this.ormRepository.save(shortener);

    return shortener;
  }

  public async save(shortener_url: Shortener): Promise<Shortener> {
    return this.ormRepository.save(shortener_url);
  }
}
export default ShortenerRepository;
