import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";

const PatientPage = () => {
    const match = useRouteMatch("/patients/:id");
    console.log("match:", match);
    const { id } = useParams<{ id: string }>();
    console.log("id:", id);

    return <></>;
};

export default PatientPage;
