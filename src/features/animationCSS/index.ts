// imports ================================================== //
// types ---------------------------------------------------- //
import type { PropertiesCSS } from "../../shared/types/index.d.ts";
// helpers -------------------------------------------------- //
import { timeout } from "../../shared/helpers/timeout";
import { createFileAnimationCSS } from "./helpers/createFileAnimationCSS";
import { parseTimingFunction } from "./helpers/parseTimingFunction";
// parent class --------------------------------------------- //
import { Animation } from "../animation/index";

// main ===================================================== //
// @ts-ignore: method _getData is protected in parent class
class AnimationCSS extends Animation<string> {

    constructor(
        elems: [HTMLElement] | HTMLElement[],
        props: PropertiesCSS<string>
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
        if (!this._css_file) throw new Error("Css file in AnimationCSS is null");

        this._setPropertyAnimation(this._id_animation + " " + timing_function);

        let {
            duration,
            delay,
            iteration_count,
            isReversed,
            isInfinite
        } = parseTimingFunction(timing_function);
        this._isReversed = isReversed;

        document.body.append(this._css_file);

        if (isInfinite) {
            return [];
        } else {
            await timeout(delay + (duration * iteration_count));
            return await this.end();
        }
        
    }
    public async end() {
        if (this._css_file) {
            if (!this._isReversed) this._changeEachProperty();
            this._setPropertyAnimation("");
            this._css_file.remove();
            await timeout(25); // wait set props for elems
        }
        return this._settings.elems;
    }

    // private ---------------------------------------------- //
    private _css_file: HTMLStyleElement | null = null
    private _isReversed: boolean = false;

    private _getData(number_couples: (number[])[]) {
        let result = [];
        for (let [start, end] of number_couples) {
            result.push(end);
        }
        return result;
    }
    private _setPropertyAnimation(value: string) {
        this._draw("animation", value);
    }

};

// exports ================================================== //
export { AnimationCSS, createFileAnimationCSS };