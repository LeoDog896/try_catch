/**
 * Ridiculously simple try/catch.
 * 
 * ```ts
 * attempt(() => JSON.parse("json"))
 * ```
 */
export function attempt<F, E>(func: () => F): [F, undefined] | [undefined, E] {
    try {
        return [func(), undefined];
    } catch (error) {
        return [undefined, error];
    }
}

/**
 * Ridiculously simple try/catch that defaults to any value.
 * 
 * ```ts
 * attempt(() => JSON.parse("json"))
 * ```
 */
export function attemptOr<F, E>(func: () => F, defaultValue: E): F | E {
    try {
        return func();
    } catch {
        return defaultValue;
    }
}

/**
 * Ridiculously simple try/catch that defaults to null.
 * 
 * ```ts
 * attempt(() => JSON.parse("json"))
 * ```
 */
 export function attemptOrNull<F>(func: () => F): F | null {
    return attemptOr(func, null)
 }