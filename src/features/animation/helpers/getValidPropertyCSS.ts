// imports ================================================== //
import type { ValidPropertyCSS } from "../../../shared/types/index.d.ts";

// types ==================================================== //
type getValidPropertyCSS = (property: string) => ValidPropertyCSS

// additional functions ===================================== //
function getNumberCouples(property: string) {

    let total_numbers = property.match(/(-?)\d{1,}/g);

    if (
        !total_numbers                  ||
        total_numbers.length === 0      ||
        total_numbers.length % 2 !== 0
    ) return [];

    let result: (number[])[] = [];
    for (let index = 0; index < total_numbers.length; index += 2) {
        result.push([
            Number(total_numbers[index]),
            Number(total_numbers[index + 1])
        ]);
    }
    return result;

}

// main ===================================================== //
export const getValidPropertyCSS: getValidPropertyCSS = (property) => {

    let number_couples = getNumberCouples(property);
    let pattern = property.replaceAll(/[\d|\-|\>|\s\+]{1,}/g, "?");

    let isWrongPropertyCSS = (
        number_couples.length === 0 ||
        pattern.length < 3
    )
    if (isWrongPropertyCSS) {
        return {
            number_couples: [],
            pattern: ""
        };
    } else {
        return {
            number_couples,
            pattern
        };
    }

};