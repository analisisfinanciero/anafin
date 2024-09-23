import * as Yup from "yup";

export const ServiceInformationValidationSchema = Yup.object().shape({
  creditIncome: Yup.number().required("El ingreso a crédito es requerido"),
  cashIncome: Yup.number().required("El ingreso en efectivo es requerido"),
  grossSales: Yup.number().required("Las ventas brutas son requeridas"),

  operatingSalesExpenses: Yup.number().required(
    "Los gastos de ventas son requeridos"
  ),
  administrativeOperatingExpenses: Yup.number().required(
    "Los gastos administrativos son requeridos"
  ),
  financialIncome: Yup.number().required(
    "Los ingresos financieros son requeridos"
  ),
  financialExpenses: Yup.number().required(
    "Los gastos financieros son requeridos"
  ),
  extraordinaryIncome: Yup.number().required(
    "Los ingresos extraordinarios son requeridos"
  ),
  extraordinaryExpenses: Yup.number().required(
    "Los gastos extraordinarios son requeridos"
  ),
  profitBeforeTax: Yup.number().required(
    "La utilidad antes de impuestos es requerida"
  ),

  incomeTax: Yup.number().required("El impuesto a la renta es requerido"),
  netIncome: Yup.number().required("La utilidad neta es requerida"),
});
