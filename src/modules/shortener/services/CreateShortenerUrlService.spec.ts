import FakeShortenerRepository from '../repositories/fakes/FakeShortenerRepository';
import CreateShortenerUrlService from './CreateShortenerUrlService';

describe('Create Shortener url', () => {
  it('Should be able to create new shortener url', async () => {
    const fakeShortenerRepository = new FakeShortenerRepository();

    const createShortenerUrl = new CreateShortenerUrlService(
      fakeShortenerRepository,
    );

    const url = await createShortenerUrl.execute({
      url: 'www.google.com',
    });
    expect(url).toHaveProperty('shortener_url');
  });
  it('Should be able to retrieve an unexpired url', async () => {
    const fakeShortenerRepository = new FakeShortenerRepository();
    const createShortenerUrl = new CreateShortenerUrlService(
      fakeShortenerRepository,
    );

    const url = await createShortenerUrl.execute({
      url: 'www.google.com',
    });
    const url2 = await createShortenerUrl.execute({
      url: 'www.google.com',
    });

    expect(url2).toEqual(url);
  });
  it('Should be able to create new shortener url when has expired', async () => {
    const fakeShortenerRepository = new FakeShortenerRepository();
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

    const url2 = await createShortenerUrl.execute({
      url: 'www.google.com',
    });

    expect(url2.shortener_url).not.toBe(url);
  });
});
