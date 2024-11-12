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

export interface HorizontalAnalyticsClassByYearInterface {
  dataInformationByYear:
    | ServiceInformationInterface
    | CommercialInformationInterface;
  type: "service" | "commercial" | null;
  generateHorizontalAnalysis(): any;
  generateServiceHorizontalAnalysis(): any;
  generateCommercialHorizontalAnalysis(): any;
  calculateValue(value: number, value2: number): number;
}
