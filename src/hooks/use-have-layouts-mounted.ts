import { MutableRefObject, useLayoutEffect, useRef } from 'react';

export type UseHaveLayoutsMountedReturn = MutableRefObject<boolean>;

/**
 * Has the component mounted / been rendered yet?
 *
 * @returns
 */
export function useHaveLayoutsMounted(): UseHaveLayoutsMountedReturn {
  const haveLayoutsMounted = useRef(false);
  useLayoutEffect(() => { haveLayoutsMounted.current = true; }, []);
  return haveLayoutsMounted;
}
