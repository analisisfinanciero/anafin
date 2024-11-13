import * as Yup from "yup";

const currentYear = new Date().getFullYear();

export const InitialValuesValidationSchema = Yup.object().shape({
  enterpriseName: Yup.string()
    .min(5, "El nombre debe contener mínimo 5 caracteres")
    .max(20, "El nombre debe contener máximo 20 caracteres")
    .required("El nombre de la empresa es requerido"),
  enterpriseNIT: Yup.string()
    .min(5, "El NIT debe contener mínimo 5 caracteres")
    .max(15, "El NIT debe contener máximo 15 caracteres")
    .required("El NIT de la empresa es requerido"),
  enterpriseType: Yup.string().required("El tipo de empresa es requerido"),
  initialYear: Yup.number()
    .min(1900, "Ingresa un año mayor o igual a 1900")
    .max(currentYear, `El año inicial no puede ser mayor que ${currentYear}`)
    .required("El año inicial es requerido"),
  years: Yup.number()
    .min(2, "Ingresa un número mayor o igual a 2")
    .max(5, "Ingresa un número menor a 5")
    .required("Los años de información son requeridos")
    .test(
      "valid-years",
      "El número de años excede el año actual",
      function (value) {
        const { initialYear } = this.parent;
        return initialYear + value - 1 <= currentYear;
      }
    ),
});
