'use strict';
import Form from './formSchema.js';
import errorHandler from '../../utils/errorHandler/index.js';
import mongoose from 'mongoose';
import Competition from './competation/competationSchema.js';
class FormController {
	//Add form ***Step 1***
	addForm = async (req, res) => {
		try {
			let newform = new Form(req.body);
			let response = await newform.save();
			return res.status(200).json({
				code: 200,
				response: response
			});
		} catch (error) {
			errorHandler(res, error);
		}
	};

	//Getting Forms
	getAllForms = async (req, res) => {
		try {
			let response = await Form.find()
				.sort({
					_id: -1
				})
				.populate('competition');
			return res.status(200).json({
				code: 200,
				response: response
			});
		} catch (error) {
			errorHandler(res, error);
		}
	};

	// GetFormById
	getSingleForm = async (req, res) => {
		try {
			const formId = req.params.formId;
			let response = await Form.findById(formId);
			return res.status(200).json({
				code: 200,
				response: response
			});
		} catch (error) {
			errorHandler(res, error);
		}
	};

	//Update a form (competation would be updated an another api ==> /competation/update/:competitionId )
	updateForm = async (req, res) => {
		try {
			const formId = req.params.formId;
			let response = await Form.findOneAndUpdate(
				{
					_id: formId
				},
				{
					$set: req.body
				},
				{
					new: true
				}
			);
			return res.status(200).json({
				code: 200,
				message: 'Form Updated Successfully!!! :)',
				response: response
			});
		} catch (error) {
			errorHandler(res, error);
		}
	};

	//Delete Form
	deleteForm = async (req, res) => {
		try {
			let formId = req.params.formId;
			let response = await Form.findByIdAndRemove(formId);
			if (response == null) {
				return res.status(404).json({
					code: 404,
					message: 'No Record Found to delete'
				});
			} else {
				await Competition.deleteMany({
					formId: req.params.formId
				});
				return res.status(200).json({
					message: 'Form Deleted Successfully Along Its Competation :)',
					response
				});
			}
		} catch (error) {
			errorHandler(res, error);
		}
	};
}

const formController = new FormController();
export default formController;
