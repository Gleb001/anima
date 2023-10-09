// types ======================================================= //
interface AnimaitonPattern {
    elements: (HTMLElement)[],
    properties: Properties<string>,
    animation: string
}

interface AnimaitonSettings<TypeTimingFunc> {
    elems: (HTMLElement)[],
    props: Properties<ValidProperty>,
    timing_function?: TypeTimingFunc,
}


type Properties<T> = {
    [key in keyof CSSStyleDeclaration]?: T
}

interface ValidProperty {
    values: [number, number] | number[],
    pattern: string
}

// export ====================================================== //
export {
    AnimaitonSettings,
    AnimaitonPattern,
    Properties,
    ValidProperty
};