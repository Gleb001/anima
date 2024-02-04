// imports ================================================== //
import type { ValidPropertyCSS } from "../../../shared/types/index.d.ts";

// types ==================================================== //
type getValidPropertyCSS = (property: string) => ValidPropertyCSS

// additional functions ===================================== //
function getNumberCouples(property: string) {

    let total_numbers = property.match(/(-?)(\d+\.\d+|\d+|\>)/g);

    if (
        !total_numbers              ||
        total_numbers.length === 0
    ) return [];

    let result: (number[])[] = [];
    for (let index = 0; index < total_numbers.length; index += 3) {

        const hasDivideArrow = (total_numbers[index + 1] === "->");
        if (!hasDivideArrow) { index -= 2; continue; }

        const hasEndNumber = (total_numbers[index + 2] !== undefined);
        if (!hasEndNumber) return [];

        result.push([
            Number(total_numbers[index]),
            Number(total_numbers[index + 2])
        ]);

    }
    return result;

}

// main ===================================================== //
export const getValidPropertyCSS: getValidPropertyCSS = (property) => {

    const number_couples = getNumberCouples(property);
    const pattern_without_whitespaces = property.replaceAll(/\s+/g, "");
    const pattern = pattern_without_whitespaces.replaceAll(/((-?)(\d+\.\d+|\d+)(->)((-?)(\d+\.\d+|\d+)))/g, "?");

    const hasNumberCouples = (number_couples.length !== 0);
    const isValidPattern = (/(\(|\,|^)\?/g.test(pattern));

    if (hasNumberCouples && isValidPattern) {
        return {
            number_couples,
            pattern
        };
    } else {
        return {
            number_couples: [],
            pattern: ""
        };
    }

};