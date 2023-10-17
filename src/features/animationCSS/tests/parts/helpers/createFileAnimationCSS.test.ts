// import =================================================== //
// types ---------------------------------------------------- //
import { PropertiesCSS, ValidPropertyCSS } from "../../../../../shared/types/index";
// module under test ---------------------------------------- //
import { createFileAnimationCSS } from "../../../helpers/createFileAnimationCSS";

// main ===================================================== //
describe("Testing the createFileAnimationCSS helper", () => {

    let props: PropertiesCSS<ValidPropertyCSS> = {
        "width": {
            number_couples: [[0, 100]],
            pattern: "?px"
        },
    };
    let name_animation = "name_animation";

    test("getting a css file with properties and name", () => {

        let css_file = createFileAnimationCSS(props, name_animation);
        expect(css_file).not.toBeNull();

        if (css_file) {

            expect(css_file.nodeName).toBe("STYLE");

            let expect_inner_css_file = (`
                @keyframes ${name_animation} {
                    from { width: 0px;   }
                    to   { width: 100px; }
                }
            `);
            console.log(expect_inner_css_file.replace(/\s/g, ""));
            expect(css_file.innerText.replace(/\s/g, "")).toBe(expect_inner_css_file.replace(/\s/g, ""));
    
        }

    });

    test("getting a css file with properties and empty a name", () => {
        let css_file = createFileAnimationCSS(props, "");
        expect(css_file).toBeNull();
    });

    test("getting a css file with name and empty a properties", () => {
        let css_file = createFileAnimationCSS({}, name_animation);
        expect(css_file).toBeNull();
    });

    test("getting a css file empty properties and name", () => {
        let css_file = createFileAnimationCSS({}, "");
        expect(css_file).toBeNull();
    });

});