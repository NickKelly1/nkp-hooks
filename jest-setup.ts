import '@testing-library/jest-dom';
import { ResizeObserver } from '@juggle/resize-observer';

// attempt to polyfill ResizeObserver
// note: it doesn't work great - doesn't appear to trigger
// cb on call to .observe(node)
// consider as a shim rather than a full polyfill
window.ResizeObserver = ResizeObserver;
