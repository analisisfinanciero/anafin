import {
  CommercialInformationInterface,
  ServiceInformationInterface,
} from "@/interfaces/dataInterfaces/DataContextProps";
import {
  CommercialInformation,
  ServiceInformation,
} from "../dataClasses/DataClass";
import { VerticalAnalyticsClassByYearInterface } from "@/interfaces/analyticsInterfaces/AnalyticsProps";

export class VerticalAnalyticsClassByYear
  implements VerticalAnalyticsClassByYearInterface
{
  baseValue: number;
  dataInformationByYear:
    | ServiceInformationInterface
    | CommercialInformationInterface;
  type: "service" | "commercial" | null;

  constructor(
    dataInformationByYear:
      | ServiceInformationInterface
      | CommercialInformationInterface,
    type: "service" | "commercial" | null
  ) {
    this.baseValue = dataInformationByYear.grossSales;
    this.dataInformationByYear = dataInformationByYear;
    this.type = type;
  }

  generateVerticalAnalysis() {
    if (this.type === "service") {
      return this.generateServiceVerticalAnalysis();
    } else if (this.type === "commercial") {
      return this.generateCommercialVerticalAnalysis();
    } else {
      return null;
    }
  }

  generateServiceVerticalAnalysis() {
    const verticalAnalysisObject = new ServiceInformation(
      this.dataInformationByYear.currentYear
    );
    verticalAnalysisObject.creditIncome = this.calculateValue(
      this.dataInformationByYear.creditIncome
    );
    verticalAnalysisObject.cashIncome = this.calculateValue(
      this.dataInformationByYear.cashIncome
    );
    verticalAnalysisObject.grossSales = this.calculateValue(
      this.dataInformationByYear.grossSales
    );
    verticalAnalysisObject.operatingSalesExpenses = this.calculateValue(
      this.dataInformationByYear.operatingSalesExpenses
    );
    verticalAnalysisObject.administrativeOperatingExpenses =
      this.calculateValue(
        this.dataInformationByYear.administrativeOperatingExpenses
      );
    verticalAnalysisObject.operatingProfit = this.calculateValue(
      this.dataInformationByYear.operatingProfit
    );
    verticalAnalysisObject.financialIncome = this.calculateValue(
      this.dataInformationByYear.financialIncome
    );
    verticalAnalysisObject.financialExpenses = this.calculateValue(
      this.dataInformationByYear.financialExpenses
    );
    verticalAnalysisObject.extraordinaryIncome = this.calculateValue(
      this.dataInformationByYear.extraordinaryIncome
    );
    verticalAnalysisObject.extraordinaryExpenses = this.calculateValue(
      this.dataInformationByYear.extraordinaryExpenses
    );
    verticalAnalysisObject.profitBeforeTax = this.calculateValue(
      this.dataInformationByYear.profitBeforeTax
    );
    verticalAnalysisObject.incomeTax = this.calculateValue(
      this.dataInformationByYear.incomeTax
    );
    verticalAnalysisObject.netIncome = this.calculateValue(
      this.dataInformationByYear.netIncome
    );
    return verticalAnalysisObject;
  }

  generateCommercialVerticalAnalysis() {
    const dataInformationValueParse = this
      .dataInformationByYear as CommercialInformationInterface;
    const verticalAnalysisObject = new CommercialInformation(
      this.dataInformationByYear.currentYear
    );
    verticalAnalysisObject.creditIncome = this.calculateValue(
      dataInformationValueParse.creditIncome
    );
    verticalAnalysisObject.cashIncome = this.calculateValue(
      dataInformationValueParse.cashIncome
    );
    verticalAnalysisObject.grossSales = this.calculateValue(
      dataInformationValueParse.grossSales
    );
    verticalAnalysisObject.returnsAndDiscounts = this.calculateValue(
      dataInformationValueParse.returnsAndDiscounts
    );
    verticalAnalysisObject.netSales = this.calculateValue(
      dataInformationValueParse.netSales
    );
    verticalAnalysisObject.initialInventory = this.calculateValue(
      dataInformationValueParse.initialInventory
    );
    verticalAnalysisObject.finalInventory = this.calculateValue(
      dataInformationValueParse.finalInventory
    );
    verticalAnalysisObject.purchasesCredit = this.calculateValue(
      dataInformationValueParse.purchasesCredit
    );
    verticalAnalysisObject.purchasesCash = this.calculateValue(
      dataInformationValueParse.purchasesCash
    );
    verticalAnalysisObject.costOfSales = this.calculateValue(
      dataInformationValueParse.costOfSales
    );
    verticalAnalysisObject.grossOperatingIncome = this.calculateValue(
      dataInformationValueParse.grossOperatingIncome
    );
    verticalAnalysisObject.operatingSalesExpenses = this.calculateValue(
      dataInformationValueParse.operatingSalesExpenses
    );
    verticalAnalysisObject.administrativeOperatingExpenses =
      this.calculateValue(
        dataInformationValueParse.administrativeOperatingExpenses
      );
    verticalAnalysisObject.generalExpenses = this.calculateValue(
      dataInformationValueParse.generalExpenses
    );
    verticalAnalysisObject.operatingProfit = this.calculateValue(
      dataInformationValueParse.operatingProfit
    );
    verticalAnalysisObject.financialIncome = this.calculateValue(
      dataInformationValueParse.financialIncome
    );
    verticalAnalysisObject.financialExpenses = this.calculateValue(
      dataInformationValueParse.financialExpenses
    );
    verticalAnalysisObject.extraordinaryIncome = this.calculateValue(
      dataInformationValueParse.extraordinaryIncome
    );
    verticalAnalysisObject.extraordinaryExpenses = this.calculateValue(
      dataInformationValueParse.extraordinaryExpenses
    );
    verticalAnalysisObject.profitBeforeTax = this.calculateValue(
      dataInformationValueParse.profitBeforeTax
    );
    verticalAnalysisObject.incomeTax = this.calculateValue(
      dataInformationValueParse.incomeTax
    );
    verticalAnalysisObject.netIncome = this.calculateValue(
      dataInformationValueParse.netIncome
    );
    return verticalAnalysisObject;
  }

  calculateValue(value: number) {
    const result = parseFloat(((value / this.baseValue) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
}
