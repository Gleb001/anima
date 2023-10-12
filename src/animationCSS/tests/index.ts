// imports ================================================== //
import { Properties } from "../../shared/types/index";
import { AnimationCSS } from "../index";

// additional functions ===================================== //
function getDataForTesting(document: Document) {

    let elem = document.getElementById("elem")!;
    let properties: Properties<string> = {
        "width": "0 -> 1999 px",
        "transform": "rotate(0 -> 1999 deg)",
    };

    return [elem, properties] as [HTMLElement, Properties<string>];

}
function removeSpaces(value: string) {
    return value.replace(/\s/g, "")
}

// main ===================================================== //
describe("testing class animationCSS", () => {

    document.body.innerHTML += `<div id="elem"></div>`;

    let [elem, properties] = getDataForTesting(document);
    const animation = new AnimationCSS([elem], properties);

    test("props instance class animationCSS", () => {

        // @ts-ignore
        expect(typeof animation._id_animation).toBe("string");

        // @ts-ignore
        expect(animation._isReversed).toBeFalsy();

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

        let expect_css_file = (
            // @ts-ignore
            `@keyframes ${animation._id_animation} {
                from { width: 0px;    transform: rotate(0deg);      }
                to   { width: 1999px; transform: rotate(1999deg);   }
            }`
        );

        // @ts-ignore
        expect(removeSpaces(animation._css_file.innerText)).toBe(removeSpaces(expect_css_file));

    });

    test("start animation CSS", async () => {

        await animation.start("1s linear").then((elems) => {
            for (let elem of elems) {
                expect(elem.style.animation).toBe("");
                expect(elem.style.width).toBe("1999px");
                expect(elem.style.transform).toBe("rotate(1999deg)");
            }
        });

    });

    test("stop animation CSS", async () => {

        animation.start("1s linear");

        await animation.end().then((elems) => {
            for (let elem of elems) {
                expect(elem.style.animation).toBe("");
                expect(elem.style.width).toBe("1999px");
                expect(elem.style.transform).toBe("rotate(1999deg)");
            }
        });

    });

});