import {
  VerticalAnalyticsClassByYearInterface,
  HorizontalAnalyticsClassByYearInterface,
} from "@/interfaces/analyticsInterfaces/AnalyticsProps";
import {
  AnalyticsInformationInterface,
  CommercialInformationInterface,
  DataInformationInterface,
  EnterpriseInformationInterface,
  ServiceInformationInterface,
} from "@/interfaces/dataInterfaces/DataContextProps";

export class EnterpriseInformation implements EnterpriseInformationInterface {
  enterpriseName: string;
  enterpriseNIT: string;
  enterpriseType: "service" | "commercial" | null;
  initialYear: number;
  years: number;

  constructor(values?: EnterpriseInformation) {
    this.enterpriseName = values?.enterpriseName ?? "";
    this.enterpriseNIT = values?.enterpriseNIT ?? "";
    this.enterpriseType = values?.enterpriseType ?? null;
    this.initialYear = parseInt(values?.initialYear?.toString() ?? "0");
    this.years = parseInt(values?.years?.toString() ?? "0");
  }
}

export class AnalyticsInformation implements AnalyticsInformationInterface {
  hasData: boolean;
  verticalAnalytics: (VerticalAnalyticsClassByYearInterface | null)[];
  horizontalAnalytics: (HorizontalAnalyticsClassByYearInterface | null)[];

  constructor() {
    this.hasData = false;
    this.verticalAnalytics = [];
    this.horizontalAnalytics = [];
  }
}
export class DataInformation implements DataInformationInterface {
  dataInformation: Array<
    ServiceInformationInterface | CommercialInformationInterface
  >;
  hasData: boolean;

  constructor(
    years: number,
    type: "service" | "commercial" | null,
    initialYear: number
  ) {
    this.hasData = false;
    this.dataInformation = new Array<
      ServiceInformationInterface | CommercialInformationInterface
    >();
    for (let i = 0; i < years; i++) {
      if (type === "service") {
        this.dataInformation.push(
          new ServiceInformation(`año ${initialYear + i}`)
        );
      } else if (type === "commercial") {
        this.dataInformation.push(
          new CommercialInformation(`año ${initialYear + i}`)
        );
      }
    }
  }
}

export class ServiceInformation implements ServiceInformationInterface {
  currentYear: string;

  creditIncome: number;
  cashIncome: number;
  grossSales: number;

  operatingSalesExpenses: number;
  administrativeOperatingExpenses: number;
  operatingProfit: number;

  financialIncome: number;
  financialExpenses: number;
  extraordinaryIncome: number;
  extraordinaryExpenses: number;
  profitBeforeTax: number;

  incomeTax: number;
  netIncome: number;

  constructor(currentYear: string) {
    this.currentYear = currentYear || "";

    this.creditIncome = 0;
    this.cashIncome = 0;
    this.grossSales = 0;

    this.operatingSalesExpenses = 0;
    this.administrativeOperatingExpenses = 0;
    this.operatingProfit = 0;

    this.financialIncome = 0;
    this.financialExpenses = 0;
    this.extraordinaryIncome = 0;
    this.extraordinaryExpenses = 0;
    this.profitBeforeTax = 0;

    this.incomeTax = 0;
    this.netIncome = 0;
  }

  calculateValues() {
    this.operatingProfit =
      this.netIncome -
      this.operatingSalesExpenses -
      this.administrativeOperatingExpenses;
    this.profitBeforeTax =
      this.operatingProfit +
      this.financialIncome -
      this.financialExpenses +
      this.extraordinaryIncome -
      this.extraordinaryExpenses;
    this.incomeTax = this.profitBeforeTax * 0.35;
    this.netIncome = this.profitBeforeTax - this.incomeTax;
  }
}

export class CommercialInformation implements CommercialInformationInterface {
  currentYear: string;

  creditIncome: number;
  cashIncome: number;
  grossSales: number;

  returnsAndDiscounts: number;
  netSales: number;

  initialInventory: number;
  finalInventory: number;
  purchasesCredit: number;
  purchasesCash: number;
  costOfSales: number;
  grossOperatingIncome: number;

  operatingSalesExpenses: number;
  administrativeOperatingExpenses: number;
  generalExpenses: number;
  operatingProfit: number;

  financialIncome: number;
  financialExpenses: number;
  extraordinaryIncome: number;
  extraordinaryExpenses: number;
  profitBeforeTax: number;

  incomeTax: number;
  netIncome: number;

  constructor(currentYear: string) {
    this.currentYear = currentYear || "";

    this.creditIncome = 0;
    this.cashIncome = 0;
    this.grossSales = 0;

    this.returnsAndDiscounts = 0;
    this.netSales = 0;

    this.initialInventory = 0;
    this.finalInventory = 0;
    this.purchasesCredit = 0;
    this.purchasesCash = 0;
    this.costOfSales = 0;
    this.grossOperatingIncome = 0;

    this.operatingSalesExpenses = 0;
    this.administrativeOperatingExpenses = 0;
    this.generalExpenses = 0;
    this.operatingProfit = 0;

    this.financialIncome = 0;
    this.financialExpenses = 0;
    this.extraordinaryIncome = 0;
    this.extraordinaryExpenses = 0;
    this.profitBeforeTax = 0;

    this.incomeTax = 0;
    this.netIncome = 0;
  }

  calculateValues() {
    this.netSales = this.grossSales - this.returnsAndDiscounts;
    this.costOfSales =
      this.initialInventory +
      this.purchasesCredit +
      this.purchasesCash -
      this.finalInventory;
    this.grossOperatingIncome = this.netSales - this.costOfSales;
    this.operatingProfit =
      this.grossOperatingIncome -
      this.operatingSalesExpenses -
      this.administrativeOperatingExpenses -
      this.generalExpenses;
    this.profitBeforeTax =
      this.operatingProfit +
      this.financialIncome -
      this.financialExpenses +
      this.extraordinaryIncome -
      this.extraordinaryExpenses;
    this.incomeTax = this.profitBeforeTax * 0.35;
    this.netIncome = this.profitBeforeTax - this.incomeTax;
  }
}
