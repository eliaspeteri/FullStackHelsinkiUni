import { Diagnose, NewDialogEntry } from "./types";
import { parseDate, isString, isNumber } from "./utils";
export const toNewPatientDialogEntry = ({
    description,
    date,
    specialist,
    diagnosisCodes,
    type,
    employerName,
    sickLeave,
    healthCheckRating,
}: DialogFields): NewDialogEntry => {
    const newDialogEntry: NewDialogEntry = {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: diagnosisCodes,
        type: type,
        employerName: parseEmployerName(employerName),
        sickLeave: sickLeave,
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
    };
    return newDialogEntry;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description: " + description);
    }
    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist: " + specialist);
    }
    return specialist;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
    if (!healthCheckRating || !isNumber(healthCheckRating)) {
        throw new Error(
            "Incorrect or missing health check rating: " + healthCheckRating
        );
    }
    return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error("Incorrect or missing employer name: " + employerName);
    }
    return employerName;
};

type DialogFields = {
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes: Array<Diagnose["code"]>;
    type: "Hospital" | "OccupationalHealthcare" | "HealthCheck";
    discharge:
        | {
              date: string;
              criteria: string;
          }
        | undefined;
    employerName: unknown;
    sickLeave:
        | {
              startDate: string;
              endDate: string;
          }
        | undefined;
    healthCheckRating: unknown;
};
