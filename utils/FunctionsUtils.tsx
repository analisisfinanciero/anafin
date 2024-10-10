export const CurrencyFormatter = (text: string) => {
  const numericValue = text.replace(/\D/g, "");
  const valueAsNumber = numericValue ? parseInt(numericValue, 10) : 0;
  const formattedValue = valueAsNumber.toLocaleString("es-CO");
  return formattedValue;
};
