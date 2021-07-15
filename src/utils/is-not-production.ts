/**
 * Are we almost definitely not in production?
 *
 * @returns
 */
export function isNotProduction(): boolean {
  return typeof process !== 'undefined'
    && typeof process === 'object' && process !== null
    && typeof process.env === 'object' && process.env !== null
    && typeof process.env.NODE_ENV === 'string'
    && !(process.env.NODE_ENV.toLowerCase().startsWith('prod'));
}
