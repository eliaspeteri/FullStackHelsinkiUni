import React from "react";
import { Props } from "../types";
import Part from "./Part";

/** @param courseParts Course content */
const Content = ({ courseParts }: Props): JSX.Element => {
    // const assertNever = (value: never): never => {
    //     throw new Error(
    //         `Unhandled discriminated union member: ${JSON.stringify(value)}`
    //     );
    // };
    return (
        <div>
            {courseParts !== undefined
                ? courseParts.map((part) => {
                      switch (part.name) {
                          case "Fundamentals":
                              return <Part {...part} />;
                          case "Advanced":
                              return <Part {...part} />;
                          case "Using props to pass data":
                              return <Part {...part} />;
                          case "Deeper type usage":
                              return <Part {...part} />;
                          case "Backend development":
                              return <Part {...part} />;
                          default:
                              //   assertNever(part);
                              break;
                      }
                  })
                : null}
        </div>
    );
};

export default Content;
