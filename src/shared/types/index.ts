// types ======================================================= //
// simple types ------------------------------------------------ //
interface ValidProperty {
    number_couples: (number[])[],
    pattern: string
}
type Properties<T> = {
    [key in keyof CSSStyleDeclaration]?: T
}
// complex types ----------------------------------------------- //
interface AnimaitonSettings<TypeTimingFunc> {
    elems: (HTMLElement)[],
    props: Properties<ValidProperty>,
    timing_function?: TypeTimingFunc,
}

// exports ===================================================== //
export {
    Properties,
    ValidProperty,
    AnimaitonSettings,
};