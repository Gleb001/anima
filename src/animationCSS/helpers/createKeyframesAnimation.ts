// imports ================================================== //
import type { Properties, ValidProperty } from "../../shared/types/index";

// additional functions ===================================== //
function getFromAndToValueProp(valid_props: Properties<ValidProperty>) {

    let result = ["", ""];

    for (let name_valid_prop in valid_props) {
        let { pattern, number_couples } = valid_props[name_valid_prop]!;

        let from_prop = "";
        let to_prop   = "";

        let index_row = 0;
        for (let char of pattern) {
            if (char === "?") {
                from_prop += number_couples[index_row][0].toString();
                to_prop   += number_couples[index_row][1].toString();

                index_row++;
            } else {
                from_prop += char;
                to_prop += char;
            }
        }

        result[0] += name_valid_prop + ":" + from_prop + ";";
        result[1] += name_valid_prop + ":" + to_prop   + ";";

    }

    return result;
}

// main ===================================================== //
export function createKeyframesAnimation(
    props: Properties<ValidProperty>,
    name: string
) {

    let [from_properties, to_properties] = getFromAndToValueProp(props);

    return (`
        @keyframes ${name} {
            from { ${from_properties} }
            to   { ${to_properties}   }
        }
    `);

}