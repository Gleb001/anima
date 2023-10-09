// imports ================================================== //
import type { ValidProperty } from "../../shared/types/index";

// types ==================================================== //
type getValidProperty = (property: string) => ValidProperty

// main ===================================================== //
export const getValidProperty: getValidProperty = (property) => ({
    values: (
        property
            .match(/\d{0,}/g)!
            .filter(char => char !== "")
            .map(num => Number(num))
    ),
    pattern: (
        property.replace(                             // Example:
            /\s{0,}\d{0,}[\W]?->[\W]?\d{0,}\s{0,}/g,  // rotate( 0 -> 100 px) | 0 -> 100 px
            "?"                                       // rotate(?px)          | ?px
        )
    )
});