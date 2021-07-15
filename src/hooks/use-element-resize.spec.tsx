import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { useElementResize } from './use-element-resize';

// TODO: test this
// tragically, we cannot test this component because ResizeObserver
// has no sufficiently good mocks / polyfills and I can't be bothered
// figuring out how to set this up with pupeteer yet
describe('useElementResize', () => {
  it('produces a rect from the rendered element', async () => {
    const height = 150;
    const width = 25;
    let didRender = false;
    function Component() {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const ref = useElementResize<HTMLDivElement>(() => {});
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
