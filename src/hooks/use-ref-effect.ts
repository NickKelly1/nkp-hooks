import {
  MutableRefObject,
  RefCallback,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useValueRef } from './use-value-ref';

interface Destructor { (): void }

/**
 * Callback ref as the first array agument
 * Node ref is the second array argument, so it can be used elsewhere
 */
export type UseRefReturn<T> = [cb: RefCallback<T>, node: RefObject<T>];

interface Effect<T> { (instance: T | null): (void | Destructor), }

type UseRefEffectAruments<T> = [effect: Effect<T>]

function getEffect<T>(args: UseRefEffectAruments<T>): Effect<T> {
  return args[0];
}

/**
 * UseEffect given a ref
 *
 * When the ref is updated, the next callback is triggered
 * and the previous callback is cleaned-up
 *
 * @param effect
 * @param deps
 * @returns
 */
export function useRefEffect<T>(...args: UseRefEffectAruments<T>): UseRefReturn<T> {
  const effect = getEffect(args);

  // keep references to the last destructor and effects callbacks
  const _refDestructor = useRef<null | Destructor>(null);
  // keep the current effect up-to-date
  const _refEffect = useValueRef(effect);

  // object reference to the current value
  // synchronised by the callback ref
  const refObj: MutableRefObject<T | null> = useRef<T>(null);

  // ref callback
  //
  // critical: the ref callback must not referentially change between renders
  //
  // If the callback's reference DID change between renders, the previous reference
  // would be destructted on next render (re-called with null), and the next
  // reference would be instantly thereafter constructed (called with the element)
  // on every render where the reference to the callback changes
  //
  //
  const refCb: RefCallback<T> = useCallback((node) => {
    refObj.current = node;
    // run the ([prev-destructor]->[next-effect]) cycle
    if (_refDestructor.current) {
      _refDestructor.current();
      _refDestructor.current = null;
    }
    const nextDestructor = _refEffect.current(refObj.current);
    if (nextDestructor) _refDestructor.current = nextDestructor;
  }, []);

  // on dismount clear any final waiting destructor
  // runs after the final ref cb is called with null
  useEffect(
    () => () => void (_refDestructor.current?.(), _refDestructor.current = null),
    [],
  );

  return [refCb, refObj];
}
