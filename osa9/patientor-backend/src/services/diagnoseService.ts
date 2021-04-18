import diagnoses from "../data/diagnoses.json";

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
