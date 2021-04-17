import express from "express";
const app = express();
app.use(express.json());

import { calculateExercises } from "./exerciseCalculator";
import { calculateBmi } from "./bmiCalculator";
app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/", (_req, res) => {
    res.send(
        `<div>
            <a href="http://localhost:3003/bmi">BMI endpoint</a>
            <a href="http://localhost:3003/exercises">exercises endpoint</a>
        </div>`
    );
});
app.get("/bmi", (req, res) => {
    try {
        res.send({
            weight: req.query.weight,
            height: req.query.height,
            bmi: calculateBmi(
                Number(req.query.height),
                Number(req.query.weight)
            ),
        });
    } catch (e) {
        res.send({ error: "malformatted parameters" });
    }
});

app.post("/exercises", (req, res) => {
    const body = req.body;
    const target = Number(req.body.target);
    let daily_exercises = body.daily_exercises;
    try {
        daily_exercises = daily_exercises
            .slice(0, body.daily_exercises.length)
            .map((value: string) => Number(value));
        res.json(calculateExercises(target, daily_exercises));
    } catch (e) {
        res.json({ error: e.message });
    }
});

app.get("/exercises", (_req, res) => {
    res.send("Post an object to this URL!");
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
