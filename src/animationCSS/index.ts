// imports ================================================== //
// types ---------------------------------------------------- //
import type { Properties } from "../shared/types/index";
// helpers -------------------------------------------------- //
import { Animation } from "../animation/index.js";
import { timeout } from "../animationJS/helpers/timeout.js";
import { createFileAnimationCSS } from "./helpers/createFileAnimationCSS.js";
import { parseTimingFunction } from "./helpers/parseTimingFunction.js";

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
        if (!this._isReversed) {
            this._settings.elems.forEach(elem => {
                for (let name_prop in this._settings.props) {
                    let prop = this._settings.props[name_prop]!;
                    elem.style[name_prop] = prop.pattern.replace("?", String(prop.values[1]));
                    elem.style.animation = "";
                }
            });
        } else {
            this._settings.elems.forEach(elem => {
                elem.style.animation = "";
            });
        }

        this._css_file.remove();

        await timeout(15); // i don't understand why it work before timeout
        return this._settings.elems;
    }

    // private ---------------------------------------------- //
    private _css_file   : HTMLStyleElement
    private _isReversed : boolean = false;

};

// exports ================================================== //
export { AnimationCSS, createFileAnimationCSS };