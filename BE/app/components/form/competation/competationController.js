'use strict';
import Competition from './competationSchema.js';
import Form from './../formSchema.js';
import errorHandler from '../../../utils/errorHandler/index.js';

class CompetitionController {
	//add form step 2
	addCompetition = async (req, res) => {
		try {
			let competitions = req.body.competition;
			let formId = req.body.formId;
			let competitionsArray = competitions.map((x) => {
				return {
					formId: formId,
					form: formId,
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
			return res.status(200).json({
				code: 200,
				response: response
			});
		} catch (error) {
			errorHandler(res, error);
		}
	};
}

const competitionController = new CompetitionController();
export default competitionController;
