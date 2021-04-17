import React from "react";
import { Props } from "../types";
import Part from "./Part";

/** @param courseParts Course content */
const Content = ({ courseParts }: Props): JSX.Element => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    return (
        <div>
            {courseParts?.map((part) => {
                switch (part.name) {
                    case "Fundamentals":
                        return (
                            <Part
                                key={part.name}
                                name={part.name}
                                exerciseCount={part.exerciseCount}
                                description={part.description}
                            />
                        );
                    case "Advanced":
                        return (
                            <Part
                                key={part.name}
                                name={part.name}
                                exerciseCount={part.exerciseCount}
                                description={part.description}
                            />
                        );
                    case "Using props to pass data":
                        return (
                            <Part
                                key={part.name}
                                name={part.name}
                                exerciseCount={part.exerciseCount}
                                description={part.description}
                                groupProjectCount={part.groupProjectCount}
                            />
                        );
                    case "Deeper type usage":
                        return (
                            <Part
                                key={part.name}
                                name={part.name}
                                exerciseCount={part.exerciseCount}
                                description={part.description}
                                link={part.exerciseSubmissionLink}
                            />
                        );
                    case "Backend development":
                        return (
                            <Part
                                key={part.name}
                                name={part.name}
                                description={part.description}
                                requirements={part.requirements}
                            />
                        );
                    default:
                    // assertNever(part);
                }
            })}
        </div>
    );
};

export default Content;
