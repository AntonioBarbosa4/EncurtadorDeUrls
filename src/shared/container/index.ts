import { container } from 'tsyringe';

import IShortenerRepository from '@modules/shortener/repositories/IShortenerRepository';
import ShortenerRepository from '@modules/shortener/infra/typeorm/repositories/ShortenerRepository';

container.registerSingleton<IShortenerRepository>(
  'ShortenerRepository',
  ShortenerRepository,
);
