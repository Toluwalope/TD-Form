'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let competitionSchema = new Schema(
	{
		//competition would be nested
		// **TOLU**: You also have to define the share array, discuss in a meeting
		//**ZIA **/ things I done are necessary
		// shareCount: [
		// 	{
		// 		share: 'Dolorem voluptatem t'
		// 	}
		// ],
		// shareCounter: 0,
		formId: mongoose.Schema.Types.ObjectId,
		form: {
			type: Schema.Types.ObjectId,
			ref: 'form'
		},
		finalTransfer: Number,
		averageDistance: Number,
		deltaFirst: Number,
		bmLeader: Boolean,
		averageBMScore: String,
		rangeBMScore: Number,
		bmBenchmark: Boolean,
		noSuppliersRFQ: Number,
		noOfSuppliersAdmitted: Number,
		noOfNeededSuppliers: Number,
		sourceToMorethanOneSupplier: Boolean,
		methodOfNegotiation: String,
		noOfSharesAwarded: String // this should be calculated based on the number of shares created in that baskets (i.e. number of shares in the basket)
	},
	{
		timestamps: true
	}
);
let Competition = mongoose.model('competition', competitionSchema);
export default Competition;
