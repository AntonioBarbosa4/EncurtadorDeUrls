import { Router } from 'express';
import ShortenedURlController from '../controllers/ShortenedURLController';

const shortenerURL = Router();
const shortenedURlController = new ShortenedURlController();
shortenerURL.post('/encurtador', shortenedURlController.create);
shortenerURL.get('/:id', shortenedURlController.show);

export default shortenerURL;
