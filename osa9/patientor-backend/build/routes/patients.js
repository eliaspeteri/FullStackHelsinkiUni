"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    Boolean(req.params.sensitive) === true
        ? res.send(patientService_1.default.getEntries())
        : res.send(patientService_1.default.getNonSensitiveEntries());
});
router.get("/:id", (req, res) => {
    const patient = patientService_1.default.findById(req.params.id);
    if (patient)
        res.send(patient);
    else
        res.sendStatus(404);
});
router.post("/", (req, res) => {
    try {
        const newPatientEntry = utils_1.default(req.body);
        const addedEntry = patientService_1.default.addEntry(newPatientEntry);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
