import { HorizontalAnalyticsClassByYearInterface } from "@/interfaces/analyticsInterfaces/AnalyticsProps";
import {
  ServiceInformationInterface,
  CommercialInformationInterface,
} from "@/interfaces/dataInterfaces/DataContextProps";
import {
  CommercialInformation,
  ServiceInformation,
} from "../dataClasses/DataClass";

export class HorizontalAnalyticsClassByYear
  implements HorizontalAnalyticsClassByYearInterface
{
  dataInformationByYear:
    | ServiceInformationInterface
    | CommercialInformationInterface;
  dataInformationBaseYear:
    | ServiceInformationInterface
    | CommercialInformationInterface;
  type: "service" | "commercial" | null;

  constructor(
    dataInformationByYear:
      | ServiceInformationInterface
      | CommercialInformationInterface,
    dataInformationBaseYear:
      | ServiceInformationInterface
      | CommercialInformationInterface,
    type: "service" | "commercial" | null
  ) {
    this.dataInformationBaseYear = dataInformationBaseYear;
    this.dataInformationByYear = dataInformationByYear;
    this.type = type;
  }

  generateHorizontalAnalysis() {
    if (this.type === "service") {
      return this.generateServiceHorizontalAnalysis();
    } else if (this.type === "commercial") {
      return this.generateCommercialHorizontalAnalysis();
    } else {
      return null;
    }
  }
  generateServiceHorizontalAnalysis() {
    const horizontalAnalysisObject = new ServiceInformation(
      `${this.dataInformationBaseYear.currentYear} - ${this.dataInformationByYear.currentYear}`
    );
    horizontalAnalysisObject.creditIncome = this.calculateValue(
      this.dataInformationBaseYear.creditIncome,
      this.dataInformationByYear.creditIncome
    );
    horizontalAnalysisObject.cashIncome = this.calculateValue(
      this.dataInformationBaseYear.cashIncome,
      this.dataInformationByYear.cashIncome
    );
    horizontalAnalysisObject.grossSales = this.calculateValue(
      this.dataInformationBaseYear.grossSales,
      this.dataInformationByYear.grossSales
    );
    horizontalAnalysisObject.operatingSalesExpenses = this.calculateValue(
      this.dataInformationBaseYear.operatingSalesExpenses,
      this.dataInformationByYear.operatingSalesExpenses
    );
    horizontalAnalysisObject.administrativeOperatingExpenses =
      this.calculateValue(
        this.dataInformationBaseYear.administrativeOperatingExpenses,
        this.dataInformationByYear.administrativeOperatingExpenses
      );
    horizontalAnalysisObject.operatingProfit = this.calculateValue(
      this.dataInformationBaseYear.operatingProfit,
      this.dataInformationByYear.operatingProfit
    );
    horizontalAnalysisObject.financialIncome = this.calculateValue(
      this.dataInformationBaseYear.financialIncome,
      this.dataInformationByYear.financialIncome
    );
    horizontalAnalysisObject.financialExpenses = this.calculateValue(
      this.dataInformationBaseYear.financialExpenses,
      this.dataInformationByYear.financialExpenses
    );
    horizontalAnalysisObject.extraordinaryIncome = this.calculateValue(
      this.dataInformationBaseYear.extraordinaryIncome,
      this.dataInformationByYear.extraordinaryIncome
    );
    horizontalAnalysisObject.extraordinaryExpenses = this.calculateValue(
      this.dataInformationBaseYear.extraordinaryExpenses,
      this.dataInformationByYear.extraordinaryExpenses
    );
    horizontalAnalysisObject.profitBeforeTax = this.calculateValue(
      this.dataInformationBaseYear.profitBeforeTax,
      this.dataInformationByYear.profitBeforeTax
    );
    horizontalAnalysisObject.incomeTax = this.calculateValue(
      this.dataInformationBaseYear.incomeTax,
      this.dataInformationByYear.incomeTax
    );
    horizontalAnalysisObject.netIncome = this.calculateValue(
      this.dataInformationBaseYear.netIncome,
      this.dataInformationByYear.netIncome
    );
    return horizontalAnalysisObject;
  }
  generateCommercialHorizontalAnalysis() {
    const dataInformationValueParse = this
      .dataInformationByYear as CommercialInformationInterface;
    const dataInformationValueParseBase = this
      .dataInformationBaseYear as CommercialInformationInterface;
    const horizontalAnalysisObject = new CommercialInformation(
      `${this.dataInformationBaseYear.currentYear} - ${this.dataInformationByYear.currentYear}`
    );
    horizontalAnalysisObject.creditIncome = this.calculateValue(
      dataInformationValueParseBase.creditIncome,
      dataInformationValueParse.creditIncome
    );
    horizontalAnalysisObject.cashIncome = this.calculateValue(
      dataInformationValueParseBase.cashIncome,
      dataInformationValueParse.cashIncome
    );
    horizontalAnalysisObject.grossSales = this.calculateValue(
      dataInformationValueParseBase.grossSales,
      dataInformationValueParse.grossSales
    );
    horizontalAnalysisObject.returnsAndDiscounts = this.calculateValue(
      dataInformationValueParseBase.returnsAndDiscounts,
      dataInformationValueParse.returnsAndDiscounts
    );
    horizontalAnalysisObject.netSales = this.calculateValue(
      dataInformationValueParseBase.netSales,
      dataInformationValueParse.netSales
    );
    horizontalAnalysisObject.initialInventory = this.calculateValue(
      dataInformationValueParseBase.initialInventory,
      dataInformationValueParse.initialInventory
    );
    horizontalAnalysisObject.finalInventory = this.calculateValue(
      dataInformationValueParseBase.finalInventory,
      dataInformationValueParse.finalInventory
    );
    horizontalAnalysisObject.purchasesCredit = this.calculateValue(
      dataInformationValueParseBase.purchasesCredit,
      dataInformationValueParse.purchasesCredit
    );
    horizontalAnalysisObject.purchasesCash = this.calculateValue(
      dataInformationValueParseBase.purchasesCash,
      dataInformationValueParse.purchasesCash
    );
    horizontalAnalysisObject.costOfSales = this.calculateValue(
      dataInformationValueParseBase.costOfSales,
      dataInformationValueParse.costOfSales
    );
    horizontalAnalysisObject.grossOperatingIncome = this.calculateValue(
      dataInformationValueParseBase.grossOperatingIncome,
      dataInformationValueParse.grossOperatingIncome
    );
    horizontalAnalysisObject.operatingSalesExpenses = this.calculateValue(
      dataInformationValueParseBase.operatingSalesExpenses,
      dataInformationValueParse.operatingSalesExpenses
    );
    horizontalAnalysisObject.administrativeOperatingExpenses =
      this.calculateValue(
        dataInformationValueParseBase.administrativeOperatingExpenses,
        dataInformationValueParse.administrativeOperatingExpenses
      );
    horizontalAnalysisObject.generalExpenses = this.calculateValue(
      dataInformationValueParseBase.generalExpenses,
      dataInformationValueParse.generalExpenses
    );
    horizontalAnalysisObject.operatingProfit = this.calculateValue(
      dataInformationValueParseBase.operatingProfit,
      dataInformationValueParse.operatingProfit
    );
    horizontalAnalysisObject.financialIncome = this.calculateValue(
      dataInformationValueParseBase.financialIncome,
      dataInformationValueParse.financialIncome
    );
    horizontalAnalysisObject.financialExpenses = this.calculateValue(
      dataInformationValueParseBase.financialExpenses,
      dataInformationValueParse.financialExpenses
    );
    horizontalAnalysisObject.extraordinaryIncome = this.calculateValue(
      dataInformationValueParseBase.extraordinaryIncome,
      dataInformationValueParse.extraordinaryIncome
    );
    horizontalAnalysisObject.extraordinaryExpenses = this.calculateValue(
      dataInformationValueParseBase.extraordinaryExpenses,
      dataInformationValueParse.extraordinaryExpenses
    );
    horizontalAnalysisObject.profitBeforeTax = this.calculateValue(
      dataInformationValueParseBase.profitBeforeTax,
      dataInformationValueParse.profitBeforeTax
    );
    horizontalAnalysisObject.incomeTax = this.calculateValue(
      dataInformationValueParseBase.incomeTax,
      dataInformationValueParse.incomeTax
    );
    horizontalAnalysisObject.netIncome = this.calculateValue(
      dataInformationValueParseBase.netIncome,
      dataInformationValueParse.netIncome
    );
    return horizontalAnalysisObject;
  }
  calculateValue(baseValue: number, newValue: number) {
    if (baseValue === 0) return 0;
    return (
      parseFloat((((newValue - baseValue) / baseValue) * 100).toFixed(1)) ?? 0
    );
  }
}
