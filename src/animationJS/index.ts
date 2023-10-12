// import =================================================== //
// types ---------------------------------------------------- //
import type { TimingFunction } from "./types/index.d.ts";
import type { NamesTimingFunction } from "./constants/timingFunctions/types/index.d.ts";
// constants ------------------------------------------------ //
import { TIMING_FUNCTIONS } from "./constants/timingFunctions/index";
// helpers -------------------------------------------------- //
import { timeout } from "./helpers/timeout";
import { replace } from "./helpers/replace";
// parent class ---------------------------------------------
import { Animation } from "../animation/index";

// main ===================================================== //
class AnimationJS extends Animation<TimingFunction> {

    // public ----------------------------------------------- //
    // @ts-ignore: incapsultaion this method object
    public async start(
        timing_function: TimingFunction | NamesTimingFunction,
        duration: number,
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
                    }

                }
            );
        });
    }
    private _changeEachPropertyInOrder(time_fraction: number) {
        let { props } = this._settings;
        for (let name_prop in props) {
            let { number_couples, pattern } = props[name_prop]!;
            let data = this._getData(number_couples, time_fraction);
            let value_prop = replace(pattern, "?", data);
            this._draw(name_prop, value_prop);
        }
    }
    private _calculate(time_fraction: number, start: number, end: number) {
        let added_value = end - start;
        let percent = this._settings.timing_function!(time_fraction);
        let part_added_number = percent * added_value;
        return start + part_added_number;
    }
    private _draw(name_prop: string, new_value: string) {
        this._settings.elems.forEach(elem => {
            elem.style[name_prop as any] = new_value;
        });
    }
    private _getData(number_couples: (number[])[], time_fraction: number) {
        let result = [];
        for (let [start, end] of number_couples) {
            result.push(
                this._calculate(time_fraction, start, end)
            );
        }
        return result;
    }

};

// exports ================================================== //
export { AnimationJS, TIMING_FUNCTIONS };