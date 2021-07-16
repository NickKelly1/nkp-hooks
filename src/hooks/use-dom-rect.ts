import { Ref, useEffect, useState } from 'react';
import { useOnResize } from './use-on-resize';
import { useValueRef } from './use-value-ref';

// TODO: find a way to test this...

/**
 * First argument: Reference to attach to object
 * Second argument: Rect of that object (null on first render)
 */
export type UseDOMRectReturn<T> = [ref: Ref<T>, rect: null | DOMRect]


export interface DOMRectOnResize {
  (rect: DOMRect): unknown;
}

/**
 * Argument to useRefEffect
 *
 * If a string, then is the selector for the observed node
 */
export type UseDOMRectArg = [
  selector?:
    | null
    | undefined
    | string
    | DOMRectOnResize
    | { domRectOnResize?: DOMRectOnResize, selector?: null | string },
  onDomRect?:
    | null
    | undefined
    | DOMRectOnResize
    | { domRectOnResize?: DOMRectOnResize, },
];

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

function getOnDomRectResize(args: UseDOMRectArg): null | DOMRectOnResize {
  // try arg0
  if (typeof args[0] === 'function') return args[0];
  if (typeof args[0] === 'object'
    && args[0] !== null
    && typeof args[0].domRectOnResize === 'function'
  ) {
    return args[0].domRectOnResize;
  }

  // try arg1
  if (typeof args[1] === 'function') return args[1];
  if (typeof args[1] === 'object'
    && args[1] !== null
    && typeof args[1].domRectOnResize === 'function'
  ) {
    return args[1].domRectOnResize;
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
  const onResize = useValueRef(getOnDomRectResize(args));

  const [rect, setRect] = useState<DOMRect | null>(null);

  // call onResize on rect change
  useEffect(() => {
    if (!onResize.current) return;
    if (!rect) return;
    onResize.current?.(rect);
  }, [rect]);

  const ref = useOnResize<T>(selector, function handleResize(element) {
    // only update if the rect actually changed
    const next = element.getBoundingClientRect();
    if (!(rect === null || rectsAreDifferent(rect, next))) return;
    setRect(next);
  });

  return [ref, rect];
}

/**
 * Are 2 rects the same or different?
 *
 * @param a
 * @param b
 * @returns
 */
function rectsAreDifferent(a: DOMRect, b: DOMRect): boolean {
  if (a.bottom !== b.bottom) return true;
  if (a.height !== b.height) return true;
  if (a.left !== b.left) return true;
  if (a.right !== b.right) return true;
  if (a.top !== b.top) return true;
  if (a.width !== b.width) return true;
  if (a.x !== b.x) return true;
  if (a.y !== b.y) return true;
  return false;
}
