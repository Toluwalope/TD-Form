'use strict';
import Form from './formSchema.js';
import errorHandler from '../../utils/errorHandler/index.js';
import mongoose from 'mongoose';
import Competition from './competation/competationSchema.js';
class FormController {
	//add form
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

	getAllForms = async (req, res) => {
		try {
			let response = await Form.find().populate('competition');
			return res.status(200).json({
				code: 200,
				response: response
			});
		} catch (error) {
			errorHandler(res, error);
		}
	};

	// getAllForms = async (req, res) => {
	// 	try {
	// 		let formId = '5fe9c79ae542bf72c56fc2a8';
	// 		let response = await Form.aggregate(formController.competitionPipeline(formId));
	// 		console.log(response);
	// 		return res.status(200).json({
	// 			code: 200,
	// 			response: response
	// 		});
	// 	} catch (error) {
	// 		errorHandler(res, error);
	// 	}
	// };

	//test
	test(req, res) {
		console.log('hello');
		return res.send('test');
	}

	competitionPipeline(formId) {
		return [
			{
				$match: {
					formId: mongoose.Types.ObjectId(formId)
				}
			},
			{
				$lookup: {
					from: 'competitions',
					localField: '_id',
					foreignField: 'formId',
					as: 'Competition'
				}
			}
		];
	}
}

const formController = new FormController();
export default formController;
