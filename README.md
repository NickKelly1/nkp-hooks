# @nkp/hooks

[![npm version](https://badge.fury.io/js/%40nkp%2Fcolor.svg)](https://www.npmjs.com/package/@nkp/hooks)
[![Node.js Package](https://github.com/nickkelly1/nkp-hooks/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/nickkelly1/nkp-hooks/actions/workflows/npm-publish.yml)
![Known Vulnerabilities](https://snyk.io/test/github/nickkelly1/nkp-hooks/badge.svg)

NPM package. Provides a set of common utility react hooks.

## Hooks

- [useClayoutEffect](###useClayoutEffect): Isomorphic useLayoutEffect - useEffect for SSR, useLayoutEffect in the browser.
- [useDOMRect](###useDOMRect): DOMRect from the element, auto-updating on resize.
- [useHaveEffectsMounted](###useHaveEffectsMounted): Have effects mounted (has useEffect fired?).
- [useHaveLayoutsMounted](###useHaveLayoutsMounted): Have layouts mounted (has useLayoutEffect fired?).
- [useMergeRefs](###useMergeRefs): Synchronises refs together. Useful with `forwardRef`.
- [useOnResize](###useOnResize): Fires a callback when the target element resizes
- [useValueRef](###useValueRef): Keeps a synchronised reference to the value.

### useClayoutEffect

Isomorphic useLayout. Safe to use server-side and client-side.

If there is no `window` object, falls back to `useEffect`.

If there is a `window` object, simply is `useLayoutEffect`.

Useful for server-side rendered applications where `useLayoutEffect` cannot be called server-side.

```tsx
function WithUseClayoutEffect() {
  const [pageRect, setPageRect] = useState<DOMRect | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  // useLayoutEffect is useful for listening to dom elements, but cannot be used
  // server-side. useClayoutEffect is safe both server-side and clients-side
  useClayoutEffect(() => {
    if (!mainRef.current) return;
    setPageRect(mainRef.current.getBoundingClientRect());
  }, []);

  return (
    <div ref={mainRef}>
      <div>hello world</div>
    </div>
  )
}
```

### useDOMRect

Synchronised DOMRect of the referenced element

Depends on `ResizeObserver`.

```tsx
function WithUseDOMRect() {
  const ref = useDomRect((rect) => {
    console.log('the new rect is:', rect);
  });

  return (
    <div ref={ref}>
      <div>hello world</div>
    </div>
  )
}
```

### useHaveEffectsMounted

Have effects mounted (has the component rendered and useEffect fired?).

```tsx
function WithUseHaveEffectsMounted() {
  const effectsMounted = useHaveEffectsMounted();

  useEffect(() => {
    if (!effectsMounted.current) return false;
    /** do work here */
  }, {});

  return (
    <main>
      <div>hello world</div>
    </main>
  )
}
```

### useHaveLayoutsMonuted

Have layout effects mounted (has the component rendered and useLayoutEffect fired?).

```tsx
function WithUseHaveLayoutsMounted() {
  const layoutsMounted = useHaveLayoutsMounted();

  useLayoutEffect(() => {
    if (!layoutsMounted.current) return false;
    /** do work here */
  }, {});

  return (
    <main>
      <div>hello world</div>
    </main>
  )
}
```

### useMergeRefs

Merges refs together. Useful for forwarding refs.

```tsx
// merge refs together
const WithUseMergedRefs = React.forwardRef((props, fref) => {
  const ref = mergeRefs(fref);
  return (
    <button {...props} ref={ref}>
      click me!
    </button>
  )
})
```

### useOnResize

Callback that fires on resize

```tsx
// without selector
function WithUseOnResize() {
  const ref = useOnResize<HTMLDivElement>((element: HTMLDivElement) => {
    console.log('resized', element.getBoundingClientRect());
  });

  return <div ref={ref} />;
}
```

If a selector is supplied, resize events on that selector are listened to instead of the referenced element. The referenced element is given to the callback.

```tsx
// with selector
function WithUseOnResize() {
  const ref = useOnResize<HTMLDivElement>(
    // fire when the #root element resizes, instead of the ref'd element
    '#root',
    (element: HTMLDivElement) => {
      console.log('resized', element.getBoundingClientRect());
    }
  );

  return <div ref={ref} />;
}
```

### useValueRef

Maintain a reference to the input value. Useful for functions referencing values that may not be memoized.

```tsx
interface Props { onSuccess?: () => {} };

function WithUseValueRef({ onSuccess }: Props) {
  const _onSuccess = useValueRef(onSuccess);

  // the reference to handleSuccess never changes, even when the reference to
  // onSuccess does.
  const handleSuccess = useCallback(() => {
    console.log('successful :)');
    _onSuccess.current?.();
  }, [_onSuccess]);

  return <Form onSuccess={handleSuccess}>;
}
```

Equivalent to

```tsx
interface Props { onSuccess?: () => {} };

function Component({ onSuccess }: Props ) {
  const _onSuccess = useRef(onSuccess);
  _onSuccess.current = onSuccess;
  // ...
}
```
