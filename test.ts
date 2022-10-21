import { assertEquals, assertNotEquals, assertThrows } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import { attempt, attemptOr, attemptOrNull } from "./index.ts"
import { throwIfFish } from "./fish.ts"

const validJSON = "{\"a\": 1}";
const invalidJSON = "invalid json";

// base assertions
{
    Deno.test("valid JSON is valid", () => {
        const json = JSON.parse(validJSON);
        assertEquals(json, { a: 1 });
    })

    Deno.test("invalid JSON is invalid", () => {
        assertThrows(() => JSON.parse(invalidJSON));
    })
}

// attempt
{
    Deno.test("attempt (JSON.parse) -> Try works", () => {
        const [json, error] = attempt(() => JSON.parse(validJSON))

        assertEquals(json.a, 1)
        assertEquals(error, undefined)
    });

    Deno.test("attempt (JSON.parse) -> Catch works", () => {
        const [json, error] = attempt(() => JSON.parse(invalidJSON))

        assertEquals(json, undefined)
        assertNotEquals(error, undefined)
    });

    Deno.test("attempt (typescripty) -> Try works", () => {
        const [content, error] = attempt(() => throwIfFish("not fish"))

        assertEquals(content, "not fish")
        assertEquals(error, undefined)
    });

    Deno.test("attempt (typescripty) -> Catch works", () => {
        const [content, error] = attempt(() => throwIfFish("fish"))

        assertEquals(content, undefined)
        assertNotEquals(error, undefined)
    }
}

// attemptOr
{
    Deno.test("attemptOr (JSON.parse) -> Try works", () => {
        const json = attemptOr(() => JSON.parse(validJSON), { a: 2 })

        assertEquals(json.a, 1)
    });

    Deno.test("attemptOr (JSON.parse) -> Catch works", () => {
        const json = attemptOr(() => JSON.parse(invalidJSON), { a: 2 })

        assertEquals(json.a, 2)
    });
}


// attemptOr
{
    Deno.test("attemptOrNull (JSON.parse) -> Try works", () => {
        const json = attemptOrNull(() => JSON.parse(validJSON))

        assertEquals(json.a, 1)
    });

    Deno.test("attemptOrElse (JSON.parse) -> Catch works", () => {
        const json = attemptOrNull(() => JSON.parse(invalidJSON))

        assertEquals(json, null)
    });
}
