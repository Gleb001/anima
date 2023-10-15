// imports ================================================== //
import type { TimingFunction } from "../../../types/index";

// main ===================================================== //
interface TimingFunctionList {
    [Key: string]: TimingFunction,
}

type NamesTimingFunction = (
    "ease"          |
    "linear"        |
    "ease_in"       |
    "ease_out"      |
    "bounce_end"    |
    "bounce_start"
)

// exports ================================================== //
export type {
    TimingFunctionList,
    NamesTimingFunction
};