import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { CommercialInformation } from "@/classes/dataClasses/DataClass";
import CustomAccordion from "@/components/CustomAccordion";
import CustomInput from "@/components/CustomInput";
import { CurrencyFormatter } from "@/utils/FunctionsUtils";

interface CommercialFormComponentProps {
  date: string;
}

const CommercialFormComponent: React.FC<CommercialFormComponentProps> = ({
  date,
}) => {
  const initialValues = new CommercialInformation(date);

  const calculateGrossSales = (creditIncome: string, cashIncome: string) => {
    const creditIncomeFloat = parseFloat(creditIncome.replace(/\./g, ""));
    const cashIncomeFloat = parseFloat(cashIncome.replace(/\./g, ""));
    return CurrencyFormatter((creditIncomeFloat + cashIncomeFloat).toString());
  };

  const calculateNetSales = (
    grossSales: string,
    returnsAndDiscounts: string
  ) => {
    const grossSalesFloat = parseFloat(grossSales.replace(/\./g, ""));
    const returnsAndDiscountsFloat = parseFloat(
      returnsAndDiscounts.replace(/\./g, "")
    );
    return CurrencyFormatter(
      (grossSalesFloat - returnsAndDiscountsFloat).toString()
    );
  };

  return (
    <View>
      <CustomAccordion title={`Formulario del ${date}`}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("Formulario guardado:", values);
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
                    setFieldValue(
                      "grossSales",
                      calculateGrossSales(value, values.cashIncome.toString())
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
                    setFieldValue(
                      "grossSales",
                      calculateGrossSales(values.creditIncome.toString(), value)
                    );
                  }}
                  onBlur={handleBlur("cashIncome")}
                />
                <CustomInput
                  label="Ventas Brutas"
                  placeholder="Ingrese las ventas brutas"
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
                  label="Devoluciones y Descuentos"
                  placeholder="Ingrese las devoluciones y descuentos"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.returnsAndDiscounts.toString()}
                  onChangeText={handleChange("returnsAndDiscounts")}
                  onBlur={handleBlur("returnsAndDiscounts")}
                />
                <CustomInput
                  label="Ventas Netas"
                  placeholder="Ingrese las ventas netas"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.netSales.toString()}
                  onChangeText={handleChange("netSales")}
                  onBlur={handleBlur("netSales")}
                  editable={false}
                />
              </View>
              <View className="border-b border-neutral-200 mb-2">
                <CustomInput
                  label="Inventario Inicial"
                  placeholder="Ingrese el inventario inicial"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.initialInventory.toString()}
                  onChangeText={handleChange("initialInventory")}
                  onBlur={handleBlur("initialInventory")}
                />
                <CustomInput
                  label="Inventario Final"
                  placeholder="Ingrese el inventario final"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.finalInventory.toString()}
                  onChangeText={handleChange("finalInventory")}
                  onBlur={handleBlur("finalInventory")}
                />
                <CustomInput
                  label="Compras a Crédito"
                  placeholder="Ingrese las compras a crédito"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.purchasesCredit.toString()}
                  onChangeText={handleChange("purchasesCredit")}
                  onBlur={handleBlur("purchasesCredit")}
                />
                <CustomInput
                  label="Compras al Contado"
                  placeholder="Ingrese las compras al contado"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.purchasesCash.toString()}
                  onChangeText={handleChange("purchasesCash")}
                  onBlur={handleBlur("purchasesCash")}
                />
                <CustomInput
                  label="Costo de Ventas"
                  placeholder="Ingrese el costo de ventas"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.costOfSales.toString()}
                  onChangeText={handleChange("costOfSales")}
                  onBlur={handleBlur("costOfSales")}
                  editable={false}
                />
                <CustomInput
                  label="Utilidad Bruta Operacional"
                  placeholder="Ingrese la utilidad bruta operacional"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.grossOperatingIncome.toString()}
                  onChangeText={handleChange("grossOperatingIncome")}
                  onBlur={handleBlur("grossOperatingIncome")}
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
                  onChangeText={handleChange("operatingSalesExpenses")}
                  onBlur={handleBlur("operatingSalesExpenses")}
                />
                <CustomInput
                  label="Gastos Operacionales de Administración"
                  placeholder="Ingrese los gastos operacionales de administración"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.administrativeOperatingExpenses.toString()}
                  onChangeText={handleChange("administrativeOperatingExpenses")}
                  onBlur={handleBlur("administrativeOperatingExpenses")}
                />
                <CustomInput
                  label="Gastos Generales"
                  placeholder="Ingrese los gastos generales"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.generalExpenses.toString()}
                  onChangeText={handleChange("generalExpenses")}
                  onBlur={handleBlur("generalExpenses")}
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
                  onChangeText={handleChange("financialIncome")}
                  onBlur={handleBlur("financialIncome")}
                />
                <CustomInput
                  label="Gastos Financieros"
                  placeholder="Ingrese los gastos financieros"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.financialExpenses.toString()}
                  onChangeText={handleChange("financialExpenses")}
                  onBlur={handleBlur("financialExpenses")}
                />
                <CustomInput
                  label="Ingresos Extraordinarios"
                  placeholder="Ingrese los ingresos extraordinarios"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.extraordinaryIncome.toString()}
                  onChangeText={handleChange("extraordinaryIncome")}
                  onBlur={handleBlur("extraordinaryIncome")}
                />
                <CustomInput
                  label="Gastos Extraordinarios"
                  placeholder="Ingrese los gastos extraordinarios"
                  keyboardType="numeric"
                  inputType="currency"
                  value={values.extraordinaryExpenses.toString()}
                  onChangeText={handleChange("extraordinaryExpenses")}
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
              <View>
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
      </CustomAccordion>
    </View>
  );
};

export default CommercialFormComponent;
