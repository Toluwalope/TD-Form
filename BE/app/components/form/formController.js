'use strict';
import Form from './formRoutes.js';
import errorHandler from '../../utils/errorHandler/index.js';

class FormController {
	//add form
	//test
	test(req, res) {
		console.log('hello');
		return res.send('test');
	}
}

const formController = new FormController();
export default formController;
