export function currency(value) {
  return Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}