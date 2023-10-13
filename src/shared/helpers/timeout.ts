// main ===================================================== //
export const timeout = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay));
}