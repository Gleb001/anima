// imports ================================================== //
import { PropertiesCSS } from "../../../shared/types/index";
import { AnimationJS } from "../index";

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

    test("start animation JS", async () => {

        await animation.start("bounceEnd", 1000).then((elems) => {
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