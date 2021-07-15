import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { render } from '@testing-library/react';
import { useMergeRefs } from './use-merge-refs';

describe('useMergeRefs', () => {
  it('merges refs', () => {
    let _ref1: HTMLElement | undefined;
    let _ref2: HTMLElement | undefined;

    function Component() {
      // object ref
      const ref1 = useRef<HTMLElement>();
      useLayoutEffect(() => { _ref1 = ref1.current; }, []);
      // callback ref
      const ref2 = useCallback((elem) => { _ref2 = elem; }, []);
      // merged ref
      const mergedRef = useMergeRefs(ref1, ref2);
      return <div ref={mergedRef} />;
    }

    render(<Component />);
    expect(_ref1).toBeInstanceOf(HTMLElement);
    expect(_ref2).toBeInstanceOf(HTMLElement);
  });
});
