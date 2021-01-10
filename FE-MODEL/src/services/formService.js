import axios from 'axios';

let SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const addFormStepOne = async (
	metaData,
	projectDetails,
	projectTimeline,
	commercials,
	commitment,
	negotiation,
	designElement,
	others
) => {
	try {
		const response = await axios.post(`${SERVER_URL}api/form/step1/add`, {
			metaData: metaData,
			projectDetails: projectDetails,
			projectTimeline: projectTimeline,
			commercials: commercials,
			commitment: commitment,
			negotiation: negotiation,
			designElement: designElement,
			others: others
		});

		const data = await response;
		return data;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const addFormStepTwo = async (formId, competition) => {
	try {
		console.log('competation in method service');
		console.log(typeof competition);
		console.log(competition);
		const response = await axios.post(`${SERVER_URL}api/form/step2/add`, {
			formId: formId,
			competition: competition
		});
		const data = await response;
		return data;
	} catch (error) {
		console.log(error);
		return error;
	}
};
