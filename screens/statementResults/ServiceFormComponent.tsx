import { ServiceInformation } from "@/classes/dataClasses/DataClass";
import { useDataContext } from "@/context/DataContext";
import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";

interface ServiceFormComponentProps {
  date: string;
}

const ServiceFormComponent: React.FC<ServiceFormComponentProps> = ({
  date,
}) => {

  const [initialValues, setInitialValues] = useState<ServiceInformation>(
    new ServiceInformation(date)
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log("values", values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
        </View>
      )}
    </Formik>
  );
};

export default ServiceFormComponent;
