// imports ================================================== //
import { PropertiesCSS } from "../../../shared/types/index";
import { AnimationJS, TIMING_FUNCTIONS } from "../index";

// additional functions ===================================== //
function getDataForTesting(document: Document) {

    let elem = document.getElementById("elem")!;
    let properties: PropertiesCSS<string> = {
        "width": "0 -> 1999 px",
        "transform": "rotate(0 -> 1999 deg)",
    };

    return [elem, properties] as [HTMLElement, PropertiesCSS<string>];

}

// main ===================================================== //
describe("testing class animationJS", () => {

    document.body.innerHTML += `<div id="elem"></div>`;

    let [elem, properties] = getDataForTesting(document);
    const animation = new AnimationJS([elem], properties);

    test("props instance class animationJS", () => {

        // @ts-ignore
        expect(typeof animation._id_animation).toBe("string");

        // @ts-ignore
        expect(animation._settings).toEqual({
            elems: [elem],
            props: {
                width: {
                    number_couples: [[0, 1999]],
                    pattern: "?px"
                },
                transform: {
                    number_couples: [[0, 1999]],
                    pattern: "rotate(?deg)"
                }
            },
            timing_function: undefined
        });

        // @ts-ignore
        expect(typeof animation._requestAnimationId).toBe("number");

    });

    test("start animation JS", async () => {

        await animation.start("bounce_end", 1000).then((elems) => {
            for (let elem of elems) {
                expect(elem.style.animation).toBe("");
                expect(elem.style.width).toBe("1999px");
                expect(elem.style.transform).toBe("rotate(1999deg)");
            }
        });

    });

    test("stop animation JS", async () => {

        animation.start("linear", 1000);

        await animation.end().then((elems) => {
            for (let elem of elems) {
                expect(elem.style.animation).toBe("");
                expect(elem.style.width).toBe("1999px");
                expect(elem.style.transform).toBe("rotate(1999deg)");
            }
        });

    });

});