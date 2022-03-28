export function roundDecimals(value: string | number, decimalPlaces: number) {
  return Number(
    Math.round(parseFloat(value + "e" + decimalPlaces)) + "e-" + decimalPlaces
  );
}
