/* eslint-disable camelcase */
import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IShortenerRepository from '../repositories/IShortenerRepository';

import Shortener from '../infra/typeorm/entities/Shortener';

interface IRequest {
  shortener_url: string;
}

@injectable()
class RedirectService {
  constructor(
    @inject('ShortenerRepository')
    private shortenerRepository: IShortenerRepository,
  ) {}

  public async execute({ shortener_url }: IRequest): Promise<Shortener> {
    const url = await this.shortenerRepository.findByShortenerUrl(
      shortener_url,
    );
    if (!url) {
      throw new AppError('URL not found.', 404);
    }
    const shortened_urlCreateAt = url.created_at;
    const compareDate = addHours(shortened_urlCreateAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('URL expired');
    }

    return url;
  }
}
export default RedirectService;
