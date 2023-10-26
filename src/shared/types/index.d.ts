// types ======================================================= //
interface ValidPropertyCSS {
    number_couples: (number[])[],
    pattern: string
}
type PropertiesCSS<T> = {
    [key in keyof CSSStyleDeclaration]?: T
}

// exports ===================================================== //
export {
    PropertiesCSS,
    ValidPropertyCSS,
};