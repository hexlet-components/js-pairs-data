export const identity = <T>(value: T): T => value

export const getRandomIntInclusive = (min: number, max: number): number => (
  Math.floor(Math.random() * ((max - min) + 1)) + min
)
