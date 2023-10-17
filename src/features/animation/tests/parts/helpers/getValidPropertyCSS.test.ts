// import =================================================== //
import { getValidPropertyCSS } from "../../../helpers/getValidPropertyCSS";

// main ===================================================== //
describe("Testing the getValidPropertyCSS helper", () => {

    test("successfully obtaining a valid property", () => {

        let width_prop = "0 -> 1000 px";
        let transform_prop = "rotate(0 -> 720 deg)";
        let matrix_prop = "translate(0 -> 180 deg, 10 -> 20 %)";

        let valid_width_prop = getValidPropertyCSS(width_prop);
        let valid_matrix_prop = getValidPropertyCSS(matrix_prop);
        let valid_transform_prop = getValidPropertyCSS(transform_prop);

        let expect_valid_width_prop = { number_couples: [[0, 1000]], pattern: "?px" };
        let expect_valid_transform_prop = { number_couples: [[0, 720]], pattern: "rotate(?deg)" };
        let expect_valid_matrix_prop = { number_couples: [[0, 180], [10, 20]], pattern: "translate(?deg,?%)" };

        expect(valid_width_prop).toEqual(expect_valid_width_prop);
        expect(valid_matrix_prop).toEqual(expect_valid_matrix_prop);
        expect(valid_transform_prop).toEqual(expect_valid_transform_prop);

    });

    test("unsuccessful obtaining of a valid property", () => {

        let wrong_props = [
            "rotate( -> 100 px)",
            "kslj 0 -> 100 fskd jf12313",
            "",
            "px",
            "??px",
            "0 -> px",
            "0->0",
            "weriwriesdfsdfsdfsdfdsfd(0 -> 100 deg, 0 -> %)",
        ];

        let empty_valid_property = { number_couples: [], pattern: "" };
        for (let prop of wrong_props) {
            let valid_wrong_prop = getValidPropertyCSS(prop);
            expect(valid_wrong_prop).toEqual(empty_valid_property);
        }

    });
    
});