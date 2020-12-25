'use strict';
import Router from 'express';
import formController from './formController.js';
const router = new Router();

router.get('/test', formController.test);

export default router;
