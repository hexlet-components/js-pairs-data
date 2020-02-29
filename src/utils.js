export const identity = (value) => value;

export const getRandomIntInclusive = (min, max) => (
  Math.floor(Math.random() * ((max - min) + 1)) + min
);
