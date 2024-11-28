export const isServer = () => {
  return typeof window === 'undefined';
}

export const uppercaseWord = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
}