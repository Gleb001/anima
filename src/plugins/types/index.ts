// @ts-ignore
import { AnimationCSS } from "../.."
// @ts-ignore
import { AnimationJS } from "../.."

type Animation = (
    typeof AnimationCSS.prototype |
    typeof AnimationJS.prototype
)

export type { Animation } 