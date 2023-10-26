// main ===================================================== //
// types ---------------------------------------------------- //
import type { PropertiesCSS } from "../../shared/types/index.d.ts";
import type { AnimaitonSettings } from "./types/index.d.ts";
// helpers -------------------------------------------------- //
import { getId } from "./helpers/getId";
import { replace } from "./helpers/replace";
import { getValidPropertyCSS } from "./helpers/getValidPropertyCSS";

// main ===================================================== //
abstract class Animation<TimingFunc> {

    constructor(
        elems: [HTMLElement] | HTMLElement[],
        props: PropertiesCSS<string>
    ) {
        this._id_animation = getId();

        this._settings.elems = elems;
        for (let name_prop in props) {
            this._settings.props[name_prop] = getValidPropertyCSS(props[name_prop]!);
        }
    }

    // public ----------------------------------------------- //
    public abstract start(
        timing_function: TimingFunc | CSSStyleDeclaration["animation"],
    ): Promise<HTMLElement[]>;
    public abstract start(
        timing_function: TimingFunc,
        duration: number,
        delay?: number
    ): Promise<HTMLElement[]>;

    public abstract end(): Promise<HTMLElement[]>;


    // protected -------------------------------------------- //
    // default
    protected _id_animation: string;
    protected _settings: AnimaitonSettings<TimingFunc> = {
        elems: [],
        props: {},
        timing_function: undefined,
    };

    protected _draw(name_prop: keyof CSSStyleDeclaration, new_value: string) {
        let { elems } = this._settings;
        for (let elem of elems) {
            elem.style[name_prop as any] = new_value;
        }
    }
    protected _changeEachProperty() {
        let { props } = this._settings;
        for (let name_prop in props) {
            let { number_couples, pattern } = props[name_prop]!;
            let data = this._getData(number_couples);
            let value_prop = replace(pattern, "?", data);
            this._draw(name_prop as keyof CSSStyleDeclaration, value_prop);
        }
    }

    // abstract
    protected abstract _getData(number_couples: (number[])[]): number[];

}

// exports ================================================== //
export { Animation };