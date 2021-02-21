/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import crypto from 'crypto';
import { addHours, isAfter } from 'date-fns';

import Shortener from '@modules/shortener/infra/typeorm/entities/Shortener';

import IShortenerRepository from '../repositories/IShortenerRepository';

interface IRequest {
  url: string;
}
@injectable()
class CreateShortenerUrlService {
  constructor(
    @inject('ShortenerRepository')
    private shortenerRepository: IShortenerRepository,
  ) {}

  public async execute({ url }: IRequest): Promise<Shortener> {
    const checkUrlExist = await this.shortenerRepository.findByURL(url);

    if (checkUrlExist) {
      const shortened_urlCreateAt = checkUrlExist.created_at;
      const compareDate = addHours(shortened_urlCreateAt, 2);

      if (isAfter(Date.now(), compareDate)) {
        const shortener_url = crypto.randomBytes(4).toString('hex');
        const shortener = await this.shortenerRepository.create({
          url,
          shortener_url,
        });

        return shortener;
      }
      return checkUrlExist;
    }
    const shortener_url = crypto.randomBytes(4).toString('hex');
    const shortener = await this.shortenerRepository.create({
      url,
      shortener_url,
    });

    return shortener;
  }
}
export default CreateShortenerUrlService;
