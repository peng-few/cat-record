export const toDecimalPlace = (input: number, place: number) => {
  const double = 10 ** place;
  return Math.round(input * double) / double
}