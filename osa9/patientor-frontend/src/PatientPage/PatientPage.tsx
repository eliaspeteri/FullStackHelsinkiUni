import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { setPatientPage, useStateValue } from "../state";
import { Icon } from "semantic-ui-react";
const PatientPage = () => {
    const [patients, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const patient = patients.patient;

    if (patient?.id !== id) {
        React.useEffect(() => {
            const fetchPatient = async () => {
                try {
                    const { data: patientFromApi } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    dispatch({ type: "SET_PATIENT", payload: patientFromApi });
                    console.log(setPatientPage(patientFromApi));
                } catch (e) {
                    console.error(e.message);
                }
            };
            void fetchPatient();
        }, []);
    }

    const genderIcon = (gender: string): JSX.Element => {
        switch (gender) {
            case "male":
                return <Icon name="mars" />;
            case "female":
                return <Icon name="venus" />;
            default:
                return <Icon name="other gender" />;
        }
    };

    return (
        <>
            {patient ? (
                <div>
                    <h1>
                        {patient?.name}&nbsp;
                        {genderIcon(patient?.gender)}
                    </h1>
                    <div>ssn:&nbsp;{patient?.ssn}</div>
                    <div>occupation:&nbsp;{patient?.occupation}</div>
                    <div>date of birth:&nbsp;{patient?.dateOfBirth}</div>
                </div>
            ) : (
                "Loading patient, please wait..."
            )}
        </>
    );
};

export default PatientPage;
