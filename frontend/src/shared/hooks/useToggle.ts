import { useCallback, useState } from 'react';

export const useToggle = (
  initialState: boolean = false
): [boolean, () => void] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((oldState) => !oldState), []);

  return [state, toggle];
};
