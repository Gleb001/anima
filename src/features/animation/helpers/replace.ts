// types ==================================================== //
type Replace = (value: string, target: string, data: (string | number)[]) => string

// main ===================================================== //
export const replace: Replace = (value, target, data) => {

    let result = "";

    let index = 0;
    for (let char of value) {
        if (char === target && typeof data[index] !== "undefined") {
            result += data[index++];
        } else {
            result += char;
        }
    }
    
    return result;

}