// imports ================================================== //
import type { Animation } from "../types/index";

// main ===================================================== //
export function animationExtend(
    animation: Animation, additional_value: () => void
) {

    let current_next_function = animation._ANIMATION_SETTINGS.next_function;
    animation._ANIMATION_SETTINGS.next_function = function () {
        if (current_next_function) current_next_function();
        additional_value();
    };

    return animation;

};