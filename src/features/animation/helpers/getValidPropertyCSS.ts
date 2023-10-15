// imports ================================================== //
import type { ValidPropertyCSS } from "../../../shared/types/index";

// types ==================================================== //
type getValidPropertyCSS = (property: string) => ValidPropertyCSS

// constants ================================================ //
const REG_EXPS = {
    getNumbers: /\d{0,}/g,
    getNumberToNumber: (
        /\s{0,}\d\s{0,}\d{0,}[\W]?->\s{0,}[\W]?\d{0,}\s{0,}/g
    ),
};

// additional functions ===================================== //
function isValidPropertyCSS(property: ValidPropertyCSS) {

    let length_couples      = property.number_couples.length;
    let length_spec_symbols = getNumberSymbol(property.pattern, "?");
    let last_couples        = property.number_couples[length_couples - 1];

    let hasSpecSymbols = (length_spec_symbols === length_couples);
    let hasFullCouples = (last_couples.length === 2);
    
    return (
        hasFullCouples &&
        hasSpecSymbols
    );

}
function getNumberSymbol(value: string, target: string) {
    let counter = 0;
    for (let char of value) {
        if (char === target) counter++;
    }
    return counter;
}
// Example:
// rotate( 0 -> 100 deg)  |  0 -> 100 px
// [[0, 100]]             |  [[0, 100]]
function getNumberCouples(property: string) {

    let numbers = (
        property
            .match(REG_EXPS.getNumbers)!
            .filter(str_num => str_num !== "")
    );

    let result = [];
    for (let number of numbers) {
        let couple = result[result.length - 1];
        if (!couple || couple.length === 2) {
            result.push([Number(number)]);
        } else {
            couple.push(Number(number));
        }
    }

    return result as (number[])[];
    
}

// main ===================================================== //
// Note: it is necessary to optimize the algorithm for
// creating a valid property.
// We need to write an algorithm in one cycle!
export const getValidPropertyCSS: getValidPropertyCSS = (property) => {
    
    let result = {
        number_couples : getNumberCouples(property),
        pattern        : property.replace(REG_EXPS.getNumberToNumber, "?"),
    };
    let empty_valid_property_css = {
        number_couples : [],
        pattern: ""
    };

    return isValidPropertyCSS(result) ? result : empty_valid_property_css;

};