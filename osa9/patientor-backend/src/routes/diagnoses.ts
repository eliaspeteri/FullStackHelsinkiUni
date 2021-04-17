import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(diagnoseService.getEntries());
});

router.post("/", (_req, res) => {
    res.send("Posting a new diagnosis.");
});

export default router;