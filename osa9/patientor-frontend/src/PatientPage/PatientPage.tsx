import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { Icon, Container, Header, List } from "semantic-ui-react";

const PatientPage = () => {
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    if (patient?.id !== id) {
        React.useEffect(() => {
            const fetchPatient = async () => {
                try {
                    const { data: patientFromApi } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    dispatch({ type: "SET_PATIENT", payload: patientFromApi });
                } catch (e) {
                    console.error(e);
                }
            };
            void fetchPatient();
        }, []);
    }

    /**@param gender Gender type, Icon is set based on result */
    const genderIcon = (): JSX.Element => {
        switch (patient?.gender) {
            case "male":
                return <Icon name="mars" />;
            case "female":
                return <Icon name="venus" />;
            default:
                return <Icon name="other gender" />;
        }
    };

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const renderEntries = () => {
        const [{ diagnoses }] = useStateValue();

        const renderHeart = (rating: number) => {
            switch (rating) {
                case 0:
                    return <Icon name="heart" color="green" />;
                case 1:
                    return <Icon name="heart" color="yellow" />;
                case 2:
                    return <Icon name="heart" color="orange" />;
                case 3:
                    return <Icon name="heart" color="red" />;
            }
        };

        return (
            <div>
                <h2>entries</h2>
                {patient?.entries?.map((entry) => {
                    switch (entry.type) {
                        case "OccupationalHealthcare":
                            return (
                                <div>
                                    <Container fluid>
                                        <Header as="h3">
                                            {entry.date}{" "}
                                            <Icon name="stethoscope" />{" "}
                                            {entry.employerName}
                                        </Header>{" "}
                                        <em>{entry.description}</em>
                                        <List bulleted>
                                            {entry.diagnosisCodes?.map(
                                                (code) => (
                                                    <List.Item key={code}>
                                                        {code}{" "}
                                                        {diagnoses[code]
                                                            ? diagnoses[code]
                                                                  .name
                                                            : null}
                                                    </List.Item>
                                                )
                                            )}
                                        </List>
                                    </Container>
                                </div>
                            );
                        case "Hospital":
                            return (
                                <div>
                                    <Header as="h3">
                                        {entry.date} <Icon name="hospital" />
                                    </Header>{" "}
                                    <em>{entry.description}</em>
                                    <List bulleted>
                                        {entry.diagnosisCodes?.map((code) => (
                                            <List.Item key={code}>
                                                {code}{" "}
                                                {diagnoses[code]
                                                    ? diagnoses[code].name
                                                    : null}
                                            </List.Item>
                                        ))}
                                    </List>
                                </div>
                            );
                        case "HealthCheck":
                            return (
                                <div>
                                    <Header as="h3">
                                        {entry.date} <Icon name="doctor" />
                                    </Header>
                                    <em>{entry.description}</em>
                                    <List bulleted>
                                        {entry.diagnosisCodes?.map((code) => (
                                            <List.Item key={code}>
                                                {code}{" "}
                                                {diagnoses[code]
                                                    ? diagnoses[code].name
                                                    : null}
                                            </List.Item>
                                        ))}
                                    </List>
                                    {renderHeart(entry.healthCheckRating)}
                                </div>
                            );
                        default:
                            assertNever(entry);
                    }
                })}
            </div>
        );
    };

    return (
        <>
            {patient ? (
                <div>
                    <h1>
                        {patient?.name}&nbsp;
                        {genderIcon()}
                    </h1>
                    <div>ssn:&nbsp;{patient?.ssn}</div>
                    <div>occupation:&nbsp;{patient?.occupation}</div>
                    {patient?.entries.length !== 0 ? renderEntries() : null}
                </div>
            ) : (
                "Loading patient, please wait..."
            )}
        </>
    );
};

export default PatientPage;
