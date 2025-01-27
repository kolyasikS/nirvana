import {Dispatch, SetStateAction, useEffect, useState} from 'react';

type Props = {
  debounceDelay?: number;
}
const UseDebounceValue = ({
  debounceDelay = 400
}: Props): [string, Dispatch<SetStateAction<string>>, string] => {
  const [value, setValue] = useState('');
  const [debounceValue, setDebounceValue] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, debounceDelay);

    return () => clearTimeout(timeoutId);
  }, [value, debounceDelay]);

  return [value, setValue, debounceValue];
};

export default UseDebounceValue;