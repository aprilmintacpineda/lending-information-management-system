export function currency(value) {
  return Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

export function comma(value) {
  return Number(value).toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}