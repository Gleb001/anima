// import =================================================== //
// types ---------------------------------------------------- //
import type { TimingFunction } from "./types/index";
import type { ValidProperty } from "../shared/types/index";
import type { NamesTimingFunction } from "./constants/timingFunctions/types/index";
// constants ------------------------------------------------ //
import { TIMING_FUNCTIONS } from "./constants/timingFunctions/index.js";
// helpers -------------------------------------------------- //
import { timeout } from "./helpers/timeout.js";
import { Animation } from "../animation/index.js";

// main ===================================================== //
class AnimationJS extends Animation<TimingFunction> {

    // public ----------------------------------------------- //
    public async start(
        timing_function: TimingFunction | NamesTimingFunction,
        duration?: number,
        delay?: number
    ) {
        if (typeof timing_function === "string") {
            this._settings.timing_function = TIMING_FUNCTIONS[timing_function];
        } else {
            this._settings.timing_function = timing_function;
        }

        typeof delay === "number" && await timeout(delay);
        await this._playAnimation(Number(duration));
        return await this.end();
    }
    public async end() {
        if (this._requestAnimationId) {
            window.cancelAnimationFrame(this._requestAnimationId);
        }
        return this._settings.elems;
    }

    // private ---------------------------------------------- //
    private _requestAnimationId: number = 0

    private _playAnimation(duration: number) {
        let animation = this;

        return new Promise(resolve => {
            let start_animation = performance.now();

            animation._requestAnimationId = window.requestAnimationFrame(
                function animate(timestamp) {

                    let time_fraction = (timestamp - start_animation) / duration;
                    if (time_fraction > 1) time_fraction = 1;

                    animation._changeEachPropertyInOrder(time_fraction);

                    if (time_fraction < 1) {
                        window.requestAnimationFrame(animate);
                    } else {
                        resolve(null);
                    };

                }
            );
        });
    }
    private _changeEachPropertyInOrder(time_fraction: number) {
        for (let name_prop in this._settings.props) {
            let prop = this._settings.props[name_prop]!;                        // get prop
            let new_value = this._calculate(time_fraction, prop);               // get new value for the prop
            let value_prop = prop.pattern.replace("?", new_value.toString());   // get valid new value for the css
            this._draw(name_prop, value_prop);                                  // set new value the prop
        }
    }
    private _calculate(time_fraction: number, prop: ValidProperty) {
        let [prev_value, next_value] = prop.values;                     // get prev and next values property
        let added_value = next_value - prev_value;                      // get added value
        let percent = this._settings.timing_function!(time_fraction);   // get percent of the added distance
        let part_added_number = percent * added_value;                  // get part of the added value
        return prev_value + part_added_number;                          // get new value property
    }
    private _draw(name_prop: string, new_value: string) {
        this._settings.elems.forEach(elem => {
            elem.style[name_prop as any] = new_value;
        });
    }

};

// exports ================================================== //
export { AnimationJS };
export { TIMING_FUNCTIONS } from "./constants/timingFunctions/index.js";