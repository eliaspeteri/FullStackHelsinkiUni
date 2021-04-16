interface Result {
    periodLength: number;
    trainingDays: number;
    success: string;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ParsedArguments {
    target: number;
    hours: Array<number>;
}

const parseArgumentsEx = (args: Array<string>): ParsedArguments => {
    if (args.length < 4) throw new Error("Not enough arguments.");
    if (!isNaN(Number(args[2]))) {
        return {
            target: Number(args[2]),
            hours: args.slice(3, args.length).map((value) => Number(value)),
        };
    }
};

const calculateExercises = (target: number, hours: Array<number>): Result => {
    const trainingDays = hours.filter((hour: number) => hour > 0).length;
    const hoursSum = hours.reduce((a: number, b: number) => a + b);
    const hoursAvg = hoursSum / hours.length;
    const avgPct = hoursAvg / target;
    let rating: number;
    if (avgPct > 0.98) rating = 3;
    else if (avgPct > 0.5 && avgPct <= 0.98) rating = 2;
    else rating = 1;
    return {
        periodLength: hours.length,
        trainingDays: trainingDays,
        success: hoursAvg > target ? "success" : "false",
        rating: rating,
        ratingDescription:
            avgPct > 0.98 ? "Great job!" : "Not too bad, but could be better",
        target: target,
        average: hoursAvg,
    };
};

try {
    const { target, hours } = parseArgumentsEx(process.argv);
    console.log(calculateExercises(target, hours));
} catch (e) {
    console.log("Error: ", e.message);
}
