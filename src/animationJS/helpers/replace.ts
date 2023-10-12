// types ==================================================== //
type Replace = (value: string, target: string, data: number[]) => string

// main ===================================================== //
export const replace: Replace = (value, target, data) => {

    let index = 0;

    let result = "";
    for (let char of value) {
        if (char === target) {
            result += data[index++];
        } else {
            result += char;
        }
    }
    return result;

}