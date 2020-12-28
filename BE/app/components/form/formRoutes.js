'use strict';
import Router from 'express';
import formController from './formController.js';
const router = new Router();

router.post('/form/step1/add', formController.addForm);

//get all forms
router.get('/form/get/all', formController.getAllForms);

router.get('/test', formController.test);

export default router;
