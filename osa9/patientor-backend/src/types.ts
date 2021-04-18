export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export type Patient = {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[];
};

export type PatientSafe = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;
