// imports ================================================== //
import type { ValidPropertyCSS } from "../../../shared/types/index.d.ts";

// types ==================================================== //
type getValidPropertyCSS = (property: string) => ValidPropertyCSS

// constants ================================================ //
const REMOVED_CHARS = [
    " ",
    "-",
    ">"
];

// additional functions ===================================== //
function isNumber(value: string | number) {
    return !Number.isNaN(Number(value)) && value !== " ";
}
function isRemovedChar(removed_chars: string[], target: string) {
    for (let removed_char of removed_chars) {
        if (removed_char === target) return true;
    }
    return false;
}

// main ===================================================== //
export const getValidPropertyCSS: getValidPropertyCSS = (property) => {

    let result = {
        number_couples: [] as (number[])[],
        pattern: ""
    };

    let cur_number = "";
    let prev_number = "";
    for (let char of property) {

        if (isNumber(char)) {
            cur_number += char;
        } else {
            if (cur_number !== "") {
                if (prev_number === "") {
                    prev_number = cur_number;
                    cur_number = "";
                } else {
                    result.number_couples.push([
                        Number(prev_number),
                        Number(cur_number)
                    ]);
                    prev_number = "";
                    cur_number = "";
                    result.pattern += "?";
                }
            }
            if (!isRemovedChar(REMOVED_CHARS, char)) {
                result.pattern += char;
            }
        }

    }

    let isEmptyPrevAndCurNumbers = (
        cur_number  === "" &&
        prev_number === "" 
    );
    let isFullNumberCouples = (
        result.number_couples.length > 0 &&
        result.number_couples[result.number_couples.length - 1].length === 2
    );

    if (isEmptyPrevAndCurNumbers && isFullNumberCouples) {
        return result;
    } else {
        return { number_couples: [], pattern: "" };
    }

};