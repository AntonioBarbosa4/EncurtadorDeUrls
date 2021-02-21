/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateShortenerUrlService from '@modules/shortener/services/CreateShortenerUrlService';
import RedirectService from '@modules/shortener/services/RedirectService';
import { classToClass } from 'class-transformer';

export default class ShortenedURlController {
  public async show(request: Request, response: Response): Promise<void> {
    const shortener_url = request.params.id;

    const showUrl = container.resolve(RedirectService);

    const { url } = await showUrl.execute({ shortener_url });

    response.redirect(url);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { url } = request.body;

    const createShortenerUrl = container.resolve(CreateShortenerUrlService);

    const shortenerurl = await createShortenerUrl.execute({
      url,
    });

    return response.json({
      newUrl: classToClass(shortenerurl.getShortenerUrl()),
    });
  }
}
