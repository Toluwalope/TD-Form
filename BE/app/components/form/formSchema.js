'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let formSchema = new Schema(
	{
		//all fields will be here
		// userId: mongoose.Schema.Types.ObjectId
		metaData: {
			industry: String,
			industryState: String,
			otherIndustry: String,
			otherIndustryState: String,
			projectName: String,
			projectNameState: String,
			contractType: String,
			contractTypeState: String,
			otherContractType: String,
			otherContractTypeState: String,
			hoursSupport: Number,
			// hoursSupportState: 'success',
			degreeSupport: String,
			// degreeSupportState:String,
			// disableOtherIndustry: Boolean,
			// disableOtherContractType: Boolean,
			// val: String,
			//contact mean email etc.
			contact: [ String ]
			// count: [String]
		},
		projectDetails: {
			projectType: String,
			// projectTypeState: '',
			projectSubCategory: String,
			// projectSubCategoryState: '',
			currency: String
			// currencyState: ''
		},
		projectTimeline: {
			// 2020-12-03T08:56:00.000Z'
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
			// numberOfBasketsState: '',
			shorttermSavingsIncludedInCP: Boolean,
			shortTermSavingsYear1: Number,
			shortTermSavingsYear2: Number,
			shortTermSavingsYear3: Number,
			shortTermSavingsYear4: Number,
			shortTermSavingsYear5: Number,
			disable: true
		},
		commitment: {
			bmConducted: Boolean,
			disableOtherPenalty: Boolean,
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
					averageBMScore: '',
					rangeBMScore: Number,
					bmBenchmark: Boolean,
					noSuppliersRFQ: Number,
					noOfSuppliersAdmitted: Number,
					noOfNeededSuppliers: Number,
					sourceToMorethanOneSupplier: Boolean,
					methodOfNegotiation: String,
					noOfSharesAwarded: String,
					disableOnSourceLessThanOne: Boolean
				}
			]
			// basketCount: 0,
			// sourceToMorethanOneSupplier: true,
			// bmBenchmark: true
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
			// noOfDistinctSuppliersState:
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
