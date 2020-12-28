'use strict';
import Router from 'express';
import competationController from './competationController.js';
const router = new Router();

//Adding competation now // part 2 of the entire form
router.post('/form/step2/add', competationController.addCompetition);

//Get
router.get('/competation/get/:competitionId', competationController.getCompetation);

//Update
router.put('/competation/update/:competitionId', competationController.updateCompetation);

//Delete
router.delete('/competation/delete/:competitionId', competationController.deleteCompetition);

export default router;
