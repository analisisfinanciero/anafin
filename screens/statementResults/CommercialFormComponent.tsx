import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { CommercialInformation } from "@/classes/dataClasses/DataClass";
import CustomAccordion from "@/components/CustomAccordion";
import CustomInput from "@/components/CustomInput";
import { useDataContext } from "@/context/DataContext";

interface CommercialFormComponentProps {
  date: string;
  onSubmit: (year: string, values: any) => void;
  editableForm?: boolean;
  initialData?: CommercialInformation;
  percentageValues?: boolean;
  title?: string;
}

const CommercialFormComponent: React.FC<CommercialFormComponentProps> = ({
  date,
  onSubmit,
  editableForm = true,
  initialData = new CommercialInformation(date),
  percentageValues = false,
  title,
}) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const initialValues = initialData;
  const { enterpriseInformation } = useDataContext();
  const formRef = useRef<any>(null);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      formRef.current?.resetForm({ values: new CommercialInformation(date) });
    }
  }, [enterpriseInformation]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const calculateValues = (values: any, setFieldValues: any) => {
    const grossSales =
      parseFloat(values.creditIncome) + parseFloat(values.cashIncome);

    const netSales = grossSales - parseFloat(values.returnsAndDiscounts);

    const costOfSales =
      parseFloat(values.initialInventory) +
      parseFloat(values.purchasesCredit) +
      parseFloat(values.purchasesCash) -
      parseFloat(values.finalInventory);

    const grossOperatingIncome = netSales - costOfSales;

    const operatingProfit =
      grossOperatingIncome -
      parseFloat(values.operatingSalesExpenses) -
      parseFloat(values.administrativeOperatingExpenses) -
      parseFloat(values.generalExpenses);

    const profitBeforeTax =
      operatingProfit +
      parseFloat(values.financialIncome) -
      parseFloat(values.financialExpenses) +
      parseFloat(values.extraordinaryIncome) -
      parseFloat(values.extraordinaryExpenses);

    const incomeTax = Math.ceil(profitBeforeTax * 0.35);
    const netIncome = profitBeforeTax - incomeTax;

    setFieldValues("grossSales", grossSales);
    setFieldValues("netSales", netSales);
    setFieldValues("costOfSales", costOfSales);
    setFieldValues("grossOperatingIncome", grossOperatingIncome);
    setFieldValues("operatingProfit", operatingProfit);
    setFieldValues("profitBeforeTax", profitBeforeTax);
    setFieldValues("incomeTax", incomeTax);
    setFieldValues("netIncome", netIncome);
  };

  return (
    <CustomAccordion
      title={title ?? `Formulario del ${date}`}
      isOpen={isOpen}
      onToggle={toggleAccordion}
    >
      <View className="inline-block">
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          enableReinitialize={true}
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
          }) => {
            return (
              <View className="p-6">
                <View className="border-b border-neutral-200 mb-2">
                  <CustomInput
                    label="Ingresos a Crédito"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.creditIncome.toString()}
                    onChangeText={(value) => {
                      setFieldValue("creditIncome", value);
                      calculateValues(
                        { ...values, creditIncome: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("creditIncome")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Ingresos en Efectivo"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.cashIncome.toString()}
                    onChangeText={(value) => {
                      setFieldValue("cashIncome", value);
                      calculateValues(
                        { ...values, cashIncome: value },
                        setFieldValue
                      );
                    }}
                    editable={editableForm}
                    onBlur={handleBlur("cashIncome")}
                  />
                  <CustomInput
                    label="Ventas Brutas"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.grossSales.toString()}
                    onChangeText={handleChange("grossSales")}
                    onBlur={handleBlur("grossSales")}
                    editable={false}
                  />
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  <CustomInput
                    label="Devoluciones y Descuentos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.returnsAndDiscounts.toString()}
                    onChangeText={(value) => {
                      setFieldValue("returnsAndDiscounts", value);
                      calculateValues(
                        { ...values, returnsAndDiscounts: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("returnsAndDiscounts")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Ventas Netas"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.netSales.toString()}
                    onChangeText={handleChange("netSales")}
                    onBlur={handleBlur("netSales")}
                    editable={false}
                  />
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  <CustomInput
                    label="Inventario Inicial"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.initialInventory.toString()}
                    onChangeText={(value) => {
                      setFieldValue("initialInventory", value);
                      calculateValues(
                        { ...values, initialInventory: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("initialInventory")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Inventario Final"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.finalInventory.toString()}
                    onChangeText={(value) => {
                      setFieldValue("finalInventory", value);
                      calculateValues(
                        { ...values, finalInventory: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("finalInventory")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Compras a Crédito"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.purchasesCredit.toString()}
                    onChangeText={(value) => {
                      setFieldValue("purchasesCredit", value);
                      calculateValues(
                        { ...values, purchasesCredit: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("purchasesCredit")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Compras al Contado"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.purchasesCash.toString()}
                    onChangeText={(value) => {
                      setFieldValue("purchasesCash", value);
                      calculateValues(
                        { ...values, purchasesCash: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("purchasesCash")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Costo de Ventas"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.costOfSales.toString()}
                    onChangeText={handleChange("costOfSales")}
                    onBlur={handleBlur("costOfSales")}
                    editable={false}
                  />
                  <CustomInput
                    label="Utilidad Bruta Operacional"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.grossOperatingIncome.toString()}
                    onChangeText={handleChange("grossOperatingIncome")}
                    onBlur={handleBlur("grossOperatingIncome")}
                    editable={false}
                  />
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  <CustomInput
                    label="Gastos Operacionales de Ventas"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.operatingSalesExpenses.toString()}
                    onChangeText={(value) => {
                      setFieldValue("operatingSalesExpenses", value);
                      calculateValues(
                        { ...values, operatingSalesExpenses: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("operatingSalesExpenses")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Gastos Operacionales de Administración"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.administrativeOperatingExpenses.toString()}
                    onChangeText={(value) => {
                      setFieldValue("administrativeOperatingExpenses", value);
                      calculateValues(
                        { ...values, administrativeOperatingExpenses: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("administrativeOperatingExpenses")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Gastos Generales"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.generalExpenses.toString()}
                    onChangeText={(value) => {
                      setFieldValue("generalExpenses", value);
                      calculateValues(
                        { ...values, generalExpenses: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("generalExpenses")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Utilidad Operacional"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.operatingProfit.toString()}
                    onChangeText={handleChange("operatingProfit")}
                    onBlur={handleBlur("operatingProfit")}
                    editable={false}
                  />
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  <CustomInput
                    label="Ingresos Financieros"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.financialIncome.toString()}
                    onChangeText={(value) => {
                      setFieldValue("financialIncome", value);
                      calculateValues(
                        { ...values, financialIncome: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("financialIncome")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Gastos Financieros"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.financialExpenses.toString()}
                    onChangeText={(value) => {
                      setFieldValue("financialExpenses", value);
                      calculateValues(
                        { ...values, financialExpenses: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("financialExpenses")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Ingresos Extraordinarios"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.extraordinaryIncome.toString()}
                    onChangeText={(value) => {
                      setFieldValue("extraordinaryIncome", value);
                      calculateValues(
                        { ...values, extraordinaryIncome: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("extraordinaryIncome")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Gastos Extraordinarios"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.extraordinaryExpenses.toString()}
                    onChangeText={(value) => {
                      setFieldValue("extraordinaryExpenses", value);
                      calculateValues(
                        { ...values, extraordinaryExpenses: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("extraordinaryExpenses")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Utilidad Antes de Impuestos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.profitBeforeTax.toString()}
                    onChangeText={handleChange("profitBeforeTax")}
                    onBlur={handleBlur("profitBeforeTax")}
                    editable={false}
                  />
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  <CustomInput
                    label="Impuesto a la Renta"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.incomeTax.toString()}
                    onChangeText={handleChange("incomeTax")}
                    onBlur={handleBlur("incomeTax")}
                    editable={false}
                  />
                  <CustomInput
                    label="Utilidad del Ejercicio"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.netIncome.toString()}
                    onChangeText={handleChange("netIncome")}
                    onBlur={handleBlur("netIncome")}
                    editable={false}
                  />
                </View>
                {editableForm && (
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    className="bg-blue-600 p-3 rounded-lg mt-4 shadow-lg"
                  >
                    <Text className="text-white text-center font-semibold">
                      {`Guardar ${date}`}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
        </Formik>
      </View>
    </CustomAccordion>
  );
};

export default CommercialFormComponent;
