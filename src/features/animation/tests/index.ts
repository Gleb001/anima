// imports ================================================== //
import { getId } from "../helpers/getId";
import { getValidPropertyCSS } from "../helpers/getValidPropertyCSS";

// main ===================================================== //
describe("testing helpers using in abstract class Animation", () => {

    test("generate id animation", () => {

        let id = getId();
        
        let idTypeof = typeof id;
        expect(idTypeof).toBe("string");

        let idPrefix = id.slice(0, 3);
        expect(idPrefix).toBe("id-");
        
        let idLength = id.length;
        expect(idLength).toBe(16);
    
    });

    test("get valid property", () => {

        let width_prop     = "0 -> 1000 px";
        let transform_prop = "rotate(0 -> 720 deg)";
        let matrix_prop    = "translate(0 -> 180 deg, 10 -> 20 %)";

        let valid_width_prop     = getValidPropertyCSS(width_prop);
        let valid_matrix_prop    = getValidPropertyCSS(matrix_prop);
        let valid_transform_prop = getValidPropertyCSS(transform_prop);

        let expect_valid_width_prop     = { number_couples: [[0, 1000]],          pattern: "?px"                };
        let expect_valid_transform_prop = { number_couples: [[0, 720 ]],          pattern: "rotate(?deg)"       };
        let expect_valid_matrix_prop    = { number_couples: [[0, 180], [10, 20]], pattern: "translate(?deg,?%)" };

        expect(valid_width_prop).toEqual(expect_valid_width_prop);
        expect(valid_matrix_prop).toEqual(expect_valid_matrix_prop);
        expect(valid_transform_prop).toEqual(expect_valid_transform_prop);

    });

    test("get valid wrong prop", () => {
        
        let wrong_props = [
            "rotate( -> 100 px)",
            "kslj 0 -> 100 fskd jf12313",
            "weriwriesdfsdfsdfsdfdsfd(0 -> 100 deg, 0 -> %)",
        ];

        let expect_valid_wrong_prop = { number_couples: [], pattern: "" };
        for (let prop of wrong_props) {
            let valid_wrong_prop = getValidPropertyCSS(prop);
            expect(valid_wrong_prop).toEqual(expect_valid_wrong_prop);
        }

    });

});