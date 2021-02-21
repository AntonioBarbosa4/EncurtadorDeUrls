/* eslint-disable camelcase */
import { v4 as uuidv_4 } from 'uuid';
import IShortenerRepository from '@modules/shortener/repositories/IShortenerRepository';
import ICreateShortenerDTO from '@modules/shortener/dtos/ICreateShortenerDTO';
import Shortener from '@modules/shortener/infra/typeorm/entities/Shortener';

class FakeShortenerRepository implements IShortenerRepository {
  private shortened: Shortener[] = [];

  public async findByShortenerUrl(
    shortener_url: string,
  ): Promise<Shortener | undefined> {
    const findUrl = this.shortened.find(
      shortened => shortened.shortener_url === shortener_url,
    );
    return findUrl;
  }

  public async findByURL(url: string): Promise<Shortener | undefined> {
    const findUrl = this.shortened.find(shortened => shortened.url === url);
    return findUrl;
  }

  public async create(data: ICreateShortenerDTO): Promise<Shortener> {
    const shortener_url = new Shortener();
    Object.assign(
      shortener_url,
      {
        id: uuidv_4(),
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      data,
    );

    this.shortened.push(shortener_url);
    return shortener_url;
  }

  public async save(shortener_url: Shortener): Promise<Shortener> {
    const findIndex = this.shortened.findIndex(
      findUrl => findUrl.id === shortener_url.id,
    );

    this.shortened[findIndex] = shortener_url;
    return shortener_url;
  }
}

export default FakeShortenerRepository;
