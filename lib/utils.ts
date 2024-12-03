export const isServer = () => {
  return typeof window === 'undefined';
}

export const uppercaseWord = (word: string) => {
  if (word) {
    return word[0].toUpperCase() + word.slice(1);
  } else {
    return '';
  }
}