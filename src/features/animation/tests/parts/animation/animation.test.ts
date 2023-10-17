// imports ================================================== //
// types ---------------------------------------------------- //
import type { PropertiesCSS } from "../../../../../shared/types/index";
// class ---------------------------------------------------- //
import { Animation } from "../../../index";

// constants ================================================ //
// @ts-ignore: method _getData is protected in parent class
class AnimationPattern extends Animation<string> {

    constructor(
        elems: [HTMLElement] | HTMLElement[],
        props: PropertiesCSS<string>
    ) {
        super(elems, props);
        this._getData = () => [0];
    }

    private _getData: () => [0];
    public async start() { return this._settings.elems; }
    public async end() { return this._settings.elems; }
}

// main ===================================================== //
describe("Testing an abstract animation class", () => {

    document.body.innerHTML += `<div id="elem"></div>`;

    test("animation with full properties", () => {

        let elems = [document.getElementById("elem")!];
        let properties: PropertiesCSS<string> = {
            "width": "0 -> 1999 px",
            "transform": "rotate(0 -> 1999 deg)",
        };
        const animation = new AnimationPattern(elems, properties);

        // @ts-ignore: getting the private id_animation property
        expect(typeof animation._id_animation).toBe("string");

        // @ts-ignore: getting the private elems property
        expect(animation._settings.elems).toEqual(elems);

        // @ts-ignore: getting the private props property
        expect(animation._settings.props).toEqual({
            width: {
                number_couples: [[0, 1999]],
                pattern: "?px"
            },
            transform: {
                number_couples: [[0, 1999]],
                pattern: "rotate(?deg)"
            }
        },
        );

    });

    test("animation with incorrect css properties", () => {

        let elem = document.getElementById("elem")!;
        let properties: PropertiesCSS<string> = {
            "width": "-> 1999 px",
            "transform": "rotate(deg)",
        };
        const animation = new AnimationPattern([elem], properties);

        // @ts-ignore: getting the private props property
        expect(animation._settings.props).toEqual({
            width: {
                number_couples: [],
                pattern: ""
            },
            transform: {
                number_couples: [],
                pattern: ""
            }
        });

    });

});