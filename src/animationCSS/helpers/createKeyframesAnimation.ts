// imports ================================================== //
import { Properties, ValidProperty } from "../../shared/types/index";

// main ===================================================== //
export function createKeyframesAnimation(
    props: Properties<ValidProperty>,
    name: string
) {

    let from_properties = "";
    let to_properties = "";

    for (let key in props) {
        let prop = props[key]!;
        from_properties += (
            key +
            ":" +
            prop.pattern.replace("?", prop.values[0].toString()) +
            ";"
        );
        to_properties += (
            key +
            ":" +
            prop.pattern.replace("?", prop.values[1].toString()) +
            ";"
        );
    }

    return (`
        @keyframes ${name} {
            from { ${from_properties} }
            to { ${to_properties} }
        }
    `);

}