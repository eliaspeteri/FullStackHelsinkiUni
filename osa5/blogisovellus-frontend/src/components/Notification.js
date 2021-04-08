// Notification component to handle informing the user of a successful operation
const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }
    return <div className="error">{message}</div>;
};

export default Notification;
