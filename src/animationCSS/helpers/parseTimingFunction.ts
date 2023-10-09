// types ==================================================== //
interface parsedTimingFunction {
    duration: number,
    delay: number,
    iteration_count: number,
    isReversed: boolean
}
type parseTimingFunction = (data: CSSStyleDeclaration["animation"]) => parsedTimingFunction

// main ===================================================== //
export const parseTimingFunction: parseTimingFunction = (data) => {
    let isReversed = false;
    let nums = (
        data
            .split(" ")
            .filter(word => {
                if (word === "reverse") {
                    isReversed = true;
                    return false;
                }

                for (let char of word) {
                    let isNumber = !Number.isNaN(Number(char))
                    if (isNumber) return true;
                }
                return false;
            })
            .map(word => {
                for (let index = 0; index < word.length; index++) {
                    let char = word[index];
                    switch (char) {
                        case "m" : return Number(word.slice(0, index));
                        case "s" : return Number(word.slice(0, index)) * 1000;
                        default  : break;
                    }
                }
                return Number(word);
            })
    );
    return (
        {
            duration        : typeof nums[0] === "number" ? nums[0] : 0,
            delay           : typeof nums[1] === "number" ? nums[1] : 0,
            iteration_count : typeof nums[2] === "number" ? nums[2] : 1,
            isReversed      : isReversed 
        }
    );
};