// https://stackoverflow.com/questions/74146786/is-it-possible-to-make-a-typescript-function-return-never-or-throw-if-a-generi
type NeverFish<S extends string> = {
    fish: never;
    [n: string]: S;
}

export function throwIfFish<S extends string>(str: S): NeverFish<S>[S] {
    if (str === "fish") {
        throw new Error("fish");
    } else { 
        return str; 
    }
}
