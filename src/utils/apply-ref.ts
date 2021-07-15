import { Ref } from 'react';

/**
 * Apply a node to a ref
 *
 * @param ref
 * @param node
 * @returns
 */
export function applyRef<T>(ref: null | Ref<T>, node: T | null): void {
  if (!ref) return;
  switch (typeof ref) {
  case 'function':
    ref(node);
    break;
  case 'object':
    (ref as { current: T | null }).current = node;
    break;
  }
}
