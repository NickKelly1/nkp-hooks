import React, { useEffect, useLayoutEffect } from 'react';
import { render } from '@testing-library/react';
import { useHaveEffectsMounted } from './use-have-effects-mounted';

describe('useHaveEffectsMounted', () => {
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
      const haveMounted = useHaveEffectsMounted();
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
    expect(layoutHookBefore).toBe(false); // useLayoutEffect runs after useEffect
    expect(effectHookBefore).toBe(false);

    // useLayout that runs AFTER useHaveEffectsMounted will be updated AFTER
    expect(layoutHookAfter).toBe(false); // useLayoutEffect runs after useEffect
    expect(effectHookAfter).toBe(true);
  });
});
