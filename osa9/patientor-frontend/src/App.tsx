import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage/PatientPage";

const App = () => {
    const [, dispatch] = useStateValue();
    React.useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/ping`);

        const fetchDiagnoses = async () => {
            try {
                const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses`
                );
                dispatch({
                    type: "SET_DIAGNOSES",
                    payload: diagnosesFromApi,
                });
            } catch (e) {
                console.error(e);
            }
        };

        const fetchPatientList = async () => {
            try {
                const { data: patientListFromApi } = await axios.get<Patient[]>(
                    `${apiBaseUrl}/patients`
                );
                dispatch({
                    type: "SET_PATIENT_LIST",
                    payload: patientListFromApi,
                });
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatientList();
        void fetchDiagnoses();
    }, [dispatch]);

    return (
        <div className="App">
            <Router>
                <Container>
                    <Header as="h1">Patientor</Header>
                    <Button as={Link} to="/" primary>
                        Home
                    </Button>
                    <Divider hidden />
                    <Switch>
                        <Route path="/patients/:id">
                            <PatientPage />
                        </Route>
                        <Route path="/">
                            <PatientListPage />
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </div>
    );
};

export default App;
