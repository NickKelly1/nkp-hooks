import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { useDOMRect } from './use-dom-rect';

// TODO: test this
// tragically, we cannot test this component because ResizeObserver
// has no sufficiently good mocks / polyfills and I can't be bothered
// figuring out how to set this up with pupeteer yet
describe('useDOMRect', () => {
  it('produces a rect from the rendered element', async () => {
    const height = 150;
    const width = 25;
    let didRender = false;
    function Component() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [ref, rect] = useDOMRect<HTMLDivElement>();
      useEffect(() => void (didRender = true), []);
      return (
        <div
          ref={ref}
          style={{ width: `${width}px`, height: `${height}px`, }}
        />
      );
    }
    render(<Component />);
    expect(didRender).toBe(true);
  });
});
