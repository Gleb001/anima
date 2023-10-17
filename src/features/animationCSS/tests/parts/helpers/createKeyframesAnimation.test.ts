// import =================================================== //
// types ---------------------------------------------------- //
import { PropertiesCSS, ValidPropertyCSS } from "../../../../../shared/types/index";
// module under test ---------------------------------------- //
import { createKeyframesAnimation } from "../../../helpers/createKeyframesAnimation";

// main ===================================================== //
describe("Testing the createKeyframesAnimation helper", () => {

    let props: PropertiesCSS<ValidPropertyCSS> = {
        "width": {
            number_couples: [[0, 100]],
            pattern: "?px"
        },
    };
    let name_animation = "name_animation";

    test("getting animation keyframes with properties and a name", () => {

        let keyframes_animation = createKeyframesAnimation(props, name_animation);
        let expect_keyframes_animation = (`
            @keyframes ${name_animation} {
                from { width: 0px;   }
                to   { width: 100px; }
            }
        `);

        expect(keyframes_animation.replace(/\s/g, "")).toBe(expect_keyframes_animation.replace(/\s/g, ""));

    });

    test("getting animation keyframes with properties and an empty name", () => {
        let keyframes_animation = createKeyframesAnimation(props, "");
        expect(keyframes_animation).toBe("");
    });

    test("getting animation keyframes with name and an empty properties", () => {
        let keyframes_animation = createKeyframesAnimation({}, name_animation);
        expect(keyframes_animation).toBe("");
    });
    
    test("getting animation keyframes with empty properties and a name", () => {
        let keyframes_animation = createKeyframesAnimation({}, "");
        expect(keyframes_animation).toBe("");
    });

});