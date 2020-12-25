'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let formSchema = new Schema(
	{
		//all fields will be here
		// userId: mongoose.Schema.Types.ObjectId
		metaData: {
			industry: '',
			industryState: '',
			otherIndustry: '',
			otherIndustryState: '',
			projectName: 'Beverly Cochran',
			projectNameState: 'success',
			contractType: '',
			contractTypeState: '',
			otherContractType: '',
			otherContractTypeState: '',
			hoursSupport: 'Adipisci reprehender',
			hoursSupportState: 'success',
			degreeSupport: '',
			degreeSupportState: '',
			disableOtherIndustry: true,
			disableOtherContractType: true,
			val: '',
			emails: [ '2val@2val.com' ],
			count: 1
		},
		projectDetails: {
			projectType: 'New Award',
			projectTypeState: '',
			projectSubCategory: '',
			projectSubCategoryState: '',
			currency: '',
			currencyState: ''
		},
		projectTimeline: {
			releaseDate: '2020-12-03T08:56:00.000Z',
			responseDate: '2020-12-04T08:56:00.000Z',
			negotiationSignOffDate: '2020-12-11T08:56:00.000Z',
			supplierCommDate: '2020-12-24T08:56:00.000Z',
			iniPlannedNegotiationEndDate: '2020-12-08T08:56:00.000Z',
			negotiationStartDate: '2020-12-04T08:56:00.000Z',
			negotiationEndDate: '2020-12-04T08:56:00.000Z'
		},
		commercials: {
			bestInitialTransferPrice: '',
			bestInitialComparisonPrice: '',
			finalComparisonPrice: '',
			numberOfBaskets: 0,
			numberOfBasketsState: '',
			shorttermSavingsIncludedInCP: false,
			shortTermSavingsYear1: '',
			shortTermSavingsYear2: '',
			shortTermSavingsYear3: '',
			shortTermSavingsYear4: '',
			shortTermSavingsYear5: '',
			disable: true
		},
		commitment: {
			bmConducted: false,
			disableOtherPenalty: true,
			varBmIncluded: false,
			bmDecisionBasis: false,
			transparencyDecisionBasis: '1',
			commitmentToSetSuppliers: true,
			commitmentToNegotiationProcess: '4',
			commitmentToNegotiationOutcome: '2',
			commitmentInSupplierComm: '2',
			modeSupplierComm: '1',
			deliverySupplierComm: '2',
			modeNegotiationEvent: '2',
			strategicImportanceForClient: ''
		},
		//competition would be nested
		competition: {
			baskets: [
				{
					shareCount: [
						{
							share: 'Dolorem voluptatem t'
						}
					],
					shareCounter: 0,
					finalTransfer: 'Cupiditate nulla con',
					averageDistance: 'Laboriosam irure om',
					deltaFirst: 'Deserunt quia qui qu',
					bmLeader: true,
					averageBMScore: '',
					rangeBMScore: 'Et ut quaerat neque ',
					bmBenchmark: true,
					noSuppliersRFQ: 'Veniam labore ipsa',
					noOfSuppliersAdmitted: 'Beatae fugiat aperi',
					noOfNeededSuppliers: '6',
					sourceToMorethanOneSupplier: true,
					methodOfNegotiation: '',
					noOfSharesAwarded: '',
					disableOnSourceLessThanOne: false
				}
			],
			basketCount: 0,
			sourceToMorethanOneSupplier: true,
			bmBenchmark: true
		},
		negotiation: {
			typeOfNegotiation: '',
			degreeOfDeviation: '',
			clientIntervention: '',
			stagesOfNegotiationDesign: '',
			designOfLastPlannedStage: '',
			designOfLastConductedStage: '',
			degreeOfInformationFeedback: '',
			terminationPossibleBefore: false,
			terminationDoneBefore: true,
			distinctSupplierSet: true,
			noOfDistinctSuppliers: '966',
			riskOfCollusion: false,
			noOfDistinctSuppliersState: 'success'
		},
		designElement: {
			opportunityToQualifyForAnything: true,
			shortlistingOfSupplier: false,
			sealedBidRequote: true,
			ranking: false,
			englishLang: true,
			dutchLang: false,
			hongkongLang: true,
			brazilianLang: false,
			takeItOrX: true,
			dummyPrice: true,
			informationBuying: true,
			takeItChain: true,
			targetLine: false,
			lastCall: false,
			firstCall: true
		},
		others: {
			allocationToolUsed: true,
			sourcingCockpitUsed: false,
			eAuctionPlatformUsed: true,
			clientTCS: true,
			forwardBundling: false,
			changeManagement: true,
			otherPostNomination: false
		}
	},
	{
		timestamps: true
	}
);
let Form = mongoose.model('form', formSchema);
export default Form;
