import React from "react";
import { Props } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: Props): JSX.Element => {
    // const assertNever = (value: never): never => {
    //     throw new Error(
    //         `Unhandled discriminated union member: ${JSON.stringify(value)}`
    //     );
    // };
    return (
        <div>
            {courseParts?.map((part) => {
                switch (part.name) {
                    case "Fundamentals":
                        return (
                            <div>
                                <Part
                                    key={part.name}
                                    name={part.name}
                                    exerciseCount={part.exerciseCount}
                                    description={part.description}
                                />
                            </div>
                        );
                    case "Advanced":
                        return (
                            <div>
                                <Part
                                    key={part.name}
                                    name={part.name}
                                    exerciseCount={part.exerciseCount}
                                    description={part.description}
                                />
                            </div>
                        );
                    case "Using props to pass data":
                        return (
                            <div>
                                <Part
                                    key={part.name}
                                    name={part.name}
                                    exerciseCount={part.exerciseCount}
                                />
                            </div>
                        );
                    case "Deeper type usage":
                        return (
                            <div>
                                <Part
                                    key={part.name}
                                    name={part.name}
                                    exerciseCount={part.exerciseCount}
                                    description={part.description}
                                />
                            </div>
                        );
                    case "Backend development":
                        return (
                            <div>
                                <Part
                                    key={part.name}
                                    name={part.name}
                                    exerciseCount={part.exerciseCount}
                                    description={part.description}
                                />
                            </div>
                        );
                    default:
                        break;
                }
            })}
        </div>
    );
};

export default Content;
