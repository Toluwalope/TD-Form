
export const getIndustryCollection = () => [
  { id: "Automotive", title: "Automotive" },
  { id: "Chemistry", title: "Chemistry" },
  { id: "Consumer Goods", title: "Consumer Goods" },
  { id: "Energy", title: "Energy" },
  { id: "Finance & Insurance", title: "Finance & Insurance" },
  { id: "Logistics", title: "Logistics" },
  { id: "Pharma", title: "Pharma" },
  { id: "Telecom", title: "Telecom" },
  { id: "Other", title: "Other" },
];

export const getContractTypeCollection = () => [
  { id: "Billable hours", title: "Billable hours" },
  { id: "Billable days", title: "Billable days" },
  { id: "Fixed rate", title: "Fixed rate" },
  { id: "Performance based", title: "Performance based" },
  { id: "Other", title: "Other" },
];

export const getDegreeSupportCollection = () => [
  { id: "Full Support", title: "Full support" },
  { id: "Coaching", title: "Coaching / Light support" },
];

export const getProjectTypeCollection = () => [
  { id: "New Award", title: "New Award" },
  { id: "Annual Price Negotiation", title: "Annual Price Negotiation" },
  { id: "Other", title: "Other" },
];

export const getProjectSubCategoryCollection = () => [
  { id: "1", title: "[Direct Materials] Mechanical" },
  { id: "2", title: "[Direct Materials] Electrical - active" },
  { id: "3", title: "[Direct Materials] Electrical - passive" },
  { id: "4", title: "[Direct Materials] Batteries / motors" },
  { id: "5", title: "[Direct Materials] Raw materials" },
  { id: "6", title: "[Direct Materials] Finished goods" },
  { id: "7", title: "[Direct Materials] Other" },
  { id: "8", title: "[Indirect Materials] Investment / CAPEX" },
  { id: "9", title: "[Indirect Materials] IT" },
  { id: "10", title: "[Indirect Materials] Logistics" },
  { id: "11", title: "[Indirect Materials] Services" },
  { id: "12", title: "[Indirect Materials] Usables / consumables" },
  { id: "13", title: "[Indirect Materials] Other" },
];

export const getTransparencyDecisionBasis = () => [
  { id: "1", title: "Restrictions - none communicated" },
  { id: "2", title: "Restrictions - some communicated" },
  { id: "3", title: "Restrictions - all communicated" },
  { id: "4", title: "No restrictions" },
];

export const getCommitmentToNegotiationProcess = () => [
  { id: "1", title: "No" },
  { id: "2", title: "Yes - but conditional" },
  {
    id: "3",
    title: "Yes - with only condition of no sourcing above reserve price",
  },
  { id: "4", title: "Yes" },
];

export const getCommitmentToNegotiationOutcome = () => [
  { id: "1", title: "No" },
  { id: "2", title: "Yes - but conditional" },
  { id: "3", title: "Yes" },
];

export const getCommitmentInSupplierComm = () => [
  { id: "1", title: "No signatures" },
  { id: "2", title: "Some signatures" },
  { id: "3", title: "All relevant signatures" },
];

export const getModeSupplierComm = () => [
  { id: "1", title: "No Supplier Communication" },
  { id: "2", title: "Email" },
  { id: "3", title: "Web-based" },
  { id: "4", title: "On-site" },
];

export const getDeliverySupplierComm = () => [
  { id: "1", title: "Client only" },
  { id: "2", title: "ASD only" },
  { id: "3", title: "Client and ASD" },
];

export const getModeNegotiationEvent = () => [
  { id: "1", title: "Email" },
  { id: "2", title: "Platform" },
  { id: "3", title: "On-site" },
];

export const getStrategicImportanceForClient = () => [
  { id: "1", title: "Low" },
  { id: "2", title: "Mid" },
  { id: "3", title: "High" },
];

export const getTypeOfNegotiation = () => [
  { id: "1", title: "Rule based" },
  { id: "2", title: "Traditional" },
];

export const getDegreeOfNegotiation = () => [
  { id: "1", title: "Maximum compromises" },
  { id: "2", title: "Some compromises" },
  { id: "3", title: "No compromises (optimal design)" },
];

export const getClientIntervention = () => [
  { id: "1", title: "None" },
  { id: "2", title: "Some" },
  { id: "3", title: "High" },
];

export const getStagesOfNegotiationDesign = () => [
  { id: "1", title: "Single-stage" },
  { id: "2", title: "Multi-stage" },
];

export const getDesignOfLastPlannedStage = () => [
  { id: "1", title: "1st price mechanism (with auction)" },
  { id: "2", title: "1st price mechanism (with sealed-bid)" },
  { id: "3", title: "2nd price mechanism (with auction)" },
  { id: "4", title: "2nd price mechanism (with sealed-bid)" },
  { id: "5", title: "Nth price mechanism (with auction)" },
  { id: "6", title: "Nth price mechanism (with sealed bid)" },
  { id: "7", title: "Single-round take-it-chain (with allocation)" },
  { id: "8", title: "Multi-round take-it-chain (1st price mechanism)" },
  { id: "9", title: "Multi-round take-it-chain (2nd price mechanism)" },
  { id: "10", title: "Full combinatorial auction" },
];

export const getDesignOfLastConductedStage = () => [
  { id: "1", title: "1st price mechanism (with auction)" },
  { id: "2", title: "1st price mechanism (with sealed-bid)" },
  { id: "3", title: "2nd price mechanism (with auction)" },
  { id: "4", title: "2nd price mechanism (with sealed-bid)" },
  { id: "5", title: "Nth price mechanism (with auction)" },
  { id: "6", title: "Nth price mechanism (with sealed bid)" },
  { id: "7", title: "Single-round take-it-chain (with allocation)" },
  { id: "8", title: "Multi-round take-it-chain (1st price mechanism)" },
  { id: "9", title: "Multi-round take-it-chain (2nd price mechanism)" },
  { id: "10", title: "Full combinatorial auction" },
];

export const getDegreeOfInformationFeedback = () => [
  { id: "1", title: "None" },
  { id: "2", title: "Some" },
  { id: "3", title: "High" },
  { id: "4", title: "Information feedback not relevant to competition level" },
];

export const getAverageBMScore = () => [
  { id: "1", title: "Bonus" },
  { id: "2", title: "Penalty" },
  { id: "3", title: "Neither" },
  { id: "4", title: "Not relevant" },
];

export const getMethodOfNegotiation = () => [
  { id: "1", title: "Strictly sequential" },
  { id: "2", title: "Strictly simultaneous" },
  { id: "3", title: "Hybrid" },
];

export const getCurrencyCollection = () => [
  { id: "1", title: "Euro - €" },
  { id: "2", title: "Pound - £" },
  { id: "3", title: "Dollar - $" },
];

export const getBoolCollection = () => [
  { id: "Yes", title: "Yes" },
  { id: "No", title: "No" },
];