export const minmax = (min: number, v: number, max: number): number => {
  return Math.min(max, Math.max(min, v))
}