// imports ================================================== //
// types ---------------------------------------------------- //
import type { Properties } from "../shared/types/index";
// helpers -------------------------------------------------- //
import { Animation } from "../animation/index";
import { timeout } from "../shared/helpers/timeout";
import { createFileAnimationCSS } from "./helpers/createFileAnimationCSS";
import { parseTimingFunction } from "./helpers/parseTimingFunction";

// main ===================================================== //
class AnimationCSS extends Animation<string> {

    constructor(
        elems: [HTMLElement] | HTMLElement[],
        props: Properties<string>
    ) {
        super(elems, props);
        this._css_file = createFileAnimationCSS(
            this._settings.props,
            this._id_animation
        );
    }

    // public ----------------------------------------------- //
    public async start(
        timing_function: CSSStyleDeclaration["animation"]
    ) {
        for (let elem of this._settings.elems) {
            elem.style.animation = this._id_animation + " " + timing_function;
        }

        let {
            duration,
            delay,
            iteration_count,
            isReversed
        } = parseTimingFunction(timing_function);
        this._isReversed = isReversed;

        document.body.append(this._css_file);

        await timeout(delay + (duration * iteration_count));
        return await this.end();
    }
    public async end() {
        this._setPropsForElems();
        this._css_file.remove();
        await timeout(25); // wait set props for elems
        return this._settings.elems;
    }

    // private ---------------------------------------------- //
    private _css_file: HTMLStyleElement
    private _isReversed: boolean = false;

    private _setPropsForElems() {

        let { elems, props } = this._settings;

        for (let elem of elems) {
            if (!this._isReversed) {
                for (let name_prop in props) {
                    let { number_couples, pattern } = props[name_prop]!;
                    for (let [start, end] of number_couples) {
                        elem.style[name_prop] = pattern.replace("?", end.toString());
                    }
                }
            }
            elem.style.animation = "";
        }

    }

};

// exports ================================================== //
export { AnimationCSS, createFileAnimationCSS };