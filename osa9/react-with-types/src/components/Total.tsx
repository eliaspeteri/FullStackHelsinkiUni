import React from "react";
import { Props } from "../types";

const Total = ({ courseParts }: Props): JSX.Element => {
    return (
        <div>
            Number of exercises{" "}
            {courseParts?.reduce(
                (carry, part) => carry + part.exerciseCount,
                0
            )}
        </div>
    );
};

export default Total;
