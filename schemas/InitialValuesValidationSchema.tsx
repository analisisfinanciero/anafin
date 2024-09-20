import * as Yup from "yup";

export const InitialValuesValidationSchema = Yup.object().shape({
  enterpriseName: Yup.string()
    .min(5, "Ingresa un nombre más largo")
    .max(20, "Ingresa un nombre más corto")
    .required("El nombre de la empresa es requerido"),
  enterpriseType: Yup.string().required("El tipo de empresa es requerido"),
  years: Yup.number()
    .min(2, "Ingresa un número mayor a 0")
    .max(5, "Ingresa un número menor a 5")
    .required("Los años de información son requeridos"),
});
