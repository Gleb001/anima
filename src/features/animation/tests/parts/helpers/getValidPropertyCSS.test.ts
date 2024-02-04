// import =================================================== //
import { getValidPropertyCSS } from "../../../helpers/getValidPropertyCSS";

// main ===================================================== //
describe("Testing the getValidPropertyCSS helper", () => {

    test("valid property", () => {

        let width_prop = "0 -> 1000 px";
        let neg_width_prop = "0 -> -1000 px";
        let neg_width_prop_two = "-100 -> 0 deg";
        let transform_prop = "rotate(0 -> 720 deg)";
        let matrix_prop = "translate(0 -> 180 deg, 10 -> 20 %)";
        let matrix_neg_prop = "translate(-100 -> 180deg, -140 -> 0%)";

        let valid_width_prop = getValidPropertyCSS(width_prop);
        let valid_neg_width_prop = getValidPropertyCSS(neg_width_prop);
        let valid_neg_width_prop_two = getValidPropertyCSS(neg_width_prop_two);
        let valid_matrix_prop = getValidPropertyCSS(matrix_prop);
        let valid_transform_prop = getValidPropertyCSS(transform_prop);
        let valid_matrix_neg_prop = getValidPropertyCSS(matrix_neg_prop);

        let expect_valid_width_prop = { number_couples: [[0, 1000]], pattern: "?px" };
        let expect_valid_neg_width_prop = { number_couples: [[0, -1000]], pattern: "?px" };
        let expect_valid_neg_width_prop_two = { number_couples: [[-100, 0]], pattern: "?deg" };
        let expect_valid_transform_prop = { number_couples: [[0, 720]], pattern: "rotate(?deg)" };
        let expect_valid_matrix_prop = { number_couples: [[0, 180], [10, 20]], pattern: "translate(?deg,?%)" };
        let expect_valid_matrix_neg_prop = { number_couples: [[-100, 180], [-140, 0]], pattern: "translate(?deg,?%)" };

        expect(valid_width_prop).toEqual(expect_valid_width_prop);
        expect(valid_neg_width_prop).toEqual(expect_valid_neg_width_prop);
        expect(valid_neg_width_prop_two).toEqual(expect_valid_neg_width_prop_two);
        expect(valid_matrix_prop).toEqual(expect_valid_matrix_prop);
        expect(valid_transform_prop).toEqual(expect_valid_transform_prop);
        expect(valid_matrix_neg_prop).toEqual(expect_valid_matrix_neg_prop);

    });

    test("float numbers", () => {

        let width_prop = "100 -> 523.9 px";
        let valid_width_prop = getValidPropertyCSS(width_prop);
        let expect_valid_width_prop = { number_couples: [[100, 523.9]], pattern: "?px" };
        expect(valid_width_prop).toEqual(expect_valid_width_prop);

    });

    test("without measurement", () => {

        let opacity_prop = "0 -> 200";
        let valid_opacity_prop = getValidPropertyCSS(opacity_prop);
        let expect_valid_opacity_prop = { number_couples: [[0, 200]], pattern: "?" };
        expect(valid_opacity_prop).toEqual(expect_valid_opacity_prop);

    });

    test("static number couples", () => {

        let matrix_prop = "translate(180 deg, 10 -> 20 %)";
        let valid_matrix_prop = getValidPropertyCSS(matrix_prop);
        let expect_valid_matrix_prop = { number_couples: [[10, 20]], pattern: "translate(180deg,?%)" };
        expect(valid_matrix_prop).toEqual(expect_valid_matrix_prop);

    });

    test("invalid property", () => {

        let wrong_props = [
            "rotate( -> 100 px)",
            "kslj 0 -> 100 fskd jf12313",
            "",
            "px",
            "??px",
            "0 -> px",
            "weriwriesdfsdfsdfsdfdsfd(0 -> 100 deg, 0 -> %)",
        ];

        let empty_valid_property = { number_couples: [], pattern: "" };
        for (let prop of wrong_props) {
            let valid_wrong_prop = getValidPropertyCSS(prop);
            expect(valid_wrong_prop).toEqual(empty_valid_property);
        }

    });
    
});