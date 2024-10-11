import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomAccordion from "@/components/CustomAccordion";
import { ServiceInformation } from "@/classes/dataClasses/DataClass";
import { Formik } from "formik";
import CustomInput from "@/components/CustomInput";
import { CurrencyFormatter } from "@/utils/FunctionsUtils";
interface ServiceFormComponentProps {
  date: string;
  onSubmit: (year: string, values: any) => void;
}

const ServiceFormComponent: React.FC<ServiceFormComponentProps> = ({
  date,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const initialValues = new ServiceInformation(date);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const calculateValues = (values: any, setFieldValues: any) => {
    const grossSales = calculateGrossSales(
      values.creditIncome,
      values.cashIncome
    );
    const operatingProfit = calculateOperatingProfit(
      grossSales,
      values.operatingSalesExpenses,
      values.administrativeOperatingExpenses
    );
    const profitBeforeTax = calculateProfitBeforeTax(
      operatingProfit,
      values.financialIncome,
      values.financialExpenses,
      values.extraordinaryIncome,
      values.extraordinaryExpenses
    );
    const incomeTax = calculateIncomeTax(profitBeforeTax);
    const netIncome = calculateNetIncome(profitBeforeTax, incomeTax);
    setFieldValues("grossSales", grossSales);
    setFieldValues("operatingProfit", operatingProfit);
    setFieldValues("profitBeforeTax", profitBeforeTax);
    setFieldValues("incomeTax", incomeTax);
    setFieldValues("netIncome", netIncome);
  };

  const calculateGrossSales = (creditIncome: string, cashIncome: string) => {
    const creditIncomeFloat = parseFloat(
      creditIncome.toString().replace(/\./g, "")
    );
    const cashIncomeFloat = parseFloat(
      cashIncome.toString().replace(/\./g, "")
    );
    return CurrencyFormatter((creditIncomeFloat + cashIncomeFloat).toString());
  };

  const calculateOperatingProfit = (
    grossSales: string,
    operatingSalesExpenses: string,
    administrativeOperatingExpenses: string
  ) => {
    const grossSalesFloat = parseFloat(
      grossSales.toString().replace(/\./g, "")
    );
    const operatingSalesExpensesFloat = parseFloat(
      operatingSalesExpenses.toString().replace(/\./g, "")
    );
    const administrativeOperatingExpensesFloat = parseFloat(
      administrativeOperatingExpenses.toString().replace(/\./g, "")
    );
    return CurrencyFormatter(
      (
        grossSalesFloat -
        operatingSalesExpensesFloat -
        administrativeOperatingExpensesFloat
      ).toString()
    );
  };

  const calculateProfitBeforeTax = (
    operatingProfit: string,
    financialIncome: string,
    financialExpenses: string,
    extraordinaryIncome: string,
    extraordinaryExpenses: string
  ) => {
    const operatingProfitFloat = parseFloat(
      operatingProfit.toString().replace(/\./g, "")
    );
    const financialIncomeFloat = parseFloat(
      financialIncome.toString().replace(/\./g, "")
    );
    const financialExpensesFloat = parseFloat(
      financialExpenses.toString().replace(/\./g, "")
    );
    const extraordinaryIncomeFloat = parseFloat(
      extraordinaryIncome.toString().replace(/\./g, "")
    );
    const extraordinaryExpensesFloat = parseFloat(
      extraordinaryExpenses.toString().replace(/\./g, "")
    );
    return CurrencyFormatter(
      (
        operatingProfitFloat +
        financialIncomeFloat -
        financialExpensesFloat +
        extraordinaryIncomeFloat -
        extraordinaryExpensesFloat
      ).toString()
    );
  };

  const calculateIncomeTax = (profitBeforeTax: string) => {
    const profitBeforeTaxFloat = parseFloat(
      profitBeforeTax.toString().replace(/\./g, "")
    );
    const incomeTax = Math.ceil(profitBeforeTaxFloat * 0.35);
    return CurrencyFormatter(incomeTax.toString());
  };

  const calculateNetIncome = (profitBeforeTax: string, incomeTax: string) => {
    const profitBeforeTaxFloat = parseFloat(
      profitBeforeTax.toString().replace(/\./g, "")
    );
    const incomeTaxFloat = parseFloat(incomeTax.toString().replace(/\./g, ""));
    return CurrencyFormatter(
      (profitBeforeTaxFloat - incomeTaxFloat).toString()
    );
  };

  return (
    <CustomAccordion
      title={`Formulario del ${date}`}
      isOpen={isOpen}
      onToggle={toggleAccordion}
    >
      <View>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmit(date, values);
            toggleAccordion();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
          }) => (
            <View className="p-6">
              <View className="border-b border-neutral-200 mb-2">
                <CustomInput
                  label="Ingresos a Crédito"
                  placeholder="Ingrese los ingresos a crédito"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.creditIncome.toString()}
                  onChangeText={(value) => {
                    setFieldValue("creditIncome", value);
                    calculateValues(
                      { ...values, creditIncome: value },
                      setFieldValue
                    );
                  }}
                  onBlur={handleBlur("creditIncome")}
                />
                <CustomInput
                  label="Ingresos en Efectivo"
                  placeholder="Ingrese los ingresos en efectivo"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.cashIncome.toString()}
                  onChangeText={(value) => {
                    setFieldValue("cashIncome", value);
                    calculateValues(
                      { ...values, cashIncome: value },
                      setFieldValue
                    );
                  }}
                  onBlur={handleBlur("cashIncome")}
                />
                <CustomInput
                  label="Ingresos netos"
                  placeholder="Ingrese los ingresos netos"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.grossSales.toString()}
                  onChangeText={handleChange("grossSales")}
                  onBlur={handleBlur("grossSales")}
                  editable={false}
                />
              </View>
              <View className="border-b border-neutral-200 mb-2">
                <CustomInput
                  label="Gastos Operacionales de Ventas"
                  placeholder="Ingrese los gastos operacionales de ventas"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.operatingSalesExpenses.toString()}
                  onChangeText={(value) => {
                    setFieldValue("operatingSalesExpenses", value);
                    calculateValues(
                      { ...values, operatingSalesExpenses: value },
                      setFieldValue
                    );
                  }}
                  onBlur={handleBlur("operatingSalesExpenses")}
                />
                <CustomInput
                  label="Gastos Operacionales de Administración"
                  placeholder="Ingrese los gastos operacionales de administración"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.administrativeOperatingExpenses.toString()}
                  onChangeText={(value) => {
                    setFieldValue("administrativeOperatingExpenses", value);
                    calculateValues(
                      { ...values, administrativeOperatingExpenses: value },
                      setFieldValue
                    );
                  }}
                  onBlur={handleBlur("administrativeOperatingExpenses")}
                />
                <CustomInput
                  label="Utilidad Operacional"
                  placeholder="Ingrese la utilidad operacional"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.operatingProfit.toString()}
                  onChangeText={handleChange("operatingProfit")}
                  onBlur={handleBlur("operatingProfit")}
                  editable={false}
                />
              </View>
              <View className="border-b border-neutral-200 mb-2">
                <CustomInput
                  label="Ingresos Financieros"
                  placeholder="Ingrese los ingresos financieros"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.financialIncome.toString()}
                  onChangeText={(value) => {
                    setFieldValue("financialIncome", value);
                    calculateValues(
                      { ...values, financialIncome: value },
                      setFieldValue
                    );
                  }}
                  onBlur={handleBlur("financialIncome")}
                />
                <CustomInput
                  label="Gastos Financieros"
                  placeholder="Ingrese los gastos financieros"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.financialExpenses.toString()}
                  onChangeText={(value) => {
                    setFieldValue("financialExpenses", value);
                    calculateValues(
                      { ...values, financialExpenses: value },
                      setFieldValue
                    );
                  }}
                  onBlur={handleBlur("financialExpenses")}
                />
                <CustomInput
                  label="Ingresos Extraordinarios"
                  placeholder="Ingrese los ingresos extraordinarios"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.extraordinaryIncome.toString()}
                  onChangeText={(value) => {
                    setFieldValue("extraordinaryIncome", value);
                    calculateValues(
                      { ...values, extraordinaryIncome: value },
                      setFieldValue
                    );
                  }}
                  onBlur={handleBlur("extraordinaryIncome")}
                />
                <CustomInput
                  label="Gastos Extraordinarios"
                  placeholder="Ingrese los gastos extraordinarios"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.extraordinaryExpenses.toString()}
                  onChangeText={(value) => {
                    setFieldValue("extraordinaryExpenses", value);
                    calculateValues(
                      { ...values, extraordinaryExpenses: value },
                      setFieldValue
                    );
                  }}
                  onBlur={handleBlur("extraordinaryExpenses")}
                />
                <CustomInput
                  label="Utilidad Antes de Impuestos"
                  placeholder="Ingrese la utilidad antes de impuestos"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.profitBeforeTax.toString()}
                  onChangeText={handleChange("profitBeforeTax")}
                  onBlur={handleBlur("profitBeforeTax")}
                  editable={false}
                />
              </View>
              <View className="border-b border-neutral-200 mb-2">
                <CustomInput
                  label="Impuesto a la Renta"
                  placeholder="Ingrese el impuesto a la renta"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.incomeTax.toString()}
                  onChangeText={handleChange("incomeTax")}
                  onBlur={handleBlur("incomeTax")}
                  editable={false}
                />
                <CustomInput
                  label="Utilidad del Ejercicio"
                  placeholder="Ingrese la utilidad del ejercicio"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.netIncome.toString()}
                  onChangeText={handleChange("netIncome")}
                  onBlur={handleBlur("netIncome")}
                  editable={false}
                />
              </View>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                className="bg-blue-600 p-3 rounded-lg mt-4 shadow-lg"
              >
                <Text className="text-white text-center font-semibold">
                  {`Guardar ${date}`}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </CustomAccordion>
  );
};

export default ServiceFormComponent;
