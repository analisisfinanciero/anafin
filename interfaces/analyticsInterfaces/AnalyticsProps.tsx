import {
  CommercialInformationInterface,
  ServiceInformationInterface,
} from "../dataInterfaces/DataContextProps";

export interface VerticalAnalyticsClassByYearInterface {
  baseValue: number;
  dataInformationByYear:
    | ServiceInformationInterface
    | CommercialInformationInterface;
  type: "service" | "commercial" | null;
  generateVerticalAnalysis(): any;
  generateServiceVerticalAnalysis(): any;
  generateCommercialVerticalAnalysis(): any;
  calculateValue(value: number): number;
}

