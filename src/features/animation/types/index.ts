// import =================================================== //
import type {
    PropertiesCSS,
    ValidPropertyCSS
} from "../../../shared/types/index";

// main ===================================================== //
interface AnimaitonSettings<TypeTimingFunc> {
    elems: (HTMLElement)[],
    props: PropertiesCSS<ValidPropertyCSS>,
    timing_function?: TypeTimingFunc,
}

// export =================================================== //
export type { AnimaitonSettings };