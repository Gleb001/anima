// import =================================================== //
// types ---------------------------------------------------- //
import type { TimingFunction } from "./types/index.d.ts";
import type { NamesTimingFunction } from "./constants/timingFunctions/types/index.d.ts";
// constants ------------------------------------------------ //
import { TIMING_FUNCTIONS } from "./constants/timingFunctions/index";
// helpers -------------------------------------------------- //
import { timeout } from "../../shared/helpers/timeout";
// parent class --------------------------------------------- //
import { Animation } from "../animation/index";

// main ===================================================== //
class AnimationJS extends Animation<TimingFunction> {

    // public ----------------------------------------------- //
    // @ts-ignore: incapsultaion method
    public async start(
        timing_function: TimingFunction | NamesTimingFunction,
        duration: number,
        delay?: number
    ) {
        this._setTimingFunction(timing_function);
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
    private _time_fraction!: number

    private _playAnimation(duration: number) {
        let animation = this;

        return new Promise(resolve => {
            let start_animation = performance.now();

            animation._requestAnimationId = window.requestAnimationFrame(
                function animate(timestamp) {

                    let time_fraction = (timestamp - start_animation) / duration;
                    if (time_fraction > 1) time_fraction = 1;

                    animation._time_fraction = time_fraction;
                    animation._changeEachProperty();

                    if (time_fraction < 1) {
                        window.requestAnimationFrame(animate);
                    } else {
                        resolve(null);
                    }

                }
            );
        });
    }
    private _calculate(time_fraction: number, start: number, end: number) {
        let added_value = end - start;
        let percent = this._settings.timing_function!(time_fraction);
        let part_added_number = percent * added_value;
        return start + part_added_number;
    }
    private _getData(number_couples: (number[])[]) {
        let result = [];
        for (let [start, end] of number_couples) {
            let value = this._calculate(this._time_fraction, start, end);
            result.push(value);
        }
        return result;
    }
    private _setTimingFunction(value: TimingFunction | NamesTimingFunction) {

        let isNameTimingFunction = (
            typeof value === "string" &&
            typeof TIMING_FUNCTIONS[value] === "function"
        );

        if (isNameTimingFunction) {
            this._settings.timing_function = TIMING_FUNCTIONS[value as any];
        } else if (typeof value === "function") {
            this._settings.timing_function = value;
        } else {
            throw new Error(
                `Timing function ${value} is no valid. ` +
                `Timing function in animationJS should ` +
                `be special name timing function or `    +
                `special function... `
            );
        }

    }

};

// exports ================================================== //
export { AnimationJS, TIMING_FUNCTIONS };