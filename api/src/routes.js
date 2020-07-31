import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StoresController from './app/controllers/StoresController';
import ProductController from './app/controllers/ProductController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/stores', StoresController.index);
routes.post('/stores', StoresController.store);
routes.delete('/stores/:store_id', StoresController.delete);

routes.get('/stores/:store_id/products', ProductController.index);
routes.post('/stores/:store_id/products', ProductController.store);
routes.put('/stores/:store_id/products/:product_id', ProductController.update);
routes.delete('/stores/:store_id/products/:product_id', ProductController.delete);


export default routes;
