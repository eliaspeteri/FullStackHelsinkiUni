import React from "react";
import { Props } from "../types";
/** @param name Course name for the header */
const Header = ({ courseName }: Props): JSX.Element => {
    return <h1>{courseName}</h1>;
};
export default Header;
