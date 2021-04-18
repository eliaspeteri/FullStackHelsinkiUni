import { Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isNumber = (number: unknown): number is number => {
    return typeof number === "number" || number instanceof Number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrent or missing date: " + date);
    }
    return date;
};

export { isDate, isString, isNumber, isGender, parseDate };
