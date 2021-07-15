import { Ref, RefCallback, useCallback } from 'react';
import { applyRef } from '../utils/apply-ref';

/**
 * First element is callback ref
 * Second element is object ref
 */
export type UseMergeRefsReturn<T> = RefCallback<T | null>;

/**
 * Combine refs
 *
 * @param refs
 * @returns
 */
export function useMergeRefs<T>(...refs: Ref<T | null>[]): UseMergeRefsReturn<T> {
  const cbRef: RefCallback<T> = useCallback((node) => {
    // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
    refs.forEach(ref => applyRef(ref, node));
  }, refs);

  return cbRef;
}
