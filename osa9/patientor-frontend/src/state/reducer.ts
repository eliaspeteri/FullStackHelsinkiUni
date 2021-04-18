import { State } from "./state";
import { Patient } from "../types";

export type Action =
    | {
          type: "SET_PATIENT_LIST";
          payload: Patient[];
      }
    | {
          type: "SET_PATIENT";
          payload: Patient;
      }
    | {
          type: "ADD_PATIENT";
          payload: Patient;
      };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case "SET_PATIENT":
            return { ...state, patient: { ...action.payload } };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        default:
            return state;
    }
};

// Action creators
/**@param patientFromApi Single patient data to be dispatched to the state */
export const setPatientPage = (patientFromApi: Patient) => {
    return { type: "SET_PATIENT", payload: patientFromApi };
};
/**@param patientListFromApi an array of Patients to be dispatched to the state */
export const setPatientList = (patientsFromApi: Patient[]) => {
    return { type: "SET_PATIENT_LIST", payload: patientsFromApi };
};
