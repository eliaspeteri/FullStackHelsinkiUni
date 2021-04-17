import React from "react";

const Header = ({ name }: Props): JSX.Element => {
    return <h1>{name}</h1>;
};

const Content = ({ courses }: Props): JSX.Element => {
    return (
        <div>
            {courses?.map((course) => (
                <p key={course.name}>
                    {course.name} {course.exerciseCount}
                </p>
            ))}
        </div>
    );
};

const Total = ({ courses }: Props): JSX.Element => {
    return (
        <div>
            Number of exercises{" "}
            {courses?.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    );
};

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseNormalPart extends CoursePartBase {
    type: "normal";
    description: string;
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
    type: "submission";
    description: string;
    exerciseSubmissionLink: string;
}

interface CourseDescriptionPart extends CoursePartBase {
    description: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

const courseParts: CoursePart[] = [
    {
        name: "Fundamentals",
        exerciseCount: 10,
        description: "This is the leisured course part",
        type: "normal",
    },
    {
        name: "Advanced",
        exerciseCount: 7,
        description: "This is the harded course part",
        type: "normal",
    },
    {
        name: "Using props to pass data",
        exerciseCount: 7,
        groupProjectCount: 3,
        type: "groupProject",
    },
    {
        name: "Deeper type usage",
        exerciseCount: 14,
        description: "Confusing description",
        exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
        type: "submission",
    },
];

interface Props {
    name?: string;
    courses?: {
        name: string;
        exerciseCount: number;
    }[];
}

const App = () => {
    const courseName = "Half Stack application development";

    return (
        <div>
            <Header name={courseName} />
            <Content courses={courseParts} />
            <Total courses={courseParts} />
        </div>
    );
};

export default App;
