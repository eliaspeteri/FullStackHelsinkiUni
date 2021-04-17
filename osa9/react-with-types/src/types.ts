export interface Props {
    name?: string;
    courseParts?: CoursePart[];
    exerciseCount?: number;
    description?: string;
    groupProjectCount?: number;
    link?: string;
    requirements?: string[];
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    description?: string;
    type: string;
    groupProjectCount?: number;
    exerciseSubmissionLink?: string;
    requirements?: string[];
}

interface CourseNormalPart extends CoursePartBase {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseRequirementsPart extends CoursePartBase {
    requirements: string[];
}

export type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseRequirementsPart;
