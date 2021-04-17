import React from "react";
import { Props } from "../types";

/**@param name Course name @param exerciseCount Number of exercises in a course @param description Course description */
const Part = (props: Props): JSX.Element => {
    const requirements = (requirements: Array<string>) => (
        <div>
            required skills:{" "}
            {requirements.map((requirement) => (
                <span key={requirement}>{requirement} </span>
            ))}
        </div>
    );
    return (
        <p>
            <strong>
                {props.name} {props.exerciseCount}
            </strong>
            <br />
            <em>{props.description}</em>

            {props.groupProjectCount ? (
                <span>
                    <b />
                    {`project exercises ${props.groupProjectCount}`}
                </span>
            ) : null}

            {props.link ? (
                <span>
                    <br />
                    submit to {props.link}
                </span>
            ) : null}
            {props.requirements ? requirements(props.requirements) : null}
        </p>
    );
};

export default Part;
