import React from "react";
import { Props } from "../types";
/** @param name Course name for the header */
const Header = ({ name }: Props): JSX.Element => {
    return <h1>{name}</h1>;
};
export default Header;
