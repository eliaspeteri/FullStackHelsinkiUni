interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
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
    if (!isNaN(Number(args[2]))) {
        return {
            target: Number(args[2]),
            hours: args.slice(3, args.length).map((value) => Number(value)),
        };
    }
    return { target: 0, hours: [] };
};

export const calculateExercises = (
    target: number,
    hours: Array<number>
): Result => {
    hours = hours.slice(0, hours.length).map((value) => Number(value));
    const trainingDays = hours.filter((hour: number) => hour > 0).length;
    const hoursSum = hours.reduce((a: number, b: number) => a + b);
    const hoursAvg = hoursSum / hours.length;
    const avgPct = hoursAvg / target;
    let rating: number;
    let ratingDescription: string;
    if (avgPct > 0.98) {
        rating = 3;
        ratingDescription = "great job!";
    } else if (avgPct > 0.5 && avgPct <= 0.98) {
        rating = 2;
        ratingDescription = "not too bad, but could be better";
    } else {
        rating = 1;
        ratingDescription = "bad";
    }
    return {
        periodLength: hours.length,
        trainingDays: trainingDays,
        success: hoursAvg > target ? true : false,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: hoursAvg,
    };
};

try {
    const { target, hours } = parseArgumentsEx(process.argv);
    console.log(calculateExercises(target, hours));
} catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log("Error: ", error.message);
}
