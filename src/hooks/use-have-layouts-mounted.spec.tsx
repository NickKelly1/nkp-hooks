import React, { useEffect, useLayoutEffect } from 'react';
import { render } from '@testing-library/react';
import { useHaveLayoutsMounted } from './use-have-layouts-mounted';

describe('useHaveLayoutsMounted', () => {
  it('runs', () => {
    let hasRendered = false;
    let hookInitialRender: null | boolean = null;
    let layoutHookBefore: null | boolean = null;
    let layoutHookAfter: null | boolean = null;
    let effectHookBefore: null | boolean = null;
    let effectHookAfter: null | boolean = null;
    function Component() {
      useLayoutEffect(() => void (layoutHookBefore = haveMounted.current), []);
      useEffect(() => void (effectHookBefore = haveMounted.current), []);
      const haveMounted = useHaveLayoutsMounted();
      useLayoutEffect(() => void (layoutHookAfter = haveMounted.current), []);
      useEffect(() => void (effectHookAfter = haveMounted.current), []);
      if (!hasRendered) {
        hookInitialRender = haveMounted.current;
        hasRendered = true;
      }
      return <div />;
    }

    // mount
    const program = render(<Component />);
    program.unmount();
    // is false on initial render
    expect(hookInitialRender).toBe(false);

    // useLayout that runs AFTER useHaveEffectsMounted will be updated BEFRE
    expect(layoutHookBefore).toBe(false);
    expect(effectHookBefore).toBe(true); // useEffect runs after useLayout

    // useLayout that runs AFTER useHaveEffectsMounted will be updated AFTER
    expect(layoutHookAfter).toBe(true);
    expect(effectHookAfter).toBe(true); // useEffect runs after useLayout
  });
});
