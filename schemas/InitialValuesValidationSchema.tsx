import * as Yup from "yup";

export const InitialValuesValidationSchema = Yup.object().shape({
  enterpriseName: Yup.string()
    .min(5, "El nombre debe contener mínimo 5 caracteres")
    .max(20, "El nombre debe contener máximo 20 caracteres")
    .required("El nombre de la empresa es requerido"),
  enterpriseType: Yup.string().required("El tipo de empresa es requerido"),
  years: Yup.number()
    .min(2, "Ingresa un número mayor o igual a 2")
    .max(5, "Ingresa un número menor a 5")
    .required("Los años de información son requeridos"),
});
