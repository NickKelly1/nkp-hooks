import React from 'react';
import { render } from '@testing-library/react';
import { useRefEffect } from './use-ref-effect';

describe('useRefEffect', () => {
  it('Runs', () => {
    let runCount = 0;
    const calls: unknown[] = [];
    function Component() {
      const [ref] = useRefEffect<HTMLDivElement>((elem) => {
        calls.push(elem);
        runCount += 1;
      });
      return <div ref={ref} />;
    }

    const program = render(<Component />);
    // component has mounted once - cb has been called
    expect(runCount).toBe(1);
    expect(calls[0]).toBeInstanceOf(Element);
    program.unmount();
    // component has unmounted - cb is called with null
    expect(runCount).toBe(2);
    expect(calls[1]).toBe(null);
  });

  it('Destructs', () => {
    let runCount = 0;
    let cleanupCount = 0;
    const calls: unknown[] = [];
    function Component() {
      const [ref] = useRefEffect<HTMLDivElement>((elem) => {
        calls.push(elem);
        runCount += 1;
        return () => {
          cleanupCount += 1;
        };
      });
      return <div ref={ref} />;
    }

    // mount
    const program = render(<Component />);
    // component has mounted once - cb has been called
    expect(runCount).toBe(1);
    expect(calls[0]).toBeInstanceOf(Element);
    // destructor has NOT to be called yet
    expect(cleanupCount).toBe(0);

    // unmount
    program.unmount();
    // component has unmounted - cb is called with null
    expect(runCount).toBe(2);
    expect(calls[1]).toBe(null);
    // destructor was called once for the first cb
    // and now that the component has unmounted, it's been
    // called a second time
    expect(cleanupCount).toBe(2);
  });
});
