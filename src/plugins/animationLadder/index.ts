// imports ================================================== //
import type { Animation } from "../types/index";
import { animationExtend } from "../animationExtend/index.js";

// main ===================================================== //
export function animationLadder(
    ...animations: (Animation | (() => Animation))[]
) {

    let number_animations = animations.length;
    let index = number_animations > 1 ? number_animations - 2 : 0;

    do {

        let main_animation = animations[index];
        if (typeof main_animation == "function") main_animation = main_animation();

        if (main_animation) {
            let nested_animation = animations[index + 1];
            animations[index] = animationExtend(
                main_animation,
                () => {
                    switch (typeof nested_animation) {
                        case "function":
                            nested_animation().start();
                            break;
                        case "object":
                            nested_animation.start();
                            break;
                    }
                }
            );
        }

        index--;

    } while (index >= 0);

    return animations[0] as Animation;

};