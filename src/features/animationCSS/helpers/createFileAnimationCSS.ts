// imports ================================================== //
// types ---------------------------------------------------- //
import type { PropertiesCSS, ValidPropertyCSS } from "../../../shared/types/index";
// helpers -------------------------------------------------- //
import { createKeyframesAnimation } from "./createKeyframesAnimation";

// main ===================================================== //
export function createFileAnimationCSS(
    props: PropertiesCSS<ValidPropertyCSS>,
    name: string
) {
    let css_file = document.createElement("style");
    css_file.innerText = createKeyframesAnimation(props, name);
    return css_file;
}