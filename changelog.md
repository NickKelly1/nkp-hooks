# Changelog

## 0.0.5 - 2021-06-16

### Changed

- **useDomRect**
  - Removed `rect` as the second array element returned from useDOMReact to reduce unecessary re-renders when the rect changes
  - Now returns a single value, the `ref` to be attached

## 0.0.4 - 2021-06-15

### Changed

- **useDomRect**
  - Add a `domRectOnResize` callback that fires with the DOMRect when selected element is resized
  - Only update the DOMRect when one of its values changed, removing unecessary re-renders

## 0.0.1 - 2021-06-15

### Added

- Documentation
- Hook: useClayoutEffect
- Hook: useDOMRect
- Hook: useHaveEffectsMounted
- Hook: useHaveLayoutsMounted
- Hook: useMergeRefs
- Hook: useOnResize
- Hook: useRefEffect
- Hook: useValueRef
