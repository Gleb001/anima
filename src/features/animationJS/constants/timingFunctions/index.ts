// imports ================================================== //
import type { TimingFunctionList } from "./types/index.d.ts";

// main ===================================================== //
const TIMING_FUNCTIONS: TimingFunctionList = {
    easeInSine: (x: number) => {
        // y = 1 - cos( (x * PI) / 2 )
        return 1 - Math.cos((x * Math.PI) / 2);
    },
    easeOutSine: (x: number) => {
        // y = sin( (x * PI) / 2 )
        return Math.sin((x * Math.PI) / 2);
    },
    easeInOutSine: (x: number) => {
        // y = -(cos(x * PI) - 1) / 2
        return -(Math.cos(x * Math.PI) - 1) / 2;
    },

    easeInQuad: (x: number) => {
        // y = x^2
        return Math.pow(x, 2);
    },
    easeOutQuad: (x: number) => {
        // y = 1 - (1 - x)^2
        return 1 - Math.pow((1 - x), 2);
    },
    easeInOutQuad: (x: number) => {
        if (x < 0.5) {
            // y = 2 * x^2
            return 2 * Math.pow(x, 2);
        } else {
            // y = 1 - ( (-2x + 2)^2 / 2 )
            return 1 - Math.pow((-2 * x + 2), 2) / 2;
        }
    },

    easeInCubic: (x: number) => {
        // y = x^3
        return Math.pow(x, 3);
    },
    easeOutCubic: (x: number) => {
        // y = 1 - (1 - x)^3
        return 1 - Math.pow(1 - x, 3);
    },
    easeInOutCubic: (x: number) => {
        if (x < 0.5) {
            // y = 4 * x^3
            return 4 * Math.pow(x, 3);
        } else {
            // y = 1 - ( (-2x + 2)^3 / 2 )
            return 1 - Math.pow((-2 * x + 2), 3) / 2;
        }
    },

    easeInQuart: (x: number) => {
        // y = x^4
        return Math.pow(x, 4);
    },
    easeOutQuart: (x: number) => {
        // y = 1 - (1 - x)^4
        return 1 - Math.pow(1 - x, 4);
    },
    easeInOutQuart: (x: number) => {
        if (x < 0.5) {
            // y = 8 * x^4
            return 8 * Math.pow(x, 4);
        } else {
            // y = 1 - ( (-2x + 2)^4 / 2 )
            return 1 - Math.pow((-2 * x + 2), 4) / 2;
        }
    },

    easeInQuint: (x: number) => {
        // y = x^5
        return Math.pow(x, 5);
    },
    easeOutQuint: (x: number) => {
        // y = 1 - (1 - x)^5
        return 1 - Math.pow(1 - x, 5);
    },
    easeInOutQuint: (x: number) => {
        if (x < 0.5) {
            // y = 16 * x^5
            return 16 * Math.pow(x, 5);
        } else {
            // y = 1 - ( (-2x + 2)^5 / 2 )
            return 1 - Math.pow((-2 * x + 2), 5) / 2;
        }
    },

    easeInExpo: (x: number) => {
        if (x === 0) {
            // y = 0
            return 0;
        } else {
            // y = 2^(10x - 10)
            return Math.pow(2, (10 * x - 10));
        }
    },
    easeOutExpo: (x: number) => {
        if (x === 1) {
            // y = 1
            return 1;
        } else {
            // y = 1 - 2^(-10x)
            return 1 - Math.pow(2, (-10 * x));
        }
    },
    easeInOutExpo: (x: number) => {
        if (x === 0 || x === 1) {
            // y = x
            return x;
        } else {
            if (x < 0.5) {
                // y = 2^(20x - 10) / 2
                return Math.pow(2, (20 * x - 10)) / 2;
            } else {
                // y = ( 2 - 2^(-20x + 10) ) / 2
                return (2 - Math.pow(2, (-20 * x + 10))) / 2;
            }
        }

    },

    easeInCirc: (x: number) => {
        // y = 1 - √(1 - x^2)
        return 1 - Math.sqrt(1 - Math.pow(x, 2));
    },
    easeOutCirc: (x: number) => {
        // y = √(1 - (x - 1)^2)
        return Math.sqrt(1 - Math.pow((x - 1), 2));
    },
    easeInOutCirc: (x: number) => {
        if (x < 0.5) {
            // y = (1 - √(1 - (2x)^2)) / 2
            return (1 - Math.sqrt(1 - Math.pow((2 * x), 2))) / 2;
        } else {
            // y = (√(1 - (-2x + 2)^2)) / 2
            return (Math.sqrt(1 - Math.pow((-2 * x + 2), 2)) + 1) / 2;
        }
    },

    easeInBack: (x: number) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        // y = C3 * x^3 - C1 * x^2
        return c3 * Math.pow(x, 3) - c1 * Math.pow(x, 2);
    },
    easeOutBack: (x: number) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        // y = 1 + C3 * (x - 1)^3 + C1 * (x - 1)^2
        return 1 + c3 * Math.pow((x - 1), 3) + c1 * Math.pow((x - 1), 2);
    },
    easeInOutBack: (x: number) => {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;

        if (x < 0.5) {
            // y = ((2x)^2 * (C2 + 1) * 2x - C2) / 2
            return (Math.pow((2 * x), 2) * ((c2 + 1) * 2 * x - c2)) / 2;
        } else {
            // y = ((2x - 2)^2 * ((C2 + 1) * (2x - 2) + C2) + 2) / 2
            return (Math.pow((2 * x - 2), 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
        }
    },

    easeInElastic: (x: number) => {
        if (x === 0 || x === 1) {
            // y = x
            return 1;
        } else {
            const c4 = (2 * Math.PI) / 3;
            // y = -2^(10x - 10) * sin((10x - 10.75) * C4)
            return -Math.pow(2, (10 * x - 10)) * Math.sin((x * 10 - 10.75) * c4);
        }
    },
    easeOutElastic: (x: number) => {
        if (x === 0 || x === 1) {
            // y = x
            return 1;
        } else {
            const c4 = (2 * Math.PI) / 3;
            // y = 2^(-10x) * sin((10x - 0.75) * C4) + 1
            return Math.pow(2, (-10 * x)) * Math.sin((x * 10 - 0.75) * c4) + 1;
        }
    },
    easeInOutElastic: (x: number) => {
        if (x === 0 || x === 1) {
            // y = x
            return x;
        } else {
            const c5 = (2 * Math.PI) / 4.5;

            if (x < 0.5) {
                // y = -(2^(20x - 10) * sin((20x - 11.125) * C5)) / 2
                return -(Math.pow(2, (20 * x - 10)) * Math.sin((20 * x - 11.125) * c5)) / 2;
            } else {
                // y = ( ( 2^(-20x + 10) * sin( (20x - 11.125) * C5 ) ) / 2 ) + 1
                return (Math.pow(2, (-20 * x + 10)) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
            }
        }
    },

    easeInBounce: (x: number) => {
        // y = 1 - ( easeOutBounce(1 - x) )
        return 1 - TIMING_FUNCTIONS.easeOutBounce(1 - x);
    },
    easeOutBounce: (x: number) => {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (x < 1 / d1) {
            // y = N1 * x^2
            return n1 * Math.pow(x, 2);
        } else if (x < 2 / d1) {
            // y = N1 * ( x - (1.5 / d1) ) * ( x - (1.5 / d1) ) + 0.75
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
            // y = N1 * ( x - (2.25 / d1) ) * ( x - (2.25 / d1) ) + 0.9375
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
            // y = N1 * ( x - (2.65 / d1) ) * ( x - (2.65 / d1) ) + 0.984375
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    },
    easeInOutBounce: (x: number) => {
        if (x < 0.5) {
            // y = (1 - easeOutBounce(1 - 2x)) / 2
            return (1 - TIMING_FUNCTIONS.easeOutBounce(1 - 2 * x)) / 2;
        } else {
            // y = (1 + easeOutBounce(2x - 1)) / 2
            return (1 + TIMING_FUNCTIONS.easeOutBounce(2 * x - 1)) / 2;
        }
    },

    linear(x: number) {
        // y = x
        return x;
    },
    
    bounceStart(x: number) {
        // y = 4 * x^3 - 3 * x^2
        return (4 * Math.pow(x, 3)) - (3 * Math.pow(x, 2));
    },
    bounceEnd(x: number) {
        // y = -4 * x^3 + 5 * x^2
        return (-4 * Math.pow(x, 3)) + (5 * Math.pow(x, 2));
    },
};

// exports ================================================== //
export { TIMING_FUNCTIONS };