/**
 * Ridiculously simple try/catch.
 * 
 * trycatch(() => JSON.parse("json"))
 * 
 * @param func 
 * @returns 
 */
export default function trycatch<F, E>(func: () => F): [F, undefined] | [undefined, E] {
    try {
        return [func(), undefined];
    } catch (error) {
        return [undefined, error];
    }
}