"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("./patients.json"));
const utils_1 = __importDefault(require("../utils"));
const patientEntries = patients_json_1.default.map((obj) => {
    const object = utils_1.default(obj);
    object.id = obj.id;
    return object;
});
exports.default = patientEntries;
