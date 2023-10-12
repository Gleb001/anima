// imports ================================================== //
import type { TimingFunctionList } from "./types/index.d.ts";

// main ===================================================== //
const TIMING_FUNCTIONS: TimingFunctionList = {
    ease(time_fraction: number) {
        // y = sin (x * π/4)
        return Math.sin(time_fraction * Math.PI / 4);
    },
    ease_in(time_fraction: number) {
        // y = x^2
        return Math.pow(time_fraction, 2);
    },
    ease_out(time_fraction: number) {
        // y = √x
        return Math.sqrt(time_fraction);
    },
    linear(time_fraction: number) {
        // y = x
        return time_fraction;
    },
    bounce_start(time_fraction: number) {
        // y = 4 * x^3 - 3 * x^2
        return (4 * Math.pow(time_fraction, 3)) - (3 * Math.pow(time_fraction, 2));
    },
    bounce_end(time_fraction: number) {
        // y = -4 * x^3 + 5 * x^2
        return (-4 * Math.pow(time_fraction, 3)) + (5 * Math.pow(time_fraction, 2));
    },
};

// exports ================================================== //
export { TIMING_FUNCTIONS };