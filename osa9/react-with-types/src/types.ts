export interface Props {
    name?: string;
    courseParts?: CoursePart[];
    exerciseCount?: number;
    description?: string;
    requirements?: string[];
    submissionLink?: string;
}

export type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseRequirementsPart;

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    description?: string;
    type: string;
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
