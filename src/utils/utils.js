import LSFR from "./lsfr";

export function shuffle(array, seed) {
  const prng = seed && new LSFR(seed);
  for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    const random = prng ? prng.next() : Math.random();
    const randomIndex = Math.floor(random * (currentIndex + 1));
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

}

export function toShuffled(array) {
  const copy = array.slice();
  shuffle(copy);
  return copy;
}

export const getTodaySeed = () => {
  const today = new Date();
  const day = today.getDay() + 1;
  const month = today.getMonth() + 1;
  return ((day ** 2 + month) ** 2) % 65535
}