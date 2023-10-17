// import =================================================== //
import { getId } from "../../../helpers/getId";

// main ===================================================== //
describe("Testing the getId helper", () => {

    test("generate id animation", () => {

        let id = getId();

        let idTypeof = typeof id;
        expect(idTypeof).toBe("string");

        let idPrefix = id.slice(0, 3);
        expect(idPrefix).toBe("id-");

        let idLength = id.length;
        expect(idLength).toBe(16);

    });
    
});