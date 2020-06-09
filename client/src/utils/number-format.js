export const numberFormat = ({ amount, currency }) => {
  const locale = navigator.language;

  let formatConfig = currency
    ? {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        currencyDisplay: 'symbol',
      }
    : {};

  return new Intl.NumberFormat(locale, formatConfig).format(amount);
};
