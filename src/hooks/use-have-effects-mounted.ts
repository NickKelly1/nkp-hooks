import { MutableRefObject, useEffect, useRef } from 'react';

export type UseHaveEffectsMountedReturn = MutableRefObject<boolean>;

/**
 * Has the component mounted / been rendered yet?
 *
 * @returns
 */
export function useHaveEffectsMounted(): UseHaveEffectsMountedReturn {
  const haveEffectsMounted = useRef(false);
  useEffect(() => { haveEffectsMounted.current = true; }, []);
  return haveEffectsMounted;
}
