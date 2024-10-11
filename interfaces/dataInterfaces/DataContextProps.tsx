export interface DataContextInterface {
  enterpriseInformation: EnterpriseInformationInterface | null;
  dataInformation: DataInformationInterface | null;
  handleSetEnterpriseInformation: (
    enterpriseInformation: EnterpriseInformationInterface
  ) => void;
  handleSetDataInformation: (dataInformation: DataInformationInterface) => void;
  clearInformation: () => void;
}

export interface EnterpriseInformationInterface {
  enterpriseName: string;
  enterpriseType: "service" | "commercial" | null;
  years: number;
}

export interface DataInformationInterface {
  dataInformation: Array<
    ServiceInformationInterface | CommercialInformationInterface
  >;
}

export interface ServiceInformationInterface {
  currentYear: string;
  creditIncome: number; // Ingresos a crédito
  cashIncome: number; // Ingresos a contado
  grossSales: number; // Ventas brutas (grossSales = creditIncome + cashIncome)

  operatingSalesExpenses: number; // Gastos operacionales de ventas
  administrativeOperatingExpenses: number; // Gastos operacionales de administración
  operatingProfit: number; // Utilidad operacional (operatingProfit = netIncome - operatingSalesExpenses - administrativeOperatingExpenses)

  financialIncome: number; // Ingresos financieros
  financialExpenses: number; // Gastos financieros
  extraordinaryIncome: number; // Ingresos extraordinarios
  extraordinaryExpenses: number; // Gastos extraordinarios
  profitBeforeTax: number; // Utilidad antes de impuestos (profitBeforeTax = operatingProfit + financialIncome - financialExpenses + extraordinaryIncome - extraordinaryExpenses)

  incomeTax: number; // Impuesto a la renta (incomeTax = profitBeforeTax * 0.35)
  netIncome: number; // Utilidad del ejercicio (netIncomeExercise = profitBeforeTax - incomeTax)
}

export interface CommercialInformationInterface {
  currentYear: string;
  creditIncome: number; // Ingresos a crédito
  cashIncome: number; // Ingresos a contado
  grossSales: number; // Ventas brutas (grossSales = creditIncome + cashIncome)

  returnsAndDiscounts: number; // Devoluciones y descuentos
  netSales: number; // Ventas netas (netSales = grossSales - returnsAndDiscounts)

  initialInventory: number; // Inventario inicial
  finalInventory: number; // Inventario final
  purchasesCredit: number; // Compras a crédito
  purchasesCash: number; // Compras al contado
  costOfSales: number; // Costo de ventas (costOfSales = initialInventory + purchasesCredit + purchasesCash - finalInventory)
  grossOperatingIncome: number; // Utilidad bruta operacional (grossOperatingIncome = netSales - costOfSales)

  operatingSalesExpenses: number; // Gastos operacionales de ventas
  administrativeOperatingExpenses: number; // Gastos operacionales de administración
  generalExpenses: number; // Gastos generales
  operatingProfit: number; // Utilidad operacional (operatingProfit = grossOperatingIncome - operatingSalesExpenses - administrativeOperatingExpenses - generalExpenses)

  financialIncome: number; // Ingresos financieros
  financialExpenses: number; // Gastos financieros
  extraordinaryIncome: number; // Ingresos extraordinarios
  extraordinaryExpenses: number; // Gastos extraordinarios
  profitBeforeTax: number; // Utilidad antes de impuestos (profitBeforeTax = operatingProfit + financialIncome - financialExpenses + extraordinaryIncome - extraordinaryExpenses)

  incomeTax: number; // Impuesto a la renta (incomeTax = profitBeforeTax * 0.35)
  netIncome: number; // Utilidad del ejercicio (netIncome = profitBeforeTax - incomeTax)
}
