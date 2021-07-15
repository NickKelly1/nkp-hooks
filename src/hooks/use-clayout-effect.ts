import React from 'react';


/**
 * Use C(lient side)layoutEffect
 *
 * isomorphic use-layout-effect
 * https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 * use-layout-effect cannot be used in SSR, for SSR we call useEffect instead
 * we keep the name "useLayoutEffect" so eslint still helps us
 */
export const useClayoutEffect: typeof React.useLayoutEffect =
  typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect;
