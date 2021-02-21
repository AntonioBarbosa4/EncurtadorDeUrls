import { Router } from 'express';
import shortenerRouter from '@modules/shortener/infra/http/routes/shortenedURL.routes';

const routes = Router();

routes.use('/', shortenerRouter);

export default routes;
