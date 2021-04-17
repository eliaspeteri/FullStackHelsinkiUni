import React from "react";
import { Props } from "../types";

/**@param courseParts Course content for calculating total number of exercises */
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
