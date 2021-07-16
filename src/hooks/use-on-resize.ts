import { Ref } from 'react';
import { isNotProduction } from '../utils/is-not-production';
import { useRefEffect } from './use-ref-effect';
import { useValueRef } from './use-value-ref';

/**
 * First argument: Reference to attach to object
 * Second argument: Rect of that object (null on first render)
 */
export type UseOnResizeReturn<T> = Ref<T>;

/**
 * Resize Handler Function
 */
export interface OnResize<T> { (refElement: T): unknown }

/**
 * Argument to useRefEffect
 *
 * If a string, then is the selector for the observed node
 */
export type UseOnResizeArgs<T> = [
  selector: null | undefined | string | OnResize<T> | { onResize: OnResize<T>, selector?: null | string },
  options?: null | undefined | OnResize<T>,
]


/**
 * Get the resize argument
 *
 * @param arg
 * @returns
 */
function getOnResizeCb<T>(args: UseOnResizeArgs<T>): OnResize<T> {
  if (typeof args[0] === 'function') return args[0];
  if (typeof args[0] === 'object' && args[0] !== null) {
    if (typeof args[0].onResize === 'function') return args[0].onResize;
  }
  if (typeof args[1] === 'function') return args[1];
  throw new TypeError('useElementResize requires an onResize function');
}


/**
 * Get the selector argument
 *
 * @param arg
 * @returns
 */
function getSelector<T>(args: UseOnResizeArgs<T>): null | string {
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
 * Fire a function with the target element whenever a target dom element resizes
 *
 * @param arg
 * @returns
 */
export function useOnResize<T extends HTMLElement = HTMLElement>(
  ...args: UseOnResizeArgs<T>
): UseOnResizeReturn<T> {
  const onResize = getOnResizeCb(args);
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
