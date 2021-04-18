"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addEntry = (entry) => {
    const id = uuid_1.v1(); // eslint-disable-line
    const newPatientEntry = Object.assign({ id: id }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const findById = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    return patient;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
    findById,
};
