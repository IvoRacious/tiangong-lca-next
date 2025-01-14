export type ProcessTable = {
  key: string;
  id: string;
  version: string;
  lang: string;
  name: string;
  generalComment: string;
  classification: string;
  referenceYear: string;
  location: string;
  modifiedAt: Date;
};

export type ProcessExchangeTable = {
  key: string;
  dataSetInternalID: string;
  exchangeDirection: string;
  referenceToFlowDataSetId: string;
  referenceToFlowDataSet: string;
  meanAmount: string;
  resultingAmount: string;
  dataDerivationTypeStatus: string;
  generalComment: string;
  quantitativeReference: boolean;
  functionalUnitOrOther: any;
};
