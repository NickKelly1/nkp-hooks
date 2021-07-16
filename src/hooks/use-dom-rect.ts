import { Ref, useCallback, useState } from 'react';
import { useOnResize } from './use-on-resize';

// TODO: find a way to test this...

/**
 * First argument: Reference to attach to object
 * Second argument: Rect of that object (null on first render)
 */
export type UseDOMRectReturn<T> = [ref: Ref<T>, rect: null | DOMRect]

/**
 * Argument to useRefEffect
 *
 * If a string, then is the selector for the observed node
 */
export type UseDOMRectArg = [options?: undefined | null | string | { selector?: null | string }];

/**
 * Get the selector argument
 *
 * @param arg
 * @returns
 */
function getSelector(args: UseDOMRectArg): null | string {
  if (typeof args[0] === 'string') return args[0];
  if (typeof args[0] === 'object'
    && args[0] !== null
    && typeof args[0].selector === 'string'
  ) {
    return args[0].selector;
  }
  return null;
}

/**
 * Obtain an automatically updating DOMRect from the object attached to the ref
 *
 * @param arg
 * @returns
 */
export function useDOMRect<T extends HTMLElement = HTMLElement>(...args: UseDOMRectArg): UseDOMRectReturn<T> {
  const selector = getSelector(args);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const handleResize = useCallback((element: T) => {
    setRect(element.getBoundingClientRect());
  }, [setRect]);
  const ref = useOnResize<T>(selector, handleResize);
  return [ref, rect];
}
