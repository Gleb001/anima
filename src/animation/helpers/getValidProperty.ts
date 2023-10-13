// imports ================================================== //
import type { ValidProperty } from "../../shared/types/index";

// types ==================================================== //
type getValidProperty = (property: string) => ValidProperty

// constants ================================================ //
const REG_EXPS = {
    getNumbers: /\d{0,}/g,
    getNumberToNumber: (
        /\s{0,}\d\s{0,}\d{0,}[\W]?->\s{0,}[\W]?\d{0,}\s{0,}/g
    ),
}

// additional functions ===================================== //
// Example:
// rotate( 0 -> 100 deg) | 0 -> 100 px
// [[0, 100]]            | [[0, 100]]
function getNumberCouples(property: string) {

    let numbers = (
        property
            .match(REG_EXPS.getNumbers)!
            .filter(str_num => str_num !== "")
            .map(str_num => Number(str_num))
    );

    let result = [];
    for (let number of numbers) {
        let couple = result[result.length - 1];
        if (!couple || couple.length === 2) {
            result.push([number]);
        } else {
            couple.push(number);
        }
    }

    return result as (number[])[];
    
}

// Example:
// rotate( 0 -> 100 deg) | 0 -> 100 px
// rotate(?deg)          | ?px
function getPattern(property: string) {
    return (
        property.replace(
            REG_EXPS.getNumberToNumber,
            "?"
        )
    );
}

// Example:
// Input : value = "matrix(?,?,?)", target = "?"
// Output: 3
function counterSymbol(value: string, target: string) {
    if (value.length === 0) return 0;

    let counter = 0;
    for (let char of value) {
        if (char === target) counter++;
    }

    return counter;
}

// main ===================================================== //
export const getValidProperty: getValidProperty = (property) => {

    let result = {
        number_couples : getNumberCouples(property),
        pattern        : getPattern(property),
    };

    let result_values_counter = result.number_couples.length;
    let spec_symbol_counter = counterSymbol(result.pattern, "?");
    let spec_symbol_indexof = result.pattern.indexOf("?");

    let hasSpecSymbols = (spec_symbol_counter === result_values_counter);
    let hasCorrectFirstIndexSpecSymbol = (
        spec_symbol_indexof === 0 ||
        (
            spec_symbol_indexof > 5 &&
            spec_symbol_indexof < 13 
        )
    )
    let hasFullValues = (result.number_couples[result_values_counter - 1].length === 2);

    if (hasFullValues && hasSpecSymbols && hasCorrectFirstIndexSpecSymbol) {
        return result;
    } else {
        return { number_couples: [], pattern: "" };
    }

};