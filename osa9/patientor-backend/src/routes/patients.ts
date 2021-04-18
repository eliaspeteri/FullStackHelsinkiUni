import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

// TODO REMOVE THIS
//! Remember to remove the sensitive entry query when building for production
router.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    Boolean(req.query.sensitive) === true
        ? res.send(patientService.getEntries())
        : res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
    const patient = patientService.findById(req.params.id);
    if (patient) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(patient);
    } else res.sendStatus(404);
});

router.post("/", (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedEntry = patientService.addEntry(newPatientEntry);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;
