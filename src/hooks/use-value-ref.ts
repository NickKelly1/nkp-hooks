import { MutableRefObject, useRef } from 'react';

/**
 * Keep reference to a value
 *
 * Keeps the ref value synchronised with the incoming value
 *
 * Useful to avoid re-renders based on value changes in functions, for example
 *
 * @param value
 * @returns
 */
export function useValueRef<T>(value: T): MutableRefObject<T> {
  // reference singleClick
  const valueRef = useRef(value);
  valueRef.current = value;
  return valueRef;
}
