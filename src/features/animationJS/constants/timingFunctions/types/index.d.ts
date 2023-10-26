// imports ================================================== //
import type { TimingFunction } from "../../../types/index";

// main ===================================================== //
interface TimingFunctionList {
    [Key: string]: TimingFunction,
}

type NamesTimingFunction = (
    "easeInSine"        |
    "easeOutSine"       |
    "easeInOutSine"     |

    "easeInQuad"        |
    "easeOutQuad"       |
    "easeInOutQuad"     |

    "easeInCubic"       |
    "easeOutCubic"      |
    "easeInOutCubic"    |

    "easeInQuart"       |
    "easeOutQuart"      |
    "easeInOutQuart"    |

    "easeInQuint"       |
    "easeOutQuint"      |
    "easeInOutQuint"    |

    "easeInExpo"        |
    "easeOutExpo"       |
    "easeInOutExpo"     |

    "easeInCirc"        |
    "easeOutCirc"       |
    "easeInOutCirc"     |

    "easeInBack"        |
    "easeOutBack"       |
    "easeInOutBack"     |

    "easeInElastic"     |
    "easeOutElastic"    |
    "easeInOutElastic"  |

    "easeInBounce"      |
    "easeOutBounce"     |
    "easeInOutBounce"   |

    "linear"            |

    "bounceStart"       |
    "bounceEnd"
)

// exports ================================================== //
export type {
    TimingFunctionList,
    NamesTimingFunction
};