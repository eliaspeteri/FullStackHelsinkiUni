import React from "react";
import courseParts from "./courseParts";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const App = () => {
    const courseName = "Half Stack application development";

    return (
        <div>
            <Header courseName={courseName} courseParts={courseParts} />
            <Content courseName={courseName} courseParts={courseParts} />
            <Total courseName={courseName} courseParts={courseParts} />
        </div>
    );
};

export default App;
