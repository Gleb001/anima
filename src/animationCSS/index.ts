// imports ================================================== //
// types ---------------------------------------------------- //
import type { Properties } from "../shared/types/index.d.ts";
// helpers -------------------------------------------------- //
import { Animation } from "../animation/index";
import { timeout } from "../animationJS/helpers/timeout";
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
        this._settings.elems.forEach(elem => {
            elem.style.animation = (
                this._id_animation +
                " " +
                timing_function
            );
        });

        let {
            duration,
            delay,
            iteration_count,
            isReversed
        } = parseTimingFunction(timing_function);
        this._isReversed = isReversed;

        document.body.append(this._css_file);

        await timeout(delay + duration * iteration_count);
        return await this.end();
    }
    public async end() {

        let { elems, props } = this._settings;

        if (!this._isReversed) {
            for (let elem of elems) {
                for (let name_prop in props) {
                    let { number_couples, pattern } = props[name_prop]!;
                    for (let [start, end] of number_couples) {
                        elem.style[name_prop] = pattern.replace("?", end.toString());
                    }
                    elem.style.animation = "";
                }
            }
        } else {
            for (let elem of elems) {
                elem.style.animation = "";
            }
        }

        await timeout(25); // wait set props for elems
        this._css_file.remove();

        return this._settings.elems;
    }

    // private ---------------------------------------------- //
    private _css_file: HTMLStyleElement
    private _isReversed: boolean = false;

};

// exports ================================================== //
export { AnimationCSS, createFileAnimationCSS };