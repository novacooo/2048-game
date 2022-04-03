/* eslint-disable import/prefer-default-export */
export const getRandomNumber = (min: number, max: number) => {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};
