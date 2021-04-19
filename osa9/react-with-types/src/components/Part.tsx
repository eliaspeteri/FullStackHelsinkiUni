import React from "react";
import { CoursePart } from "../types";

/**@param name Course name @param exerciseCount Number of exercises in a course @param description Course description */
const Part = (coursePart: CoursePart): JSX.Element => {
    return (
        <p>
            <strong>
                {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br />
            <em>{coursePart.description}</em>

            {coursePart.type === "groupProject" ? (
                <span>
                    <b />
                    {`project exercises ${coursePart.groupProjectCount}`}
                </span>
            ) : null}

            {coursePart.type === "submission" ? (
                <span>
                    <br />
                    submit to {coursePart.exerciseSubmissionLink}
                </span>
            ) : null}
            {coursePart.type === "special" ? (
                <div>
                    required skills:{" "}
                    {coursePart.requirements !== undefined
                        ? coursePart.requirements.map((requirement) => (
                              <span key={requirement}>{requirement} </span>
                          ))
                        : null}
                </div>
            ) : null}
        </p>
    );
};

export default Part;
