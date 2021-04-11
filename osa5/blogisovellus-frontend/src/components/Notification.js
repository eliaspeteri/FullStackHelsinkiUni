import React from "react";
import { useSelector } from "react-redux";
// Notification component to handle informing the user of a successful operation
const Notification = () => {
    const notification = useSelector((state) => state.notification);
    return <div className="error">{notification}</div>;
};

export default Notification;
