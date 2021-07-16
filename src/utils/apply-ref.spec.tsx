import React, { useLayoutEffect } from 'react';
import { render } from '@testing-library/react';
import { useCallback, useRef } from 'react';
import { applyRef } from './apply-ref';

describe('applyRef', () => {
  it('runs', () => {
    let _cbResult: undefined | null | HTMLElement = undefined;
    let _objResult: undefined | null | HTMLElement = undefined;
    function Component() {
      const _refCb = useCallback((element) => { _cbResult = element; }, []);
      const _refObj = useRef<HTMLElement>(null);
      const ref = useRef<HTMLDivElement>(null);
      useLayoutEffect(() => {
        // on layout, apply the refs
        applyRef(_refCb, ref.current);
        applyRef(_refObj, ref.current);
        _objResult = _refObj.current;
      }, []);
      return <div ref={ref}>test</div>;
    }

    const program = render(<Component />);
    expect(_cbResult).toBeInstanceOf(HTMLElement);
    expect(_objResult).toBeInstanceOf(HTMLElement);
    program.unmount();
  });
});
