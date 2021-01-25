'use strict';
import Router from 'express';
import formController from './formController.js';
const router = new Router();

//Step 1 "==> Add Form"
router.post('/form/step1/add', formController.addForm);

//Get all forms
router.get('/form/get/all', formController.getAllForms);

//Single form
router.get('/form/get/:formId', formController.getSingleForm);

//Update form by Id
router.put('/form/update/:formId', formController.updateForm);

//Delete form by Id
router.delete('/form/delete/:formId', formController.deleteForm);

export default router;
