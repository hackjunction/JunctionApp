import * as SortTypes from './sortTypes'

export default {
    [SortTypes.SORT_NUMERIC]: (...args) => {
        console.log(...args)
        // console.log(`${a} - ${b}`, a - b)
        // return a - b
        return 0
        // if (isNaN(a) || isNaN(b)) {
        //     return 0
        // }

        // if (Number(a) < Number(b)) {
        //     return -1
        // }

        // if (Number(a) > Number(b)) {
        //     return 1
        // }

        // return 0
    },
    [SortTypes.SORT_ALPHABETIC]: (...args) => {
        console.log(...args)
        // console.log(`${a} - ${b}`, a - b)
        // return a - b
        return 0
    },
}
