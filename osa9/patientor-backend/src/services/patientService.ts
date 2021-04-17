import patients from "../data/patients";
import { Patient, PatientSafe, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";
const getEntries = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): PatientSafe[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addEntry = (entry: NewPatientEntry): Patient => {
    const id = uuid(); // eslint-disable-line
    const newPatientEntry = {
        id: id, // eslint-disable-line
        ...entry,
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find((p) => p.id === id);
    return patient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
    findById,
};
