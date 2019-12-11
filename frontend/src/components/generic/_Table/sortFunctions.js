import * as SortTypes from './sortTypes';

export default {
    [SortTypes.SORT_NUMERIC]: (a, b) => {
        if (isNaN(a) || isNaN(b)) {
            return 0;
        }

        if (Number(a) < Number(b)) {
            return -1;
        }

        if (Number(a) > Number(b)) {
            return 1;
        }

        return 0;
    }
};
