import AppError from '@shared/errors/AppError';

import FakeShortenerRepository from '../repositories/fakes/FakeShortenerRepository';
import CreateShortenerUrlService from './CreateShortenerUrlService';
import RedirectService from './RedirectService';

describe('Redirect', () => {
  it('Should be able to return the url not shortener', async () => {
    const fakeShortenerRepository = new FakeShortenerRepository();
    const redirectService = new RedirectService(fakeShortenerRepository);
    const createShortenerUrl = new CreateShortenerUrlService(
      fakeShortenerRepository,
    );
    const url = await createShortenerUrl.execute({
      url: 'www.google.com',
    });
    const response = await redirectService.execute({
      shortener_url: url.shortener_url,
    });

    expect(url.url).toBe(response.url);
  });
  it('Should be able return error 404, to invalid url', async () => {
    const fakeShortenerRepository = new FakeShortenerRepository();
    const redirectService = new RedirectService(fakeShortenerRepository);

    await expect(
      redirectService.execute({ shortener_url: 'fake-url' }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should be able return error 404, to expired url', async () => {
    const fakeShortenerRepository = new FakeShortenerRepository();
    const redirectService = new RedirectService(fakeShortenerRepository);
    const createShortenerUrl = new CreateShortenerUrlService(
      fakeShortenerRepository,
    );
    const url = await createShortenerUrl.execute({
      url: 'www.google.com',
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 2);
    });

    await expect(
      redirectService.execute({ shortener_url: url.shortener_url }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
