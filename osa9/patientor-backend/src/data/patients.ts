import { Patient } from "../types";
import data from "./patients.json";
import toNewPatientEntry from "../utils";

const patientEntries: Patient[] = data.map((obj) => {
    const object = toNewPatientEntry(obj) as Patient;
    object.id = obj.id;
    return object;
});

export default patientEntries;
