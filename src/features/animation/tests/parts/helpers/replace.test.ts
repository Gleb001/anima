// import =================================================== //
import { replace } from "../../../helpers/replace";

// main ===================================================== //
describe("Testing the replace helper", () => {

    test("replacement ? characters in a line by 0", () => {

        let current_value = "change ? in a line by 0";
        let expect_value = "change 0 in a line by 0";

        let result = replace(current_value, "?", [0]);
        expect(result).toBe(expect_value);

    });

    test("replacement ? characters in an string on nothing", () => {

        let current_value = "change ? in a line by 0";

        let result = replace(current_value, "?", []);
        expect(result).toBe(current_value);

    });

    test("replacement ? characters in an empty string by 0", () => {

        let current_value = "";

        let result = replace(current_value, "?", [0]);
        expect(result).toBe(current_value);

    });

});