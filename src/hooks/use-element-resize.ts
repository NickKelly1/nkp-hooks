import { Ref } from 'react';
import { isNotProduction } from '../utils/is-not-production';
import { useRefEffect } from './use-ref-effect';
import { useValueRef } from './use-value-ref';

/**
 * First argument: Reference to attach to object
 * Second argument: Rect of that object (null on first render)
 */
export type UseElementResizeReturn<T> = Ref<T>;

/**
 * Resize Handler Function
 */
export interface OnResize<T> { (refElement: T): unknown }

/**
 * Argument to useRefEffect
 *
 * If a string, then is the selector for the observed node
 */
export type UseElementResizeArgs<T> = [
  options: OnResize<T> | { onResize: OnResize<T>, resizeSelector?: null | string },
  resizeSelector?: null | undefined | string,
];


/**
 * Get the resize argument
 *
 * @param arg
 * @returns
 */
function getOnResize<T>(args: UseElementResizeArgs<T>): OnResize<T> {
  if (typeof args[0] === 'function') return args[0];
  if (typeof args[0] === 'object' && args[0] !== null) {
    if (typeof args[0].onResize === 'function') return args[0].onResize;
  }
  throw new TypeError('useElementResize requires an onResize function');
}


/**
 * Get the selector argument
 *
 * @param arg
 * @returns
 */
function getSelector<T>(args: UseElementResizeArgs<T>): null | string {
  if (typeof args[0] === 'object' && args[0] !== null) {
    if (typeof args[0].resizeSelector === 'string') return args[0].resizeSelector;
  }
  if (typeof args[1] === 'string') return args[1];
  return null;
}

/**
 * Fire a function with the target element whenever a target dom element resizes
 *
 * @param arg
 * @returns
 */
export function useElementResize<T extends HTMLElement = HTMLElement>(
  ...args: UseElementResizeArgs<T>
): UseElementResizeReturn<T> {
  const onResize = getOnResize(args);
  const resizeSelector = getSelector(args);

  const _onResize = useValueRef(onResize);

  const [ref] = useRefEffect<T>(function handleRef(node) {
    if (!node) return;

    // create a resize observer that will be notified when nodes it observes are resized
    // upon resize, updates the rect
    const robserver = new ResizeObserver(() => { _onResize.current(node); });

    // decide which observe resizes on
    // defaults to the ref'd element
    let listenTo: Element | null = null;
    if (resizeSelector != null) listenTo = document.querySelector(resizeSelector);
    else listenTo = node;

    if (listenTo) robserver.observe(listenTo);
    else if (isNotProduction()) {
      console.warn(`WARNING: ResizeListener no node to observe (selector: "${resizeSelector}")`);
    }
    return () => robserver.disconnect();
  });

  return ref;
}
