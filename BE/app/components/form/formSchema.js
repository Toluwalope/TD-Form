'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let formSchema = new Schema(
	{
		//all fields will be here
		// userId: mongoose.Schema.Types.ObjectId
		metaData: {
			industry: String,
			otherIndustry: String,
			projectName: String,
			contractType: String,
			otherContractType: String,
			hoursSupport: Number,
			degreeSupport: String,
			contact: [ String ],
		},
		projectDetails: {
			projectType: String,
			projectSubCategory: String,
			currency: String
		},
		projectTimeline: {
			// 2020-12-03T08:56:00.000Z'
			// **TOLU**: we can save just the date and not the time
			releaseDate: Date,
			responseDate: Date,
			negotiationSignOffDate: Date,
			supplierCommDate: Date,
			iniPlannedNegotiationEndDate: Date,
			negotiationStartDate: Date,
			negotiationEndDate: Date
		},
		commercials: {
			bestInitialTransferPrice: Number,
			bestInitialComparisonPrice: Number,
			finalComparisonPrice: Number,
			numberOfBaskets: Number,
			shorttermSavingsIncludedInCP: Boolean,
			shortTermSavingsYear1: Number,
			shortTermSavingsYear2: Number,
			shortTermSavingsYear3: Number,
			shortTermSavingsYear4: Number,
			shortTermSavingsYear5: Number,
		},
		commitment: {
			bmConducted: Boolean,
			varBmIncluded: Boolean,
			bmDecisionBasis: Boolean,
			transparencyDecisionBasis: String,
			commitmentToSetSuppliers: Boolean,
			commitmentToNegotiationProcess: String,
			commitmentToNegotiationOutcome: String,
			commitmentInSupplierComm: String,
			modeSupplierComm: String,
			deliverySupplierComm: String,
			modeNegotiationEvent: String,
			strategicImportanceForClient: String
		},
		//competition would be nested
		competition: {
			baskets: [
				{
					// **TOLU**: You also have to define the share array
					// shareCount: [
					// 	{
					// 		share: 'Dolorem voluptatem t'
					// 	}
					// ],
					// shareCounter: 0,
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
					noOfSharesAwarded: String, // this should be calculated based on the number of shares created in that baskets (i.e. number of shares in the basket)
				}
			],
			basketCount: Number,
		},
		negotiation: {
			typeOfNegotiation: String,
			degreeOfDeviation: String,
			clientIntervention: String,
			stagesOfNegotiationDesign: String,
			designOfLastPlannedStage: String,
			designOfLastConductedStage: String,
			degreeOfInformationFeedback: String,
			terminationPossibleBefore: Boolean,
			terminationDoneBefore: Boolean,
			distinctSupplierSet: Boolean,
			noOfDistinctSuppliers: Number,
			riskOfCollusion: Boolean
		},
		designElement: {
			opportunityToQualifyForAnything: Boolean,
			shortlistingOfSupplier: Boolean,
			sealedBidRequote: Boolean,
			ranking: Boolean,
			englishLang: Boolean,
			dutchLang: Boolean,
			hongkongLang: Boolean,
			brazilianLang: Boolean,
			takeItOrX: Boolean,
			dummyPrice: Boolean,
			informationBuying: Boolean,
			takeItChain: Boolean,
			targetLine: Boolean,
			lastCall: Boolean,
			firstCall: Boolean
		},
		others: {
			allocationToolUsed: Boolean,
			sourcingCockpitUsed: Boolean,
			eAuctionPlatformUsed: Boolean,
			clientTCS: Boolean,
			forwardBundling: Boolean,
			changeManagement: Boolean,
			otherPostNomination: Boolean
		}
	},
	{
		timestamps: true
	}
);
let Form = mongoose.model('form', formSchema);
export default Form;
