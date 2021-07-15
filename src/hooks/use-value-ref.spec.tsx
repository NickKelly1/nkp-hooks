import React, { useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import { useValueRef } from './use-value-ref';

describe('useValueRef', () => {
  it('Runs', () => {
    let value: number | null = null;
    function Component() {
      const [count, setCount] = useState(0);
      const countRef = useValueRef<number>(count);
      value = countRef.current;
      useEffect(() => (setCount(1), () => setCount(2)), []);
      useEffect(() => {
        if (count < 4) setCount(count + 1);
      }, [count]);
      return <div />;
    }

    // mount
    const program = render(<Component />);
    expect(value).toBe(4);
    program.unmount();
  });
});
