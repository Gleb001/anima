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
    let keyframes_animation = createKeyframesAnimation(props, name);
    if (keyframes_animation === "") return null;

    let css_file = document.createElement("style");
    css_file.innerText = keyframes_animation;
    return css_file;
}