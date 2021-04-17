import diagnoses from "../data/diagnoses";

import { Diagnose } from "../types";

const getEntries = (): Array<Diagnose> => {
    return diagnoses;
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry,
};
