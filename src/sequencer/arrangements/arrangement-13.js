const PerformanceArrangement = require("../performance-arrangement");


class Arrangement13 extends PerformanceArrangement {

    get defaultState() {
        let state = {
            stageCount: 3,
            stageIndex: 0,
            evolveAmount: 0.5,
            enableEvolve: false,
            rainmakerCVTickCountMin: 48,
            rainmakerCVTickCountMax: 48,
            data: {
                mono1: [[]],
                mono2: [[]],
                poly1: [[]],
                perc1: [[]],
                perc2: [[]],
                perc3: [[]],
                perc4: [[]]
            },
            mono1: {
                instrument: "BSPSeq1",
                rate: 2,
                low: 24,
                high: 64,
                algorithm: "euclid",
                density: 0.9,
                min: 16,
                max: 24,
                kmin: 3,
                kmax: 9,

                stages: [1, 1, 1]
            },
            mono2: {
                instrument: "BSPSeq2",
                rate: 2,
                low: 24,
                high: 64,
                algorithm: "ryk",
                density: 0.75,
                min: 32,
                max: 32,
                stages: [1, 1, 2]
            },
            poly1: {
                instrument: "Minilogue",
                rate: 4,
                low: 36,
                high: 72,
                algorithm: "euclid",
                density: 0.9,
                n: 24,
                kmin: 3,
                kmax: 9,
                stages: [2, 1, 1]
            },
            perc1: {
                instrument: "BSPDrum",
                rate: 4,
                algorithm: "euclid",
                density: 0.9,
                n: 36,
                kmin: 3,
                kmax: 9,
                stages: [1, 1, 1]
            },
            perc2: {
                instrument: "BSPDrum",
                rate: 4,
                algorithm: "euclid",
                density: 0.9,
                n: 48,
                kmin: 5,
                kmax: 17,
                stages: [1, 1, 1]
            },
            perc3: {
                instrument: "BSPDrum",
                rate: 8,
                algorithm: "euclid",
                density: 0.75,
                n: 24,
                kmin: 3,
                kmax: 7,
                stages: [0, 1, 1]
            },
            perc4: {
                instrument: "BSPDrum",
                rate: 4,
                algorithm: "perc",
                density: 0.5,
                min: 12,
                max: 12,
                stages: [1, 0, 1]
            }
        };
        return state;
    }

    get title() {
        return "perf13 - three euclideans";
    }

}
module.exports = Arrangement13;