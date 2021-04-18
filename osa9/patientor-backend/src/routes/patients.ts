import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../patientParser";
// import {toNewPatientDialogEntry} from "../diagnoseParser";
const router = express.Router();

router.get("/", (_req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    // res.json(patientService.getPatientsSafe());
    //! Remember to turn this off
    res.json(patientService.getPatients());
});

router.get("/:id", (req, res) => {
    const patient = patientService.findById(req.params.id);
    if (patient) {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(patient);
    } else res.sendStatus(404);
});

router.get("/:id/entries", (req, res) => {
    try {
        const patientEntries = patientService.getEntries(req.params.id);
        res.header("Access-Control-Allow-Origin", "*");
        res.json(patientEntries);
    } catch (e) {
        console.log(
            "someone tried to look for patient entries and failed. oopsie!"
        );
        res.status(400).send(e.message);
    }
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

router.post("/:id/entries", (req, res) => {
    try {
        console.log(req.body);
        // Parsing the request body into the required type
        // const newPatientDialog = toNewPatientDialogEntry(req.body);

        // const addedDialogEntry = patientService.addDialogEntry(
        //     newPatientDialog
        // );
        // const addedDialogEntry = patientService.addDialogEntry(req.body);
        res.json(req.body);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;
