'use strict';
import Competition from './competationSchema.js';
import Form from './../formSchema.js';
import errorHandler from '../../../utils/errorHandler/index.js';

class CompetitionController {
	//Add form step 2
	addCompetition = async (req, res) => {
		try {
			let competitions = req.body.competition;
			let formId = req.body.formId;
			for (let index = 0; index < competitions.length; index++) {
				// console.log(`itertraing ${index + 1} times`);
				let competitionsArray = competitions[index].map((x, index) => {
					return {
						formId: formId,
						form: formId,
						shareCount: x.shareCount,
						finalTransfer: x.finalTransfer,
						averageDistance: x.averageDistance,
						deltaFirst: x.deltaFirst,
						bmLeader: x.bmLeader,
						averageBMScore: x.averageBMScore,
						rangeBMScore: x.rangeBMScore,
						bmBenchmark: x.bmBenchmark,
						noSuppliersRFQ: x.noSuppliersRFQ,
						noOfSuppliersAdmitted: x.noOfSuppliersAdmitted,
						noOfNeededSuppliers: x.noOfNeededSuppliers,
						sourceToMorethanOneSupplier: x.sourceToMorethanOneSupplier,
						methodOfNegotiation: x.methodOfNegotiation,
						noOfSharesAwarded: x.noOfSharesAwarded
					};
				});
				let response = await Competition.insertMany(competitionsArray);
				let currentForm = await Form.findById(formId);
				let ids = [];
				let responseId = response.map((x) => {
					let id = x._id;
					ids.push(id);
				});
				for (let index = 0; index < ids.length; index++) {
					const element = ids[index];
					currentForm.competition.push(element);
					await currentForm.save();
				}
				if (index == competitions.length - 1) {
					return res.status(200).json({
						code: 200,
						response: response
					});
				}
			}
		} catch (error) {
			console.log(error);
			errorHandler(res, error);
		}
	};

	//Get the competation
	getCompetation = async (req, res) => {
		try {
			const competitionId = req.params.competitionId;
			let response = await Competition.findById(competitionId);
			return res.status(200).json({
				code: 200,
				response: response
			});
		} catch (error) {
			errorHandler(res, error);
		}
	};

	//Update competation
	updateCompetation = async (req, res) => {
		try {
			const competitionId = req.params.competitionId;
			let response = await Competition.findOneAndUpdate(
				{
					_id: competitionId
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
				message: 'Updated Successfully!!! :)',
				response: response
			});
		} catch (error) {
			errorHandler(res, error);
		}
	};

	//Delete competation
	deleteCompetition = async (req, res) => {
		try {
			let competitionId = req.params.competitionId;
			let response = await Competition.findByIdAndRemove(competitionId);
			let currentFormId = response.formId;
			let currentForm = await Form.findById(currentFormId);
			let index = await currentForm.competition.indexOf(competitionId);
			if (index !== -1) {
				await currentForm.competition.splice(index, 1);
				await currentForm.save();
			}
			return res.status(200).json({
				code: 200,
				message: 'Deleted Successfully!!! :)',
				response: response
			});
		} catch (error) {
			errorHandler(res, error);
		}
	};
}

const competitionController = new CompetitionController();
export default competitionController;
