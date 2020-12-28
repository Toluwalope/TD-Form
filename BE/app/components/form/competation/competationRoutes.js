'use strict';
import Router from 'express';
import competationController from './competationController.js';
const router = new Router();

//adding competation now // part 2 of the entire form
router.post('/form/step2/add', competationController.addCompetition);

export default router;
