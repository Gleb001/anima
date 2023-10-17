// types ==================================================== //
interface parsedTimingFunction {
    duration: number,
    delay: number,
    iteration_count: number,
    isReversed: boolean,
    isInfinity: boolean
}
interface Measurementnumbers {
    [key: string]: number,
}
type parseTimingFunction = (data: CSSStyleDeclaration["animation"]) => parsedTimingFunction

// constants ================================================ //
const MEASUREMENTS_numberS: Measurementnumbers = {
    "s": 1000,
    "ms": 1,
};

// additional functions ===================================== //
function isNumber(number: string) {
    return !Number.isNaN(Number(number));
}
function convertToNumber(value: string) {

    let number = 0;
    let measurement = "";
    for (let index = value.length - 1; index >= 0; index--) {
        let char = value[index];
        if (isNumber(char)) {
            number = Number(value.slice(0, index + 1));
            break;
        }
        measurement = char + measurement;
    }



    let coefficient = Number(MEASUREMENTS_numberS[measurement]);
    if (Number.isNaN(coefficient) || coefficient === 0) coefficient = 1;

    return number * coefficient;

}

// main ===================================================== //
export const parseTimingFunction: parseTimingFunction = (timing_function) => {

    let result: parsedTimingFunction = {
        delay: 0,
        duration: 0,
        isReversed: false,
        isInfinity: false,
        iteration_count: 1,
    };

    let word = "";
    for (let char of timing_function + " ") {
        if (char === " ") {
            if (word === "reverse") {
                result.isReversed = true;
            } else if (word === "infinity") {
                result.isInfinity = true;
            } else if (isNumber(word[0]) || word[0] === ".") {
                let number = convertToNumber(word);
                if (isNumber(word[word.length - 1])) {
                    result.iteration_count = number;
                } else if (result.duration === 0) {
                    result.duration = number;
                } else if (result.delay === 0) {
                    result.delay = number;
                }
            }
            word = "";
        } else {
            word += char;
        }
    }

    return result;

};