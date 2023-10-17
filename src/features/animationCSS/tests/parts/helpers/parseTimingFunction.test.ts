// import =================================================== //
import { parseTimingFunction } from "../../../helpers/parseTimingFunction";

// main ===================================================== //
describe("Testing the parseTimingFunction helper", () => {

    test("getting full timing data", () => {
        
        let timingfunction = "3s ease-in 1s 35 reverse both running slide";

        let timing_data = parseTimingFunction(timingfunction);
        let expect_timing_data = {
            duration: 3000,
            delay: 1000,
            iteration_count: 35,
            isReversed: true,
            isInfinity: false
        };

        expect(timing_data).toEqual(expect_timing_data);

    });

    test("get timing data without delay", () => {
        
        let timingfunction = "3s ease-in 35 reverse both running slide";

        let timing_data = parseTimingFunction(timingfunction);
        let expect_timing_data = {
            duration: 3000,
            delay: 0,
            iteration_count: 35,
            isReversed: true,
            isInfinity: false
        };

        expect(timing_data).toEqual(expect_timing_data);

    });

    test("get timing data without delay and itertaion_count", () => {
        
        let timingfunction = "3s ease-in reverse both running slide";

        let timing_data = parseTimingFunction(timingfunction);
        let expect_timing_data = {
            duration: 3000,
            delay: 0,
            iteration_count: 1,
            isReversed: true,
            isInfinity: false
        };

        expect(timing_data).toEqual(expect_timing_data);

    });

    test("get timing data in an incomplete row", () => {
        
        let timingfunction = "1s linear";

        let timing_data = parseTimingFunction(timingfunction);
        let expect_timing_data = {
            duration: 1000,
            delay: 0,
            iteration_count: 1,
            isReversed: false,
            isInfinity: false
        };

        expect(timing_data).toEqual(expect_timing_data);

    });

    test("get timing data in empty string", () => {
        
        let timingfunction = "";

        let timing_data = parseTimingFunction(timingfunction);
        let expect_timing_data = {
            duration: 0,
            delay: 0,
            iteration_count: 1,
            isReversed: false,
            isInfinity: false
        };

        expect(timing_data).toEqual(expect_timing_data);

    });

    test("get timing data in empty string", () => {
        
        let timingfunction = "";

        let timing_data = parseTimingFunction(timingfunction);
        let expect_timing_data = {
            duration: 0,
            delay: 0,
            iteration_count: 1,
            isReversed: false,
            isInfinity: false
        };

        expect(timing_data).toEqual(expect_timing_data);

    });
    
});