import React from "react";
import { Props } from "../types";

const Part = ({ name, exerciseCount, description }: Props): JSX.Element => {
    return (
        <p>
            <b>
                {name} {exerciseCount}
            </b>
            <br />
            <em>{description}</em>
        </p>
    );
};

export default Part;
