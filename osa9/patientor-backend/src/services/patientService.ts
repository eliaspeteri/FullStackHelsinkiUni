import patients from "../data/patients";
import {
    Patient,
    PatientSafe,
    NewPatientEntry,
    // NewDialogEntry,
    Entry,
} from "../types";
import { v1 as uuid } from "uuid";
const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsSafe = (): PatientSafe[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getEntries = (id: string): Entry[] | undefined => {
    const patient = patients.find((p) => p.id === id);
    return patient?.entries;
};

const addEntry = (entry: NewPatientEntry): Patient => {
    const id = uuid();
    const newPatientEntry = {
        id: id,
        ...entry,
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

// const addDialogEntry = (entry: NewDialogEntry): Entry[] | undefined => {
//     const id = uuid();
//     const newDialogEntry = {
//         id: id,
//         ...entry,
//     };
//     const patient = patients.find((p) => p.id === id);
//     patient?.entries.push(newDialogEntry);
//     return patient?.entries;
// };

const findById = (id: string): Patient | undefined => {
    const patient = patients.find((p) => p.id === id);
    return patient;
};

export default {
    getPatients,
    getPatientsSafe,
    getEntries,
    addEntry,
    // addDialogEntry,
    findById,
};
