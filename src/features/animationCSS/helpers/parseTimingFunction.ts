// types ==================================================== //
interface parsedTimingFunction {
    duration: number,
    delay: number,
    iteration_count: number,
    isReversed: boolean,
    isInfinity: boolean
}
type parseTimingFunction = (data: CSSStyleDeclaration["animation"]) => parsedTimingFunction

// main ===================================================== //
// Note: Optimize this algorithm!
export const parseTimingFunction: parseTimingFunction = (data) => {
    let isReversed = false;
    let isInfinity = false;
    let indexIterationCount = -1;
    let nums = (
        data
            .split(" ")
            .filter(word => {
                switch (word) {
                    case "reverse":
                        isReversed = true;
                        break;
                    case "infinity":
                        isInfinity = true;
                        break;
                    default:
                        for (let char of word) {
                            let isNumber = !Number.isNaN(Number(char))
                            if (isNumber) return true;
                        }
                        break;
                }
                return false;
            })
            .map((word, index) => {
                for (let index = 0; index < word.length; index++) {
                    let char = word[index];
                    switch (char) {
                        case "m" : return Number(word.slice(0, index));
                        case "s" : return Number(word.slice(0, index)) * 1000;
                        default  : break;
                    }
                }
                indexIterationCount = index;
                return Number(word);
            })
    );

    if (indexIterationCount !== 2 && indexIterationCount !== -1) {
        if (indexIterationCount === 1) nums.push(0);
        let value = nums.splice(indexIterationCount, 1);
        nums.push(value[0]);
    }

    return (
        {
            duration        : typeof nums[0] === "number" ? nums[0] : 0,
            delay           : typeof nums[1] === "number" ? nums[1] : 0,
            iteration_count : typeof nums[2] === "number" ? nums[2] : 1,
            isReversed      : isReversed,
            isInfinity      : isInfinity
        }
    );
};